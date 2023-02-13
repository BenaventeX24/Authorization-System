import "reflect-metadata";
import express from "express";
import * as dotenv from "dotenv";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { Authentication } from "@/graphql/authentication";
import cookieParser from "cookie-parser";
import { issueAccessToken } from "./token/issue-access-token";
import cors from "cors";
import { userResolver } from "./graphql/user-resolver";
//import cors from "cors";

dotenv.config();
const app = express();

(async () => {
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [Authentication, userResolver],
    }),
    context: ({ req, res }) => ({ req, res }),
  });

  app.use(
    cors({
      origin: [
        `http://localhost:3000`,
        `http://127.0.0.1:3000`,
        `https://studio.apollographql.com`,
      ],
      credentials: true,
    })
  );

  app.use(cookieParser());

  apolloServer.start().then(() => {
    apolloServer.applyMiddleware({
      app: app,
      path: "/api",
      cors: false,
    });

    app.get("/", (_req, _res) => {});
    app.post("/refresh-token", (req, res) => {
      let response = issueAccessToken(req);
      console.log(response);

      res.json(issueAccessToken(req));
    });

    app.listen(process.env.PORT, () => {
      console.log(`Express server started in port: ${process.env.PORT}`);
    });
  });
})();
