import { ApiProperty } from '@nestjs/swagger';

export class CreateVideoDto {
  @ApiProperty()
  video_id: number;
  @ApiProperty()
  video_name: string;
  // @ApiProperty()
  // thumbnail: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  views: number;
  // @ApiProperty()
  // source: string;
  @ApiProperty()
  user_id: number;
  @ApiProperty()
  type_id: number;
}
