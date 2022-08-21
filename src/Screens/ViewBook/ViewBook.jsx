import React, { useContext, useState } from "react";

import Context from "../../components/context";
import moment from "moment";
import {
  FaRegCheckCircle,
  FaRegEnvelope,
  FaPrint,
  FaRegFilePdf,
} from "react-icons/fa";
import BookingProcess from "../../components/BookingDetails/BookingProcess/BookingProcess";

import styles from "./ViewBook.module.css";

const ViewBook = () => {
  const { flight } = useContext(Context);
  const Discount = 16;
  console.log(flight);
  const isRoundTrip = Array.isArray(flight);

  return (
    <div className={styles.bookingContainer}>
      <section className={styles.ticketingProcess}>
        <BookingProcess />
      </section>
      <section className={styles.totalDetails}>
        <article className={styles.messageContainer}>
          <section className={styles.message}>
            <div className={styles.head}>
              <div>
                <FaRegCheckCircle />
                <p>Order Successfully Placed</p>
              </div>
            </div>
            <div className={styles.detailsCont}>
              <div className={styles.details}>
                <div className={styles.userdetails}>
                  <p>Transactions ID</p>
                  <span>DJKJ23239043</span>
                </div>
                <div className={styles.userdetails}>
                  <p>Date</p>
                  <span>{moment(Date().getDate).format("D-MMM-YYYY")}</span>
                </div>
                <div className={styles.userdetails}>
                  <p>Customer Name</p>
                  <span>Israel israeli</span>
                </div>
                <div className={styles.userdetails}>
                  {" "}
                  <p>Payment Amount</p>
                  <span>
                    {isRoundTrip
                      ? flight[0].price +
                        flight[1].price -
                        (
                          ((flight[0].price + flight[1].price) * Discount) /
                          100
                        ).toFixed()
                      : flight.price -
                        ((flight.price * Discount) / 100).toFixed()}
                    $
                  </span>
                </div>
              </div>
            </div>
            <div className={styles.mediaCont}>
              <div className={styles.media}>
                <div className={styles.mediaIcon}>
                  <FaRegEnvelope />
                  <span>Email Receipt</span>
                </div>
                <div className={styles.mediaIcon}>
                  <FaRegFilePdf />
                  <span>Save as Pdf</span>
                </div>
                <div className={styles.mediaIcon}>
                  <FaPrint />
                  <span>Print Receipt</span>
                </div>
              </div>
            </div>
          </section>
        </article>
      </section>
      <footer className={styles.footer}></footer>
    </div>
  );
};

export default ViewBook;
