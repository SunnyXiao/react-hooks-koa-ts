const path = require('path')
const fs = require('fs')

let testTypeDefs: String = ''
const rootPath = path.join(__dirname, './typeDefs');

fs.readdirSync(rootPath).forEach((typeDef: any) => {
  testTypeDefs += fs.readFileSync(path.join(rootPath, typeDef), 'utf8')
})

module.exports = testTypeDefs
