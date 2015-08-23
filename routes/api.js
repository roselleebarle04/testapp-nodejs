/**
 * Very simplified dataset
 */
var data = [
  {
    name: 'Nexus 5', 
    name_url: 'nexus-5',
    properties: {
      "compass" : true,
      "clock_speed": 2.3,
      "cores": 4,
      "front_camera_megapixel": 1.3,
      "gps": true,
      "ram": 2,
      "Android 4.4 KitKat": true,
      "Qualcomm Snapdragon 800 MSM8974AA v2": true,
      "weight": 130
    }
  },
  {
    name: "Android 4.4 KitKat",
    name_url: "android-4-4-kitkat",
    properties: {
      "4k": true,
      "widgets": true,
      "apps": 1000000,
      "opengl_es_3_0": true,
      "customize_notifications": true,
      "offline_voice_recognition": true
    }
  },
  {
    name: "Qualcomm Snapdragon 800 MSM8974AA v2",
    name_url: "qualcomm-snapdragon-800",
    properties: {
      "cpu_threads": 4,
      "Qualcomm Adreno 330 (450MHz)": true,
      "Qualcomm Krait 400": true,
      "semiconductor_size": 28,
      "max_mem_bandwidth": 12.8
    }
  },
  {
    name: "Qualcomm Adreno 330 (450MHz)",
    name_url: "qualcomm-adreno-330",
    properties: {
      "openvg_version": 3,
      "gpu_clock_speed": 450
    }
  },
  {
    name: "Qualcomm Krait 400",
    name_url: "qualcomm-krait-400",
    properties: {
      "virtualization": true,
      "nxbit": true
    }
  },
  {
    name: "weight",
    unit : "g"
  },
  {
    name: "ram",
    unit : "GB"
  },
  {
    name: "front_camera_megapixel",
    unit : "MP"
  },
  {
    name: "cores"
  },
  {
    name: "clock_speed"
  },
  { 
    name: "gps"
  },
  { 
    name: "4k"
  },
  { 
    name: "widgets"
  },
  { 
    name: "apps"
  },
  { 
    name: "opengl_es_3_0"
  },
  { 
    name: "customize_notifications"
  },
  { 
    name: "offline_voice_recognition"
  },
  { 
    name: "cpu_threads"
  },
  { 
    name: "semiconductor_size"
  },
  { 
    name: "max_mem_bandwidth"
  },
  { 
    name: "openvg_version"
  },
  { 
    name: "gpu_clock_speed"
  },
  { 
    name: "virtualization"
  },
  { 
    name: "nxbit"
  },
  {
    name: "compass"
  }
];


/**
 * Finds the objects in the test DB with the object.name matching a name
 * in the names array passed by
 *
 * @param {Array} names - Names to search by
 * @param {Function} cb - callback (err, [objects])
 *
 * Note: The function uses a timeout in order to emulate a
 *       DB request (slow and asynchronous process)
 */
module.exports.findByName = function(names, cb){
  setTimeout(function(){
    cb(null, data.filter(function(o){
               return ~names.indexOf(o.name);
             })
      );
  },100);
};



/**
 * Finds the objects in the test DB with the object.name_url matching a 
 * name_url in the nameUrls array passed by
 *
 * @param {Array} nameUrls - Names to search by
 * @param {Function} cb - callback (err, [objects])
 *
 * Note: The function uses a timeout in order to emulate a
 *       DB request (slow and asynchronous process)
 */
module.exports.findByNameUrl = function(nameUrls, cb){
  setTimeout(function(){
    cb(null, data.filter(function(o){
      return ~nameUrls.indexOf(o.name_url);
    })
      );
  },100);
};