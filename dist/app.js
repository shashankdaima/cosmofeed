"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const config_1 = require("./config"); // config.ts
const routes_1 = require("./routes/routes");
const notFound_middleware_1 = __importDefault(require("./middlewares/notFound.middleware"));
const errorHandlerMiddleware_1 = __importDefault(require("./middlewares/errorHandlerMiddleware"));
const app_1 = require("firebase-admin/app");
const firebase_admin_1 = require("firebase-admin");
// const serviceAccount = require('/path/to/serviceAccountKey.json');
(0, app_1.initializeApp)({
    credential: firebase_admin_1.credential.cert(config_1.config.google_credentials_path),
    projectId: config_1.config.firebase_project_id,
});
const app = (0, express_1.default)();
exports.app = app;
// app.use(middleware);
app.use(express_1.default.json());
app.use(routes_1.routes);
app.use(notFound_middleware_1.default);
app.use(errorHandlerMiddleware_1.default);
