import { BaseChannel, SMSChannel } from "../../models/channel.model";
import { Notification } from "../../models/notification.model";
import { NotificationDispatcherService } from "./notification_dispatcher.service";
import { config } from "../../config";
import twilio from 'twilio';
import { MyError, Result, Success } from "../../utils/result.util";

export class SmsNotificationDispatcherImplementation implements NotificationDispatcherService {
    async dispatch(notificationChannel: SMSChannel, notification: Notification): Promise<Result<Boolean>> {
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
                results.push(false);
            }
        }

        return results.every(result => result) ? new Success(true) : new Success(false);
    }
}
