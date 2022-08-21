import React, { useContext, useState } from "react";
import styles from "./Payment.module.css";
import Context from "../../context";
import { Redirect } from "react-router-dom";

export default function Payment() {
  const [redirectToBookView, setRedirectToBookView] = useState(false);
  const { flight } = useContext(Context);
  const Discount = 16;
  console.log(flight);
  const isRoundTrip = Array.isArray(flight);

  return (
    <div className={styles.paymentPage}>
      {redirectToBookView ? <Redirect to="bookingview"></Redirect> : ""}
      <h3> Payment </h3>
      <div className={styles.payMentContainer}>
        <form className={styles.payMentDetails}>
          <div className={styles.payMentDetailsCardHolder}>
            <div className={styles.payMentDetailsFirstName}>
              {" "}
              <label>First Name</label>
              <input type="text" placeholder="Insert Your first Name" />
            </div>
            <div className={styles.payMentDetailsLastName}>
              <label>Last Name</label>
              <input type="text" placeholder="Insert Your last Name" />
            </div>
          </div>
          <div className={styles.payMentDetailsCardNumber}>
            <label>Credit card number</label>
            <input type="number" placeholder="Credit card number" />
          </div>
          <div className={styles.payMentDetailsCardExpiration}>
            <label className={styles.ExpirationTitle}>Expiration Date</label>
            <div className={styles.ExpirationDate}>
              <select className={styles.payMentDetailsCardExpirationYear}>
                <option value="">--Select Month--</option>
                <option selected value="1">
                  Janaury
                </option>
                <option value="2">February</option>
                <option value="3">March</option>
                <option value="4">April</option>
                <option value="5">May</option>
                <option value="6">June</option>
                <option value="7">July</option>
                <option value="8">August</option>
                <option value="9">September</option>
                <option value="10">October</option>
                <option value="11">November</option>
                <option value="12">December</option>
              </select>
              <input
                placeholder="Year"
                type="number"
                className={styles.payMentDetailsCardExpirationYear}
              />
              <input type="number" placeholder="CVV" />
            </div>
          </div>

          <div className={styles.payMentDetailsBtn}>
            <input
              type="submit"
              value="Pay Now"
              onClick={() => {
                setRedirectToBookView(true);
              }}
            />
          </div>
        </form>
        <article className={styles.payMentTotalImage}>
          <div className={styles.price}>
            <h5>To pay</h5>
            <h1>
              {isRoundTrip
                ? flight[0].price +
                  flight[1].price -
                  (
                    ((flight[0].price + flight[1].price) * Discount) /
                    100
                  ).toFixed()
                : flight.price - ((flight.price * Discount) / 100).toFixed()}
              $
            </h1>
          </div>
        </article>
      </div>
    </div>
  );
}
