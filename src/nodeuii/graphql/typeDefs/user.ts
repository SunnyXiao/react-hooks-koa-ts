import { gql } from'apollo-server-koa';

const userTypeDef = gql`
  scalar Date

  type User {
    _id: ID
    name: String
    password: String
    pin: Int
    status: Int
    lastLoginAt: Date
    createdAt: Date
  }
  type Mutation {
    addUser(name: String, password: String): User
  }
`
module.exports = userTypeDef
