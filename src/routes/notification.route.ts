import express from 'express';
import { dispatchNotification } from '../controllers/notification.controller';
const router = express.Router();

router.post('/dispatch', dispatchNotification);

export { router as notificationRouter };
