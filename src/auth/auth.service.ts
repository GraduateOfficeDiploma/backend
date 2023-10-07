import { Injectable } from '@nestjs/common';
import { validatePassword } from '../helpers/hashPassword';
import { PublicUser } from '../user/entities/publicUser.entity';
import { UserService } from '../user/user.service';
import { CookieOptions } from 'express';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async validateUser(email: string, password: string): Promise<PublicUser> {
    const user = await this.userService.findOne({ email });
    if (!user || !(await validatePassword(password, user.password))) {
      return null;
    }
    delete user.password;
    delete user.refreshToken;
    return user;
  }

  createAccessToken(userId: string) {
    const payload = { sub: userId };
    return this.jwtService.sign(payload, {
      secret: this.configService.get('ACCESS_TOKEN_SECRET'),
      expiresIn: this.configService.get('ACCESS_TOKEN_EXPIRATION_TIME') + 's',
    });
  }

  getRefreshTokenCookie(token: string, expirationTime: number) {
    const options: CookieOptions = {
      httpOnly: true,
      path: '/api/auth/refresh',
      maxAge: expirationTime * 1000,
      sameSite: 'none',
      secure: true,
    };

    return {
      name: 'refresh_token',
      token,
      options,
    };
  }

  createRefreshTokenCookie(userId: string) {
    const payload = { sub: userId };
    const config = {
      expirationTime: Number(
        this.configService.get('REFRESH_TOKEN_EXPIRATION_TIME'),
      ),
      secret: this.configService.get('REFRESH_TOKEN_SECRET'),
    };
    const refreshToken = this.jwtService.sign(payload, {
      secret: config.secret,
      expiresIn: `${config.expirationTime}s`,
    });
    return this.getRefreshTokenCookie(refreshToken, config.expirationTime);
  }
}
