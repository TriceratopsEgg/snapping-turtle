const settings = require('./settings/settings.service.js');
const projects = require('./projects/projects.service.js');
const users = require('./users/users.service');
const track = require('./track/track.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function(app) {
  app.configure(settings);
  app.configure(projects);
  app.configure(users);
  app.configure(track);
};
