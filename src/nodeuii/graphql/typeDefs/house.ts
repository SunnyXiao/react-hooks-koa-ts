import { gql } from'apollo-server-koa';

const houseTypeDef = gql`type House {
    _id: ID
    area: String
    name: String
    number: Int
    beginTime: String
    endTime: String
    status: String
  }

  type PageOneArray {
    successArray: [House]
    allLength: Int
  }

  type Query {
    allHouses(year: Int): [House]
    spiderPageOne: PageOneArray
    pvs(routerName: String): Int
  }
`
module.exports = houseTypeDef
