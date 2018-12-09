module.exports = {
  displayLoginForm: async function (request, response) {
    return response.view('pages/login', { warning: null });
  },

  login: async function (request, response) {
    const userName = request.param('username');
    const password = request.param('password');
    const rememberMe = request.param('rememberMe') !== undefined;

    if (!userName || !password) {
      return response.redirect('/login')
    }

    const user = await User.findOne({ name: userName });

    if (!user) {
      return response.view('pages/login', { warning: sails.__('auth.noSuchUser') });
    }

    let passwordsMatch = true;

    await sails.helpers.passwords.checkPassword(password, user.password)
      .tolerate('incorrect', () => {
        passwordsMatch = false;
      });

    if (!passwordsMatch) {
      sails.log.info(`Refusing login, invalid credentials [who=${userName}, ip=${request.ip}]`);
      return response.view('pages/login', { warning: sails.__('auth.incorrectPassword') });
    }

    if (rememberMe) {
      if (!request.isSocket) {
        request.session.cookie.maxAge = 2592000000; // 30 d
      }
    }

    sails.log.info(`Session initiated [who=${userName}, ip=${request.ip}, remember=${rememberMe}]`);
    request.session.userId = user.id;
    request.session.reauthenticated = false;
    return response.redirect('/');
  },

  logout: async function (request, response) {
    delete request.session.userId;
    return response.redirect('/login');
  },

  displayPasswordChangeForm: async function (request, response) {
    return response.view('pages/changePassword', { layout: 'layouts/dashboard' });
  }
};

