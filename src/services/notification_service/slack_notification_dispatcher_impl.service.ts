import { config } from "../../config";
import { BaseChannel, SlackChannel } from "../../models/channel.model";
import { Notification } from "../../models/notification.model";
import { MyError, Result, Success } from "../../utils/result.util";
import { MonitoringService } from "../monitoring_service/monitoring.service";
import { NotificationDispatcherService } from "./notification_dispatcher.service";
import { NotificationStatus } from "../../models/notification_status.model";
export class SlackNotificationDispatcherImplementation implements NotificationDispatcherService {
    async dispatch(notificationChannel: SlackChannel, notification: Notification, monitoringService: MonitoringService): Promise<Result<Boolean>> {
        const url = 'https://slack.com/api/chat.postMessage';
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${config.slack_auth_token}`
        };
        monitoringService.upsertNotificationChannel(new NotificationStatus(notification.id, "pending", undefined, "Slack"));

        try {
            const request = {
                channel: notificationChannel.channel,
                text: notificationChannel.message
            };
            const response = await fetch(url, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(request)
            });
            const responseJson = await response.json();
            if (responseJson.ok) {
                monitoringService.upsertNotificationChannel(new NotificationStatus(notification.id, "delivered", undefined, "Slack"));

                return new Success(true);
            } else {
                monitoringService.upsertNotificationChannel(new NotificationStatus(notification.id, "failed", undefined, "Slack"));

                console.log(responseJson.error);
                return new MyError(responseJson.error);
            }
        } catch (error) {
            console.log(error);
            monitoringService.upsertNotificationChannel(new NotificationStatus(notification.id, "failed", undefined, "Slack"));

            return new MyError(error);
        }
    }
}