"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function notFoundMiddleware(req, res, next) {
    const error = new Error('Not Found');
    res.status(404).json({ message: error.message });
}
exports.default = notFoundMiddleware;
