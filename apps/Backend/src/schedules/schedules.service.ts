import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Schedule } from './schedule.entity';
import { CreateScheduleDto } from './create-schedule.dto';

@Injectable()
export class SchedulesService {
  constructor(
    @InjectRepository(Schedule)
    private repo: Repository<Schedule>,
  ) {}

  create(data: CreateScheduleDto) {
    const schedule = this.repo.create(data);
    return this.repo.save(schedule);
  }

  findAll() {
    return this.repo.find();
  }
}

