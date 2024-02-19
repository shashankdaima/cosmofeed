"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function errorHandlerMiddleware(err, req, res, next) {
    console.error(err.stack);
    res.status(500).json({ message: err.message });
}
exports.default = errorHandlerMiddleware;
