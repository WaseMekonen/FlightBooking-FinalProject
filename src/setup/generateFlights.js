const rawFlights = require("./rawFlights.json");
const {
  IATACodeToCityName,
  getRandomAircraft,
  getRandomInt,
} = require("./utils");
const { generateRandomDatesPer24hours } = require("./dateHelpers");
const {
  ElAlairlineLogo,
  ElAlName,
  NonStop,
  MILLISECONDS_IN_1_WEEK,
} = require("./consts");
const { v4: uuid } = require("uuid");
const moment = require("moment");

const getOppositeDirection = (rawFlight) => {
  const { flightNumber, originCode, destinationCode } = rawFlight;
  const oppositeFlight = {
    ...rawFlight,
    flightNumber: "E" + flightNumber,
    originCode: destinationCode,
    destinationCode: originCode,
  };
  return oppositeFlight;
};

const createFlight = (rawFlight, departureTimestamp) => {
  const { flightNumber, originCode, destinationCode, flightDuration } =
    rawFlight;

  const arrival = departureTimestamp + flightDuration;

  const flight = {
    id: uuid(),
    date: moment(departureTimestamp).format("DD/MM/YYYY"),
    flightNumber,
    departure: departureTimestamp,
    arrival,
    originCode,
    origin: IATACodeToCityName(originCode),
    destinationCode,
    destination: IATACodeToCityName(destinationCode),
    flightDuration,
    airline: ElAlName,
    airlineLogo: ElAlairlineLogo,
    stops: NonStop,
    aircraft: getRandomAircraft(),
    price: getRandomInt(100, 350),
  };

  return flight;
};

const createOneWayRouteFlights = (
  rawFlight,
  startDateTimestamp,
  endDateTimestamp
) => {
  const departuresTimestamps = generateRandomDatesPer24hours(
    startDateTimestamp,
    endDateTimestamp,
    rawFlight.flightsPer24h
  );
  const flights = departuresTimestamps.map((departureTimestamp) =>
    createFlight(rawFlight, departureTimestamp)
  );
  return flights;
};

const createRouteFlightsRoundTripForNextWeek = (rawFlight) => {
  const today = Date.now();
  const nextWeek = Date.now() + MILLISECONDS_IN_1_WEEK;
  const oneWayFlights = createOneWayRouteFlights(rawFlight, today, nextWeek);
  const oppositeDirectionRawFlight = getOppositeDirection(rawFlight);
  const oppositeWayFlights = createOneWayRouteFlights(
    oppositeDirectionRawFlight,
    today,
    nextWeek
  );
  const roundTripFlights = [...oneWayFlights, ...oppositeWayFlights];
  return roundTripFlights;
};

const createAllFlights = (rawFlights) => {
  let flights = [];
  rawFlights.forEach((rawFlight) => {
    const flightsForCurrentRawFlight =
      createRouteFlightsRoundTripForNextWeek(rawFlight);
    flights = [...flights, ...flightsForCurrentRawFlight];
  });
  return flights;
};

module.exports = { createAllFlights };
