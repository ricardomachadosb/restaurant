module.exports = function(app) {
    var User = app.back.models.user;

    var UserController = {

       setup: function(req, res) {

            // create a sample user
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
              picture: req.body.picture,
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
          if(req.decoded._id == req.params.id){
              res.json({ success: false, message: 'Não é possível excluir o proprio usuário'});
              return;
          }
          User.remove({_id: req.params.id}, function(err) {
              if (err) throw err;
              console.log('User deleted successfully');
              res.json({ success: true });
          });

        },

        put: function(req, res) {
          User.findOne({_id: req.params.id}, function(err, user) {
              if (err) throw err;
              user.name = req.body.name,
              user.password = req.body.password,
              user.login = req.body.login,
              user.isLoginAble = req.body.isLoginAble,
              user.picture = req.body.picture;
              user.roles = req.body.roles

              user.save();
              res.json({ success: true });
          });

        },

        edit: function( req, res ) {
              User.findOne({_id: req.params.id}, function(err, user){
                res.json(user);
              });
        },

        list: function(req, res) {
          User.find().exec(function(err, users) {
            res.json(users);
          });
        }
    }

    return UserController;
};