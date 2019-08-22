import userModel from '../../models/userModel'

module.exports = {
  Mutation: {
    addUser: (_parent: never, args) => {
      let user = args
      if (!user.pin) {
        user.pin = 1748;
      }
      return userModel.add(user);
    }
  }
}
