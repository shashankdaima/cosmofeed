"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationStatus = void 0;
class NotificationStatus {
    constructor(notificationId, deliveryStatus, error, channelType) {
        this.notificationId = notificationId;
        this.deliveryStatus = deliveryStatus;
        this.error = error;
        this.channelType = channelType;
    }
}
exports.NotificationStatus = NotificationStatus;
