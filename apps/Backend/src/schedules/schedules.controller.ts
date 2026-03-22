import { Controller, Post, Body, Get } from '@nestjs/common';
import { SchedulesService } from './schedules.service';
import { CreateScheduleDto } from './create-schedule.dto';

@Controller('schedules')
export class SchedulesController {
  constructor(private service: SchedulesService) {}

@Post()
async createSchedule(@Body() body: CreateScheduleDto) {
  const data = await this.service.create(body);

  return {
    message: 'Schedule saved successfully',
    data,
  };
}


  @Get()
  getAllSchedules() {
    return this.service.findAll();
  }
}

