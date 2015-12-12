module.exports = function(app) {

  var Table = app.back.models.table;
  var Order = app.back.models.order;



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

      var countString = "" + count();
      var pad = "0000"
      var code = pad.substring(0, pad.length - countString.length) + countString;

      var order = new Order({
        code: code,
        status: false,
        tables: []
      });

      order.save(function(err) {
        if (err) throw err;

        console.log('order saved successfully');
        res.json({ order: order });
      });

    };

   var setup = function(req, res) {

      Table.findOne({_id: '566b34acef8aa58817000002'}, function(err, table){
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

    return{
      list: list,
      remove: remove,
      setup: setup,
      count: count,
      generateOrder: generateOrder
    }
}