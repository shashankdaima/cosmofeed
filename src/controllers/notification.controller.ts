import { RequestHandler } from "express";
import { AllChannel, EmailChannel, MQTTChannel, PushChannel, SMSChannel, SlackChannel } from "../models/channel.model";
import { Notification } from "../models/notification.model";
import { SmsNotificationDispatcherImplementation } from "../services/notification_service/notification_dispatcher.service";
import { Result, Success } from "../utils/result.util";
import { SlackNotificationDispatcherImplementation } from "../services/notification_service/slack_notification_dispatcher_impl.service";
import { EmailNotificationDispatcherImplementation } from "../services/notification_service/email_notification_dispatcher_impl.service";
import { MqttNotificationDispatcherImplementation } from "../services/notification_service/mqtt_notification_dispatcher_impl.service";
import { PushNotificationDispatcherImplementation } from "../services/notification_service/push_notification_dispatcher_impl.service";
import { NotificationDispatcherImplementation } from "../services/notification_service/all_notification_dispatcher_impl.service";
import { MonitoringService } from "../services/monitoring_service/monitoring.service";
import { MonitoringImplService } from "../services/monitoring_service/monitoring_impl.service";
import { NotificationStatus } from "../models/notification_status.model";
export const dispatchNotification: RequestHandler = async (req, res, next) => {
    try {
        let notificationChannel;
        const notificationChannelData = req.body;
        let notification = new Notification(notificationChannelData.message);
        const monitoringService: MonitoringService = new MonitoringImplService();
        const monitoringResult = await monitoringService.addNotification(notification);
        let notificationChannelType;
        if (monitoringResult instanceof Success && monitoringResult.data) {
            notification = monitoringResult.data;
            let result: Result<Boolean> | undefined = undefined;
            notificationChannelType = notificationChannelData.type;
            switch (notificationChannelData.type) {
                case 'email':
                    const emailNotificationDispatcher = new EmailNotificationDispatcherImplementation();
                    notificationChannel = new EmailChannel(notificationChannelData.recipients, notificationChannelData.subject, notificationChannelData.body);
                    result = await emailNotificationDispatcher.dispatch(notificationChannel, notification, monitoringService);
                    break;
                case 'push':
                    const pushNotificationDispatcher = new PushNotificationDispatcherImplementation();
                    notificationChannel = new PushChannel(notificationChannelData.recipients, notificationChannelData.title, notificationChannelData.body);
                    result = await pushNotificationDispatcher.dispatch(notificationChannel, notification,monitoringService);
                    break;
                case 'SMS':
                    const notificationDispatcher = new SmsNotificationDispatcherImplementation();
                    notificationChannel = new SMSChannel(notificationChannelData.recipients, notificationChannelData.message);
                    result = await notificationDispatcher.dispatch(notificationChannel, notification,monitoringService);
                    break;
                case 'MQTT':
                    const mqttNotificationDispatcher = new MqttNotificationDispatcherImplementation();
                    notificationChannel = new MQTTChannel(notificationChannelData.topic, notificationChannelData.message);
                    result = await mqttNotificationDispatcher.dispatch(notificationChannel, notification,monitoringService);
                    break;
                case 'slack':
                    const slackNotificationDispatcher = new SlackNotificationDispatcherImplementation();
                    notificationChannel = new SlackChannel(notificationChannelData.channel, notificationChannelData.message);
                    result = await slackNotificationDispatcher.dispatch(notificationChannel, notification,monitoringService);
                    break;
                case '*':
                    const allNotificationDispatcher = new NotificationDispatcherImplementation();
                    notificationChannel = new AllChannel(
                        notificationChannelData.emailChannel,
                        notificationChannelData.pushChannel,
                        notificationChannelData.smsChannel,
                        notificationChannelData.mqttChannel,
                        notificationChannelData.slackChannel
                    );
                    result = await allNotificationDispatcher.dispatch(notificationChannel, notification, monitoringService);
                    break;
                default:
                    throw new Error('Invalid notification channel type');
            }

            if (result != undefined && result instanceof Success && result.data) {
                res.status(200).json({ message: 'Notification dispatched successfully' });
            } else {
                res.status(500).json({ message: 'Failed to dispatch notification' });
            }
        } else {
            res.status(500).json({ message: 'Failed to add notification' });
        }
    }
    catch (error) {
        next(error);
    }
}