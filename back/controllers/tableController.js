module.exports = function(app) {

  var Table = app.back.models.table;

  var tableController = {

    list: function(req, res) {
      Table.find().exec(function(err, tablees) {
        res.json(tablees);
      });
    },

    listAvaliableTables: function(req, res) {
      Table.find( { $or:[{'status':null}, {'status': false}]}).exec(function(err, tablees) {
        res.json(tablees);
      });
    },

    create: function(req, res) {
      var table = new Table({
        code: req.body.code,
        status: req.body.status
      });

      table.save(function(err) {
        if (err) throw err;

        console.log('table saved successfully');
        res.json({ success: true });
      });
    },

    remove: function(req, res) {
      Table.remove({_id: req.params.id}, function(err) {
        if (err) throw err;
        console.log('Table deleted successfully');
        res.json({ success: true });
      });
    },

    get: function(req, res ) {
      Table.findOne({_id: req.params.id}, function(err, table){
        res.json(table);
      });
    },

    put: function(req, res) {
      Table.findOne({_id: req.params.id}, function(err, table) {
        if (err) throw err;
        table.code = req.body.code;
        table.status = req.body.status

        table.save();
        res.json({ success: true });
      });
    },

    saveAll: function(req, res){
      
      for(var i = 0; i < req.body.length; i++){
        var reqTable = req.body[0];
        Table.findOne({_id: reqTable._id}, function(err, table) {
          if (err) throw err;
          table.code = reqTable.code;
          table.status = reqTable.status

          table.save();
          res.json({ success: true });
        });
      }
    }
  }

  return tableController;
}