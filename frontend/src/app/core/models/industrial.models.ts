export interface Measurement {
  _id?: string;
  sensorId: string;
  value: number;
  timestampSource: Date;
  quality: string;
  origin: string;
}

export interface Sensor {
  _id: string;
  name: string;
  type: string;
  unit: string;
  minVal: number;
  maxVal: number;
  equipmentId: string;
  thresholds: {
    warn: number;
    crit: number;
  };
}

export interface Equipment {
  _id: string;
  name: string;
  type: string;
  status: 'RUNNING' | 'STOPPED' | 'FAULT';
  siteId: string;
}

export interface Site {
  _id: string;
  name: string;
  location: string;
  description: string;
}
