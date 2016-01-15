var jwt = require('jsonwebtoken'); 

module.exports = function(app) {
    var User = app.back.models.user;

    var AuthController = {

        authenticate: function(req, res) {
          User.findOne({
            login: req.body.login
          }, function(err, user) {
              if (err){
               throw err;
              }

              if (!user) {
                res.json({ success: false, message: 'Authentication failed. User not found.' });
              } else if (user) {
                // check if password matches
                if (user.password != req.body.password) {
                  res.json({ success: false, message: 'Authentication failed. Wrong password.' });
                } else if(!user.isLoginAble){
                  res.json({ success: false, message: 'This user is not able to access the system anymore' });
                }else {

                  // if user is found and password is right
                  // create a token
                  
                  //emptying the picture from user to not over size the generated token
                  user.picture  = [];

                  console.log(user);
                  var token = jwt.sign(user, app.get('superSecret'), {
                    expiresIn: 1440 * 60// expires in 24 hours
                  });

                  // return the information including token as JSON
                  res.json({
                    success: true,
                    message: 'Enjoy your token!',
                    token: token,
                    userRoles: user.roles
                  });
                }   
              }
            });
      },

       checkAuth: function(req, res, next) {
          // check header or url parameters or post parameters for token
          var token = req.body.token || req.query.token || req.headers['x-access-token'];

          // decode token
          if (token) {

            // verifies secret and checks exp
            jwt.verify(token, app.get('superSecret'), function(err, decoded) {      
              if (err) {
                return res.json({ success: false, message: 'Failed to authenticate token.' });    
              } else {
                // if everything is good, save to request for use in other routes
                req.currentUser = decoded;    
                next();
              }
            });

          } else {

            // if there is no token
            // return an error
            return res.status(403).send({ 
                success: false, 
                message: 'No token provided.' 
            });
            
          }
        }
    }
    return AuthController;
};