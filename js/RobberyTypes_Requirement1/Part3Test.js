let output = []
let arr = [], type = ['ARMED OTHER DANGEROUS WEAPON', 'STRONGARM- NO WEAPON', 'AGGRAVATED VEHICULAR HIJACKING', 'ARMED: HANDGUN', 'ATTEMPT: ARMED OTHER FIREARM', 'ARMED: KNIFE/CUTTING INSTRUMENT', 'VEHICULAR HIJACKING', 'AGGRAVATED'] // type contains 8 types of robbery
let fss = require('fs'); // fs is the required npm
let wr = fss.createWriteStream('../../json/robberytypes_Requirement1/pieChart.json')// this writes the json data
let lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('../../csv/crimedata.csv')// to read csv file
});
lineReader.on('line', function(line) {
  let jsonFromLine = {};
  let lineSplit = line.split(/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/); // regex to seperate the problem of multiple commas in a column
  jsonFromLine.description = lineSplit[6];// this contains the description
  jsonFromLine.type = lineSplit[5];//this contains the type of theft
  jsonFromLine.year = lineSplit[17];// this contains the year
  if(jsonFromLine.type === 'ROBBERY')// checks if the type is robbery or not
  	output.push(jsonFromLine); });
lineReader.on('close', function(line) {
	let dataValues = output.reduce((pro, data) => {//this will reduce full array to the required array
		if(data.description === 'ARMED OTHER DANGEROUS WEAPON') pro[0]++
		if(data.description === 'STRONGARM - NO WEAPON') pro[1]++
		if(data.description === 'AGGRAVATED VEHICULAR HIJACKING') pro[2]++
		if(data.description === 'ARMED: HANDGUN') pro[3]++
		if(data.description === 'ATTEMPT: ARMED OTHER FIREARM') pro[4]++
		if(data.description === 'ARMED: KNIFE/CUTTING INSTRUMENT') pro[5]++
		if(data.description === 'VEHICULAR HIJACKING') pro[6]++
		if(data.description === 'AGGRAVATED') pro[7]++
		return pro
} , [0, 0, 0, 0, 0, 0, 0, 0] )
for(let j = 0; j < 8; j++){ // to push the required data to arr
	let obj = {
	Type: type[j],
	DATA: dataValues[j]}
	arr.push(obj)
}
wr.write(JSON.stringify(arr, null, 2))// this converts  string data to JSON
});
