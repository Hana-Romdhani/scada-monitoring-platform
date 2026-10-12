import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Alarm, AlarmDocument } from './schemas/alarm.schema';
import { Sensor } from '../../sensors/schemas/sensor.schema';
import { RealtimeGateway } from '../../realtime/gateways/realtime.gateway';

@Injectable()
export class AlarmsService {
  constructor(
    @InjectModel(Alarm.name) private alarmModel: Model<AlarmDocument>,
    private readonly sensorModel: Model<any>, // Injected in module
    private readonly realtimeGateway: RealtimeGateway,
  ) {}

  async checkThresholds(sensorId: string, value: number): Promise<void> {
    // 1. Find the sensor to get its thresholds
    const sensor = await this.sensorModel.findById(sensorId).exec();
    if (!sensor || !sensor.thresholds) return;

    const { warn, crit } = sensor.thresholds;
    let severity: 'WARNING' | 'CRITICAL' | null = null;

    if (value >= crit) {
      severity = 'CRITICAL';
    } else if (value >= warn) {
      severity = 'WARNING';
    }

    // 2. Check if there is already an active alarm for this sensor
    const activeAlarm = await this.alarmModel.findOne({
      sensorId,
      status: { $in: ['ACTIVE', 'ACKNOWLEDGED'] }
    }).exec();

    if (severity) {
      if (!activeAlarm) {
        // Create new alarm
        const alarm = new this.alarmModel({
          sensorId,
          severity,
          value,
          status: 'ACTIVE',
          startTime: new Date(),
        });
        await alarm.save();
        this.realtimeGateway.emitAlarmUpdate(alarm);
      } else if (activeAlarm.severity !== severity) {
        // Upgrade/Downgrade severity of existing alarm
        activeAlarm.severity = severity;
        activeAlarm.value = value;
        await activeAlarm.save();
        this.realtimeGateway.emitAlarmUpdate(activeAlarm);
      }
    } else if (activeAlarm) {
      // Resolve the alarm if value returned to normal
      activeAlarm.status = 'RESOLVED';
      activeAlarm.endTime = new Date();
      await activeAlarm.save();
      this.realtimeGateway.emitAlarmUpdate(activeAlarm);
    }
  }

  async acknowledgeAlarm(alarmId: string, userId: string): Promise<Alarm> {
    return this.alarmModel.findByIdAndUpdate(
      alarmId,
      { status: 'ACKNOWLEDGED', ackUserId: userId },
      { new: true }
    ).exec();
  }

  async findActiveAlarms(): Promise<Alarm[]> {
    return this.alarmModel.find({ status: { $ne: 'RESOLVED' } }).exec();
  }
}
