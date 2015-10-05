module.exports = function(app){
	var mongoose = require('mongoose');

	return mongoose.model('Drink', {
      code : {type : Number},
      price : {type : Number},
      name : {type : String, default: ''},
      description : {type : String, default: ''},
	  picture : {type : String, default: ''},
      isVisible : {type : Boolean, default: true}
	});
}