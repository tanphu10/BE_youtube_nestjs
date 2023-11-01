import { ApiProperty } from '@nestjs/swagger';

export class UserLoginDto {
  @ApiProperty({ required: true })
  email: string;
  @ApiProperty({ required: true })
  pass_word: string;
}
export class SignUpDto {
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
