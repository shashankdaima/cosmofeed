import express from 'express';
import { notificationRouter } from './notification.route';
const router = express.Router();
router.use("/notification",notificationRouter);
export { router as routes };