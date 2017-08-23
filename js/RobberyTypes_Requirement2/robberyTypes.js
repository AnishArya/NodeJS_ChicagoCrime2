let output = []
let arr = []
let fss = require('fs');
let wr = fss.createWriteStream('../../json/RobberyTypes_Requirement2/pieChart.json')// this writes the json data
let lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('../../csv/crimedata.csv')// to read csv file
});
lineReader.on('line', function(line) {
    let jsonFromLine = {};
    let lineSplit = line.split(/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/);// regex to seperate the problem of multiple
        jsonFromLine.Primary_Type = lineSplit[5]
        jsonFromLine.year = lineSplit[17]
    if (jsonFromLine.Primary_Type === 'BURGLARY' || jsonFromLine.Primary_Type === 'ROBBERY') {
        output.push(jsonFromLine) } })
lineReader.on('close', function(line) {
    let x = output.reduce((burg, data) => {//this will reduce full array to the required array
            for (let k = 0; k < 16; k++) {
                if (data.Primary_Type == 'BURGLARY') { // This is done for the data to be general
                    if (data.year == '200' + (1 + k)) burg[0][k]++
                        else if (data.year == '20' + (1 + k)) burg[0][k]++
                }
                if (data.Primary_Type == 'ROBBERY') { // checks the type to be Robbery
                    if (data.year == '200' + (1 + k)) burg[1][k]++
                        else if (data.year == '20' + (1 + k)) burg[1][k]++ } }
            return burg
        }, [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] ])
    for (let j = 0; j < 16; j++) { // this will iterate over years
        let obj = {
            year: j + 2001,
            robbery: x[1][j],
        }
        arr.push(obj)// to push the required data to arr
    }
    wr.write(JSON.stringify(arr, null, 2))// Sthis converts  string data to JSON
});
