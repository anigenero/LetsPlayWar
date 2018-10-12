import { ApolloServer } from 'apollo-server-express';
import * as express from 'express';
import { graphqlSchema } from './graphql';

const server = new ApolloServer(graphqlSchema);
const app = express();

server.applyMiddleware({ app });

app.listen({ port: 8080 });
