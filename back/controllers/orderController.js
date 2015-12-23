module.exports = function(app) {

  var Table = app.back.models.table;
  var Order = app.back.models.order;

  var get = function(req, res ) {
    Order.findOne({_id: req.params.id}).populate("tables").populate("dishes.dish").populate("drinks.drink").exec(function(err, order){

      for(var i =0; i < order.dishes.length; i++){
        order.dishes[i].dish.picture = [];
      }

      res.json(order);
    });
  };

  var list = function(req, res) {
    Order.find().populate("tables").exec(function(err, orders) {
      res.json(orders);
    });
  };

  var remove = function(req, res) {
    Order.remove({_id: req.params.id}, function(err) {
      if (err) throw err;
      console.log('Order deleted successfully');
      res.json({ success: true });
    });
  };

  var count = function(){
    Order.count({}, function(err, count) {
      if (err) throw err;

      return count;
    });
  };

  var generateOrder = function(req, res){

    Order.findOne().sort({code: "desc"}).exec(function(err, order) {
      if (err) throw err;
        if(order){
          var codeString = "" + (parseInt(order.code)  + 1);
          var pad = "0000"
          var code = pad.substring(0, pad.length - codeString.length) + codeString;

          var order = new Order({
            code: code,
            status: false,
            tables: []
          });

          order.save(function(err) {
            if (err) throw err;

            console.log('order saved successfully');
            res.json(order);
          });
      
        }else {
          var order = new Order({
            code: "0001",
            status: false,
            tables: []
          });

          order.save(function(err) {
            if (err) throw err;

            console.log('order saved successfully');
            res.json(order);
          });
        }
    });

  };

 var setup = function(req, res) {

    Table.findOne({_id: '566efcbcf5caf5cc26000003'}, function(err, table){
      var order = new Order({
        code : '01',
        tables: [table]
      });

      order.save(function(err) {
      if (err) throw err;

        console.log('User saved successfully');
        res.json({ success: true });
      });

    });
  };

  var put = function(req, res) {
    Order.findOne({_id: req.params.id}, function(err, order) {
      if (err) throw err;
      order.code = req.body.code;
      order.status = req.body.status;
      order.dishes =  req.body.dishes;
      order.drinks =  req.body.drinks;
      order.tables =  req.body.tables;
      order.save();
      
      res.json({ success: true });
      
    });
  };

  return{
    list: list,
    remove: remove,
    setup: setup,
    count: count,
    generateOrder: generateOrder,
    put: put,
    get: get
  }
}