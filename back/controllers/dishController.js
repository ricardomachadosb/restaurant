module.exports = function(app) {

    var Dish = app.back.models.dish;

    var createDish = function(req, res){
        var dish = new Dish({
          code: req.body.code,
          price: req.body.price,
          name: req.body.name,
          description: req.body.description,
          avgTime: req.body.avgTime,
          picture: req.body.picture,
          isVisible: req.body.isVisible
        });

        dish.save(function(err) {
          if (err) throw err;

          console.log('Dish saved successfully');
          res.json({ success: true });
        });
    };

    var DishController = {

      list: function(req, res) {
        Dish.find().exec(function(err, dishes) {
          res.json(dishes);
        });
      },

      create: function(req, res) {
        Dish.findOne({code: req.body.code}, function(err, dish){
          if(!dish){
            createDish(req, res);
          }else {
            res.json({ success: false, message: 'Já existe produto cadastrado com este código' });
          }
        });
      },

      remove: function(req, res) {
        Dish.remove({_id: req.params.id}, function(err) {
            if (err) throw err;
            console.log('Prato deleted successfully');
            res.json({ success: true });
        });
      },

      edit: function(req, res ) {
        Dish.findOne({_id: req.params.id}, function(err, dish){
          res.json(dish);
        });
      },

      put: function(req, res) {
        Dish.findOne({_id: req.params.id}, function(err, dish) {
            if (err) throw err;
            dish.code = req.body.code;
            dish.price = req.body.price;
            dish.name = req.body.name;
            dish.description = req.body.description;
            dish.avgTime = req.body.avgTime;
            dish.picture = req.body.picture;
            dish.isVisible = req.body.isVisible;

            dish.save();
            res.json({ success: true });
        });
      }
    }

    return DishController;
}