"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Notification = void 0;
const moment_timezone_1 = __importDefault(require("moment-timezone"));
class Notification {
    constructor(message) {
        this.id = 0;
        this.message = message;
        this.createdAt = (0, moment_timezone_1.default)().tz('Asia/Kolkata').format();
    }
}
exports.Notification = Notification;
