"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const dotenv = __importStar(require("dotenv"));
const apollo_server_express_1 = require("apollo-server-express");
const type_graphql_1 = require("type-graphql");
const authentication_1 = require("@/resolvers/authentication");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const issue_access_token_1 = require("./token/issue-access-token");
const cors_1 = __importDefault(require("cors"));
const user_resolver_1 = require("./resolvers/user-resolver");
dotenv.config();
const app = (0, express_1.default)();
(() => __awaiter(void 0, void 0, void 0, function* () {
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema: yield (0, type_graphql_1.buildSchema)({
            resolvers: [authentication_1.Authentication, user_resolver_1.userResolver],
        }),
        context: ({ req, res }) => ({ req, res }),
    });
    app.use((0, cors_1.default)({
        origin: [
            `http://localhost:3000`,
            `http://127.0.0.1:3000`,
            `https://studio.apollographql.com`,
        ],
        credentials: true,
    }));
    app.use((0, cookie_parser_1.default)());
    apolloServer.start().then(() => {
        apolloServer.applyMiddleware({
            app: app,
            path: "/api",
            cors: false,
        });
        app.get("/", (_req, _res) => { });
        app.post("/refresh-token", (req, res) => {
            res.json((0, issue_access_token_1.issueAccessToken)(req));
        });
        app.listen(process.env.PORT, () => {
            console.log(`Express server started in port: ${process.env.PORT}`);
        });
    });
}))();
//# sourceMappingURL=index.js.map