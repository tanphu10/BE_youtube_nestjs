import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Headers,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { users } from '@prisma/client';
import { UploadDto } from './dto/upload.dto';

@ApiTags('User')
@Controller('api')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // khúc này định nghĩa form lấy từ bên ngoài swagger

  @Get('/user')
  findAll() {
    return this.userService.findAll();
  }
  @Get('/user/:id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }
  @Post('/user')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
  @Put('/user/:id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }
  @Delete('/user/:id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

  @Get('/search/:userName')
  search(@Param('userName') userName: string) {
    return this.userService.search(userName);
  }

  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: UploadDto,
  })
  // -------
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: process.cwd() + '/public/img',
        filename: (req, file, callback) =>
          callback(null, new Date().getTime() + '_' + file.originalname),
      }),
    }),
  )
  @Post('/upload-avatar')
  uploadAvatar(
    @UploadedFile() file: Express.Multer.File,
    @Headers('token') token: string,
  ) {
    return this.userService.uploadAvatar(token, file);
  }
}
