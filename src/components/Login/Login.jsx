import React, { useEffect, useState, useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import { FIREBASE_KEY } from "../../logic/key";
import { AppContext } from "../ProviderWrapper/ProviderWrapper";
import axios from "axios";

import styles from "./Login.module.css";

const URL = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FIREBASE_KEY}`;

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [redirectToBooking, setRedirectToBooking] = useState(false);

  const { setAuth } = useContext(AppContext);

  const signIn = () => {
    axios
      .post(URL, {
        email,
        password,
      })
      .then((response) => {
        setAuth(response.data);
        console.log(response.data);
      })
      .catch((err) => {
        console.error(err);
        setError(err.response.data.error.message);
      });
  };

  useEffect(() => {
    signIn();
  });

  return (
    <section className={styles.loginContainer}>
      {redirectToBooking ? <Redirect to="booking"></Redirect> : ""}
      <article className={styles.left}>
        <form
          className={styles.login}
          onSubmit={(e) => {
            e.preventDefault();
            signIn();
            setRedirectToBooking(true);
            setAuth(true);
            e.target[0].value = "";
            e.target[1].value = "";
          }}
        >
          <div className={styles.headline}>
            <h2>Sign In</h2>
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
            </div>
            <div>
              {error ? (
                <p style={{ color: "red" }}>Wrong password! try again</p>
              ) : (
                ""
              )}
            </div>
            <div className={styles.loginBtnContainer}>
              <input className={styles.loginBtn} type="submit" value="SignIn" />
            </div>
          </div>
          <div></div>

          <div className={styles.haveAcount}>
            Do not have an account?<Link to="/register">Register</Link>{" "}
          </div>
        </form>
      </article>
      <article className={styles.right}></article>
    </section>
  );
}

export default Login;
