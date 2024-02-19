"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyError = exports.Success = exports.Result = void 0;
class Result {
    constructor(data, error) {
        this.data = data;
        this.error = error;
    }
}
exports.Result = Result;
class Success extends Result {
    constructor(data) {
        super(data, null);
        this.data = data;
    }
}
exports.Success = Success;
class MyError extends Result {
    constructor(error) {
        super(null, error);
        this.error = error;
    }
}
exports.MyError = MyError;
