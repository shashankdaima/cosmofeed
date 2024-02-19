import { config } from "../../config";
import { BaseChannel } from "../../models/channel.model";
import { MyError, Result, Success } from "../../utils/result.util";
import { MonitoringService } from "./monitoring.service";
import { Notification } from "../../models/notification.model";
import { Client } from 'pg';
import { NotificationStatus } from "../../models/notification_status.model";
export class MonitoringImplService implements MonitoringService {
    async addNotification(notification: Notification): Promise<Result<Notification>> {
        const client = new Client({
            user: config.postgres_user,
            host: config.postgres_host,
            database: config.postgres_db,
            password: config.postgres_pwd,
            port: parseInt(config.postgres_port!),
        });
        await client.connect();
        const query = `INSERT INTO notification (message,createdat) VALUES ($1, $2) RETURNING id`;
        return client.query(query, [notification.message, notification.createdAt])
            .then((result) => {
                client.end();
                notification.id = result.rows[0].id;
                return new Success(notification);
            })
            .catch((error: any) => {
                client.end();
                console.log(error);
                return new MyError(error);
            });
    }

    async upsertNotificationChannel(notificationStatus: NotificationStatus): Promise<Result<Boolean>> {
        const client = new Client({
            user: config.postgres_user,
            host: config.postgres_host,
            database: config.postgres_db,
            password: config.postgres_pwd,
            port: parseInt(config.postgres_port!),
        });

        try {
            await client.connect();

            // First query: Attempt to insert a new row or update existing row if conflict occurs
            const upsertQuery = `
                INSERT INTO notificationchannel (notificationId, channelType, status, errorMessage)
                VALUES ($1, $2, $3, $4)
                ON CONFLICT (notificationId, channelType)
                DO UPDATE SET status = $3, errorMessage = $4`;

            await client.query(upsertQuery, [notificationStatus.notificationId, notificationStatus.channelType, notificationStatus.deliveryStatus, notificationStatus.error]);


            client.end();
            return new Success(true);
        } catch (error) {
            client.end();
            console.log(error);
            return new MyError(error);
        }
    }

}