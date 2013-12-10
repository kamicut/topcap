topcap
======

Using topcap, you can stream the data from your Google Spreadsheet as a Node.js service. By installing a Google Apps Script on your Google Drive, topcap can notify you when a change occurs.

Installation
------------
After cloning the repo, install Topcap dependencies using `npm install`

To use your own spreadsheet with Topcap do the following:

1.  Make a copy of [this](https://docs.google.com/spreadsheet/ccc?key=0Aqv3NjQVGHDbdDB6NnZjdXZ1bTFIbmNvUGs0V2FSUlE#gid=0) spreadsheet `File > Make a Copy`
2.  Authorize with `Authorize > Authorize Application`
3.  Next go to to `Tools > Script Editor`
3.  Choose `Publish > Deploy as Web App.` 
      * Write 'init' or 'first commit' in "Save a New Version"
      * Execute the app: 'me'
      * Who has access to the app: 'Anyone, even anonymous'
      * Press publish
5.  Copy the URL of your script

Usage
-----
```javascript
var tc = new Topcap({
	scriptURL: "YOUR-SCRIPT-URL"
}) 

tc.on('data', function(data) {
     if (data["updated"] == true) 
          console.log(data["records"])
})
          
tc.on('error', function(error) {
 console.log(error);
})
```
