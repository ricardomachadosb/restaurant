 // app/routes.js

// grab the nerd model we just created

module.exports = function(app) {
    //var router = app.get('router'); 
    var nerdController = app.back.controllers.nerdController;
    //var authController = app.back.controllers.authController;
    
    // server routes ===========================================================
    // handle things like api calls
    // authentication routes

    // sample api route
   // app.get('/api/nerds', authController.checkAuth, nerdController.index);
    app.get('/api/nerds', nerdController.index);

    // route to handle creating goes here (app.post)
    // route to handle delete goes here (app.delete)

    // frontend routes =========================================================
    // route to handle all angular requests
    app.get('/', nerdController.index);
};