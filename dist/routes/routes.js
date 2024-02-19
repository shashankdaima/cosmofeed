"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = __importDefault(require("express"));
const notification_route_1 = require("./notification.route");
const router = express_1.default.Router();
exports.routes = router;
router.use("/notification", notification_route_1.notificationRouter);
