var dateFormat = require('dateformat');
module.exports = function (app) {
    var total = 0;
    var atual = 0;
    var Order = app.back.models.order;
var drinksMap = {}
    var formatDate = function (date) {
        var formatedDate = date.split('/');
        return formatedDate[1] + '/' + formatedDate[0] + '/' + formatedDate[2];
    }
    
    var mapIterator = function(drink){
        if(drink.drink){
        if( drinksMap[drink.code]){
            drinksMap[drink.drink.code] = {quantity: (drinksMap[drink.drink.code].quantity + drink.quantity), 
            total: (drinksMap[drink.drink.code].total + drink.drink.price) }
        }else {
            drinksMap[drink.drink.code] = {quantity: drink.quantity, total: drink.drink.price};
        }
        if(total == atual){
        console.log(drinksMap);    
        }
        atual++;
        
        }
    }

    var ReportController = {

        generalBilling: function (req, res) {
            var drinks = [], dishes = [];
            var totalDishes = 0, totalDrinks = 0, totalPayment = 0;
            console.log(formatDate(req.body.start));
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
                    drinks.push(order.drinks);
                    dishes.push(order.dishes);
                }, this);
                total = drinks.length;
                drinks.forEach(function (drink) {
                    for (var i = 0; i < drink.length; i++) {
                        mapIterator(drink[i]);
                    }
                });    
                console.log(drinksMap);            
            });
        }
    }

    return ReportController;
}