import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { UserService } from '../user/user.service';
import JwtRefreshGuard from './guards/refresh-token.guard';
import { PublicUser } from '../user/entities/publicUser.entity';
import { CustomRequest } from '../../types/request';
import { LoginPayload } from './payload/login.payload';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('Authentication') // Add a tag to group related endpoints in Swagger
@ApiBearerAuth() // Enable Bearer Authentication
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Post('login')
  @ApiOperation({ summary: 'User login' })
  @ApiBody({ type: LoginPayload, description: 'The payload for user login' }) // Use LoginPayload
  @ApiResponse({ status: 200, description: 'User logged in successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async login(
    @Body() body: LoginPayload,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { email, password } = body;
    const user = await this.authService.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    const accessToken = this.authService.createAccessToken(user.id, user.role);
    const {
      name,
      token: refreshToken,
      options,
    } = this.authService.createRefreshTokenCookie(user.id, user.role);

    res.cookie(name, refreshToken, options);

    await this.userService.setRefreshToken(user.id, refreshToken);
    return {
      user,
      accessToken,
    };
  }

  @UseGuards(JwtRefreshGuard)
  @Get('refresh')
  @ApiOperation({ summary: 'Refresh access token' })
  @ApiResponse({
    status: 200,
    description: 'Access token refreshed successfully',
  })
  async refresh(@Req() req: CustomRequest) {
    const user = await this.userService.findOne({
      id: req.user.id,
    });
    const accessToken = this.authService.createAccessToken(user.id, user.role);

    return {
      user,
      accessToken,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('logout')
  @ApiOperation({ summary: 'User logout' })
  @ApiResponse({ status: 200, description: 'User logged out' })
  async logout(
    @Req() req: CustomRequest,
    @Res({ passthrough: true }) res: Response,
  ) {
    const user = req.user as PublicUser;
    await this.userService.setRefreshToken(user.id, '');
    const {
      name,
      token: refreshToken,
      options,
    } = this.authService.getRefreshTokenCookie('', 0);
    res.cookie(name, refreshToken, options);
  }
}
