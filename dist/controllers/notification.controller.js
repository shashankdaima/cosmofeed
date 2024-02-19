"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dispatchNotification = void 0;
const channel_model_1 = require("../models/channel.model");
const notification_model_1 = require("../models/notification.model");
const notification_dispatcher_service_1 = require("../services/notification_dispatcher.service");
const result_util_1 = require("../utils/result.util");
const slack_notification_dispatcher_impl_service_1 = require("../services/slack_notification_dispatcher_impl.service");
const email_notification_dispatcher_impl_service_1 = require("../services/email_notification_dispatcher_impl.service");
const mqtt_notification_dispatcher_impl_service_1 = require("../services/mqtt_notification_dispatcher_impl.service");
const push_notification_dispatcher_impl_service_1 = require("../services/push_notification_dispatcher_impl.service");
const all_notification_dispatcher_impl_service_1 = require("../services/all_notification_dispatcher_impl.service");
const dispatchNotification = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let notificationChannel;
        const notification = new notification_model_1.Notification('Shashank Daima');
        const notificationChannelData = req.body;
        let result = undefined;
        switch (notificationChannelData.type) {
            case 'email':
                const emailNotificationDispatcher = new email_notification_dispatcher_impl_service_1.EmailNotificationDispatcherImplementation();
                notificationChannel = new channel_model_1.EmailChannel(notificationChannelData.recipients, notificationChannelData.subject, notificationChannelData.body);
                result = yield emailNotificationDispatcher.dispatch(notificationChannel, notification);
                break;
            case 'push':
                const pushNotificationDispatcher = new push_notification_dispatcher_impl_service_1.PushNotificationDispatcherImplementation();
                notificationChannel = new channel_model_1.PushChannel(notificationChannelData.recipients, notificationChannelData.title, notificationChannelData.body);
                result = yield pushNotificationDispatcher.dispatch(notificationChannel, notification);
                break;
            case 'SMS':
                const notificationDispatcher = new notification_dispatcher_service_1.SmsNotificationDispatcherImplementation();
                notificationChannel = new channel_model_1.SMSChannel(notificationChannelData.recipients, notificationChannelData.message);
                result = yield notificationDispatcher.dispatch(notificationChannel, notification);
                break;
            case 'MQTT':
                const mqttNotificationDispatcher = new mqtt_notification_dispatcher_impl_service_1.MqttNotificationDispatcherImplementation();
                notificationChannel = new channel_model_1.MQTTChannel(notificationChannelData.topic, notificationChannelData.message);
                result = yield mqttNotificationDispatcher.dispatch(notificationChannel, notification);
                break;
            case 'slack':
                const slackNotificationDispatcher = new slack_notification_dispatcher_impl_service_1.SlackNotificationDispatcherImplementation();
                notificationChannel = new channel_model_1.SlackChannel(notificationChannelData.channel, notificationChannelData.message);
                result = yield slackNotificationDispatcher.dispatch(notificationChannel, notification);
                break;
            case '*':
                const allNotificationDispatcher = new all_notification_dispatcher_impl_service_1.NotificationDispatcherImplementation();
                notificationChannel = new channel_model_1.AllChannel(notificationChannelData.emailChannel, notificationChannelData.pushChannel, notificationChannelData.smsChannel, notificationChannelData.mqttChannel, notificationChannelData.slackChannel);
                result = yield allNotificationDispatcher.dispatch(notificationChannel, notification);
                break;
            default:
                throw new Error('Invalid notification channel type');
        }
        if (result != undefined && result instanceof result_util_1.Success && result.data) {
            res.status(200).json({ message: 'Notification dispatched successfully' });
        }
        else {
            res.status(500).json({ message: 'Failed to dispatch notification' });
        }
    }
    catch (error) {
        next(error);
    }
});
exports.dispatchNotification = dispatchNotification;
