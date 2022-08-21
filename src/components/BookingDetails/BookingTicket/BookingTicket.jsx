import React, { useContext } from "react";
import Context from "../../context";
import moment from "moment";
import { FaRegClock, FaPlaneDeparture, FaPlaneArrival } from "react-icons/fa";
import { msToTime } from "../../../Utils/time";

import styles from "./BookingTicket.module.css";

function BookingTicket() {
  const { flight, cabin } = useContext(Context);

  console.log({ flight }, { cabin });

  const isRoundTrip = Array.isArray(flight);
  console.log(isRoundTrip);

  const oneWay = (
    <section className={styles.firstFlight}>
      <article className={styles.rowOne}>
        <div>
          <h4>Depart {flight.date}</h4>
        </div>
        <div className={styles.duration}>
          <FaRegClock />
          <h4>Duration {msToTime(flight.flightDuration)}</h4>
        </div>
      </article>
      <article className={styles.rowTwo}>
        <div className={styles.airlineDetails}>
          <div className={styles.logo}>
            <img src={flight.airlineLogo} alt="airlineLogo" />
          </div>
          <div className={styles.brand}>
            <h1>{flight.airline}</h1>
            <h3>{flight.flightNumber}</h3>
            <h6>{flight.aircraft}</h6>
          </div>
        </div>
        <div className={styles.time}>
          <div>
            <FaPlaneDeparture />
          </div>
          <div>
            <div>
              <h5>{moment(flight.departure).format("ll")}</h5>
              <h3>{moment(flight.departure).format("LT")}</h3>
            </div>
            <div>
              <h5>
                {flight.origin}
                <span>,({flight.originCode})</span>
              </h5>
            </div>
          </div>
        </div>
        <div className={styles.time}>
          <div>
            <FaPlaneArrival />
          </div>
          <div>
            <div>
              <h5>{moment(flight.arrival).format("ll")}</h5>
              <h3>{moment(flight.arrival).format("LT")}</h3>
            </div>
            <div>
              <h5>
                {flight.destination}
                <span>,({flight.destinationCode})</span>
              </h5>
            </div>
          </div>
        </div>
        <div className={styles.class}>
          <div>
            <h5>{cabin}</h5>
          </div>
        </div>
      </article>
    </section>
  );

  const roundTrip = isRoundTrip
    ? flight.map((flight, i) => {
        return (
          <section className={styles.roundFlight} key={i}>
            <article className={styles.rowOne}>
              <div>
                <h4>Depart {flight.date}</h4>
              </div>
              <div className={styles.duration}>
                <FaRegClock />
                <h4>Duration {msToTime(flight.flightDuration)}</h4>
              </div>
            </article>
            <article className={styles.rowTwo}>
              <div className={styles.airlineDetails}>
                <div className={styles.logo}>
                  <img src={flight.airlineLogo} alt="airlineLogo" />
                </div>
                <div className={styles.brand}>
                  <h1>{flight.airline}</h1>
                  <h3>{flight.flightNumber}</h3>
                  <h6>{flight.aircraft}</h6>
                </div>
              </div>
              <div className={styles.time}>
                <div>
                  <FaPlaneDeparture />
                </div>
                <div>
                  <div>
                    <h5>{moment(flight.departure).format("ll")}</h5>
                    <h3>{moment(flight.departure).format("LT")}</h3>
                  </div>
                  <div>
                    <h1>
                      {flight.origin}
                      <span>,({flight.originCode})</span>
                    </h1>
                  </div>
                </div>
              </div>
              <div className={styles.time}>
                <div>
                  <FaPlaneArrival />
                </div>
                <div>
                  <div>
                    <h5>{moment(flight.arrival).format("ll")}</h5>
                    <h3>{moment(flight.arrival).format("LT")}</h3>
                  </div>
                  <div>
                    <h1>
                      {flight.destination}
                      <span>,({flight.destinationCode})</span>
                    </h1>
                  </div>
                </div>
              </div>
              <div className={styles.class}>
                <div>
                  <h5>{cabin}</h5>
                </div>
              </div>
            </article>
          </section>
        );
      })
    : oneWay;

  return (
    <>
      <h3>Flight Details</h3>
      <section className={styles.currentFlight}>{roundTrip}</section>
    </>
  );
}

export default BookingTicket;
