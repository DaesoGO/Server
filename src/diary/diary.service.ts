import {
  Injectable,
  MethodNotAllowedException,
  UnauthorizedException,
} from '@nestjs/common';
import {
  validataionTwoValueNullORUndefined,
  validationNullORUndefined,
} from 'src/share/utils/validation.util';
import { TokenService } from 'src/token/token.service';
import { User } from 'src/user/entities/user.entitiy';
import { UserRepository } from 'src/user/repositories/user.repository';
import { diaryDto } from './dto/diary.dto';
import { Diary } from './entities/diary.entitiy';
import { DiaryRepository } from './repositories/diary.repository';

@Injectable()
export class DiaryService {
  constructor(
    private readonly tokenService: TokenService,
    private readonly diaryRepository: DiaryRepository,
    private readonly userRepository: UserRepository,
  ) {}

  public async diaryUpload(user: User, dto: diaryDto): Promise<void> {
    const userfind: undefined | User = await this.userRepository.findOne({
      id: user.id,
    });

    if (validationNullORUndefined(user)) {
      throw new UnauthorizedException('유저를 찾을 수 없음.');
    }

    const today = new Date();
    dto.createdAt = today;

    const data = this.diaryRepository.create(dto);
    data.user = user;

    await this.diaryRepository.save(data);
  }

  public async diaryList(user: User, param: string): Promise<Diary[]> {
    if (validataionTwoValueNullORUndefined(user.id, param)) {
      throw new MethodNotAllowedException('token값과 param값이 다릅니다');
    }

    return await this.diaryRepository.findListInfo(user.id);
  }

  public async diaryListOne(user: User, param): Promise<Diary> {
    if (validataionTwoValueNullORUndefined(user.id, param.userid)) {
      throw new MethodNotAllowedException('token값과 param값이 다릅니다');
    }

    return await this.diaryRepository.findListOneInfo(param.id);
  }
}
