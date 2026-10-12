import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';
import { Measurement } from '../models/industrial.models';

@Injectable({
  providedIn: 'root'
})
export class RealtimeService {
  private socket: Socket;
  private measurementSubject = new Observable<Measurement>();

  constructor() {
    // Connect to the NestJS Socket.io Gateway
    this.socket = io('http://localhost:3000');
  }

  // Expose a stream of measurements for the components to subscribe to
  getMeasurementStream(): Observable<Measurement> {
    return new Observable(observer => {
      this.socket.on('measurement.updated', (data: Measurement) => {
        observer.next(data);
      });
      return () => this.socket.off('measurement.updated');
    });
  }

  sendEvent(event: string, data: any) {
    this.socket.emit(event, data);
  }
}
