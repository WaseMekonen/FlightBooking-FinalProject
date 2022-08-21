import React from "react";
import { useState, useContext, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { FIREBASE_KEY } from "../../logic/key";
import axios from "axios";
import { AppContext } from "../ProviderWrapper/ProviderWrapper";

import styles from "./Register.module.css";

const URL = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${FIREBASE_KEY}`;

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassWord, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [redirectToBooking, setRedirectToBooking] = useState(false);

  const { setAuth } = useContext(AppContext);

  const signUp = () => {
    axios
      .post(URL, {
        email,
        password,
      })
      .then((response) => {
        console.log(response.data);
        setAuth(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // useEffect(() => {
  //   signUp();
  // }, []);

  return (
    <div className={styles.registerContainer}>
      {redirectToBooking ? <Redirect to="booking"></Redirect> : ""}
      <form
        className={styles.register}
        onSubmit={(e) => {
          e.preventDefault();
          if (password == confirmPassWord) {
            signUp();
            setRedirectToBooking(true);
          } else {
            alert("password doesn't match");
          }
          e.target[0].value = "";
          e.target[1].value = "";
        }}
      >
        <div className={styles.headline}>
          <h2>Sign Up</h2>
        </div>
        <div className={styles.formInputs}>
          <div className={styles.formInputsInput}>
            <input
              type="email"
              placeholder="Email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
            />
          </div>
          <div>
            {error ? (
              <p style={{ color: "red" }}>Wrong password! try again</p>
            ) : (
              ""
            )}
          </div>
          <div className={styles.loginBtnContainer}>
            <input className={styles.loginBtn} type="submit" value="SignUp" />
          </div>
        </div>
        <div></div>

        <div className={styles.haveAcount}>Already have an account?</div>
      </form>
    </div>
  );
}

export default Register;
