import { BaseChannel } from "../models/channel.model"
import { Notification } from "../models/notification.model";
import { Result } from "../utils/result.util";
import { SmsNotificationDispatcherImplementation } from "./sms_notification_dispatcher_impl.service";
export interface NotificationDispatcherService{
    dispatch(notificationChannel:BaseChannel, notification:Notification):Promise<Result<Boolean>>;
}
export {SmsNotificationDispatcherImplementation}