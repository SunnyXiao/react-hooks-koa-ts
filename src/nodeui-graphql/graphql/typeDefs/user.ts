import { gql } from'apollo-server-koa';

const userTypeDef = gql`
  scalar Date

  enum UserStatus {
    USE
    LOCKED
  }

  input UserInput {
    name: String!
    password: String!
  }

  type Mutation {
    addUser(user: UserInput): User
  }

  type User {
    _id: ID
    name: String
    password: String
    pin: Int
    status: Int
    lastLoginAt: Date
    createdAt: Date
  }
`
module.exports = userTypeDef

// type Mutation {
//   # 返回新添加的用户
//   addUser(user: User): User!
// }
