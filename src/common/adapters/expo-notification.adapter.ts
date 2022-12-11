import { Injectable } from "@nestjs/common";
import Expo, { ExpoPushToken } from "expo-server-sdk";
import { NotificationAdapter } from "../interfaces";

@Injectable()
export class ExpoNotificationAdapter implements NotificationAdapter<ExpoPushToken> {

  private readonly expo = new Expo();

  async sendPushNotification(targetPushToken: ExpoPushToken, message: string): Promise<void> {
    try {
	    const chunks = this.expo.chunkPushNotifications([
	      { to: targetPushToken, sound: "default", body: message }
	    ]);
	
	    const chunksPromises = [];
	  
	    chunks.forEach(chunk => {
	      chunksPromises.push( this.expo.sendPushNotificationsAsync(chunk) );
	    });
	  
	    await Promise.all( chunksPromises );
    } catch (error) {
      throw new Error(error);
    }
  }
}
