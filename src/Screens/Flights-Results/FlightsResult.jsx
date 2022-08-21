import React, { useContext, useState, useEffect } from "react";
import moment from "moment";
import { Redirect } from "react-router-dom";
import { AppContext } from "../../components/ProviderWrapper/ProviderWrapper";
import OneWayFlight from "../../components/OneWayFlight/OneWayFlight";
import SearchBar from "../../components/SearchBar/SearchBar";
import RoundTripFlight from "../../components/RoundTripFlight/RoundTripFlight";
import { getData } from "../../Utils/clientFunctions";
import Context from "../../components/context";

import styles from "./FlightsResult.module.css";

const FlightsResult = () => {
  const { flightResults, discount, setDiscount } = useContext(Context);
  const [destinationPictures, setDestinationPictures] = useState([]);
  const [redirectToBooking, setRedirectToBooking] = useState(false);
  const { searchInputs, auth } = useContext(AppContext);
  const isRoundTrip = Array.isArray(flightResults[0]);
  const desPicUrl = "../../../destinationPictures.json";
  useEffect(() => {
    getData(desPicUrl, setDestinationPictures);
  }, []);
  console.log({ destinationPictures });
  console.log(searchInputs.destination);
  console.log(searchInputs);

  return (
    <>
      <header className={styles.FlightsResultHeader}>
        <SearchBar mainClass={styles.flightResultSearchBar} />
      </header>
      <main className={styles.FlightsResultContainer}>
        {redirectToBooking ? (<Redirect to="/booking"></Redirect>) : ""}

        
        {isRoundTrip ? (
          
          <div className={styles.resultsForRoudTrip}>
            {discount ? (
          <div className={styles.member}>
            <span
              onClick={() => {
                setDiscount(false);
              }}
            >
              X
            </span>
            <p className={styles.message}>
              Log in now and get 10% off your flight ticket
            </p>
            <div className={styles.choose}>
              <p className={styles.login}>login</p>
              <p
                className={styles.continue}
                onClick={() => {
                  setRedirectToBooking(true);
                }}
              >
                Continue
              </p>
            </div>
          </div>
        ) : null}
            <div
              className={styles.destination}
              style={{
                backgroundImage: `url(${
                  destinationPictures[flightResults[0][0].destination]
                })`,
              }}
            >
              <h4>
                Your trip to {flightResults[0][0].destination} |{" "}
                {moment(searchInputs.departureDate).format("MMM Do YYYY")}
              </h4>
            </div>
            <div className={styles.results}>
              {flightResults.length &&
                flightResults.map((flight, i) => (
                  <RoundTripFlight flight={flight} key={i} />
                ))}
            </div>
          </div>
        ) : (
          <div className={styles.resultsForRoudTrip}>
            {discount ? (
          <div className={styles.member}>
            <span
              onClick={() => {
                setDiscount(false);
              }}
            >
              X
            </span>
            <p className={styles.message}>
              Log in now and get 10% off your flight ticket
            </p>
            <div className={styles.choose}>
              <p className={styles.login}>login</p>
              <p
                className={styles.continue}
                onClick={() => {
                  setRedirectToBooking(true);
                }}
              >
                Continue
              </p>
            </div>
          </div>
        ) : null}
            <div
              className={styles.destination}
              style={{
                backgroundImage: `url(${
                  destinationPictures[flightResults[0].destination]
                })`,
              }}
            >
              <h4>
                Your trip to {flightResults[0].destination} |{" "}
                {moment(searchInputs.departureDate).format("MMM Do YYYY")}
              </h4>
            </div>
            <div className={styles.results}>
              {flightResults.length &&
                flightResults.map((flight, i) => (
                  <OneWayFlight flight={flight} key={i} />
                ))}
            </div>
          </div>
        )}
      </main>
      <footer className={styles.footer}></footer>
    </>
  );
};

export default FlightsResult;
