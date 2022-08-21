const { MILLISECONDS_IN_24_HOURS } = require("./consts");
const {getRandomInt} = require('./utils')


const getRandomTimestamps = (startDate, endDate, amount) => {
  //all date values should be timestamps
  const dates = [];
  for (let i = 0; i < amount; i++) {
    const randomDate = getRandomInt(startDate, endDate);
    dates.push(randomDate);
  }
  return dates;
};

const generateRandomDatesPer24hours = (startDate, endDate, frequency) => {
  let dates = [];
  let dayStart = startDate;
  while (dayStart < endDate) {
    let currentDayEnd = dayStart + MILLISECONDS_IN_24_HOURS;
    const datesIn24H = getRandomTimestamps(dayStart, currentDayEnd, frequency);
    dates = dates.concat(datesIn24H);
    dayStart = currentDayEnd;
  }
  return dates;
};

module.exports = { generateRandomDatesPer24hours,getRandomInt };
