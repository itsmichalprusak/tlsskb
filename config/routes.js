module.exports.routes = {
  /* What the fuck */
  'get /': 'EntranceController.displayDashboard',
  'get /dev/addacc': 'DevController.addAccount',

  /* Auth */
  'get /login': 'AuthController.displayLoginForm',
  'post /login': 'AuthController.login',
  'get /logout': 'AuthController.logout',
  'get /changePassword': 'AuthController.displayPasswordChangeForm',
  'post /changePassword': 'AuthController.changePassword',

  /* Admin */
  'get /admin': 'AdminController.displayDashboard',
  'get /admin/reauthenticate': 'AdminController.displayReauthenticationForm',
  'post /admin/reauthenticate': 'AdminController.reauthenticate',
  'get /admin/browseAdmins': 'AdminController.displayAdminList',
  'get /admin/addAdmin': 'AdminController.displayAdminAdditionForm'

};
