// import fs from 'fs';
// import path from 'path';
// import { gql } from'apollo-server-koa';

// 包含所有的类型定义
// let typeDefs: any[];

// const rootPath = path.join(__dirname, './typeDefs')
// console.log('rootPath',rootPath)

// fs.readdirSync(rootPath).forEach( (typeDef: any) => {
//   const filePath = path.join(rootPath, typeDef)
//   const content = fs.readFileSync(filePath, 'utf8')
//   // gql字符串模板标签函数会解析schame定义语法
//   typeDefs.push(gql`${content}`)
// })

// module.exports = typeDefs

const houseTypeDef = require('./typeDefs/house')

const typeDefs = [houseTypeDef]

module.exports = typeDefs
