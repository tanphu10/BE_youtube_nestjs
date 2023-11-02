import { Injectable } from '@nestjs/common';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Injectable()
export class VideosService {
  constructor() {}

  // Cấu hình multer
  uploadVideo = {
    storage: diskStorage({
      destination: './uploads', // Thư mục lưu trữ tệp tải lên
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(
          null,
          file.fieldname + '-' + uniqueSuffix + extname(file.originalname),
        );
      },
    }),
  };
}
