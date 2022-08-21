import React, { useState, useContext } from "react";
import Context from "../context";
import { Redirect } from "react-router-dom";
import { timestampClockTime, msToTime } from "../../Utils/time";

import styles from "./RoundTripFlight.module.css";
const RoundTripFlight = ({ flight }) => {
  const [redirectToBooking, setRedirectToBooking] = useState(false);

  const [originFlight, returnFlight] = flight;
  const { setFlight, setDiscount } = useContext(Context);
  if (!Array.isArray(flight)) {
    return null;
  }

  return (
    <section className={styles.ticketRoundTrip}>
      {redirectToBooking ? <Redirect to="/booking"></Redirect> : ""}
      <section className={styles.left}>
        <article className={styles.roundTripTicketsContainer}>
          <article className={styles.ticketFlightDetailsRoundTrip}>
            <div className={styles.airlineRoundTrip}>
              <img src={originFlight.airlineLogo} alt="ElAl logo" />
              <h5>{originFlight.airline}</h5>
            </div>
            <div className={styles.departureRoundTrip}>
              <h5>{timestampClockTime(originFlight.departure)}</h5>
              <h4>{originFlight.originCode}</h4>
            </div>
            <div className={styles.FlightDurationRoundTrip}>
              <h5>{msToTime(originFlight.flightDuration)}</h5>
              <hr />
              <h5>{originFlight.stops}</h5>
            </div>
            <div className={styles.arrivalRoundTrip}>
              <h5>{timestampClockTime(originFlight.arrival)}</h5>
              <h4>{originFlight.destinationCode}</h4>
            </div>
          </article>
        </article>
        <article className={styles.roundTripTicketsContainer}>
          <article className={styles.ticketFlightDetailsRoundTrip}>
            <div className={styles.airlineRoundTrip}>
              <img src={originFlight.airlineLogo} alt="ElAl logo" />
              <h5>{returnFlight.airline}</h5>
            </div>
            <div className={styles.departureRoundTrip}>
              <h5>{timestampClockTime(returnFlight.departure)}</h5>
              <h4>{returnFlight.originCode}</h4>
            </div>
            <div className={styles.FlightDurationRoundTrip}>
              <h5>{msToTime(returnFlight.flightDuration)}</h5>
              <hr />
              <h5>{returnFlight.stops}</h5>
            </div>
            <div className={styles.arrivalRoundTrip}>
              <h5>{timestampClockTime(returnFlight.arrival)}</h5>
              <h4>{returnFlight.destinationCode}</h4>
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
            <h1>${originFlight.price + returnFlight.price}</h1>
          </div>
          <div className={styles.selectBtnRoundTrip}>
            <button
              onClick={() => {
                setFlight(flight);
                // setRedirectToBooking(true);
                setDiscount(true);
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

export default RoundTripFlight;
