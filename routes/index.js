var express = require('express');
var router = express.Router();
var dbApi = require('./api');

// Routes

router.get('/', function(req, res, next) {
    res.render('home', { 
        title: 'Test Application' 
    });
});

router.get('/:name_url', function(req,res){
    var object_name_url = req.params.name_url;

    dbApi.findByNameUrl([object_name_url], function(err, data){
        var main = data[0];
        var property_arr = Object.keys(main.properties);
        var properties_obj = {};

        dbApi.findByName(property_arr, function(err, data){
            for (var i=0; i<data.length; i++){
                var item =  data[i];

                if (item.hasOwnProperty('name_url')){
                    console.log(item.name);
                    // recursive process here. Loop through all its properties again...
                } else {
                    if (main.properties[item.name] == true){
                        properties_obj[item.name] = "Yes";              
                    }
                    if (item.hasOwnProperty('unit')){
                        properties_obj[item.name] = main.properties[item.name] + " " + item.unit;
                    } else {
                        properties_obj[item.name] = main.properties[item.name];
                    }
                }
            }

            res.render('object', {
                object_name: main.name,
                properties: properties_obj,
            });
        });
        
    });
});

module.exports = router;
