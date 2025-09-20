import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import type { Response } from 'express';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

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
    return req.user; // user info from JWT strategy
  }

  @Get('callback/google')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req, @Res() res: Response) {
    const profile = req.user;

    console.log('profile is this', profile);

    console.log('request is this', req);

    const user = await this.authService.validateOAuthLogin(profile);

    const token = this.jwtService.sign({ email: user.email });
    return res.redirect(
      `${process.env.CLIENT_URL}/auth/success?token=${token}`,
    );
  }
}
