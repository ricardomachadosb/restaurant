module.exports = function(app){
	var mongoose = require('mongoose');
	var PictureSchema = new mongoose.Schema({
	 base64:{type: String, default: '' },  
	 fileName:{type: String, default: '' },
	 fileSize:{type: Number},
	 fileType:{type: String, default: ''}
	});

//	var picture =
//	var Mixed = mongoose.Schema.Types.Mixed;
//new mongoose.Schema({ _user: Mixed })
	
	return mongoose.model('Drink', {
      code : {type : String},
      price : {type : Number},
      name : {type : String, default: ''},
      description : {type : String, default: ''},
	  picture : [],
      isVisible : {type : Boolean, default: false}
	});
}