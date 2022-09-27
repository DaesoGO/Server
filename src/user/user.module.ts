import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecommendRepository } from 'src/recommend/repositories/recommend.repository';
import { TokenModule } from 'src/token/token.module';
import { UserRepository } from './repositories/user.repository';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository, RecommendRepository]),
    MulterModule.registerAsync({ useFactory: () => ({ dest: './upload' }) }),
    TokenModule,
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
