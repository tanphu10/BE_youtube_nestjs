import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { ConfigService } from '@nestjs/config';
import { Prisma, PrismaClient, video_comment } from '@prisma/client';
import { UpdateCommentDto } from './dto/update-comment.dto';
// import {}
@Injectable()
export class CommentService {
  constructor(private configService: ConfigService) {}
  prisma = new PrismaClient();
  async getComment(): Promise<video_comment[]> {
    let data: video_comment[] = await this.prisma.video_comment.findMany();
    return data;
  }
  async getCommentById(commnent_id): Promise<video_comment[]> {
    let data: any = await this.prisma.video_comment.findUnique({
      where: { comment_id: commnent_id },
    });
    return data;
  }
  async create(data): Promise<video_comment[]> {
    let newData: any = await this.prisma.video_comment.create({
      data,
    });
    return newData;
  }
  update(id: number, updateCommentDto: UpdateCommentDto) {
    console.log(updateCommentDto);
    console.log(id);
    return this.prisma.video_comment.update({
      data: updateCommentDto,
      where: { comment_id: id },
    });
  }
  async remove(id: number) {
    await this.prisma.video_comment.delete({
      where: { comment_id: id },
    });
    return `đã xóa thành công ${id}`;
  }
}
