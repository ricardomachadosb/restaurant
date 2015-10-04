module.exports = function(app) {

    var Dish = app.back.models.dish;

    var DishController = {

      list: function(req, res) {
        Dish.find().exec(function(err, dishes) {
          res.json(dishes);
        });
      }

    }

    return DishController;
}