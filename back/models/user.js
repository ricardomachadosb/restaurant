module.exports = function(app){
	var mongoose = require('mongoose');
  var RoleSchema = new mongoose.Schema({ key:{type: String, default: '' },  value:{type: String, default: '' }}  );
	// set up a mongoose model and pass it using module.exports
	return mongoose.model('User', {
	    name: {type : String, default: ''},
      	login: {type : String, default: ''},
	    password: {type : String, default: ''},
	    isLoginAble:  {type : Boolean, default: false},
	    picture : [],
      roles: [RoleSchema]
	});
}