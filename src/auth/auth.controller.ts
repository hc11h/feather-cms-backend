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

    res.cookie('authToken', token, {
      httpOnly: true, // 🔒 not accessible to JS
      secure: true, // 🔒 HTTPS only (set false locally if needed)
      sameSite: 'lax', // ✅ good default
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res.redirect(`${process.env.CLIENT_URL}/auth/success`);
  }
}
