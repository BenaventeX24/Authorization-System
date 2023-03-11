"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = exports.registerSchema = void 0;
const zod_1 = require("zod");
const zod_types_1 = require("@/validation/zod-types");
exports.registerSchema = zod_1.z.object({
    email: zod_types_1.authEmail,
    name: zod_types_1.authName,
    surname: zod_types_1.authSurname,
    password: zod_types_1.authPassword,
});
exports.loginSchema = zod_1.z.object({
    email: zod_types_1.authEmail,
    password: zod_types_1.authPassword,
});
//# sourceMappingURL=schemas.js.map