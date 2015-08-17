 // app/routes.js

// grab the nerd model we just created
module.exports = function(app) {
    var Nerd = app.back.models.nerd;

    var NerdController = {
        // server routes ===========================================================
        // handle things like api calls
        // authentication routes

        // sample api route
        list: function(req, res) {
            // use mongoose to get all nerds in the database
            Nerd.find(function(err, nerds) {

                // if there is an error retrieving, send the error.
                                // nothing after res.send(err) will execute
                if (err)
                    res.send(err);

                res.json(nerds);// return all nerds in JSON format
            });
        },

        // route to handle creating goes here (app.post)
        // route to handle delete goes here (app.delete)

        // frontend routes =========================================================
        // route to handle all angular requests
        index: function(req, res) {
            res.sendfile('./public/views/index.html'); // load our public/index.html file
        }
    }

    return NerdController;
};