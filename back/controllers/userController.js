module.exports = function(app) {
    var User = app.back.models.user;

    var UserController = {

       setup: function(req, res) {

            // create a sample user
            console.log(req.body);
            var nick = new User({ 
              name: 'admin', 
              password: '123',
              admin: true
            });

            // save the sample user
            nick.save(function(err) {
              if (err) throw err;

              console.log('User saved successfully');
              res.json({ success: true });
            });
        },

        create: function(req, res) {
            // create a sample user
            console.log(req.body);
            var nick = new User({ 
              name: req.body.name, 
              password: req.body.password,
              admin: true
            });

            // save the sample user
            nick.save(function(err) {
              if (err) throw err;

              console.log('User saved successfully');
              res.json({ success: true });
            });
        },

        remove: function(req, res) {
          console.log(req.body);
          User.remove({_id: req.params.id}, function(err) {
              if (err) throw err;
              console.log('User deleted successfully');
              res.json({ success: true });
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