import {
  Controller,
  Get,
  HttpCode,
  HttpException,
  InternalServerErrorException,
  Req,
  UseGuards,
} from '@nestjs/common';
import { VideoService } from './video.service';
import { video } from '@prisma/client';
import { ConfigService } from '@nestjs/config';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
@ApiTags('video')
@Controller('video')
export class VideoController {
  constructor(
    private readonly videoService: VideoService,
    private configService: ConfigService,
  ) {}
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get('/get-video')
  @HttpCode(200)
  getVideo(@Req() req): Promise<video[]> {
    // check roles
    try {
      let data = req.user;
      let title = this.configService.get('TITLE');
      return this.videoService.getVideo();
    } catch (exception) {
      // throw new HttpException('Lỗi ...', 500);
      if (exception.statusCode != 500) {
        throw new HttpException(exception.masage, exception.statusCode);
      }
      throw new InternalServerErrorException('Lỗi ...');
    }
  }
}

//  trình tự tạo api video
/* 
b1 tạo : một api video
        + nest g resource video --no-spec 
  sẽ có được 3 file 
  1. video.controller.ts xử lí các phương thức
  2. video.model dùng để kết nối các model khác lại ở app.module
  3. video.service dùng để xử lí data cơ sở dử liệu
b2. xử lí ở file controller.ts
  1.import data của prisma
  2.gắn ApiTags("tên ")
  3.@Get("/get-all-comment")
  getComment(): Promise<video_comment[]>{
    // return this.commentService.getcomment() ---> dẫn qua file comment Service để xử lí lấy data về cho người dùng 
b3. xử lí ở file Service.ts
  1. tạo import {prismaClient, video_comment} from "@prisma/client"
  2. xử lí dữ liệu trong 
  export class CommentService{
    prisma= new PrismaClient()
    async getComment(): Promise<video_comment[]>{
      let data: video_comment[]= await this.prisma.video_comment.findMany()
      return data
    }
  }
b4. xử lí trả token lại cho người dùng khi đăng nhập
   1.auth.controllers
    @Post('/log-in')
      login(@Body() body) {
     return this.authService.login(body);
     } 
   2. auth.module 
      imports: [JwtModule.register({})],
   3. auth.servide
     login(body){
      let {email,pass_word}=body
      check email
      cheack pass_word
      let token =this.jwtServide.sign(
        {data:body : dữ liệu tại đây},
        {expiresIn:"hạn sử dụng", secret:"BIMAT"}
      );
      return token
     }
b5. xử lí token khi muốn lấy data 
  1- cài đặt thư viện : yarn add @nestjs/passport passport passport-local @nestjs/jwt passport-jwt  @types/passport-jwt
  2.phải đặt trên đầu mỗi thèn Api để lấy khóa khi cần token ở đây thì cần cài thư viện 
  @ApiBearer()
  @UseGuards(AuthGuard('jwt'))
  3. ở file app.module.ts thì chèn thêm jwt.strategy vào trong providers
  4. ở file main const config = new DocumentBuilder().setTitle('this is swagger').addBearerAuth().build();
b6. cách để trả lại các status code 
  @HttpCode(200)
  try {
      return this.videoService.getVideo();
    } catch (exception) {
      // throw new HttpException('Lỗi ...', 500);
      if (exception.statusCode != 500) {
        throw new HttpException(exception.masage, exception.statusCode);
      }
      throw new InternalServerErrorException('Lỗi ...');
    }


*/
