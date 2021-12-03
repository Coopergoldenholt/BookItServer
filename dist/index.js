"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
require("dotenv").config();
const apollo_server_express_1 = require("apollo-server-express");
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const type_graphql_1 = require("type-graphql");
const massive_1 = __importDefault(require("massive"));
const user_1 = require("./resolvers/user");
const company_1 = require("./resolvers/company");
const { CONNECTION_STRING, PORT } = process.env;
const main = async () => {
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    app.use((0, express_session_1.default)({
        secret: 'jhkjhkljhlkhiuihkn kjhiuh87yt7ezsxd',
        resave: false,
        saveUninitialized: true,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
            httpOnly: true,
            sameSite: "lax",
            secure: false,
        },
    }));
    const db = await (0, massive_1.default)({
        connectionString: CONNECTION_STRING,
        ssl: { rejectUnauthorized: false },
    });
    await app.set('db', db);
    const schema = await (0, type_graphql_1.buildSchema)({
        resolvers: [user_1.UserResolver, company_1.CompanyResolver],
        emitSchemaFile: true,
    });
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema,
        context: () => ({}),
    });
    await apolloServer.start();
    apolloServer.applyMiddleware({ app });
    app.listen(PORT, () => {
        console.log("server started on localhost:4000");
    });
};
main().catch((err) => console.log(err));
//# sourceMappingURL=index.js.map