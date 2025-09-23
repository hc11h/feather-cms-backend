import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { EditorModule } from './editor/editor.module';

@Module({
  imports: [
    // Global config for .env variables
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    PrismaModule,
    AuthModule,
    EditorModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
