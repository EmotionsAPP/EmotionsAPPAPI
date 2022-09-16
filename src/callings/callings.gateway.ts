import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { CallingsService } from './callings.service';

@WebSocketGateway({ cors: true })
export class CallingsGateway {

  @WebSocketServer() wss: Server;

  constructor(private readonly callingsService: CallingsService) {}

  @SubscribeMessage("join room")
  joinRoom( client: Socket, @MessageBody('roomID') roomID: string ) {
    const otherUser = this.callingsService.joinRoom( client.id, roomID );

    if (otherUser) {
      client.emit('other user', otherUser);
      client.to( otherUser ).emit('user joined', client.id);
    }
  }

  @SubscribeMessage("offer")
  offer( client: Socket, payload: any ) {
    this.wss.to( payload.target ).emit('offer', payload);
  }

  @SubscribeMessage("answer")
  answer( client: Socket, payload: any ) {
    this.wss.to( payload.target ).emit('answer', payload);
  }

  @SubscribeMessage("ice-candidate")
  iceCandidate( client: Socket, incoming: any ) {
    this.wss.to( incoming.target ).emit('ice-candidate', incoming.candidate);
  }

  @SubscribeMessage("request audio call")
  requestAudioCall( client: Socket, payload: any ) {
    this.wss.to( payload.target ).emit('request audio call', payload);
  }

  @SubscribeMessage("accept audio call")
  acceptAudioCall( client: Socket, payload: any ) {
    this.wss.to( payload.target ).emit('accept audio call', payload);
  }

  @SubscribeMessage("reject audio call")
  rejectAudioCall( client: Socket, payload: any ) {
    this.wss.to( payload.target ).emit('reject audio call', payload);
  }
}
