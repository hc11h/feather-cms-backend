import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { EditorModule } from './editor/editor.module';
import { BlogAuthorModule } from './author/author.module';
import { BlogsModule } from './blogs/blogs.module';
import { ApiKeyModule } from './api-key/api-key.module';
import { DevApiModule } from './dev-api/dev-api.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    PrismaModule,
    AuthModule,
    EditorModule,
    BlogAuthorModule,
    BlogsModule,
    ApiKeyModule,
    DevApiModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
