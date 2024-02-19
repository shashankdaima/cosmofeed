import { AllChannel, BaseChannel } from "../../models/channel.model";
import { Notification } from "../../models/notification.model";
import { NotificationDispatcherService, SmsNotificationDispatcherImplementation } from "./notification_dispatcher.service";
import { Result, MyError, Success } from "../../utils/result.util";
import { EmailNotificationDispatcherImplementation } from "./email_notification_dispatcher_impl.service";
import { MqttNotificationDispatcherImplementation } from "./mqtt_notification_dispatcher_impl.service";
import { PushNotificationDispatcherImplementation } from "./push_notification_dispatcher_impl.service";
import { SlackNotificationDispatcherImplementation } from "./slack_notification_dispatcher_impl.service";
import { MonitoringService } from "../monitoring_service/monitoring.service";
export class NotificationDispatcherImplementation implements NotificationDispatcherService{
    async dispatch(notificationChannel: AllChannel, notification: Notification, monitoringService:MonitoringService): Promise <Result<Boolean> >{
        const emailNotificationDispatcher=new EmailNotificationDispatcherImplementation();
        const pushNotificationDispatcher = new PushNotificationDispatcherImplementation();
        const smsNotificationDispatcher = new SmsNotificationDispatcherImplementation();
        const mqttNotificationDispatcher = new MqttNotificationDispatcherImplementation();
        const slackNotificationDispatcher = new SlackNotificationDispatcherImplementation();

        const emailPromise = emailNotificationDispatcher.dispatch(notificationChannel.emailChannel, notification, monitoringService);
        const pushPromise = pushNotificationDispatcher.dispatch(notificationChannel.pushChannel, notification, monitoringService);
        const smsPromise = smsNotificationDispatcher.dispatch(notificationChannel.smsChannel, notification, monitoringService);
        // const mqttPromise = mqttNotificationDispatcher.dispatch(notificationChannel.mqttChannel, notification);
        const slackPromise = slackNotificationDispatcher.dispatch(notificationChannel.slackChannel, notification, monitoringService);

        const [emailResult, pushResult, smsResult,  slackResult] = await Promise.all([emailPromise, pushPromise, smsPromise,slackPromise]);

        if (emailResult instanceof Success && pushResult instanceof Success && smsResult instanceof Success && slackResult instanceof Success) {
            return new Success(true);
        } else {
            return new MyError('Failed to dispatch notification');
        }
    }

}