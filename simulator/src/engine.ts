import { SIM_CONFIG } from './config';
import axios from 'axios';

class ScadaSimulator {
  private sensorStates: Map<string, number> = new Map();

  constructor() {
    // Initialize sensors at their base values
    SIM_CONFIG.SENSORS.forEach(s => this.sensorStates.set(s.id, s.baseValue));
  }

  /**
   * Generates a new value using a random walk (Brownian Motion)
   * to simulate physical continuity.
   */
  private generateNextValue(sensor: any): number {
    const currentVal = this.sensorStates.get(sensor.id)!;
    const change = (Math.random() - 0.5) * 2 * sensor.volatility;
    let nextVal = currentVal + change;

    // Keep value within physical boundaries
    if (nextVal < sensor.min) nextVal = sensor.min + Math.random();
    if (nextVal > sensor.max) nextVal = sensor.max - Math.random();

    // Occasional anomaly: 1% chance to spike
    if (Math.random() < 0.01) {
      nextVal += (Math.random() > 0.5 ? 10 : -10) * sensor.volatility;
    }

    this.sensorStates.set(sensor.id, nextVal);
    return nextVal;
  }

  async pushMeasurement(sensor: any) {
    const value = this.generateNextValue(sensor);

    try {
      await axios.post(`${SIM_CONFIG.BACKEND_URL}/measurements`, {
        sensorId: sensor.id,
        value: value,
        timestampSource: new Date().toISOString(),
        quality: 'GOOD',
        origin: 'SIMULATION'
      });
      console.log(`[${new Date().toLocaleTimeString()}] Pushed ${sensor.name}: ${value.toFixed(2)} ${sensor.unit}`);
    } catch (error: any) {
      console.error(`Error pushing data for ${sensor.name}: ${error.message}`);
    }
  }

  start() {
    console.log('🚀 SCADA Simulator started...');
    SIM_CONFIG.SENSORS.forEach(sensor => {
      setInterval(() => this.pushMeasurement(sensor), sensor.frequency);
    });
  }
}

export const simulator = new ScadaSimulator();
