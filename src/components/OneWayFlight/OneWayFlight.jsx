import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import Context from "../context";

import { msToTime, timestampClockTime } from "../../Utils/time";

import styles from "./OneWayFlight.module.css";

const OneWayFlight = ({ flight }) => {
  const {
    departure,
    arrival,
    airlineLogo,
    airline,
    destinationCode,
    originCode,
    price,
    stops,
    flightDuration,
  } = flight;

  const [redirectToBooking, setRedirectToBooking] = useState(false);
  const { setFlight, setDiscount } = useContext(Context);

  // console.log(timestampClockTime(departure), timestampClockTime(arrival));

  return (
    <section className={styles.ticketRoundTrip}>
      {redirectToBooking ? <Redirect to="/booking"></Redirect> : ""}

      <section className={styles.left}>
        <article className={styles.roundTripTicketsContainer}>
          <article className={styles.ticketFlightDetailsRoundTrip}>
            <div className={styles.airlineRoundTrip}>
              <img src={airlineLogo} alt="ElAl logo" />
              <h5>{airline}</h5>
            </div>
            <div className={styles.departureRoundTrip}>
              <h5>{timestampClockTime(departure)}</h5>
              <h4>{originCode}</h4>
            </div>
            <div className={styles.FlightDurationRoundTrip}>
              <h5>{msToTime(flightDuration)}</h5>
              <hr />
              <h5>{stops}</h5>
            </div>
            <div className={styles.arrivalRoundTrip}>
              <h5>{timestampClockTime(arrival)}</h5>
              <h4>{destinationCode}</h4>
            </div>
          </article>
        </article>
      </section>
      <section className={styles.right}>
        <article className={styles.lineSparateRoundTrip}>
          <div className={styles.topDotRoundTrip}></div>
          <div className={styles.lineRoundTrip}></div>
          <div className={styles.bottomDotRoundTrip}></div>
        </article>
        <article className={styles.ticketPriceRoundTrip}>
          <div className={styles.flightPriceRoundTrip}>
            <h1>${flight.price}</h1>
          </div>
          <div className={styles.selectBtnRoundTrip}>
            <button
              onClick={() => {
                // setRedirectToBooking(true);
                setDiscount(true);
                setFlight(flight);
              }}
            >
              Select
            </button>
          </div>
        </article>
      </section>
    </section>
  );
};

export default OneWayFlight;
