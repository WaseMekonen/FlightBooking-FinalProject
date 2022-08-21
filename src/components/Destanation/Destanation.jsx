import React, { useContext, useEffect, useState } from "react";
import { getData } from "../../Utils/clientFunctions";
import { FaArrowRight } from "react-icons/fa";
import { AppContext } from "../ProviderWrapper/ProviderWrapper";
import {
  searchSameDayFlights,
  searchRoundTripFlights,
} from "../../services/flightsSearch";
import moment from "moment";
import styles from "./Destanation.module.css";

const Destanation = () => {
  const { searchInputs, setSearchInputs, setRadio, radio, setFlightResults } =
    useContext(AppContext);
  const destinationUrl = "/popularDestiantion.json";
  const [popularDest, setPopularDest] = useState([]);

  useEffect(() => {
    getData(destinationUrl, setPopularDest);
  }, []);

  const searchFlight = () => {
    if (searchInputs.origin === searchInputs.destination) {
      alert("You can't choose the same city");
      return;
    }
    const departureDay = moment(searchInputs.departureDate).format(
      "DD/MM/YYYY"
    );
    const returnDay = moment(searchInputs.returnDate).format("DD/MM/YYYY");
    let flights = [];

    if (radio === "roundTrip") {
      flights = searchRoundTripFlights(
        searchInputs.origin,
        searchInputs.destination,
        departureDay,
        returnDay
      );
    } else {
      flights = searchSameDayFlights(
        searchInputs.origin,
        searchInputs.destination,
        departureDay
      );
    }
    setFlightResults(flights);
  };

  const popularDestElement = popularDest
    ? popularDest.map((spot, i) => {
        return (
          <div
            className={styles.card}
            key={i}
            style={{
              backgroundImage: `url(${spot.destanationPic})`,
            }}
          >
            <div className={styles.cardDetails}>
              <p className={styles.detailsRoute}>
                <span>{spot.origin}</span>
                <FaArrowRight />
                <span>{spot.destination}</span>
              </p>
              <p className={styles.detailsTrip}>
                <span>One Way</span>
                <span>{moment(spot.departure).format("MMM Do YY")}</span>
              </p>
              <p className={styles.detailsPrice}>
                <span
                  to="/flightsResult"
                  onClick={() => {
                    setRadio("oneWay");
                    setSearchInputs({
                      origin: spot.origin,
                      destination: spot.destination,
                      departureDate: spot.departure,
                    });
                  }}
                >
                  Book Now
                </span>

                <h5>From ${spot.price}</h5>
              </p>
            </div>
          </div>
        );
      })
    : null;

  return (
    <section className={styles.popularDestinations}>
      <h1 className={styles.heading}>Popular Destinations</h1>
      <article className={styles.cardsContainer}>{popularDestElement}</article>
    </section>
  );
};

export default Destanation;
