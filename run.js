var config 	= require('./config.js')
var Topcap 	= require('./Topcap.js')

var tc = new Topcap(config);
tc.on('data', function() {
	console.log(data)
})