import {
  Injectable,
  MethodNotAllowedException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CommentDto } from 'src/exercise/dto/comment.dto';
import { Exercise } from 'src/exercise/entities/exercise.entity';
import { ExeriseRepository } from 'src/exercise/repositories/exercise.repository';
import {
  validataionTwoValueNullORUndefined,
  validationNullORUndefined,
} from 'src/share/utils/validation.util';
import { TokenService } from 'src/token/token.service';
import { User } from 'src/user/entities/user.entity';
import { UserRepository } from 'src/user/repositories/user.repository';
import { diaryDto } from './dto/diary.dto';
import { Diary } from './entities/diary.entitiy';
import { DiaryRepository } from './repositories/diary.repository';

@Injectable()
export class DiaryService {
  constructor(
    private readonly tokenService: TokenService,
    private readonly diaryRepository: DiaryRepository,
    private readonly exerciseRepository: ExeriseRepository,
    private readonly userRepository: UserRepository,
  ) {}

  public async diaryUpload(user: User, dto: diaryDto, param): Promise<void> {
    const date = new Date();
    const userfind: undefined | User = await this.userRepository.findOne({
      id: user.id,
    });

    if (validationNullORUndefined(userfind)) {
      throw new UnauthorizedException('유저를 찾을 수 없음.');
    }

    dto.createdAt =
      '' +
      date.getFullYear() +
      String(date.getMonth()).padStart(2, '0') +
      String(date.getDay()).padStart(2, '0');

    const data = this.diaryRepository.create(dto);
    data.user = user;

    console.log(date.getMonth());
    //await this.diaryRepository.save(data);
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
    const listOne = await this.diaryRepository.findListOneInfo(param.time);

    if (validationNullORUndefined(diaryPuYn)) {
      throw new NotFoundException('존재하지 않는 유저입니다');
    }

    if (
      validataionTwoValueNullORUndefined(user.id, param.userid) &&
      !diaryPuYn.diary_pu_yn
    ) {
      throw new MethodNotAllowedException('당사자가 게시글을 비공개 했습니다.');
    }

    // if (listOne.user.id !== param.userid) {
    //   throw new NotFoundException('게시글이 다른 소유자입니다.');
    // }

    if (validationNullORUndefined(listOne)) {
      throw new NotFoundException('없는 게시글 입니다.');
    }

    return listOne;
  }

  public async exerciseFindAll(): Promise<Exercise[]> {
    return await this.exerciseRepository.find();
  }

  // public async diaryUpdate(user: User, dto: diaryDto, param): Promise<void> {
  //   const diary: Diary | undefined = await this.diaryRepository.findOne(
  //     param.id,
  //   );

  //   if (user.id !== param.userid) {
  //     throw new UnauthorizedException('다른 사람의 계정입니다.');
  //   }

  //   this.diaryRepository.merge(diary, dto);
  //   await this.diaryRepository.save(diary);
  // }

  public async diaryDelete(user: User, id: string): Promise<void> {
    const diary = await this.diaryRepository.find({
      where: { id },
      relations: ['user'],
    });

    if (user.id !== diary[0].user.id) {
      throw new UnauthorizedException('게시글이 다른 소유자입니다.');
    }

    await this.diaryRepository.remove(diary);
  }
}
