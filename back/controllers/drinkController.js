module.exports = function(app) {

    var Drink = app.back.models.drink;

    var DrinkController = {

      list: function(req, res) {
        Drink.find().exec(function(err, drinks) {
          res.json(drinks);
        });
      }

    }

    return DrinkController;
}