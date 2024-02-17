import { config } from "../config";
import { BaseChannel, SlackChannel } from "../models/channel.model";
import { Notification } from "../models/notification.model";
import { MyError, Result, Success } from "../utils/result.util";
import { NotificationDispatcherService } from "./notification_dispatcher.service";
export class SlackNotificationDispatcherImplementation implements NotificationDispatcherService {
    async dispatch(notificationChannel: SlackChannel, notification: Notification): Promise<Result<Boolean>> {
        const url = 'https://slack.com/api/chat.postMessage';
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${config.slack_auth_token}`
        };
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
                return new Success(true);
            } else {
                console.log(responseJson.error);
                return new MyError(responseJson.error);
            }
        } catch (error) {
            console.log(error);
            return new MyError(error);
        }
    }
}