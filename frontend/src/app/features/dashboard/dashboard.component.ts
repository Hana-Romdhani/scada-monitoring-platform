import { Component, OnInit, OnDestroy } from '@angular/core';
import { RealtimeService } from '../../core/services/realtime.service';
import { Measurement } from '../../core/models/industrial.models';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  template: `
    <div class="dashboard-container">
      <h1>Industrial Dashboard - Real-Time</h1>

      <div class="kpi-row">
        <div class="kpi-card">
          <span>Active Sensors</span>
          <strong class="value">{{ sensorCount }}</strong>
        </div>
        <div class="kpi-card warning">
          <span>System Status</span>
          <strong class="value">LIVE</strong>
        </div>
      </div>

      <div class="live-grid">
        <div *ngFor="let m of liveMeasurements | keyvalue" class="sensor-card">
          <h3>Sensor {{ m.key }}</h3>
          <div class="value-display">
            <span class="number">{{ m.value.value | number:'1.2-2' }}</span>
            <span class="unit">{{ m.value.unit || 'unit' }}</span>
          </div>
          <div class="timestamp">Last update: {{ m.value.timestampSource | date:'mediumTime' }}</div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-container { padding: 20px; font-family: 'Segoe UI', sans-serif; background: #f4f7f6; min-height: 100vh; }
    .kpi-row { display: flex; gap: 20px; margin-bottom: 30px; }
    .kpi-card { background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); flex: 1; text-align: center; }
    .kpi-card .value { display: block; font-size: 2rem; color: #2c3e50; }
    .kpi-card.warning { border-left: 5px solid #e74c3c; }
    .live-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 20px; }
    .sensor-card { background: white; padding: 20px; border-radius: 8px; border: 1px solid #ddd; transition: transform 0.2s; }
    .sensor-card:hover { transform: translateY(-5px); box-shadow: 0 5px 15px rgba(0,0,0,0.1); }
    .value-display { font-size: 2.5rem; font-weight: bold; color: #3498db; text-align: center; margin: 15px 0; }
    .unit { font-size: 1.2rem; color: #7f8c8d; margin-left: 5px; }
    .timestamp { font-size: 0.8rem; color: #95a5a6; text-align: center; }
  `]
})
export class DashboardComponent implements OnInit, OnDestroy {
  liveMeasurements: { [key: string]: Measurement } = {};
  sensorCount = 0;
  private sub: Subscription = new Subscription();

  constructor(private realtimeService: RealtimeService) {}

  ngOnInit() {
    this.sub = this.realtimeService.getMeasurementStream().subscribe(m => {
      this.liveMeasurements[m.sensorId] = m;
      this.sensorCount = Object.keys(this.liveMeasurements).length;
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
