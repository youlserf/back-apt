import { Injectable } from '@nestjs/common';
import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
@Injectable()
export class BadgeRequestGateway {
  @WebSocketServer() server: Server;

  @SubscribeMessage('new_badge_request')
  handleNewBadgeRequest(@MessageBody() data: any): void {
    console.log('Nueva solicitud de medalla recibida:', data);
    this.server.emit('new_badge_request_notification', data); 
  }

  @SubscribeMessage('badge_request_status_updated')
  handleBadgeRequestStatusUpdated(@MessageBody() data: any): void {
    console.log('Estado de la solicitud de medalla actualizado:', data);
    this.server.to(data.userId).emit('badge_request_status_notification', data);
  }
}
