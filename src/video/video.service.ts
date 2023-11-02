import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient, video } from '@prisma/client';
import { CreateVideoDto } from './dto/create-video.dto';

@Injectable()
export class VideoService {
  constructor(private configService: ConfigService) {}

  prisma = new PrismaClient();
  async getVideo(): Promise<video[]> {
    let data: video[] = await this.prisma.video.findMany();
    return data;
  }
  async getVideoTypeId(typeId: number) {
    let data = await this.prisma.video.findMany({
      where: {
        type_id: typeId,
      },
    });
    return data;
  }
  async getVideoById(id: number) {
    let data = await this.prisma.video.findMany({
      where: {
        video_id: id,
      },
    });
    return data;
  }
  async create(body: CreateVideoDto, video: any, image: any, token: string) {
    console.log(video);
    console.log(image);
    console.log(body);
    console.log(token);

    // let newData = await this.prisma.video.create({
    //   data: body,
    // });
    // return { status: 'thêm thành công video', Response: newData };
    return { video, image };
  }
}
