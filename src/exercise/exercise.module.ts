import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TokenModule } from 'src/token/token.module';
import { UserModule } from 'src/user/user.module';
import { ExerciseController } from './exercise.controller';
import { ExerciseService } from './exercise.service';
import { BoardRepository } from './repositories/board.repository';
import { CommentRepository } from './repositories/comment.repository';
import { ExeriseRepository } from './repositories/exercise.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ExeriseRepository,
      BoardRepository,
      CommentRepository,
    ]),
    UserModule,
    TokenModule,
  ],
  controllers: [ExerciseController],
  providers: [ExerciseService],
})
export class ExerciseModule {}
