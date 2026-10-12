export const SIM_CONFIG = {
  BACKEND_URL: process.env.BACKEND_URL || 'http://localhost:3000',
  SENSORS: [
    {
      id: 'sensor_temp_01',
      name: 'Temperature Sensor',
      unit: '°C',
      min: 20,
      max: 80,
      baseValue: 45,
      volatility: 0.5,
      frequency: 2000, // ms
    },
    {
      id: 'sensor_press_01',
      name: 'Pressure Sensor',
      unit: 'Bar',
      min: 1,
      max: 10,
      baseValue: 5,
      volatility: 0.1,
      frequency: 3000, // ms
    },
    {
      id: 'sensor_vib_01',
      name: 'Vibration Sensor',
      unit: 'Hz',
      min: 0,
      max: 500,
      baseValue: 120,
      volatility: 2.0,
      frequency: 1000, // ms
    }
  ]
};
