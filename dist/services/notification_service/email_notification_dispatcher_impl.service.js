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
exports.EmailNotificationDispatcherImplementation = void 0;
const result_util_1 = require("../../utils/result.util");
const googleapis_1 = require("googleapis");
const nodemailer_1 = __importDefault(require("nodemailer"));
const config_1 = require("../../config");
const notification_status_model_1 = require("../../models/notification_status.model");
const CLIENT_ID = config_1.config.google_client_id;
const CLIENT_SECRET = config_1.config.google_client_secret;
const REDIRECT_URI = config_1.config.google_redirect_uri;
const REFRESH_TOKEN = config_1.config.google_refresh_token;
const oAuth2Client = new googleapis_1.google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
class EmailNotificationDispatcherImplementation {
    dispatch(notificationChannel, notification, monitoringService) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            monitoringService.upsertNotificationChannel(new notification_status_model_1.NotificationStatus(notification.id, "pending", undefined, "Email"));
            try {
                const transporter = nodemailer_1.default.createTransport({
                    service: 'Gmail',
                    auth: {
                        type: 'OAuth2',
                        user: config_1.config.google_email_host,
                        clientId: CLIENT_ID,
                        clientSecret: CLIENT_SECRET,
                        refreshToken: REFRESH_TOKEN,
                        accessToken: (_a = (yield oAuth2Client.getAccessToken()).token) !== null && _a !== void 0 ? _a : (() => { throw new Error('Invalid access token'); })(),
                    },
                });
                const mailOptions = {
                    from: config_1.config.google_email_host,
                    subject: notificationChannel.subject,
                    text: notificationChannel.body,
                    to: ""
                };
                for (const recipient of notificationChannel.recipients) {
                    mailOptions.to = recipient;
                    yield transporter.sendMail(mailOptions);
                }
                monitoringService.upsertNotificationChannel(new notification_status_model_1.NotificationStatus(notification.id, "delivered", undefined, "Email"));
                return new result_util_1.Success(true);
            }
            catch (error) {
                console.log(error);
                monitoringService.upsertNotificationChannel(new notification_status_model_1.NotificationStatus(notification.id, "failed", undefined, "Email"));
                return new result_util_1.MyError(error);
            }
        });
    }
}
exports.EmailNotificationDispatcherImplementation = EmailNotificationDispatcherImplementation;
