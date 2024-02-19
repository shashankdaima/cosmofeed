import { BaseChannel, SMSChannel } from "../../models/channel.model";
import { Notification } from "../../models/notification.model";
import { NotificationDispatcherService } from "./notification_dispatcher.service";
import { config } from "../../config";
import twilio from 'twilio';
import { MyError, Result, Success } from "../../utils/result.util";
import { MonitoringService } from "../monitoring_service/monitoring.service";
import { NotificationStatus } from "../../models/notification_status.model";

export class SmsNotificationDispatcherImplementation implements NotificationDispatcherService {
    async dispatch(notificationChannel: SMSChannel, notification: Notification, monitoringService: MonitoringService): Promise<Result<Boolean>> {
        monitoringService.upsertNotificationChannel(new NotificationStatus(notification.id, "pending", undefined, "SMS"));

        const accountSid = config.twilio_sid_number;
        const authToken = config.twilio_auth_token;
        const client = twilio(accountSid, authToken);

        let results: boolean[] = [];
        for (let recipient of notificationChannel.recipients) {
            try {
                await client.messages.create({
                    body: notificationChannel.message,
                    from: config.twilio_phone_number,
                    to: recipient
                });

                results.push(true);
            } catch (error) {
                console.log(error);
                monitoringService.upsertNotificationChannel(new NotificationStatus(notification.id, "failed", undefined, "SMS"));
                results.push(false);
            }
        }

        if (results.every(result => result)) {
            monitoringService.upsertNotificationChannel(new NotificationStatus(notification.id, "delivered", undefined, "SMS"));
            return new Success(true);
        }
        return new Success(false);

    }
}
