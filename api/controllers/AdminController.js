module.exports = {
  displayDashboard: async function (request, response) {
    return response.view('pages/admin', {layout: 'layouts/admin'});
  },

  displayReauthenticationForm: async function (request, response) {
    return response.view('pages/reauthenticate', {warning: null})
  },

  reauthenticate: async function (request, response) {
    const password = request.param('password');

    if (!password) {
      return response.redirect('/admin/reauthenticate')
    }

    const userRecord = await User.findOne({id: request.me.id});
    let passwordsMatch = true;

    await sails.helpers.passwords.checkPassword(password, userRecord.password)
      .tolerate('incorrect', () => {
        passwordsMatch = false;
      });

    if (passwordsMatch) {
      sails.log.info(`User reauthenticated as administrator [who=${request.me.name}, ip=${request.ip}]`);
      request.session.reauthenticated = true;
      return response.redirect('/admin');
    }

    sails.log.warn(`User tried to reauthenticate as administrator but supplied invalid credentials [who=${request.me.name}, ip=${request.ip}]`);
    return response.view('pages/reauthenticate', {warning: sails.__('admin.invalidPassword')});
  },

  displayAdminList: async function (request, response) {
    const admins = await User.find({
      or: [
        {group: 'admin'},
        {group: 'dev'}
      ]
    });

    return response.view('pages/admins', {layout: 'layouts/admin', admins: admins});
  },

  displayAdminAdditionForm: async function (request, response) {
    const regularUsers = await User.find({ group: 'user' });

    return response.view('pages/addAdmin', { layout: 'layouts/admin', users: regularUsers });
  }
};

