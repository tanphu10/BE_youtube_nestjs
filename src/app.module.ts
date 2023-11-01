import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VideoModule } from './video/video.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { JwtStrategy } from './strategy/jwt.stategy';
import { CommentModule } from './comment/comment.module';

@Module({
  imports: [
    VideoModule,
    UserModule,
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    CommentModule,
  ],
  controllers: [AppController],
  providers: [AppService, JwtStrategy],
})
export class AppModule {}
