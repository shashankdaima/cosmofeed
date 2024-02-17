import { RequestHandler } from "express";
import { SMSChannel } from "../models/channel.model";
import { Notification } from "../models/notification.model";
import { SmsNotificationDispatcherImplementation } from "../services/notification_dispatcher.service";
import { Success } from "../utils/result.util";
export const dispatchNotification: RequestHandler = async (req, res, next) => {
    try {
        const notificationDispatcher = new SmsNotificationDispatcherImplementation();
        const notification = new Notification('Your message here');
        const notificationChannel = new SMSChannel(['+918295380791'], 'Testing Shashank');
        const result = await notificationDispatcher.dispatch(notificationChannel, notification);
        if (result instanceof Success && result.data) {
            res.status(200).json({ message: 'Notification dispatched successfully' });
        } else {
            res.status(500).json({ message: 'Failed to dispatch notification' });
        }
    }
    catch (error) {
        next(error);
    }
}