var request 		= require('request');
var qs 			= require('querystring');
var EventEmitter 	= require('events').EventEmitter

/* Topcap 
 * Connects to a Google Spreadsheet and a Google Apps Script
 * When the sheet is modified, Topcap emits the content of the sheet
 */
function Topcap(config) {
	if (!(this instanceof Topcap )) return new Topcap(config)
	EventEmitter.call(this)

	this._sheet = config.sheet || "Sheet1";
	this._scriptURL = config.scriptURL;
	this._interval = config.interval || 20000;
	this._time = 0;
	this._timerId = 0;
	this.start()
}
Topcap.prototype = Object.create(EventEmitter.prototype)

Topcap.prototype._doRequest = function() {
	var self = this;
	var params = {
		sheet: this._sheet,
		time: this._time
	}
	var url = self._scriptURL +  "?" + qs.stringify(params);
	request(url, function(error, response, body) {
		if (!error && response.statusCode == 200) {
			var json = JSON.parse(body);
			if (json["time"]) self._time = json["time"];
			self.emit('data', json)
	  	} else {
	  		self.emit('error', error)
	  	}
	});
}

Topcap.prototype.start = function() {
	var self = this;
	this._timerId = setInterval(function() {
		self._doRequest()
	}, this._interval)
}

Topcap.prototype.pause = function() {
	clearInterval(this._timerId)
}

module.exports = Topcap

