module.exports.policies = {
  AuthController: {
    '*': 'is-logged-in',
    'displayLoginForm': 'is-not-logged-in',
    'login': 'is-not-logged-in'
  },
  AdminController: {
    '*': ['is-logged-in', 'is-admin', 'is-reauthenticated'],
    'displayReauthenticationForm': ['is-logged-in', 'is-admin', 'is-not-reauthenticated'],
    'reauthenticate': ['is-logged-in', 'is-admin', 'is-not-reauthenticated'],
    'displayAdminList': ['is-logged-in', 'is-dev', 'is-reauthenticated'],
    'addAdmin': ['is-logged-in', 'is-dev', 'is-reauthenticated']
  },
  EntranceController: {
    '*': 'is-logged-in'
  }
};
