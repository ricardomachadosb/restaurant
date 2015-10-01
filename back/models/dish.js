// app/models/nerd.js
// grab the mongoose module
module.exports = function(app){
	var mongoose = require('mongoose');

	// define our nerd model
	// module.exports allows us to pass this to other files when it is called
	return mongoose.model('Dish', {
      cod : {type : Number},
      price : {type : Number},
      name : {type : String, default: ''},
      description : {type : String, default: ''},
	    avgTime : {type : Number},
	    picture : {type : String, default: ''},
      isVisible : {type : Boolean, default: true}
	});
}