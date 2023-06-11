import { OnModuleInit } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ namespace: 'chat' })
// @WebSocketGateway()
export class SocketGateway implements OnModuleInit {
  @WebSocketServer() server: Server;

  onModuleInit() {
    this.server.on('connection', (socket) => {
      console.log(socket.id);
      console.log('User connection');
    });
  }

  @SubscribeMessage('message')
  handleEvent(@MessageBody() data: any) {
    console.log(data);
    this.server.emit('message', data);
  }
}
