"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Notification = void 0;
const uuid_1 = require("uuid");
class Notification {
    constructor(message) {
        this.id = (0, uuid_1.v4)();
        this.message = message;
        this.createdAt = new Date();
    }
}
exports.Notification = Notification;
