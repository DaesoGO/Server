import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { Token } from 'src/common/decorators/token.decorator';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { multerDiskOptions } from 'src/common/multer/multer.options';
import DataResponse from 'src/common/response/DataResponse';
import Response from 'src/common/response/response';
import { loginDto } from './dto/login.dto';
import { UserDto } from './dto/user.dto';
import { User } from './entities/user.entity';
import { InfLoginResponse } from './responses/login.response';
import { UserService } from './user.service';

@Controller('api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body() dto: UserDto): Promise<Response> {
    await this.userService.register(dto);

    return Response.success('회원가입 성공');
  }

  @Get('register/check/:id')
  async checkId(@Param() param): Promise<Response> {
    const check = await this.userService.checkId(param.id);

    if (check) {
      return Response.success('중복된 아이디 입니다.');
    } else {
      return Response.success('사용가능한 아이디 입니다.');
    }
  }

  @Post('login')
  async login(@Body() dto: loginDto): Promise<DataResponse<InfLoginResponse>> {
    const loginRes: InfLoginResponse = await this.userService.login(dto);

    console.log('test');
    return DataResponse.dataSuccesss('로그인 성공', loginRes);
  }

  @UseGuards(AuthGuard)
  @Get('/Decode')
  async decode(@Token() user: User): Promise<User> {
    return user;
  }

  @UseGuards(AuthGuard)
  @Get('test')
  async test(@Token() user: User): Promise<void> {
    console.log(user);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uplaodFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
  }
}
