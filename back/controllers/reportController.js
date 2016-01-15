var dateFormat = require('dateformat');
module.exports = function (app) {

    var Order = app.back.models.order;
    
    var formatDate = function(date){
        var newDate = date.split('/');
        return newDate[1] + '/' + newDate[0] + '/' + newDate[2];
    }

    var ReportController = {
        
        generalBilling: function (req, res) {
            console.log(req.body.start + ' ' + dateFormat( formatDate(req.body.start), 'isoDateTime'));
            var drinks = [], dishes = [];
            var totalDishes = 0, totalDrinks = 0, totalPayment = 0;
            Order.find({"status":4, "lastModified":{$gte: dateFormat( formatDate(req.body.start), 'isoDateTime'), $lt: dateFormat( formatDate(req.body.end), 'isoDateTime')}}).exec(function (err, orders) {
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
                res.json({totalPayment: totalPayment, totalDishes: totalDishes, totalDrinks: totalDrinks});
            });
            
        }
    }

    return ReportController;
}