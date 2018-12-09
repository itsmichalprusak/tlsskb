module.exports = {
  addAccount: async function (request, response) {
    let userObject = await User.create(Object.assign({
      name: 'Test3',
      password: await sails.helpers.passwords.hashPassword('test'),
      group: 'user'
    })).fetch();

    return response.redirect('/login')
  }
};

