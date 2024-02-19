import { BaseChannel, PushChannel } from "../../models/channel.model";
import { Notification } from "../../models/notification.model";
import { MyError, Result, Success } from "../../utils/result.util";
import { initializeApp, credential } from "firebase-admin";
import { getMessaging } from "firebase-admin/messaging";
import { NotificationDispatcherService } from "./notification_dispatcher.service";
import { MonitoringService } from "../monitoring_service/monitoring.service";
import { NotificationStatus } from "../../models/notification_status.model";
export class PushNotificationDispatcherImplementation implements NotificationDispatcherService {
    async dispatch(notificationChannel: PushChannel, notification: Notification, monitoringService: MonitoringService): Promise<Result<Boolean>> {
        const { recipients, title, body } = notificationChannel;
        monitoringService.upsertNotificationChannel(new NotificationStatus(notification.id, "pending", undefined, "Push"));

        const messageList = recipients.map(recipient => ({
            notification: {
                title: title,
                body: body
            },

            token: recipient,
        }));

        return getMessaging()
            .sendEach(messageList)
            .then((response) => {
                monitoringService.upsertNotificationChannel(new NotificationStatus(notification.id, "delivered", undefined, "Push"));
                return new Success(true);
            })
            .catch((error) => {
                monitoringService.upsertNotificationChannel(new NotificationStatus(notification.id, "failed", error, "Push"));
                return new MyError(error);;
            });
    }
}