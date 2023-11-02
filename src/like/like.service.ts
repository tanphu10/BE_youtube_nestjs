import { Injectable } from '@nestjs/common';
import { CreateLikeDto } from './dto/create-like.dto';
import { UpdateLikeDto } from './dto/update-like.dto';
import { PrismaClient, video_like } from '@prisma/client';

@Injectable()
export class LikeService {
  prisma = new PrismaClient();
  async findAll(): Promise<video_like[]> {
    let data = await this.prisma.video_like.findMany();
    return data;
  }

  async findOne(id: number) {
    let data = await this.prisma.video_like.findMany({
      where: { like_id: id },
    });
    return data;
  }
  async create(createLikeDto): Promise<video_like[]> {
    let { like_id } = createLikeDto;

    let checkLike = await this.prisma.video_like.findMany({
      where: { like_id },
    });
    // if (dis_like == true) {
    //   let newLike = { ...checkLike, dis_like };
    // }
    if (checkLike.length > 0) {
      let dis_like = false;
      let newLike = { ...createLikeDto, dis_like };
      let newData: any = await this.prisma.video_like.update({
        data: newLike,
        where: { like_id },
      });
      return newData;
    } else {
      let newData: any = await this.prisma.video_like.create({
        data: createLikeDto,
      });
      // return { status: 'đăng nhập thành công', Response: newData };
      return newData;
    }
  }
}
