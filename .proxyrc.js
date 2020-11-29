const serveStatic = require("serve-static");

module.exports = function (app) {
  // Use static middleware
  app.use(serveStatic("static"));
  app.use(serveStatic("static/viking_room"));
  app.use(serveStatic("static/viking_room/textures"));
};
