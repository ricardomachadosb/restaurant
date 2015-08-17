// app/models/nerd.js
// grab the mongoose module
module.exports = function(app){
	var mongoose = require('mongoose');

	// define our nerd model
	// module.exports allows us to pass this to other files when it is called
	return mongoose.model('Dish', {
	    name : {type : String, default: ''},
	    dirName : {type : String, default: ''},
	    avgTime : {type : Number, default: ''}
	});
}