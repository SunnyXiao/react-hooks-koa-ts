import gql from 'graphql-tag';
import config from '../config';

interface IallHouses {
  allHouses: nFang.IhouseData[];
}

interface Ipvs {
  pvs: number;
}

const { getGraphqlClient } = config;

export function requestData(year: string, callback: Function): void {
  const yearParam = year == undefined ? '0' : year;

  getGraphqlClient()
    .query<IallHouses>({
      query: gql`
        {
          allHouses(year: ${yearParam}) {
            _id
            area
            name
            number
            beginTime
            endTime
            status
          }
        }
      `
    })
    .then(result => {
      callback(result.data.allHouses);
    })
}

export function requestPvs(callback: Function): void {
  getGraphqlClient()
    .query<Ipvs>({
      query: gql`
        {
          pvs(routerName: "allHouses")
        }
      `
    })
    .then(result => {
      callback(result.data.pvs);
    });
}


export function requestAddUser(name: string, password: string, callback: Function): void {
  getGraphqlClient()
  .mutate<nFang.IuserItem>({
    variables: {user: { name, password }},
    mutation: gql`
      mutation addUser($user: UserInput){
        addUser(user: $user) {
          name,
        }
      }
    `
  }).then(result => {
    callback(result)
    console.log(result)
  })
  .catch(e => {
    let error = e.graphQLErrors[0]
    callback(error)
    console.log('ee:', error)
  })
}
