import React from "react";
import BookingPricing from "../../components/BookingDetails/BookingPricing/BookingPricing";
import BookingProcess from "../../components/BookingDetails/BookingProcess/BookingProcess";
import BookingTicket from "../../components/BookingDetails/BookingTicket/BookingTicket";
import BookingTravelDetails from "../../components/BookingDetails/BookingTravelDetails/BookingTravelDetails";

import styles from "./Booking.module.css";

const Booking = () => {
  return (
    <div className={styles.bookingContainer}>
      <section className={styles.ticketingProcess}>
        <BookingProcess />
      </section>
      <section className={styles.totalDetails}>
        <article className={styles.flightDetails}>
          <BookingTicket />
          <div className={styles.travelerDetails}>
            <div className={styles.travelerDetailsHeading}>
              <h3>Traveler Details</h3>
            </div>
            <BookingTravelDetails />
          </div>
        </article>
        <article className={styles.pricingContainer}>
          <BookingPricing />
        </article>
      </section>
      <footer className={styles.footer}></footer>
    </div>
  );
};

export default Booking;
