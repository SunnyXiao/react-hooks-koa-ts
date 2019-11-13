import gql from 'graphql-tag';
import config from '../config';

const { getGraphqlClient } = config;

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

export function requestLogin(name: string, password: string, callback: Function): void {
  getGraphqlClient()

}
