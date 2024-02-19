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
exports.PushNotificationDispatcherImplementation = void 0;
const result_util_1 = require("../utils/result.util");
const messaging_1 = require("firebase-admin/messaging");
class PushNotificationDispatcherImplementation {
    dispatch(notificationChannel, notification) {
        return __awaiter(this, void 0, void 0, function* () {
            const { recipients, title, body } = notificationChannel;
            const messageList = recipients.map(recipient => ({
                notification: {
                    title: title,
                    body: body
                },
                token: recipient,
            }));
            return (0, messaging_1.getMessaging)()
                .sendEach(messageList)
                .then((response) => {
                // console.log("Successfully sent message:", response);
                return new result_util_1.Success(true);
            })
                .catch((error) => {
                // console.log("Error sending message:", error);
                return new result_util_1.MyError(error);
                ;
            });
        });
    }
}
exports.PushNotificationDispatcherImplementation = PushNotificationDispatcherImplementation;
