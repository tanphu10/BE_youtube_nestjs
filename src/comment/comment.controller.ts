import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Put,
  Headers,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { ApiBearerAuth, ApiProperty, ApiTags } from '@nestjs/swagger';
import { video_comment } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@ApiTags('Comment')
@Controller('api')
export class CommentController {
  constructor(
    private readonly commentService: CommentService,
    private configService: ConfigService,
  ) {}
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get('/comment')
  getComment(): Promise<video_comment[]> {
    return this.commentService.getComment();
  }
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get('/comment/:id')
  getCommentById(@Param('id') id: string): Promise<video_comment[]> {
    let commnent_id = Number(id);
    return this.commentService.getCommentById(+commnent_id);
  }
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post('/comment')
  create(@Body() data: CreateCommentDto) {
    // console.log(data);
    return this.commentService.create(data);
  }
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Delete('/comment/:id')
  remove(@Param('id') id: string) {
    return this.commentService.remove(+id);
  }
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Put('/comment/:id')
  update(@Param('id') id: string, @Body() updateCommentDto: CreateCommentDto) {
    console.log(id);
    return this.commentService.update(+id, updateCommentDto);
  }
}
