const {createAllFlights} = require('./generateFlights')
const rawFlights = require("./rawFlights.json");
const path = require('path')
const fs = require('fs')

const flights = createAllFlights(rawFlights)

const json = JSON.stringify(flights);

const outputPath = path.join(__dirname,'..','public','data','flights.json')
 
fs.writeFile(outputPath, json, 'utf8', function (err) {
    if (err) {
        console.log("An error occured while writing JSON Object to File.");
        return console.log(err);
    }
    console.log(`JSON file with ${flights.length} fields has been saved.`);
});