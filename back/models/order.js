module.exports = function(app){
	var mongoose = require('mongoose');

  var OrderDishSchema = new mongoose.Schema({ dish:{type: mongoose.Schema.ObjectId, ref: 'Dish' },
    quantity:{type: Number, default: 0 }, observation: {Type: String}
  });


	return mongoose.model('Order', {
      code : {type : String},
      status: {type: Boolean, default: false},
      tables: [{type : mongoose.Schema.ObjectId, ref : 'Table'}],
      dishes: [OrderDishSchema]
	});
}