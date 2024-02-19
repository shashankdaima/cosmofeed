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
exports.MonitoringImplService = void 0;
const config_1 = require("../../config");
const result_util_1 = require("../../utils/result.util");
const pg_1 = require("pg");
class MonitoringImplService {
    addNotification(notification) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = new pg_1.Client({
                user: config_1.config.postgres_user,
                host: config_1.config.postgres_host,
                database: config_1.config.postgres_db,
                password: config_1.config.postgres_pwd,
                port: parseInt(config_1.config.postgres_port),
            });
            yield client.connect();
            const query = `INSERT INTO notification (message,createdat) VALUES ($1, $2) RETURNING id`;
            return client.query(query, [notification.message, notification.createdAt])
                .then((result) => {
                client.end();
                notification.id = result.rows[0].id;
                return new result_util_1.Success(notification);
            })
                .catch((error) => {
                client.end();
                console.log(error);
                return new result_util_1.MyError(error);
            });
        });
    }
    upsertNotificationChannel(notificationStatus) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = new pg_1.Client({
                user: config_1.config.postgres_user,
                host: config_1.config.postgres_host,
                database: config_1.config.postgres_db,
                password: config_1.config.postgres_pwd,
                port: parseInt(config_1.config.postgres_port),
            });
            try {
                yield client.connect();
                // First query: Attempt to insert a new row or update existing row if conflict occurs
                const upsertQuery = `
                INSERT INTO notificationchannel (notificationId, channelType, status, errorMessage)
                VALUES ($1, $2, $3, $4)
                ON CONFLICT (notificationId, channelType)
                DO UPDATE SET status = $3, errorMessage = $4`;
                yield client.query(upsertQuery, [notificationStatus.notificationId, notificationStatus.channelType, notificationStatus.deliveryStatus, notificationStatus.error]);
                client.end();
                return new result_util_1.Success(true);
            }
            catch (error) {
                client.end();
                console.log(error);
                return new result_util_1.MyError(error);
            }
        });
    }
}
exports.MonitoringImplService = MonitoringImplService;
