"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMiddleware = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const AuthMiddleware = ({ context }, next) => {
    const authorizationHeader = context.req.headers["authorization"];
    let refreshToken = (0, jsonwebtoken_1.verify)(context.req.cookies[process.env.AUTHSYS_COOKIE_NAME], process.env.AUTHSYS_TOKEN_SECRET);
    if (!refreshToken) {
        throw new Error("AUTH_FAILED");
    }
    if (!authorizationHeader) {
        throw new Error("AUTH_FAILED");
    }
    try {
        const token = authorizationHeader.split(" ")[1];
        const payload = (0, jsonwebtoken_1.verify)(token, process.env.AUTHSYS_TOKEN_SECRET);
        context.payload = payload;
    }
    catch (err) {
        throw new Error("AUTH_FAILED");
    }
    return next();
};
exports.AuthMiddleware = AuthMiddleware;
//# sourceMappingURL=auth-middlerware.js.map