import userModel from '../../models/userModel'

module.exports = {
  Mutation: {
    addUser: async (_parent: never,{user} ) => {
      if (!user.pin) {
        user.pin = 1748;
      }
      let result = await userModel.add(user)
      //if(result.code){
      console.log('result:,', result)
      //}
      return result;
    }
  }
}
