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

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Post('login')
  async login(@Body() body, @Res({ passthrough: true }) res: Response) {
    const { email, password } = body;
    const user = await this.authService.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    const accessToken = this.authService.createAccessToken(user.id);
    const {
      name,
      token: refreshToken,
      options,
    } = this.authService.createRefreshTokenCookie(user.id);

    res.cookie(name, refreshToken, options);

    await this.userService.setRefreshToken(user.id, refreshToken);
    return {
      user,
      accessToken,
    };
  }

  @UseGuards(JwtRefreshGuard)
  @Get('refresh')
  refresh(@Req() req: CustomRequest) {
    const user = req.user as PublicUser;
    const accessToken = this.authService.createAccessToken(user.id);

    return {
      user,
      accessToken,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('logout')
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