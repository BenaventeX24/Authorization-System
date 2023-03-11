"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.revokeRefreshToken = exports.issueRefreshToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const issueRefreshToken = (req, res, user_id, token_v) => {
    if (!req.cookies[process.env.COOKIE_NAME]) {
        res.cookie(process.env.COOKIE_NAME, (0, jsonwebtoken_1.sign)({ user_id: user_id, token_v: token_v }, process.env.TOKEN_SECRET, {
            expiresIn: "180d",
        }), {
            expires: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000),
            httpOnly: true,
            secure: true,
            sameSite: "none",
        });
    }
};
exports.issueRefreshToken = issueRefreshToken;
const revokeRefreshToken = (req, res) => {
    if (req.cookies[process.env.COOKIE_NAME]) {
        res.cookie(process.env.COOKIE_NAME, "", {
            httpOnly: true,
            secure: true,
            sameSite: "none",
        });
    }
};
exports.revokeRefreshToken = revokeRefreshToken;
//# sourceMappingURL=issue-refresh-token.js.map