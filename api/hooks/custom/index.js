module.exports = function defineCustomHook (sails) {
  return {
    routes: {
      before: {
        '/*': {
          skipAssets: true,
          fn: async function (request, response, next){
            if (request.method === 'GET') {
              if (response.locals.me !== undefined) {
                throw new Error('Cannot attach local "me" to the response, because this local already exists. Is it ' +
                  'being attached somewhere else?');
              }

              response.locals.me = undefined;
            }

            if (!request.session) { return next(); }

            if (!request.session.userId) { return next(); }

            const loggedInUser = await User.findOne({
              id: request.session.userId
            });

            if (!loggedInUser) {
              sails.log.warn('How did that happen? The user record for the logged-in user ID# ' +
                request.session.userId + ' is missing.');
              delete request.session.userId;
              return response.unauthorized();
            }

            if (request.me !== undefined) {
              throw new Error('Cannot attach local "me" to the response, because this local already exists. Is it ' +
                'being attached somewhere else?');
            }

            request.me = loggedInUser;
            response.locals.me = loggedInUser;
            response.locals.globalWarning = null;

            response.setHeader('Cache-Control', 'no-cache, no-store');

            if (request.session.warning !== undefined && request.session.warning !== null) {
              response.locals.globalWarning = request.session.warning;
              request.session.warning = null;
            }

            return next();
          }
        }
      }
    }
  }
};
