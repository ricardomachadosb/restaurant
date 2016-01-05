module.exports = function(app){
	var mongoose = require('mongoose');

  var OrderDishSchema = new mongoose.Schema({ dish:{type: mongoose.Schema.ObjectId, ref: 'Dish' },
    quantity:{type: Number, default: 0 }, observation: {type: String}
  });

  var OrderDrinkSchema = new mongoose.Schema({ drink:{type: mongoose.Schema.ObjectId, ref: 'Drink' },
    quantity:{type: Number, default: 0 }, observation: {type: String}
  });


	return mongoose.model('Order', {
      code : {type : String},
      status: {type: Number},
      tables: [{type : mongoose.Schema.ObjectId, ref : 'Table'}],
      dishes: [OrderDishSchema],
      drinks: [OrderDrinkSchema]
	});
}