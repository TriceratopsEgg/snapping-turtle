// Initializes the `track` service on path `/track`
const { Track } = require('./track.class');
const createModel = require('../../models/track.model');
const hooks = require('./track.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/track', new Track(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('track');

  service.hooks(hooks);
};
