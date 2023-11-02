import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { ConfigService } from '@nestjs/config';
import { PrismaClient, users } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UserService {
  constructor(private jwtService: JwtService) {}
  prisma = new PrismaClient();
  async uploadAvatar(token: string, file: any) {
    // console.log(token);
    // console.log(file);
    let infoUser: any = this.jwtService.decode(token);
    // console.log(infoUser.data);
    let { user_id } = infoUser.data;
    // console.log(user_id);
    let updateUser = await this.prisma.users.findUnique({
      where: { user_id },
    });
    let newUpdateUser = { ...updateUser, avatar: file.filename };
    // console.log(newUpdateUser);
    let newData = await this.prisma.users.update({
      data: newUpdateUser,
      where: { user_id },
    });
    // console.log(newData);
    return { status: 'upload avatar thành công', response: newData };
  }

  async findAll() {
    let data = await this.prisma.users.findMany();
    return data;
  }

  async findOne(id: number) {
    // let user_id = Number(id);
    let data = await this.prisma.users.findUnique({ where: { user_id: id } });
    return data;
  }

  async create(createUserDto: CreateUserDto) {
    let { full_name, email, pass_word, avatar } = createUserDto;
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
      avatar,
      face_app_id: '',
      role: 'user',
    };
    let newUser = await this.prisma.users.create({
      data: newData,
    });
    return { status: 'tạo user thành công', Response: newUser };
  }
  //  liên quan đến nhiều thèn bên trong nên xóa được phải tìm hiểu chổ xóa relationship
  async remove(id: number) {
    let user_id = id;
    await this.prisma.users.delete({ where: { user_id } });
    return ` đã xóa thành công ${user_id}`;
  }
  async update(id: number, updateUserDto: UpdateUserDto) {
    let { full_name, email, pass_word, role } = updateUserDto;

    let newPass = bcrypt.hashSync(pass_word, 10);
    // let checkEmail = this.prisma.users.findMany({ where: { email } });
    // if (checkEmail) {
    //   return 'email này đã được tạo rồi';
    // } else {
    let user = await this.prisma.users.findUnique({ where: { user_id: id } });
    let user_id = id;
    if (!user) {
      return ' người dùng không tồn tại';
    } else {
      let newUser = { ...user, full_name, pass_word: newPass, role, email };
      console.log(newUser);
      let updateUser = await this.prisma.users.update({
        data: newUser,
        where: { user_id },
      });
      return { status: 'update thành công', Response: updateUser };
    }

    // }
  }
  async search(userName: string) {
    let data = await this.prisma.users.findMany({
      where: {
        full_name: { contains: userName },
        // email: { contains: userName },
      },
    });
    console.log(data);
    return data;
  }
}
