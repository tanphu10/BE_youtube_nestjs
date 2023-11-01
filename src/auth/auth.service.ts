import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaClient, users } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { SignUpDto, UserLoginDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}
  prisma = new PrismaClient();
  async login(body: UserLoginDto) {
    let { pass_word, email } = body;
    let checkEmail = await this.prisma.users.findUnique({
      where: { email },
    });
    console.log(checkEmail);
    if (checkEmail) {
      // let checkPass = deCodePassword(pass_word, pass_word);
      let checkPass = bcrypt.compareSync(pass_word, checkEmail.pass_word);
      if (checkPass) {
        let token = this.jwtService.sign(
          { data: checkEmail },
          { expiresIn: '1y', secret: 'BIMAT' },
        );
        // console.log(token);
        return { status: 'đăng nhập thành công', Response: token };
      } else {
        return { status: 'mật khẩu không đúng' };
      }
    } else {
      return { status: 'email không đúng' };
    }
  }
  async signUp(body: SignUpDto) {
    let { full_name, email, pass_word } = body;
    let checkEmail = await this.prisma.users.findMany({
      where: { email },
    });
    if (checkEmail.length > 0) {
      return 'email tồn tại ';
    }
    let newPass = bcrypt.hashSync(pass_word, 10);
    let newData = {
      full_name,
      email,
      pass_word: newPass,
      avatar: '',
      face_app_id: '',
      role: 'user',
    };
    let newSignUp = await this.prisma.users.create({ data: newData });
    return { status: 'đăng kí thành công', Response: newSignUp };
  }
}
