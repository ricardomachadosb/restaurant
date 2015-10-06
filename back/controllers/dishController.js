module.exports = function(app) {

    var Dish = app.back.models.dish;

    var DishController = {

      list: function(req, res) {
        Dish.find().exec(function(err, dishes) {
          res.json(dishes);
        });
      },

      create: function(req, res) {
            var dish = new Dish({
              code: req.body.code,
              price: req.body.price,
              name: req.body.name,
              description: req.body.description,
              avgTime: req.body.avgTime,
              picture: req.body.picture,
              isVisible: req.body.isVisible,
            });

            dish.save(function(err) {
              if (err) throw err;

              console.log('Dish saved successfully');
              res.json({ success: true });
            });
        }
    }

    return DishController;
}