module.exports = function(app){
	var mongoose = require('mongoose');

	return mongoose.model('Order', {
      code : {type : String},
      status: {type: Boolean, default: false},
      tables: [{type : mongoose.Schema.ObjectId, ref : 'Table'}]
	});
}