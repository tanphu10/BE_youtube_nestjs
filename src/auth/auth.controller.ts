import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { SignUpDto, UserLoginDto } from './dto/auth.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('/log-in')
  login(@Body() body: UserLoginDto) {
    return this.authService.login(body);
  }
  @Post('/sign-up')
  signUp(@Body() body: SignUpDto) {
    return this.authService.signUp(body);
  }
}
