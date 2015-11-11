module.exports = function(app){
	var mongoose = require('mongoose');

	return mongoose.model('Table', {
      code : {type : String},
      status: {type: Boolean, default: false}
	});
}