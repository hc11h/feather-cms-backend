import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import type { Response } from 'express';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { JwtPayloadUser } from './types';

@Controller('auth')
export class AuthController {
  constructor(
    private jwtService: JwtService,
    private authService: AuthService,
  ) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {}

  @Get('me')
  @UseGuards(JwtAuthGuard)
  getProfile(@Req() req) {
    return req.user as JwtPayloadUser;
  }

  @Get('callback/google')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req, @Res() res: Response) {
    const profile = req.user;
    const user = await this.authService.validateOAuthLogin(profile);

    const token = this.jwtService.sign({ email: user.email });

    const clientUrl = process.env.CLIENT_URL;
    const isProduction = process.env.NODE_ENV === 'production';

    if (!clientUrl) {
      console.error('CLIENT_URL is not defined in environment variables.');
      return res
        .status(500)
        .send('Server configuration error: Missing CLIENT_URL.');
    }

    let domain: string;

    try {
      domain = new URL(clientUrl).hostname;
    } catch (err) {
      console.error('Invalid CLIENT_URL format:', err);
      return res
        .status(500)
        .send('Server configuration error: Invalid CLIENT_URL.');
    }

    res.cookie('authToken', token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: 'none',
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: '/',
    });

    console.log('Cookie set for domain:', domain);
    return res.redirect(`${clientUrl}/auth/success`);
  }
}
