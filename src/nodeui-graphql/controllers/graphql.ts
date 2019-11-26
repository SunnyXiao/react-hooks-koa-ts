import { ApolloServer } from 'apollo-server-koa';
import * as Koa from 'koa';

const typeDefs = require('../graphql/typeDefs')
const resolvers = require('../graphql/resolvers')

function initGraphQL(app: Koa): void {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    formatError: (error) => {
      // 删除 extensions 字段，删除异常的堆栈，不暴露服务器发生错误的文件
      // delete error.extensions;
      return {
        code: error.extensions.code,
        status: error.status,
        message: error.message
      }
    }
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
