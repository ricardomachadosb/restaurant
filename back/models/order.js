module.exports = function(app){
	var mongoose = require('mongoose');

  var OrderDishSchema = new mongoose.Schema({ dish:{type: mongoose.Schema.ObjectId, ref: 'Dish' },
    quantity:{type: Number, default: 0 }, quantityDone:{type: Number, default: 0 }, observation: {type: String}
  });

  var OrderDrinkSchema = new mongoose.Schema({ drink:{type: mongoose.Schema.ObjectId, ref: 'Drink' },
    quantity:{type: Number, default: 0 }, observation: {type: String}
  });


	return mongoose.model('Order', {
      code : {type : String},
      status: {type: Number},
      avgTime : {type : Number},
      totalPrice: {type: Number, default: 0},
      tables: [{type : mongoose.Schema.ObjectId, ref : 'Table'}],
      lastModified: {type: Date},
      dishes: [OrderDishSchema],
      drinks: [OrderDrinkSchema]
	});
}