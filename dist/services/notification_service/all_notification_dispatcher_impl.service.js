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
exports.NotificationDispatcherImplementation = void 0;
const notification_dispatcher_service_1 = require("./notification_dispatcher.service");
const result_util_1 = require("../../utils/result.util");
const email_notification_dispatcher_impl_service_1 = require("./email_notification_dispatcher_impl.service");
const mqtt_notification_dispatcher_impl_service_1 = require("./mqtt_notification_dispatcher_impl.service");
const push_notification_dispatcher_impl_service_1 = require("./push_notification_dispatcher_impl.service");
const slack_notification_dispatcher_impl_service_1 = require("./slack_notification_dispatcher_impl.service");
class NotificationDispatcherImplementation {
    dispatch(notificationChannel, notification, monitoringService) {
        return __awaiter(this, void 0, void 0, function* () {
            const emailNotificationDispatcher = new email_notification_dispatcher_impl_service_1.EmailNotificationDispatcherImplementation();
            const pushNotificationDispatcher = new push_notification_dispatcher_impl_service_1.PushNotificationDispatcherImplementation();
            const smsNotificationDispatcher = new notification_dispatcher_service_1.SmsNotificationDispatcherImplementation();
            const mqttNotificationDispatcher = new mqtt_notification_dispatcher_impl_service_1.MqttNotificationDispatcherImplementation();
            const slackNotificationDispatcher = new slack_notification_dispatcher_impl_service_1.SlackNotificationDispatcherImplementation();
            const emailPromise = emailNotificationDispatcher.dispatch(notificationChannel.emailChannel, notification, monitoringService);
            const pushPromise = pushNotificationDispatcher.dispatch(notificationChannel.pushChannel, notification, monitoringService);
            const smsPromise = smsNotificationDispatcher.dispatch(notificationChannel.smsChannel, notification, monitoringService);
            // const mqttPromise = mqttNotificationDispatcher.dispatch(notificationChannel.mqttChannel, notification);
            const slackPromise = slackNotificationDispatcher.dispatch(notificationChannel.slackChannel, notification, monitoringService);
            const [emailResult, pushResult, smsResult, slackResult] = yield Promise.all([emailPromise, pushPromise, smsPromise, slackPromise]);
            if (emailResult instanceof result_util_1.Success && pushResult instanceof result_util_1.Success && smsResult instanceof result_util_1.Success && slackResult instanceof result_util_1.Success) {
                return new result_util_1.Success(true);
            }
            else {
                return new result_util_1.MyError('Failed to dispatch notification');
            }
        });
    }
}
exports.NotificationDispatcherImplementation = NotificationDispatcherImplementation;
