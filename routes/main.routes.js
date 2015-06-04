module.exports = function(tutApp, passport) {
  
  // ---------------------
  // Routes
  // =====================

  // APP routes
  // ==========
  tutApp.route('/')
  .get(function(req, res) {
    res.send('Welcome to the index')
  })

  .post(function(req, res) {
    res.send('Post on index');
  });
  

  tutApp.route('/profile')
  .get(isLoggedIn, function(req, res) {
    console.log(req.user);
    var userDet = req.user;
    res.status(200).send(req.user);
  })

  .post(isLoggedIn, function(req, res) {
    console.log(req.body);
    res.status(200).send('post...within profile.');
  });

  // API routes
  // ==========
  tutApp.route('/api')
  .get(function(req, res) {
    res.send('On API route');
  });


  // ---------------------
  // GOOGLE ROUTES
  // =====================

  // profile gets basic info including name, email gets email
  tutApp.route('/auth/google')
  .get(passport.authenticate('google', {
    scope : ['profile', 'email'],
    hostedDomain: 'andela.co'
  }));

  tutApp.route('/oauth2callback')
  .get(passport.authenticate('google', {
     successRedirect : '/profile',
     failureredirect : '/' 
   }));
};

function isLoggedIn(req, res, next) {
  if(req.isAuthenticated())
    return next();

  res.redirect('/');
}
