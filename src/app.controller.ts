import {
  Controller,
  Get,
  Param,
  Req,
  Query,
  Body,
  Post,
  Headers,
} from '@nestjs/common';
import { AppService } from './app.service';
import { ApiParam, ApiTags, ApiProperty } from '@nestjs/swagger';

class bodyType {
  @ApiProperty()
  userId: Number;
  @ApiProperty()
  hoTen: String;
  @ApiProperty()
  phone: String;
  @ApiProperty()
  address: String;
}

@ApiTags('app')
@Controller('/app')
export class AppController {
  constructor(private readonly appService: AppService) {}
  // đây là xài cách chỉ khai báo @Req()
  // @ApiParam({ name: 'id' })
  // @ApiParam({ name: 'id2' })
  @Post('/get-hello/:id/:id2')
  getHello(
    @Req() req: Request,
    @Headers('token') token: string,
    @Param('id') paramId: string,
    @Query('email') queryEmail: string,
    @Body() body: bodyType,
  ): string {
    let { hoTen, phone, address, userId } = body;
    return this.appService.getHello();
  }
}
