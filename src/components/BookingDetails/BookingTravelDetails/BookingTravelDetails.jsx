import React, { useContext, useState } from "react";
import Context from "../../context";
import { Redirect } from "react-router-dom";

import styles from "./BookingTravelDetails.module.css";

function BookingTravelDetails() {
  // const { userDetails, setUserDetails } = useContext(Context);
  const [userDetails, setUserDetails] = useState({
    email: "",
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
  });
  const [error, setError] = useState({
    email: "",
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
  });
  const [isDisabled, setIsDisabled] = useState(false); //todo change default to "true"
  const [redirectToPaymentPage, setRedirectToPaymentPage] = useState(false);

  // const isAllFiledsValid = (userDetails) => {
  //   if (userDetails) {
  //     setIsDisabled(false);
  //   } else {
  //     alert("not valid");
  //   }
  // };

  // const isValid =(event)=>{
  //   if(event !== ""&& !== null){

  // }
  // }

  console.log("user details ", userDetails);

  return (
    <form
      className={styles.form}
      onSubmit={(e) => {
        e.preventDefault();
        setRedirectToPaymentPage(true);
      }}
    >
      {redirectToPaymentPage ? (
        <Redirect to="/bookingPayment"></Redirect>
      ) : null}
      <section className={styles.emailInput}>
        <input
          type="email"
          placeholder="Email"
          required
          onChange={(e) => {
            setUserDetails({ ...userDetails, email: e.target.value });
          }}
        />
        <p style={{ color: "red" }}>{error.email}</p>
      </section>
      <section className={styles.travelDetailInputs}>
        <div className={styles.left}>
          <input
            className={styles.nameInput}
            type="text"
            placeholder="First Name"
            onChange={(e) => {
              setUserDetails({ ...userDetails, firstName: e.target.value });
            }}
          />
          <p style={{ color: "red" }}>{error.firstName}</p>
          <input
            className={styles.lastNameInput}
            type="text"
            placeholder="Last Name"
            onChange={(e) => {
              setUserDetails({ ...userDetails, lastName: e.target.value });
            }}
          />
          <p style={{ color: "red" }}>{error.lastName}</p>
        </div>
        <div className={styles.right}>
          <div className={styles.birthDayInput}>
            <input
              type="date"
              min="1900-01-01"
              max={new Date().toISOString().split("T")[0]}
              onChange={(e) => {
                setUserDetails({ ...userDetails, dateOfBirth: e.target.value });
              }}
            />
            <p style={{ color: "red" }}>{error.lastName}</p>
          </div>
          <select
            className={styles.selectOption}
            value={userDetails.gender}
            placeholder="Gender"
            onChange={(e) => {
              setUserDetails({ ...userDetails, gender: e.target.value });
            }}
          >
            <option>Male</option>
            <option>Female</option>
          </select>
        </div>
      </section>
      <section className={styles.continue}>
        <input
          type="submit"
          // disabled={isDisabled}
          className={styles.continueBtn}
          value="Continue"
        />
      </section>
    </form>
  );
}

export default BookingTravelDetails;
