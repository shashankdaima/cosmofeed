import { BaseChannel, PushChannel } from "../models/channel.model";
import { Notification } from "../models/notification.model";
import { MyError, Result, Success } from "../utils/result.util";
import { initializeApp, credential } from "firebase-admin";
import { getMessaging } from "firebase-admin/messaging";
import { NotificationDispatcherService } from "./notification_dispatcher.service";
export class PushNotificationDispatcherImplementation implements NotificationDispatcherService {
    async dispatch(notificationChannel: PushChannel, notification: Notification): Promise<Result<Boolean>> {
        const { recipients,title, body } = notificationChannel;

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
                // console.log("Successfully sent message:", response);
                return new Success(true);
            })
            .catch((error) => {
                // console.log("Error sending message:", error);
                return new MyError(error);;
            });
    }
}