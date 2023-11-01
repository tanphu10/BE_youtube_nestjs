import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient, video } from '@prisma/client';
// export type videoType = {
//   video_id: number;
//   video_name: string;
//   thumbnail: string;
//   description: string;
//   views: number;
//   source: string;
//   user_id: number;
//   type_id: number x; x
// };
@Injectable()
export class VideoService {
  constructor(private configService: ConfigService) {}
  prisma = new PrismaClient();
  async getVideo(): Promise<video[]> {
    let data: video[] = await this.prisma.video.findMany();
    return data;
  }
}
