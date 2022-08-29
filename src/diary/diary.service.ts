import {
  Injectable,
  MethodNotAllowedException,
  NotFoundException,
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
    if (!(await this.userRepository.userDiaryPuYn(param))) {
      throw new NotFoundException('존재하지 않는 유저입니다.');
    }

    const diaryPuYn = await this.userRepository.userDiaryPuYn(param);

    if (
      validataionTwoValueNullORUndefined(user.id, param) &&
      !diaryPuYn.diary_pu_yn
    ) {
      throw new MethodNotAllowedException('당사자가 게시글을 비공개 했습니다.');
    }

    return await this.diaryRepository.findListInfo(user.id);
  }

  public async diaryListOne(user: User, param): Promise<Diary> {
    const diaryPuYn = await this.userRepository.userDiaryPuYn(param.userid);
    const listOne = await this.diaryRepository.findListOneInfo(param.id);

    if (validationNullORUndefined(diaryPuYn)) {
      throw new NotFoundException('존재하지 않는 유저입니다');
    }

    if (
      validataionTwoValueNullORUndefined(user.id, param.userid) &&
      !diaryPuYn.diary_pu_yn
    ) {
      throw new MethodNotAllowedException('당사자가 게시글을 비공개 했습니다.');
    }

    if (listOne.user.id !== param.userid) {
      throw new NotFoundException('게시글이 다른 소유자입니다.');
    }

    if (validationNullORUndefined(listOne)) {
      throw new NotFoundException('없는 게시글 입니다.');
    }

    return listOne;
  }

  public async diaryUpdate(dto: diaryDto, param): Promise<void> {
    const diary: Diary | undefined = await this.diaryRepository.findOne();
  }
}
