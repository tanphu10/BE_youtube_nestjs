import { ApiProperty } from '@nestjs/swagger';

export class CreateLikeDto {
  @ApiProperty()
  like_id: number;
  @ApiProperty()
  user_id: number;
  @ApiProperty()
  video_id: number;
  @ApiProperty()
  date_create: string;
  @ApiProperty()
  dis_like: boolean;
}
