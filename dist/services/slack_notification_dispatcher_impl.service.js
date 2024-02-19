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
exports.SlackNotificationDispatcherImplementation = void 0;
const config_1 = require("../config");
const result_util_1 = require("../utils/result.util");
class SlackNotificationDispatcherImplementation {
    dispatch(notificationChannel, notification) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = 'https://slack.com/api/chat.postMessage';
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${config_1.config.slack_auth_token}`
            };
            try {
                const request = {
                    channel: notificationChannel.channel,
                    text: notificationChannel.message
                };
                const response = yield fetch(url, {
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify(request)
                });
                const responseJson = yield response.json();
                if (responseJson.ok) {
                    return new result_util_1.Success(true);
                }
                else {
                    console.log(responseJson.error);
                    return new result_util_1.MyError(responseJson.error);
                }
            }
            catch (error) {
                console.log(error);
                return new result_util_1.MyError(error);
            }
        });
    }
}
exports.SlackNotificationDispatcherImplementation = SlackNotificationDispatcherImplementation;
