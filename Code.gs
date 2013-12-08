function doGet(request) {
    var output = ContentService.createTextOutput();
    var data = {};
  
    var id = request.parameters.id;
    var sheet = request.parameters.sheet;
    var time = request.parameters.time;
  
    var f = DriveApp.getFileById(id);
    if (typeof(time) == "undefined" || time < f.getLastUpdated().getTime()) {
      var ss = SpreadsheetApp.openById(id);
      data["records"] = readData_(ss, sheet);
      data["updated"] = true;
      data["time"] = f.getLastUpdated().getTime()
    } else {
      data["updated"] = false;
    }
    output.setContent(JSON.stringify(data));
    output.setMimeType(ContentService.MimeType.JSON);
    return output;
} 
  
function readData_(ss, sheetname, properties) {
  
    if (typeof properties == "undefined") {
      properties = getHeaderRow_(ss, sheetname);
      properties = properties.map(function(p) { return p.replace(/\s+/g, '_'); });
    }
    
    var rows = getDataRows_(ss, sheetname);
    var data = [];
    for (var r = 0, l = rows.length; r < l; r++) {
      var row = rows[r];
      var record = {};
      for (var p in properties) {
        record[properties[p]] = row[p];
      }
      data.push(record);
    }
    return data;
  }
  
  
  
  function getDataRows_(ss, sheetname) {
  
    var sh = ss.getSheetByName(sheetname);
    return sh.getRange(2, 1, sh.getLastRow() - 1, sh.getLastColumn()).getValues();
  
  }
  
  
  function getHeaderRow_(ss, sheetname) {
  
    var sh = ss.getSheetByName(sheetname);
    return sh.getRange(1, 1, 1, sh.getLastColumn()).getValues()[0];
  
  }
  
