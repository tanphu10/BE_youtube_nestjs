import { ApiProperty } from '@nestjs/swagger';

export class UploadDto {
  @ApiProperty({ type: String, format: 'binary' })
  video: any;
  @ApiProperty({ type: String, format: 'binary' })
  image: any;
  // @ApiProperty()
  // body: any;
  //   tên file trùng với tên bên dưới của bên user.controller.ts
  // @UseInterceptors(
  //     FileInterceptor('file', {
  //       storage: diskStorage({
  //         destination: process.cwd() + '/public/img',
  //         filename: (req, file, callback) =>
  //           callback(null, new Date().getTime() + '_' + file.originalname),
  //       }),
  //     }),
  //   )
}
