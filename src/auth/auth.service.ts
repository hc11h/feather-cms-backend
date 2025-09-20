// src/auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { GoogleProfile } from './types';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async validateOAuthLogin(profile: GoogleProfile) {
    console.log(profile);
    const email = profile.email;
    if (!email) {
      throw new Error('No email found in Google profile');
    }

    let user = await this.prisma.user.findUnique({ where: { email } });
    const now = new Date();

    if (!user) {
      user = await this.prisma.user.create({
        data: {
          email,
          name: profile.firstName || '',
          image: profile.picture,
          provider: 'google',
          providerId: profile.accessToken,
          lastLogin: now,
          loginHistory: {
            create: [
              {
                loginAt: now,
                provider: 'google',
              },
            ],
          },
        },
      });
    } else {
      user = await this.prisma.user.update({
        where: { email },
        data: {
          lastLogin: now,
          loginHistory: {
            create: {
              loginAt: now,
              provider: 'google',
            },
          },
        },
      });
    }

    return user;
  }
}
