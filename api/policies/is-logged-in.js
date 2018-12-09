module.exports = async function (request, response, proceed) {
  if (request.me) {
    return proceed();
  }

  return response.redirect('/login');
};
