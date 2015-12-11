module.exports = function(app) {

  var Table = app.back.models.table;
  var Order = app.back.models.order;

  var orderController = {

    list: function(req, res) {
      Order.find().populate("tables").exec(function(err, orders) {
        console.log(orders);
        res.json(orders);
      });
    },

    remove: function(req, res) {
      Order.remove({_id: req.params.id}, function(err) {
        if (err) throw err;
        console.log('Table deleted successfully');
        res.json({ success: true });
      });
    },

     setup: function(req, res) {

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
      }
  }

  return orderController;
}