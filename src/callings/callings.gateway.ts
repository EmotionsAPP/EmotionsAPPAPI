import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect, ConnectedSocket } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { CallingsService } from './callings.service';

@WebSocketGateway({ cors: true })
export class CallingsGateway implements OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer() wss: Server;

  constructor(private readonly callingsService: CallingsService) {}

  handleConnection(client: Socket, ...args: any[]) {
    console.log(`Client connected: ${client.id}`);
  }

  @SubscribeMessage("join room")
  joinRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody('roomID') roomID: string
  ) {
    const otherUser = this.callingsService.joinRoom( client.id, roomID );

    if (otherUser) {
      client.emit('other user', otherUser);
      client.to( otherUser ).emit('user joined', client.id);
    }
  }

  @SubscribeMessage("offer")
  offer(
    @ConnectedSocket() client: Socket,
    payload: any
  ) {
    this.wss.to( payload.target ).emit('offer', payload);
  }

  @SubscribeMessage("answer")
  answer(
    @ConnectedSocket() client: Socket,
    payload: any
  ) {
    this.wss.to( payload.target ).emit('answer', payload);
  }

  @SubscribeMessage("offer-other")
  offerOther(
    @ConnectedSocket() client: Socket,
    payload: any
  ) {
    this.wss.to(payload.target).emit('offer-other', payload);
  }

  @SubscribeMessage("answer-other")
  answerOther(
    @ConnectedSocket() client: Socket,
    payload: any
  ) {
    this.wss.to(payload.target).emit('answer-other', payload);
  }

  @SubscribeMessage("ice-candidate")
  iceCandidate(
    @ConnectedSocket() client: Socket,
    incoming: any
  ) {
    this.wss.to( incoming.target ).emit('ice-candidate', incoming.candidate);
  }

  @SubscribeMessage("ice-candidate-other")
  iceCandidateOther(
    @ConnectedSocket() client: Socket,
    incoming: any
  ) {
    this.wss.to(incoming.target).emit('ice-candidate-other', incoming.candidate);
  }

  @SubscribeMessage("request audio call")
  requestAudioCall(
    @ConnectedSocket() client: Socket,
    payload: any
  ) {
    this.wss.to( payload.target ).emit('request audio call', payload);
  }

  @SubscribeMessage("accept audio call")
  acceptAudioCall(
    @ConnectedSocket() client: Socket,
    payload: any
  ) {
    this.wss.to( payload.target ).emit('accept audio call', payload);
  }

  @SubscribeMessage("reject audio call")
  rejectAudioCall(
    @ConnectedSocket() client: Socket,
    payload: any
  ) {
    this.wss.to( payload.target ).emit('reject audio call', payload);
  }

  @SubscribeMessage("request video call")
  requestVideoCall(
    @ConnectedSocket() client: Socket,
    payload: any
  ) {
    this.wss.to(payload.target).emit('request video call', payload);
  }

  @SubscribeMessage("accept video call")
  acceptVideoCall(
    @ConnectedSocket() client: Socket,
    payload: any
  ) {
    this.wss.to(payload.target).emit('accept video call', payload);
  }

  @SubscribeMessage("reject video call")
  rejectVideoCall(
    @ConnectedSocket() client: Socket,
    payload: any
  ) {
    this.wss.to(payload.target).emit('reject video call', payload);
  }

  handleDisconnect(client: Socket) {
    this.callingsService.disconnect(client.id, this.wss);
  }
}
