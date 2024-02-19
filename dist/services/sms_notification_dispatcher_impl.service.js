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
exports.SmsNotificationDispatcherImplementation = void 0;
const config_1 = require("../config");
const twilio_1 = __importDefault(require("twilio"));
const result_util_1 = require("../utils/result.util");
class SmsNotificationDispatcherImplementation {
    dispatch(notificationChannel, notification) {
        return __awaiter(this, void 0, void 0, function* () {
            const accountSid = config_1.config.twilio_sid_number;
            const authToken = config_1.config.twilio_auth_token;
            const client = (0, twilio_1.default)(accountSid, authToken);
            let results = [];
            for (let recipient of notificationChannel.recipients) {
                try {
                    yield client.messages.create({
                        body: notificationChannel.message,
                        from: config_1.config.twilio_phone_number,
                        to: recipient
                    });
                    results.push(true);
                }
                catch (error) {
                    console.log(error);
                    results.push(false);
                }
            }
            return results.every(result => result) ? new result_util_1.Success(true) : new result_util_1.Success(false);
        });
    }
}
exports.SmsNotificationDispatcherImplementation = SmsNotificationDispatcherImplementation;
