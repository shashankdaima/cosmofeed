import { BaseChannel, EmailChannel } from "../../models/channel.model";
import { Notification } from "../../models/notification.model";
import { NotificationDispatcherService } from "./notification_dispatcher.service";
import { Result, Success,MyError } from "../../utils/result.util";
import { google } from 'googleapis';
import nodemailer from 'nodemailer';
import { config } from '../../config';
import { MonitoringService } from "../monitoring_service/monitoring.service";
import { NotificationStatus } from "../../models/notification_status.model";

const CLIENT_ID = config.google_client_id;
const CLIENT_SECRET = config.google_client_secret;
const REDIRECT_URI = config.google_redirect_uri;

const REFRESH_TOKEN = config.google_refresh_token;
const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

export class EmailNotificationDispatcherImplementation implements NotificationDispatcherService {
    async dispatch(notificationChannel: EmailChannel, notification: Notification, monitoringService:MonitoringService): Promise<Result<Boolean>> {
        monitoringService.upsertNotificationChannel(new NotificationStatus(notification.id,"pending", undefined, "Email"));
        try {
            const transporter = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    type: 'OAuth2',
                    user: config.google_email_host,
                    clientId: CLIENT_ID,
                    clientSecret: CLIENT_SECRET,
                    refreshToken: REFRESH_TOKEN,
                    accessToken: (await oAuth2Client.getAccessToken()).token ?? (() => { throw new Error('Invalid access token'); })(),
                },
            });
            const mailOptions = {
                from: config.google_email_host,
                subject: notificationChannel.subject,
                text: notificationChannel.body,
                to:""
            };

            for (const recipient of notificationChannel.recipients) {
                mailOptions.to = recipient;
                await transporter.sendMail(mailOptions);
            }
            monitoringService.upsertNotificationChannel(new NotificationStatus(notification.id,"delivered", undefined, "Email"));
            return new Success(true);
        } catch (error) {
            console.log(error);
            monitoringService.upsertNotificationChannel(new NotificationStatus(notification.id,"failed", undefined, "Email"));
            return new MyError(error);
        }
    }
}
