import React, { useContext } from "react";
import { AppContext } from "../ProviderWrapper/ProviderWrapper";
import Context from "../context";
import { FaPlane, FaUserPlus, FaChair } from "react-icons/fa";

import styles from "./FlightType.module.css";

function FlightType() {
  const { setRadio, radio } = useContext(AppContext);
  const { setCabin, cabin, passengers, setPassengers } = useContext(Context);
  return (
    <div className={styles.flightType}>
      <section className={styles.tripType}>
        <div className={styles.icon}>
          <FaPlane />
        </div>
        <select
          onChange={(e) => {
            setRadio(e.target.value);
          }}
          value={radio}
        >
          <option value="oneWay">One Way</option>
          <option value="roundTrip">Round Trip</option>
        </select>
      </section>
      <section className={styles.flightClass}>
        <div className={styles.icon}>
          <FaChair />
        </div>
        <select
          onChange={(e) => {
            const selectedClass = e.target.value;
            setCabin(selectedClass);
          }}
          value={cabin}
        >
          <option value="Economy">Economy</option>
          <option value="Business">Business</option>
          <option value="First class">First class</option>
        </select>
      </section>
      <section className={styles.flightPassengers}>
        <div className={styles.icon}>
          <FaUserPlus />
        </div>
        <select
          className={styles.flightPassengersInput}
          onChange={(e) => {
            setPassengers(e.target.value);
          }}
          value={passengers}
        >
          <option value="1">1 </option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
      </section>
    </div>
  );
}

export default FlightType;
