module.exports = async function (request, response, proceed) {
  if (request.me && request.me.group === 'dev') {
    return proceed();
  }

  sails.log.warn(`Non-dev tried to access dev functions [who=${request.me.name}, ip=${request.ip}]`);
  request.session.warning = sails.__('dev.accessDenied');
  return response.redirect('/');
};
