"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Authentication = exports.LoginResult = void 0;
const type_graphql_1 = require("type-graphql");
const bcryptjs_1 = require("bcryptjs");
const zod_1 = require("zod");
const prisma_client_1 = require("../prisma_utils/prisma-client");
const auth_middlerware_1 = require("../utils/auth-middlerware");
const issue_refresh_token_1 = require("../token/issue-refresh-token");
const jsonwebtoken_1 = require("jsonwebtoken");
const prisma_error_handler_1 = require("../prisma_utils/prisma-error-handler");
const client_1 = require("@prisma/client");
const schemas_1 = require("../validation/schemas");
let LoginResult = class LoginResult {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], LoginResult.prototype, "accessToken", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], LoginResult.prototype, "username", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], LoginResult.prototype, "usersurname", void 0);
LoginResult = __decorate([
    (0, type_graphql_1.ObjectType)()
], LoginResult);
exports.LoginResult = LoginResult;
let Authentication = class Authentication {
    constructor() {
        this.authenticate = (email, password, req, res) => __awaiter(this, void 0, void 0, function* () {
            let result = new LoginResult();
            try {
                return Promise.resolve(prisma_client_1.prisma.users.findFirst({
                    where: {
                        email: email,
                    },
                })).then((user) => __awaiter(this, void 0, void 0, function* () {
                    if (user) {
                        if ((0, bcryptjs_1.compareSync)(password, user.password)) {
                            (0, issue_refresh_token_1.issueRefreshToken)(req, res, user.user_id, user.token_v);
                            result = {
                                accessToken: (0, jsonwebtoken_1.sign)({ user_id: user.user_id }, process.env.TOKEN_SECRET, {
                                    expiresIn: "2m",
                                }),
                                username: user.name,
                                usersurname: user.surname,
                            };
                        }
                        else
                            throw new Error("WRONG_CREDENTIALS");
                    }
                    else
                        throw new Error("WRONG_CREDENTIALS");
                    return result;
                }));
            }
            catch (e) {
                throw e;
            }
        });
    }
    testAuth() {
        return true;
    }
    register(email, password, name, surname, { req, res }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                schemas_1.registerSchema.parse({
                    email: email,
                    password: password,
                    name: name,
                    surname: surname,
                });
                return yield Promise.resolve(prisma_client_1.prisma.users.create({
                    data: {
                        email: email,
                        password: yield (0, bcryptjs_1.hash)(password, 12),
                        name: name,
                        surname: surname,
                    },
                })).then((user) => __awaiter(this, void 0, void 0, function* () { return yield this.authenticate(user.email, password, req, res); }));
            }
            catch (e) {
                if (e instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                    throw (0, prisma_error_handler_1.PrismaErrorHandler)(e);
                }
                else if (e instanceof zod_1.ZodError) {
                    throw new Error(`Fields validation failed at, ${e.issues}`);
                }
                else
                    throw e;
            }
        });
    }
    login(email, password, { req, res }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                schemas_1.loginSchema.parse({
                    email: email,
                    password: password,
                });
                return this.authenticate(email, password, req, res);
            }
            catch (e) {
                if (e instanceof zod_1.ZodError) {
                    throw new Error(`Fields validation failed at, ${e.issues}`);
                }
                else
                    throw e;
            }
        });
    }
    logout({ payload, req, res }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                (0, issue_refresh_token_1.revokeRefreshToken)(req, res);
            }
            catch (e) {
                throw e;
            }
            return true;
        });
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => Boolean),
    (0, type_graphql_1.UseMiddleware)(auth_middlerware_1.AuthMiddleware),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Authentication.prototype, "testAuth", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => LoginResult),
    __param(0, (0, type_graphql_1.Arg)("email")),
    __param(1, (0, type_graphql_1.Arg)("password")),
    __param(2, (0, type_graphql_1.Arg)("name")),
    __param(3, (0, type_graphql_1.Arg)("surname")),
    __param(4, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, Object]),
    __metadata("design:returntype", Promise)
], Authentication.prototype, "register", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => LoginResult),
    __param(0, (0, type_graphql_1.Arg)("email")),
    __param(1, (0, type_graphql_1.Arg)("password")),
    __param(2, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], Authentication.prototype, "login", null);
__decorate([
    (0, type_graphql_1.Query)(() => Boolean),
    (0, type_graphql_1.UseMiddleware)(auth_middlerware_1.AuthMiddleware),
    __param(0, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], Authentication.prototype, "logout", null);
Authentication = __decorate([
    (0, type_graphql_1.Resolver)()
], Authentication);
exports.Authentication = Authentication;
//# sourceMappingURL=authentication.js.map