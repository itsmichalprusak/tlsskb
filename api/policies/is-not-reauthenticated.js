module.exports = async function (request, response, proceed) {
  if (request.session.reauthenticated) {
    return response.redirect('/admin');
  }

  return proceed();
};
