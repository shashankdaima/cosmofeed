import { Result } from "../../utils/result.util";
import { Notification } from "../../models/notification.model";
import { NotificationStatus } from "../../models/notification_status.model";
export interface MonitoringService{
    addNotification(notification:Notification):Promise<Result<Notification>>;
    upsertNotificationChannel(notificationStatus:NotificationStatus):Promise<Result<Boolean>>;
}