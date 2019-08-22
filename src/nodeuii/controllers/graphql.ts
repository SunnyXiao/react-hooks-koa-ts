import { ApolloServer } from 'apollo-server-koa';
import * as Koa from 'koa';

const typeDefs = require('../graphql/typeDefs')
const resolvers = require('../graphql/resolvers')

function initGraphQL(app: Koa): void {
  const server = new ApolloServer({
    typeDefs,
    resolvers
    // context: ({req}) => {
    //   // get the user token from the headers
    //   const token = req.headers.authorization || '';
    //   // try to retrieve a user with the token
    //   const user = getUser(token);

    //   // add the user to the context
    //   return { user };
    // }
  });
  server.applyMiddleware({ app });
}

export default initGraphQL;
