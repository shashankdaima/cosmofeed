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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MqttNotificationDispatcherImplementation = void 0;
const mqtt_1 = __importDefault(require("mqtt"));
const result_util_1 = require("../../utils/result.util");
const notification_status_model_1 = require("../../models/notification_status.model");
const protocol = 'mqtt';
const host = 'broker.emqx.io';
const port = '1883';
const clientId = `mqtt_${"SHASHANK"}`;
class MqttNotificationDispatcherImplementation {
    dispatch(notificationChannel, notification, monitoringService) {
        return __awaiter(this, void 0, void 0, function* () {
            monitoringService.upsertNotificationChannel(new notification_status_model_1.NotificationStatus(notification.id, "pending", undefined, "MQTT"));
            const connectUrl = `${protocol}://${host}:${port}`;
            const client = mqtt_1.default.connect(connectUrl, {
                clientId,
                clean: true,
                connectTimeout: 4000,
                username: 'emqx',
                password: 'public',
                reconnectPeriod: 1000,
            });
            client.on('connect', () => {
                console.log('Connected');
                client.publish(notificationChannel.topic, 'nodejs mqtt test', { qos: 0, retain: false }, (error) => {
                    if (error) {
                        monitoringService.upsertNotificationChannel(new notification_status_model_1.NotificationStatus(notification.id, "failed", undefined, "MQTT"));
                        // console.error(error)
                    }
                });
            });
            client.end();
            monitoringService.upsertNotificationChannel(new notification_status_model_1.NotificationStatus(notification.id, "delivered", undefined, "MQTT"));
            return new result_util_1.Success(true);
        });
    }
}
exports.MqttNotificationDispatcherImplementation = MqttNotificationDispatcherImplementation;
