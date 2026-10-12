import { Controller, Get, Post, Body, Query, Param } from '@nestjs/common';
import { MeasurementsService } from './services/measurements.service';

@Controller('measurements')
export class MeasurementsController {
  constructor(private readonly measurementsService: MeasurementsService) {}

  @Post()
  create(@Body() createMeasurementDto: any) {
    return this.measurementsService.create(createMeasurementDto);
  }

  @Get('latest/:sensorId')
  findLatest(@Param('sensorId') sensorId: string) {
    return this.measurementsService.findLatest(sensorId);
  }

  @Get('history/:sensorId')
  findHistory(
    @Param('sensorId') sensorId: string,
    @Query('start') start: string,
    @Query('end') end: string,
  ) {
    return this.measurementsService.findHistory(
      sensorId,
      new Date(start),
      new Date(end),
    );
  }
}
