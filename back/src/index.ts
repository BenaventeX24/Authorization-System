import "reflect-metadata";
import express from "express";
import * as dotenv from "dotenv";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { Authentication } from "@/graphql/authentication";
import cookieParser from "cookie-parser";
import { issueAccessToken } from "./token/issue-access-token";
//import cors from "cors";

dotenv.config();
const app = express();

(async () => {
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [Authentication],
    }),
    context: ({ req, res }) => ({ req, res }),
  });

  /*app.use(
    cors({
      origin: [
        `http://localhost:${process.env.PORT}`,
        `http://127.0.0.1:${process.env.PORT}`,
      ],
    })
  );*/

  app.use(cookieParser());

  apolloServer.start().then(() => {
    apolloServer.applyMiddleware({
      app: app,
      path: "/api",
    });

    app.get("/", (_req, _res) => {});
    app.get("/refresh-token", (req, res) => {
      res.send(issueAccessToken(req));
    });

    app.listen(process.env.PORT, () => {
      console.log(`Express server started in port: ${process.env.PORT}`);
    });
  });
})();
