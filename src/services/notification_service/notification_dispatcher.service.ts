import { BaseChannel } from "../../models/channel.model"
import { Notification } from "../../models/notification.model";
import { Result } from "../../utils/result.util";
import { NotificationStatus } from "../../models/notification_status.model";
import { SmsNotificationDispatcherImplementation } from "./sms_notification_dispatcher_impl.service";
import { MonitoringService } from "../monitoring_service/monitoring.service";
export interface NotificationDispatcherService {
    dispatch(notificationChannel: BaseChannel, notification: Notification, monitoringService:MonitoringService): Promise<Result<Boolean>>;
}
export { SmsNotificationDispatcherImplementation }