var output = []
var arr = []
var fss = require('fs');
var wr = fss.createWriteStream('../json/yearWise.json')// this writes the json data
var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('../csv/crimedata.csv')// to read csv file
});
lineReader.on('line', function(line) {
    var jsonFromLine = {};
    var lineSplit = line.split(/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/);// regex to seperate the problem of multiple commas in a column
        jsonFromLine.Primary_Type = lineSplit[5]//this contains the type of theft
        jsonFromLine.year = lineSplit[17] // this contains the year
    if (jsonFromLine.Primary_Type === 'BURGLARY' || jsonFromLine.Primary_Type === 'ROBBERY') {
        output.push(jsonFromLine) } })
lineReader.on('close', function(line) {
    var x = output.reduce((burg, data) => {//this will reduce full array to the required array over the given years
            for (let k = 0; k < 16; k++) {
                if (data.Primary_Type == 'BURGLARY') {
                    if (data.year == '200' + (1 + k)) burg[0][k]++
                        else if (data.year == '20' + (1 + k)) burg[0][k]++
                }
                if (data.Primary_Type == 'ROBBERY') {
                    if (data.year == '200' + (1 + k)) burg[1][k]++
                        else if (data.year == '20' + (1 + k)) burg[1][k]++ } }
            return burg
        }, [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] ])
    for (let j = 0; j < 16; j++) {// to push the required data to arr
        var obj = {
            year: j + 2001,
            robbery: x[1][j],
        }
        arr.push(obj)
    }
    wr.write(JSON.stringify(arr, null, 2))// this converts  string data to JSON
});
