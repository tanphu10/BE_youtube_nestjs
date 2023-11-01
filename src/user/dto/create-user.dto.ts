import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  user_id: number;
  @ApiProperty()
  full_name: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  avatar: string;
  @ApiProperty()
  pass_word: string;
  @ApiProperty()
  face_app_id: string;
  @ApiProperty()
  role: string;
}
