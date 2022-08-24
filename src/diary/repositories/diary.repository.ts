import { Injectable } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { Diary } from '../entities/diary.entitiy';

@EntityRepository(Diary)
export class DiaryRepository extends Repository<Diary> {}
