"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.issueAccessToken = void 0;
const jsonwebtoken_1 = require("../../node_modules/jsonwebtoken");
const issueAccessToken = (req) => {
    try {
        let payload = (0, jsonwebtoken_1.verify)(req.cookies[process.env.COOKIE_NAME], process.env.TOKEN_SECRET);
        return {
            accessToken: (0, jsonwebtoken_1.sign)({ user_id: payload.user_id }, process.env.TOKEN_SECRET, {
                expiresIn: "1m",
            }),
        };
    }
    catch (e) {
        throw new Error("Authentication failed");
    }
};
exports.issueAccessToken = issueAccessToken;
//# sourceMappingURL=issue-access-token.js.map