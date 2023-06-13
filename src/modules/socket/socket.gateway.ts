import { OnModuleInit, Req, Request, UseGuards } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { WsGuard } from 'src/common/guards/websocket.guard';
import { ConversationsService } from '../conversations/conversations.service';
import { JwtService } from '@nestjs/jwt';

@WebSocketGateway({ namespace: 'chat' })
// @WebSocketGateway()
export class SocketGateway implements OnModuleInit {
  constructor(
    private conversationsService: ConversationsService,
    private jwtService: JwtService,
  ) {}

  @WebSocketServer() server: Server;

  // @UseGuards(WsGuard)
  async handleConnection(client: Socket, @Request() req) {
    // console.log(req['user']);
  }

  onModuleInit() {
    this.server.on('connection', async (socket) => {
      let bearerToken = socket.handshake.headers.authorization;
      bearerToken = bearerToken.split(' ')[1];
      const payload = await this.jwtService.verifyAsync(bearerToken, {
        secret: 'SUPER_JWT_SECRET_KEY',
      });
      console.log('join ' + payload.sub);
      socket.join(payload.sub.toString());
    });
  }

  @UseGuards(WsGuard)
  @SubscribeMessage('send-conversation')
  async handleChatConversation(@MessageBody() data: any, @Request() req) {
    const receiverId = data.receiverId;
    const newConversation = await this.conversationsService.createConversation(
      {
        receiverId: receiverId,
        text: data.text,
      },
      req['user'].id,
    );
    this.server.to(receiverId).emit('receive-conversation', newConversation);
  }

  @UseGuards(WsGuard)
  @SubscribeMessage('typing')
  handleTyping(@MessageBody() data: any, @Request() req) {
    console.log('typing');
  }
}
