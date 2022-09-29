import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TokenModule } from 'src/token/token.module';
import { RecommendController } from './recommend.controller';
import { RecommendService } from './recommend.service';
import { UserModule } from 'src/user/user.module';
import { FruitRepository } from './repositories/fruit.repository';
import { RecommendRepository } from './repositories/recommend.repository';
import { UserRepository } from 'src/user/repositories/user.repository';
import { ExeriseRepository } from 'src/exercise/repositories/exercise.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      FruitRepository,
      RecommendRepository,
      UserRepository,
      ExeriseRepository,
    ]),
    UserModule,
    TokenModule,
  ],
  controllers: [RecommendController],
  providers: [RecommendService],
})
export class RecommendModule {}
