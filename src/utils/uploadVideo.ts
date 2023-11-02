import { Injectable } from '@nestjs/common';
import { diskStorage } from 'multer';

@Injectable()
export class UploadVideo {
  constructor() {}
  // Cấu hình multer
  uploadVideo = {
    storage: diskStorage({
      destination: process.cwd() + '/public/video',
      filename: (req, file, callback) =>
        callback(null, new Date().getTime() + '_' + file.originalname),
    }),
  };
}
