"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.notificationRouter = void 0;
const express_1 = __importDefault(require("express"));
const notification_controller_1 = require("../controllers/notification.controller");
const router = express_1.default.Router();
exports.notificationRouter = router;
router.post('/dispatch', notification_controller_1.dispatchNotification);
