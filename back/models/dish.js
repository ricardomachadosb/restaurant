module.exports = function(app){
	var mongoose = require('mongoose');

	// define our nerd model
	// module.exports allows us to pass this to other files when it is called
	return mongoose.model('Dish', {
      code : {type : String},
      price : {type : Number},
      name : {type : String, default: ''},
      description : {type : String, default: ''},
	  avgTime : {type : Number},
	  picture : [],
      isVisible : {type : Boolean, default: false}
	});
}