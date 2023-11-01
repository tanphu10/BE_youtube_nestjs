import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty()
  comment_id: number;
  @ApiProperty()
  user_id: number;
  @ApiProperty()
  video_id: number;
  @ApiProperty()
  date_create: string;
  @ApiProperty()
  content: string;
  @ApiProperty()
  reply_list: string;
  @ApiProperty()
  timestamp: string;
}
