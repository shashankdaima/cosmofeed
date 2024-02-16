import { BaseChannel } from "../models/channel.model"
import { Notification } from "../models/notification.model";
export interface NotificationDispatcherService{
    dispatch(notificationChannel:BaseChannel, notification:Notification):Result<Boolean>;
}