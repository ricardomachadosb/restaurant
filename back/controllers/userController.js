module.exports = function(app) {
    var User = app.back.models.user;

    var UserController = {

       setup: function(req, res) {
            // create a sample user
            var nick = new User({ 
              name: 'Ricardo', 
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

        list: function(req, res) {
          User.find({}, function(err, users) {
            res.json(users);
          });
        }
    }

    return UserController;
};