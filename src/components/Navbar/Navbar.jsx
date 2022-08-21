import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { BsFillPersonFill } from "react-icons/bs";
import { AppContext } from "../ProviderWrapper/ProviderWrapper";

import styles from "./Navbar.module.css";

const Navbar = () => {
  const { auth } = useContext(AppContext);
  return (
    <div className={styles.routing}>
      <div className={styles.logo}>
        <Link to="/">
          <img src="/images/elal.png" alt="" />
        </Link>
      </div>
      <div className={styles.links}>
        {/* <Link to="/flightsResult">FlightResult</Link>
        <Link to="/booking">Booking</Link>
        <Link to="/bookingpayment">BookingPayment</Link> */}
      </div>
      <div className={styles.userConected}>
        <div className={styles.userLogin}>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          {auth ? "" : ""}
          <Link className={styles.loginRegister}>
            <BsFillPersonFill /> Login/Register
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
