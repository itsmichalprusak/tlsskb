module.exports = async function (request, response, proceed) {
  if (request.session.reauthenticated) {
    return proceed();
  }

  return response.redirect('/admin/reauthenticate');
};
