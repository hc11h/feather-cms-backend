import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { EditorModule } from './editor/editor.module';
import { BlogAuthorModule } from './author/author.module';

@Module({
  imports: [
    // Global config for .env variables
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    PrismaModule,
    AuthModule,
    EditorModule,
    BlogAuthorModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
