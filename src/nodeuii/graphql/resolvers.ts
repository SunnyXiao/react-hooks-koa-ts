const path = require('path')
const fs = require('fs')
const { merge } = require('lodash')

const { GraphQLScalarType } = require('graphql')
const { Kind } = require('graphql/language')

import DbHelper from '../utils/dbHelper';

const Date = new GraphQLScalarType({
  name: 'Date',
  description: 'Date Type',
  serialize(value: Date) {
      return value.getTime() // value sent to the client
  },
  parseValue(value: any) {
      return new Date(value)  // value from the client
  },
  parseLiteral(ast: object) {
      if (ast.kind === Kind.INT) {
          return new Date(ast.value) // ast value is always in string format
      }
      return null;
  }
});
const ObjectIdType = new GraphQLScalarType({
  name: 'ObjectId',
  description: 'ObjectId Type',
  serialize(value: any) {
      return value.toString()
  },
  parseValue(value: any) {
      return new DbHelper.ObjectId(value)  // value from the client
  },
  parseLiteral(ast: any) {
      if (ast.kind === Kind.STRING) {
          return new DbHelper.ObjectId(ast.value) // ast value is always in string format
      }
      return null;
  }
});

let resolvers = {
  // ObjectId: ObjectIdType,
  // Date
}

const rootPath = path.join(__dirname, './resolvers');

fs.readdirSync(rootPath).forEach(resolver => {
    merge(resolvers, require(path.join(rootPath, resolver)))
})

module.exports = resolvers
