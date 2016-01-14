module.exports = function(app) {

  var Drink = app.back.models.drink;
  var fs = require('fs');
  var limitItems = 8;

  var createDrink = function(req, res){
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
  };


  var DrinkController = {

    list: function(req, res) {
      /*
        CONSULTA PARA A PAGINAÇÃO.
        RECEBE A PAGINA ATUAL, MULTIPLICA O VALOR DELA PELO LIMITE PARA SABER
        QUNTOS ITENS PRECISAM SER PULADOS.
      */
      if(req.params.id ){
        Drink.find().sort({ _id: 'desc'}).skip(req.params.id * limitItems).limit(limitItems).exec(function(err, drinks) {
          res.json(drinks);
        });
      }else {
        Drink.find().exec(function(err, drinks) {
          res.json(drinks);
        });
      }
      /*
      FORMA ANTIGA DE FAZER A CONSULTA DAS BEBIDAS
      Drink.find().exec(function(err, drinks) {
      res.json(drinks);
    });
    */
  },

  create: function(req, res) {
    //var buffer = new Buffer(req.body.picture[0], 'base64');
    //  fs.writeFile("arghhhh.jpg", buffer, function(err) {console.log(err);});
        Drink.findOne({code: req.body.code}, function(err, drink){
          if(!drink){
            createDrink(req, res);
          }else {
            res.json({ success: false, message: 'Já existe produto cadastrado com este código' });
          }
        });
  },

  remove: function(req, res) {
    Drink.remove({_id: req.params.id}, function(err) {
      if (err) throw err;
      console.log('Drink deleted successfully');
      res.json({ success: true });
    });
  },

  edit: function(req, res ) {
    Drink.findOne({_id: req.params.id}, function(err, drink){
      res.json(drink);
    });
  },

  put: function(req, res) {
    Drink.findOne({_id: req.params.id}, function(err, drink) {
      if (err) throw err;
      drink.code = req.body.code;
      drink.price = req.body.price;
      drink.name = req.body.name;
      drink.description = req.body.description;
      drink.picture = req.body.picture;
      drink.isVisible = req.body.isVisible;
      drink.save();
      res.json({ success: true });
    });
  }

}

return DrinkController;
}
