import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TokenModule } from 'src/token/token.module';
import { DiaryController } from './diary.controller';
import { DiaryService } from './diary.service';
import { DiaryRepository } from './repositories/diary.repository';

@Module({
  imports: [TypeOrmModule.forFeature([DiaryRepository]), TokenModule],
  controllers: [DiaryController],
  providers: [DiaryService],
})
export class DiaryModule {}
