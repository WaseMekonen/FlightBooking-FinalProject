import React from "react";
import BookingPricing from "../../components/BookingDetails/BookingPricing/BookingPricing";
import BookingProcess from "../../components/BookingDetails/BookingProcess/BookingProcess";
import Payment from "../../components/BookingDetails/Payment/Payment";

import styles from "./BookingPaymentPage.module.css";

const BookingPaymentPage = () => {
  return (
    <div className={styles.bookingContainer}>
      <section className={styles.ticketingProcess}>
        <BookingProcess />
      </section>
      <section className={styles.totalDetails}>
        <article className={styles.flightDetails}>
          <Payment />
        </article>
        <article className={styles.pricingContainer}>
          <BookingPricing />
        </article>
      </section>
      <footer className={styles.footer}></footer>
    </div>
  );
};

export default BookingPaymentPage;
