import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { validationNullORUndefined } from 'src/share/utils/validation.util';
import * as bcrypt from 'bcrypt';
import { TokenService } from 'src/token/token.service';
import { loginDto } from './dto/login.dto';
import { UserDto } from './dto/user.dto';
import { User } from './entities/user.entitiy';
import { UserRepository } from './repositories/user.repository';
import { InfLoginResponse } from './responses/login.response';
import { UserController } from './user.controller';

@Injectable()
export class UserService {
  constructor(
    private readonly tokenService: TokenService,
    private readonly userPepository: UserRepository,
  ) {}

  public async register(dto: UserDto): Promise<void> {
    const user: undefined | User = await this.userPepository.findOne(dto.id);

    if (!validationNullORUndefined(user)) {
      throw new ForbiddenException('충복된 계정입니다');
    }

    const passwordHash = await bcrypt.hash(dto.password, 5);
    dto.password = passwordHash;

    await this.userPepository.save(dto);
  }

  public async login(dto: loginDto): Promise<InfLoginResponse> {
    const user: undefined | User = await this.userPepository.findOne({
      where: { id: dto.id },
    });

    if (validationNullORUndefined(user)) {
      throw new UnauthorizedException('id 또는 password가 일치 하지 않습니다.');
    }

    if (!(await bcrypt.compare(dto.password, user.password))) {
      throw new UnauthorizedException('id 또는 password가 일치 하지 않습니다.');
    }

    const token: string = this.tokenService.makeAccessToken(user.id);

    return {
      user,
      token,
    };
  }

  public async getUserByUserID(userEmail: string): Promise<User> {
    const user: undefined | User = await this.userPepository.findOne({
      where: { email: userEmail },
    });

    if (validationNullORUndefined(user)) {
      throw new NotFoundException('유저가 없습니다.');
    }

    return user;
  }
}
