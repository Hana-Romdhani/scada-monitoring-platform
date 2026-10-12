import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';

@WebSocketGateway({
  cors: {
    origin: '*', // In production, this will be restricted to the frontend domain
  },
})
export class RealtimeGateway {
  @WebSocketServer()
  server: Server;

  private readonly logger = new Logger(RealtimeGateway.name);

  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  // Method to be called by other services to push data to clients
  emitMeasurementUpdate(measurement: any) {
    this.server.emit('measurement.updated', measurement);
  }

  emitAlarmUpdate(alarm: any) {
    this.server.emit('alarm.created', alarm);
  }

  emitEquipmentStatus(equipment: any) {
    this.server.emit('equipment.status.changed', equipment);
  }
}
