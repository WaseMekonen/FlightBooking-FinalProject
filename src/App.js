import { useState } from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./Screens/Home/Home";
import About from "./Screens/About/About";
import FlightsResult from "./Screens/Flights-Results/FlightsResult";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Booking from "./Screens/Booking/Booking";
import ProviderWrapper from "./components/ProviderWrapper/ProviderWrapper";
import Context from "./components/context";

import BookingPaymentPage from "./Screens/BookingPaymentPage/BookingPaymentPage";
import ViewBook from "./Screens/ViewBook/ViewBook";
import styles from "./App.module.css";

const App = () => {
  const [auth, setAuth] = useState(null);
  const [discount, setDiscount] = useState(false);
  const [flightResults, setFlightResults] = useState([]);
  const [flight, setFlight] = useState([]);
  const [cabin, setCabin] = useState("Economy");
  const [passengers, setPassengers] = useState(1);

  return (
    <Context.Provider
      value={{
        flightResults,
        setFlightResults,
        flight,
        setFlight,
        cabin,
        setCabin,
        passengers,
        setPassengers,
        discount,
        setDiscount,
      }}
    >
      <ProviderWrapper>
        <BrowserRouter>
          <div className={styles.app}>
            {/* <Login></Login> */}
            {/* <Register></Register> */}
            <Navbar />
            <Switch>
              <Route exact path="/" component={() => <Home />} />
              <Route exact path="/about" component={() => <About />} />
              <Route
                exact
                path="/booking"
                component={() => <Booking setAuth={setAuth} />}
              />
              <Route
                exact
                path="/bookingPayment"
                component={() => <BookingPaymentPage setAuth={setAuth} />}
              />
              <Route
                exact
                path="/bookingview"
                component={() => <ViewBook setAuth={setAuth} />}
              />
              <Route
                exact
                path="/flightsResult"
                component={() => <FlightsResult />}
              />
              <Route exact path="/contact" />
              <Route
                exact
                path="/login"
                component={() => <Login setAuth={setAuth} />}
              />
              <Route
                exact
                path="/register"
                component={() => <Register setAuth={setAuth} />}
              />
            </Switch>
          </div>
        </BrowserRouter>
      </ProviderWrapper>
    </Context.Provider>
  );
};
export default App;
