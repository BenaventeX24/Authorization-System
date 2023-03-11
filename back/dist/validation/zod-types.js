"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authPassword = exports.authEmail = exports.authSurname = exports.authName = void 0;
const zod_1 = require("../../node_modules/zod");
exports.authName = zod_1.z
    .string()
    .min(2, "Must be at least 2 characters in length")
    .max(16, "Must not exceed 16 characters in length")
    .regex(new RegExp("^[A-Z ][a-zA-Z ]{1,22}$"), "First letter must be upercase and only letters");
exports.authSurname = zod_1.z
    .string()
    .min(2, "Must be at least 2 characters in length")
    .max(22, "Must not exceed 22 characters in length")
    .regex(new RegExp("^[A-Z][a-zA-Z ]{1,22}$"), "First letter must be upercase and only letters");
exports.authEmail = zod_1.z
    .string()
    .email("Email must contain @ and domain extension");
exports.authPassword = zod_1.z
    .string()
    .regex(new RegExp(".*[A-Z].*"), "One uppercase character")
    .regex(new RegExp(".*[a-z].*"), "One lowercase character")
    .regex(new RegExp(".*\\d.*"), "One number")
    .regex(new RegExp(".*[`~<>?,./!@#$%^&*()\\-_+=\"'|{}\\[\\];:\\\\].*"), "One special character")
    .min(8, "Must be at least 8 characters in length");
//# sourceMappingURL=zod-types.js.map