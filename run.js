var config 	= require('./config.js')
var Topcap 	= require('./Topcap.js')

var tc = new Topcap(config);
tc.on('data', function(data) {
	console.log(data)
})
tc.on('error', function(error) {
	console.log(error)
})