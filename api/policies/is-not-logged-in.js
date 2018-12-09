module.exports = async function (request, response, proceed) {
  if (request.me) {
    return response.redirect('/');
  }

  return proceed();
};
