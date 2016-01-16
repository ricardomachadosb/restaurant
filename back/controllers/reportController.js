var dateFormat = require('dateformat');
module.exports = function (app) {
    var Order = app.back.models.order;
    var drinksMap = {}, dishesMap = {};
    
    var formatDate = function (date) {
        var formatedDate = date.split('/');
        return formatedDate[1] + '/' + formatedDate[0] + '/' + formatedDate[2];
    }
    
    var drinksItarator = function name(drinks, indice) {
        if(indice < drinks.length){
          if(drinks[indice].drink && drinks[indice].quantity > 0 ){
            if( drinksMap[drinks[indice].drink.code]){
                drinksMap[drinks[indice].drink.code] = {
                    quantity: (drinksMap[drinks[indice].drink.code].quantity + drinks[indice].quantity),
                    total: (drinksMap[drinks[indice].drink.code].total + drinks[indice].drink.price),
                    drink: drinks[indice].drink.name
                }
            }else {
                drinksMap[drinks[indice].drink.code] = {
                    quantity: drinks[indice].quantity, 
                    total: drinks[indice].drink.price, 
                    drink: drinks[indice].drink.name
                };
            }    
          }
          drinksItarator(drinks, indice +1);
        }
    }
    
    var dishesItarator = function name(dishes, indice) {
        if(indice < dishes.length){
          if(dishes[indice].dish && dishes[indice].quantity > 0 ){
            if( dishesMap[dishes[indice].dish.code]){
                dishesMap[dishes[indice].dish.code] = {
                    quantity: (dishesMap[dishes[indice].dish.code].quantity + dishes[indice].quantity),
                    total: (dishesMap[dishes[indice].dish.code].total + dishes[indice].dish.price),
                    dish: dishes[indice].dish.name                    
                }
            }else {
                dishesMap[dishes[indice].dish.code] = {
                    quantity: dishes[indice].quantity, 
                    total: dishes[indice].dish.price,
                    dish: dishes[indice].dish.name
                };
            }    
          }
          dishesItarator(dishes, indice +1);
        }
    }
    
    var ReportController = {

        generalBilling: function (req, res) {
            var drinks = [], dishes = [];
            var totalDishes = 0, totalDrinks = 0, totalPayment = 0;
            Order.find({ "status": 4, "lastModified": { $gte: dateFormat(formatDate(req.body.start), 'isoDateTime'), $lt: dateFormat(formatDate(req.body.end), 'isoDateTime') } }).exec(function (err, orders) {
                orders.forEach(function (order) {
                    drinks.push(order.drinks);
                    dishes.push(order.dishes);
                    totalPayment += order.totalPrice;
                }, this);

                drinks.forEach(function (drink) {
                    for (var i = 0; i < drink.length; i++) {
                        totalDrinks += drink[i].quantity;
                    }
                });
                
                dishes.forEach(function (dish) {
                    for (var i = 0; i < dish.length; i++) {
                        totalDishes += dish[i].quantity;
                    }
                });
                res.json({ totalPayment: totalPayment, totalDishes: totalDishes, totalDrinks: totalDrinks, totalSales: totalDishes + totalDrinks });
            });

        },
        
        itensSales: function(req, res) {
            var drinks = [], dishes = [];
            Order.find( {"status": 4}).populate("dishes.dish").populate("drinks.drink").exec(function(err, orders) {
                if (err) throw err;
                orders.forEach(function (order) {
                    drinks = drinks.concat(order.drinks);
                    dishes = dishes.concat(order.dishes);
                }, this);
                
                drinksItarator(drinks, 0);
                dishesItarator(dishes, 0);
                res.json({ dishes: dishesMap, drinks: drinksMap});
            });
        }
    }

    return ReportController;
}