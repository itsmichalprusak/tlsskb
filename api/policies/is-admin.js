module.exports = async function (request, response, proceed) {
  if (request.me && (request.me.group === 'admin' || request.me.group === 'dev')) {
    return proceed();
  }

  sails.log.warn(`Non-admin tried to access admin functions [who=${request.me.name}, ip=${request.ip}]`);
  request.session.warning = sails.__('admin.accessDenied');
  return response.redirect('/');
};
