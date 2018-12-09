module.exports = {
  displayDashboard: async function (request, response) {
    return response.view('pages/dashboard', { layout: 'layouts/dashboard' });
  }
};

