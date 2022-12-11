import { IsString } from "class-validator";

export class UserNotification {
  targetUserToken: any;

  @IsString()
  message: string;
}