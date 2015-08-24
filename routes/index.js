var express = require('express');
var router = express.Router();
var fdb = require('../data/api');

// Routes

router.get('/', function(req, res, next) {
    res.render('home', { 
        title: 'Test Application' 
    });
});

router.get('/:name_url', function(req,res){
    var object_name_url = req.params.name_url;
    var main_properties = {};
    var main = {}; 
    var oob = 0;

    var sortObject = function(output){
        for (val in output) {
            console.log("OUT: " + val);
            if (output[val].hasOwnProperty('parent')){
                var parent = output[val].parent;
                if (parent != main.name){
                    console.log(parent);
                    main_properties[parent][val] = output[val];
                    delete main_properties[val];
                }
            }
        }

        console.log("FINAL OUTPUT: " + JSON.stringify(output));
        res.render('object', {
            object_name: main.name,
            properties:  main_properties,
        });
    };

    var recursiveBuild = function(item, container){
        var name = item.name;
        var properties = item.properties;

        main_properties[item.name] = {};

        var namesArr = Object.keys(properties);
        fdb.findByName(namesArr, function(err, data){
            // Array of objects for each of the properties
            for (var j = 0; j < data.length; j++){
                // console.log(item);
                var item = data[j];
                if (item.hasOwnProperty('name_url')){
                    oob++;
                    recursiveBuild(item, name);
                } else {
                    main_properties[name]['parent'] = container
                    if (item.hasOwnProperty('unit')){
                        main_properties[name][item.name] = properties[item.name] + " " + item.unit;
                    } else if (properties[item.name] == true){
                        main_properties[name][item.name] = "Yes";              
                    } else {
                        main_properties[name][item.name] = properties[item.name];
                    }
                }
            }
            oob--;
            // console.log("RECUR OOB: " + oob);
            // console.log("RECUR: " + JSON.stringify(main_properties));
            if (oob == 0){
                sortObject(main_properties);
            }
        });
    };

    /**
    * Second Callback - Build the output
    * @param {Array} data - Array of objects for each of the primary properties
    **/  
    var buildProperties = function(err, data){
        for (var i = 0; i < data.length; i++){
            var item =  data[i];

            if (item.hasOwnProperty('name_url')){
                // The item is an Object embedded in the Main Object. 
                // Build the properties of the object - We call it recursive because we loop through all its properties. 
                oob++;
                recursiveBuild(item, main.name);
            } else {
                // The item is a Property 
                if (item.hasOwnProperty('unit')){
                    main_properties[item.name] = main.properties[item.name] + " " + item.unit;
                } else if (main.properties[item.name] == true){
                    main_properties[item.name] = "Yes";              
                } else {
                    main_properties[item.name] = main.properties[item.name];
                }
            }
        }
        // console.log("FINAL OOB: " + oob);
        // console.log("FINAL: " + JSON.stringify(main_properties));
        if (oob == 0){
            sortObject(main_properties);
        }
    };

    // First Callback 
    var buildOutput = function(err, data){
        main = data[0];
        console.log(main);
        var property_arr = Object.keys(main.properties);
        fdb.findByName(property_arr, buildProperties);
    }; 

    fdb.findByNameUrl([object_name_url], buildOutput)
});

module.exports = router;
