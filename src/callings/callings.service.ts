import { Injectable } from '@nestjs/common';
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
}
