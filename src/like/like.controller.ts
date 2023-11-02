import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { LikeService } from './like.service';
import { CreateLikeDto } from './dto/create-like.dto';
import { UpdateLikeDto } from './dto/update-like.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Like')
@Controller('api')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @Get('/like')
  findAll() {
    return this.likeService.findAll();
  }

  @Get('/like/:id')
  findOne(@Param('id') id: string) {
    return this.likeService.findOne(+id);
  }
  @Post('like')
  create(@Body() createLikeDto: CreateLikeDto) {
    return this.likeService.create(createLikeDto);
  }
 
}
