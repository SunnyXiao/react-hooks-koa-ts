import { ApolloServer, gql } from 'apollo-server-koa';
import * as Koa from 'koa';

const typeDefs = require('../graphql/typeDefs')
const resolvers = require('../graphql/resolvers')

function initGraphQL(app: Koa): void {
  const server = new ApolloServer({ typeDefs, resolvers });
  server.applyMiddleware({ app });
}

export default initGraphQL;
