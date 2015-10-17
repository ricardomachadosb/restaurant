module.exports = function(app) {

    var Drink = app.back.models.drink;

    var DrinkController = {

      list: function(req, res) {
        Drink.find().exec(function(err, drinks) {
          res.json(drinks);
        });
      },

      create: function(req, res) {
        var drink = new Drink({
          code: req.body.code,
          price: req.body.price,
          name: req.body.name,
          description: req.body.description,
          picture: req.body.picture,
          isVisible: req.body.isVisible
        });

        drink.save(function(err) {
          if (err) throw err;

          console.log('Drink saved successfully');
          res.json({ success: true });
        });
      },

      remove: function(req, res) {
        Drink.remove({_id: req.params.id}, function(err) {
            if (err) throw err;
            console.log('Drink deleted successfully');
            res.json({ success: true });
        });
      },

    }

    return DrinkController;
}