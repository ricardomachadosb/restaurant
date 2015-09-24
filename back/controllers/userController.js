module.exports = function(app) {
    var User = app.back.models.user;

    var UserController = {

       setup: function(req, res) {

            // create a sample user
            console.log(req.body);
            var nick = new User({
              name: 'admin',
              password: '123',
              isLoginAble: true
            });

            // save the sample user
            nick.save(function(err) {
              if (err) throw err;

              console.log('User saved successfully');
              res.json({ success: true });
            });
        },

        create: function(req, res) {
            var nick = new User({
              name: req.body.name,
              password: req.body.password,
              login: req.body.login,
              isLoginAble: req.body.isLoginAble,
              roles: req.body.roles
            });

            // save the sample user
            nick.save(function(err) {
              if (err) throw err;

              console.log('User saved successfully');
              res.json({ success: true });
            });
        },

        remove: function(req, res) {
          User.remove({_id: req.params.id}, function(err) {
              if (err) throw err;
              console.log('User deleted successfully');
              res.json({ success: true });
          });

        },

        edit: function( req, res ) {
              console.log(req.params.id);
              User.findOne({_id: req.params.id}, function(err, user){
                res.json(user);
              });
        },

        list: function(req, res) {
          User.find({}, function(err, users) {
            res.json(users);
          });
        }
    }

    return UserController;
};