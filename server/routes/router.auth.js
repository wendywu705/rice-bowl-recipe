const passport = require('passport');

module.exports = (app) => {
  // This function checks that the user is Authenticated
  // If the user is not authenticated, an error page will be rendered.
  // Otherwise, it will call next() so that the user can access the restricted API route.
  const checkAuth = (req, res, next) => {
    console.log('Current user is:', req.user);
    const isLoggedIn = req.isAuthenticated() && req.user;
    if (!isLoggedIn) {
      return res.status(401).json({
        error: 'You must be logged in!',
      });
    }
    next();
  };
  // Auth route to the Google oauth server
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email'],
    }),
  );

  // The callback route for Google oauth to redirect to
  app.get(
    '/auth/google/callback',
    passport.authenticate('google', {
      failureRedirect: '/error',
      successRedirect: 'http://localhost:3000/home',
      session: true,
    }),
    (_req, _res) => {
      console.log('Google success');
    },
  );

  // Logout route
  // Removes req.user and clears any logged in session
  app.get('/auth/logout', (req, res) => {
    req.logout();
    return res.redirect('/');
  });

  app.get('/testauth', checkAuth, (req, res) => {
    res.send('You have succesfully found the secret auth page!');
  });

  // Display error when log in fails
  app.get('/error', (req, res) => {
    res.send('Failed to log in');
  });

  app.get('/api/current_user', checkAuth, (req, res) => {
    res.send(req.user);
  });
};
