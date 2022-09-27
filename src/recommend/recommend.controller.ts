import { Controller, Get, UseGuards } from '@nestjs/common';
import { Token } from 'src/common/decorators/token.decorator';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { User } from 'src/user/entities/user.entity';
import { RecommendService } from './recommend.service';

@Controller('api/recommend')
export class RecommendController {
  constructor(private readonly recommendService: RecommendService) {}

  @UseGuards(AuthGuard)
  @Get('')
  async recommendExAndFr(@Token() user: User): Promise<any> {
    const list = await this.recommendService.recommendExAndFr(user);
  }
}
