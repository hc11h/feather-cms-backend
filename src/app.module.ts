import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // no need to import in every module
      envFilePath: '.env', // default anyway
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
