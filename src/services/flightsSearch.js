import flightsDB from '../data/flights.json'

export const searchSameDayFlights = (origin,destination,day) => {
    return flightsDB.filter(flight => {
        return flight.date === day && flight.origin === origin && flight.destination === destination
    })
}

export const searchRoundTripFlights = (origin,destination,departureDay,returnDay) => {
  const departureDayFlights = searchSameDayFlights(origin,destination,departureDay)
  console.log(returnDay)
  const returnDayFlights = searchSameDayFlights(destination,origin,returnDay)
  const roundTripFlights = []
  console.log(departureDayFlights,returnDayFlights)
  for(let i = 0 ; i < departureDayFlights.length; i++){
    if(departureDayFlights[i] && returnDayFlights[i]){
      roundTripFlights.push([departureDayFlights[i],returnDayFlights[i]])
    } 
  }
  return roundTripFlights;
}
