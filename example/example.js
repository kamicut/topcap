var config 	= require('./config.js')
var Topcap 	= require('../lib/Topcap.js')

var tc = new Topcap(config);
tc.on('data', function(data) {
	if (data["updated"] == true) 
          console.log(data["records"])
})
tc.on('error', function(error) {
	console.log(error)
})