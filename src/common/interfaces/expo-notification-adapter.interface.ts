
export interface NotificationAdapter<T> {
  sendPushNotification(targetPushToken: T, message: string): Promise<void>;
}
