var dbApi = require('./api');

/* This processor extends and uses the functionalities of the database api */

/**
 * Builds all properties of an object. 
 * @param {Object} properties - Properties to build and query from the dataset.
 */
module.exports.buildProperties = function(properties, cb){
    setTimeout(function(){
        cb(null, function(){
            var build = {};

            var property_arr = Object.keys(properties);
            dbApi.findByName(property_arr, function(err, data){
                for (var i=0; i<data.length; i++){
                    var item =  data[i];

                    if (item.hasOwnProperty('name_url')){
                        // build[item.name] = processor.buildProperties(item.properties); 
                        console.log(item.name);
                        // recursive process here. Loop through all its properties again...
                    } else {
                        if (properties[item.name] == true){
                            build[item.name] = "Yes";              
                        }
                        if (item.hasOwnProperty('unit')){
                            build[item.name] = properties[item.name] + " " + item.unit;
                        } else {
                            build[item.name] = properties[item.name];
                        }
                    }
                }
                console.log("BUILD: " + build);
                return build;
            });
        });
    },100);
};
