import React, { useContext } from "react";
import Context from "../../context";

import styles from "./BookingPricing.module.css";

function BookingPricing() {
  const { flight } = useContext(Context);
  const Discount = 10;
  console.log(flight);
  const isRoundTrip = Array.isArray(flight);

  return (
    <>
      <article className={styles.pricing}>
        <div className={styles.priceTitle}>
          <h2>Price Details</h2>
        </div>
        <div className={styles.details}>
          <div className={styles.left}>
            <h3>Travelers</h3>
            <span>adult</span>
            <span style={{ color: "green" }}>Discount</span>
          </div>
          <div className={styles.right}>
            <h3>Subtotal</h3>
            <span>
              {isRoundTrip ? flight[0].price + flight[1].price : flight.price}
            </span>
            <span style={{ color: "green" }}>-16%</span>
          </div>
        </div>
        <div className={styles.total}>
          <div>
            <h3>Total Price</h3>
          </div>
          <div>
            <span>
              {isRoundTrip
                ? flight[0].price +
                  flight[1].price -
                  (
                    ((flight[0].price + flight[1].price) * Discount) /
                    100
                  ).toFixed()
                : flight.price - ((flight.price * Discount) / 100).toFixed()}
              $
            </span>
          </div>
          <div className={styles.alertMessage}>
            <div className={styles.message}></div>
          </div>
        </div>
      </article>
    </>
  );
}

export default BookingPricing;
