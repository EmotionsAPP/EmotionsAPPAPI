import { Injectable } from '@nestjs/common';
import { Server } from 'socket.io';
import { Rooms } from './interfaces/rooms.interface';

@Injectable()
export class CallingsService {

  private rooms: Rooms = {};

  joinRoom( clientID: string, roomID: string ): string | undefined {
    if ( this.rooms[roomID] && this.rooms[roomID].length < 2 )
      this.rooms[roomID].push( clientID );
    else
      this.rooms[roomID] = [clientID];

    return this.rooms[roomID].find(id => id !== clientID);
  }

  disconnect( clientID: string, server: Server ) {
    const keys = Object.keys(this.rooms);

    keys.forEach(key => {
      const index = this.rooms[key].indexOf( clientID );

      if(index > -1){
        const otherUser = this.rooms[key].find(id => id !== clientID);
        if (otherUser) server.to(otherUser).emit('other user left');
        this.rooms[key] = [];
      }
    });
  }
}
