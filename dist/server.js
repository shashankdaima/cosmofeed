"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
const app_1 = require("./app"); // app.ts
const config_1 = require("./config"); // config.ts
const server = app_1.app.listen(config_1.config.port, () => {
    console.log(`Server started at http://localhost:${config_1.config.port}`);
});
exports.server = server;
