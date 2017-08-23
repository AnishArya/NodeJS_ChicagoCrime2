var output = []
var arr = []
var fss = require('fs');
var wr = fss.createWriteStream('../json/stackedBar.json')// this writes the json data
var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('../csv/crimedata.csv')// to read csv file
});
lineReader.on('line', function(line) {
    var jsonFromLine = {};
    var lineSplit = line.split(/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/);// regex to seperate the problem of multiple
    jsonFromLine.description = lineSplit[6];
    jsonFromLine.Primary_Type = lineSplit[5];
    jsonFromLine.year = lineSplit[17];

   if (jsonFromLine.Primary_Type === 'CRIMINAL DAMAGE') {
        output.push(jsonFromLine);
    }
});

lineReader.on('close', function(line) {
    var x = output.reduce((pro, data) => { //this will reduce full array to the required array over years
        for (let k = 0; k < 16; k++) {
            if (data.description === 'TO PROPERTY') {
                if (data.year == '200' + (1 + k)) pro[0][k]++
                    else if (data.year == '20' + (1 + k)) pro[0][k]++
            }
            if (data.description == 'TO VEHICLE') {
                if (data.year == '200' + (1 + k)) pro[1][k]++
                    else if (data.year == '20' + (1 + k)) pro[1][k]++
            }
            if (data.description == 'TO STATE SUP PROP') {
                if (data.year == '200' + (1 + k)) pro[2][k]++
                    else if (data.year == '20' + (1 + k)) pro[2][k]++
            }
        }
        return pro
    }, [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ])
    for (let j = 0; j < 16; j++)  // this will iterate over years
        var obj = {
            year: j + 2001,
            toStateSupProperty: x[2][j],
            toVehicle: x[1][j],
            toProperty: x[0][j]
        }
        arr.push(obj)// to push the required data
    }
    wr.write(JSON.stringify(arr, null, 2))// Sthis converts  string data to JSON
});
