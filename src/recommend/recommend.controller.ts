import { Controller, Get, UseGuards } from '@nestjs/common';
import { get } from 'http';
import { Token } from 'src/common/decorators/token.decorator';
import { AuthGuard } from 'src/common/guards/auth.guard';
import DataResponse from 'src/common/response/DataResponse';
import { Exercise } from 'src/exercise/entities/exercise.entity';
import { User } from 'src/user/entities/user.entity';
import { RecommendService } from './recommend.service';

@Controller('api/recommend')
export class RecommendController {
  constructor(private readonly recommendService: RecommendService) {}

  @UseGuards(AuthGuard)
  @Get('/fruit')
  async recommendFr(@Token() user: User): Promise<any> {
    const list = await this.recommendService.recommendFr(user);

    return DataResponse.dataSuccesss('음식 불러오기 성공', list);
  }

  @UseGuards(AuthGuard)
  @Get('/exercise')
  async recommendEx(): Promise<DataResponse<Exercise[]>> {
    const list = await this.recommendService.recommendEx();

    return DataResponse.dataSuccesss('운동 불러오기 성공', list);
  }
}
