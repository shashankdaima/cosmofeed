import { BaseChannel, MQTTChannel } from "../../models/channel.model";
import { Notification } from "../../models/notification.model";
import mqtt from "mqtt";
import { Result, Success, MyError } from "../../utils/result.util";
import { NotificationDispatcherService } from "./notification_dispatcher.service";
import { config } from "../../config";
import { MonitoringService } from "../monitoring_service/monitoring.service";
import { NotificationStatus } from "../../models/notification_status.model";
const protocol = 'mqtt'
const host = 'broker.emqx.io'
const port = '1883'
const clientId = `mqtt_${"SHASHANK"}`

export class MqttNotificationDispatcherImplementation implements NotificationDispatcherService {

    async dispatch(notificationChannel: MQTTChannel, notification: Notification, monitoringService: MonitoringService): Promise<Result<Boolean>> {
        monitoringService.upsertNotificationChannel(new NotificationStatus(notification.id, "pending", undefined, "MQTT"));

        const connectUrl = `${protocol}://${host}:${port}`
        const client = mqtt.connect(connectUrl, {
            clientId,
            clean: true,
            connectTimeout: 4000,
            username: 'emqx',
            password: 'public',
            reconnectPeriod: 1000,
        })

        client.on('connect', () => {
            console.log('Connected')
            client.publish(notificationChannel.topic, 'nodejs mqtt test', { qos: 0, retain: false }, (error) => {
                if (error) {
                    monitoringService.upsertNotificationChannel(new NotificationStatus(notification.id, "failed", undefined, "MQTT"));
                    // console.error(error)
                }
            })
        })
        client.end();
        monitoringService.upsertNotificationChannel(new NotificationStatus(notification.id, "delivered", undefined, "MQTT"));

        return new Success(true);
    }
}