module.exports = function(app){
	var mongoose = require('mongoose');
	// set up a mongoose model and pass it using module.exports
	return mongoose.model('User', { 
	    name: {type : String, default: ''}, 
	    password: {type : String, default: ''}, 
	    admin:  {type : Boolean, default: false} 
	});
}