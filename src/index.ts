import "reflect-metadata";
require("dotenv").config();
import { ApolloServer } from "apollo-server-express";
import express from "express";
import session from 'express-session'
import { buildSchema } from "type-graphql";
import massive from 'massive'
// import mongoose from "mongoose";
import { UserResolver } from "./resolvers/user";
import { CompanyResolver } from "./resolvers/company";

const { CONNECTION_STRING, PORT } = process.env;

const main = async () => {
  const app = express();

  app.use(express.json());

  app.use(
    session({
      secret: 'jhkjhkljhlkhiuihkn kjhiuh87yt7ezsxd',
      resave: false,
      saveUninitialized: true,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
        httpOnly: true,
        sameSite: "lax", //csrf
        secure: false, //cookie only works in https
      },
    })
  );

  const db = await massive({
    connectionString: CONNECTION_STRING,
    //@ts-ignore
    ssl: { rejectUnauthorized: false },
  })

  await app.set('db', db)

  const schema = await buildSchema({
    resolvers: [UserResolver, CompanyResolver],
    emitSchemaFile: true,
  });

  const apolloServer = new ApolloServer({
    schema,
    context: () => ({}),
  })

  await apolloServer.start();

  apolloServer.applyMiddleware({ app })

  app.listen(PORT, () => {
    console.log("server started on localhost:4000");
  });
};

main().catch((err) => console.log(err));
