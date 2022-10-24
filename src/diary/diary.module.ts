import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExeriseRepository } from 'src/exercise/repositories/exercise.repository';
import { TokenModule } from 'src/token/token.module';
import { UserRepository } from 'src/user/repositories/user.repository';
import { UserModule } from 'src/user/user.module';
import { DiaryController } from './diary.controller';
import { DiaryService } from './diary.service';
import { DiaryRepository } from './repositories/diary.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      DiaryRepository,
      UserRepository,
      ExeriseRepository,
    ]),
    MulterModule.registerAsync({ useFactory: () => ({ dest: './upload' }) }),
    TokenModule,
    UserModule,
  ],
  controllers: [DiaryController],
  providers: [DiaryService],
  exports: [DiaryModule],
})
export class DiaryModule {}
