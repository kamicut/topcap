topcap
======

Using topcap, you can stream the data from your Google Spreadsheet as a Node.js service. By installing a Google Apps Script on your Google Drive, topcap can notify you when a change occurs.

Installation
------------
First clone the repo to your machine.

You need to install a Google Apps script on your GDrive to use topcap. The script will notify the service when someone changes the spreadsheet so you don't have to sync your data.

1.  Create a new Google Apps Script from the GDrive menu
2.  Add the content of Code.gs in the Code.gs panel
3.  Choose Publish > Deploy as Web App. The parameters are: 
      * Execute the app: 'me'
      * Who has access to the app: 'Anyone, even anonymous'
4.  Authorize the app
5.  Copy the URL of your script

To install the dependencies for Topcap use `npm install`

Usage
-----
You need to modify the `config.js` file to hold the URL of your script, and the ID of your spreadsheet.
Then simply `node run.js` to start getting data from your spreadsheet.
