module.exports = function(app) {
  // Install a "/token" route that returns YT_TOKEN
  app.get('/api/token', function(req, res) {
    res.send({'token': process.env.YT_TOKEN});
  });
}
