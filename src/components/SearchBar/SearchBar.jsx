import React, { useState, useContext } from "react";
import { AppContext } from "../ProviderWrapper/ProviderWrapper";
import Context from "../context";
import { FaExchangeAlt, FaSearch } from "react-icons/fa";
import moment from "moment";
import FlightType from "../FlightType/FlightType";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  searchSameDayFlights,
  searchRoundTripFlights,
} from "../../services/flightsSearch";
import elalRoutes from "../../data/elalRouts.json";

import styles from "./SearchBar.module.css";

const SearchBar = ({ mainClass }) => {
  const { setRadio, radio, searchInputs, setSearchInputs } =
    useContext(AppContext);

  const { setFlightResults } = useContext(Context);

  const [suggestionsOrigin, setSuggestionsOrigin] = useState([]);
  const [suggestionsDestination, setSuggestionsDestination] = useState([]);

  const handleChange = (date) => {
    setSearchInputs({ departureDate: date });
  };

  const setSuggestionsWrapper = (text, setSuggestions) => {
    const matches =
      text.length > 0 &&
      elalRoutes.filter((route) => {
        const regex = new RegExp(`${text}`, "gi");
        return route.city.match(regex);
      });
    setSuggestions(matches || []);
  };

   const searchFlight = () => {
    if (searchInputs.origin === searchInputs.destination) {
      alert("You can't choose the same city");
      return;
    }
    const departureDay = moment(searchInputs.departureDate).format(
      "DD/MM/YYYY"
    );
    const returnDay = moment(searchInputs.returnDate).format("DD/MM/YYYY");
    let flights = [];

    if (radio === "roundTrip") {
      flights = searchRoundTripFlights(
        searchInputs.origin,
        searchInputs.destination,
        departureDay,
        returnDay
      );
    } else {
      flights = searchSameDayFlights(
        searchInputs.origin,
        searchInputs.destination,
        departureDay
      );
    }
    setFlightResults(flights);
  };

  const isValid =
    searchInputs.origin !== "" &&
    searchInputs.destination !== "" &&
    searchInputs.departureDate !== "" &&
    (searchInputs.returnDate !== "" || radio === "oneWay");

  return (
    <div className={mainClass}>
      <FlightType setRadio={setRadio} radio={radio} />
      <form
        className={styles.flightForm}
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <section className={styles.inputs}>
          <div className={styles.origin}>
            <input
              type="text"
              placeholder="Origin "
              onChange={(e) => {
                setSuggestionsWrapper(e.target.value, setSuggestionsOrigin);
                setSearchInputs({ origin: e.target.value });
              }}
              value={searchInputs.origin}
            />
            {suggestionsOrigin.length > 0 ? (
              <div className={styles.suggestionorigin}>
                {suggestionsOrigin &&
                  suggestionsOrigin.map((suggestion, i) => {
                    return (
                      <option
                        key={i}
                        onClick={(e) => {
                          setSuggestionsWrapper([], setSuggestionsOrigin);
                          setSearchInputs({ origin: e.target.innerHTML });
                        }}
                      >
                        {suggestion.city}
                      </option>
                    );
                  })}
              </div>
            ) : (
              ""
            )}
          </div>
          <div
            className={styles.changeDirection}
            onClick={() => {
              setSearchInputs({ origin: searchInputs.destination });
              setSearchInputs({ destination: searchInputs.origin });
            }}
          >
            <FaExchangeAlt />
          </div>
          <div className={styles.destination}>
            <input
              type="text"
              placeholder="Destination "
              onChange={(e) => {
                setSuggestionsWrapper(
                  e.target.value,
                  setSuggestionsDestination
                );
                setSearchInputs({ destination: e.target.value });
              }}
              value={searchInputs.destination}
            />
            {suggestionsDestination.length > 0 ? (
              <div className={styles.suggestiondestination}>
                {suggestionsDestination &&
                  suggestionsDestination.map((suggestion, i) => {
                    return (
                      <option
                        key={i}
                        onClick={(e) => {
                          setSearchInputs({ destination: e.target.innerHTML });
                          setSuggestionsWrapper([], setSuggestionsDestination);
                        }}
                      >
                        {suggestion.city}
                      </option>
                    );
                  })}
              </div>
            ) : (
              ""
            )}
          </div>
          <div className={styles.departure}>
            <DatePicker
              className={styles.dates}
              placeholderText="Departure"
              selected={searchInputs.departureDate}
              onChange={handleChange}
              dateFormat="dd/MM/yyyy"
              minDate={new Date()}
              maxDate={searchInputs.returnDate}
            ></DatePicker>
          </div>
        </section>
        <section className={styles.returnInput}>
          {radio === "roundTrip" && (
            <div className={styles.return}>
              <DatePicker
                className={styles.dates}
                placeholderText="Return"
                selected={searchInputs.returnDate}
                onChange={(date) => setSearchInputs({ returnDate: date })}
                dateFormat="dd/MM/yyyy"
                minDate={
                  searchInputs.departureDate !== ""
                    ? searchInputs.departureDate
                    : new Date()
                }
              ></DatePicker>
            </div>
          )}
        </section>

        <section className={styles.search}>
          <div
            className={
              !isValid
                ? styles.formInputsSearchDisable
                : styles.formInputsSearch
            }
          >
            <Link
              to="/flightsResult"
              className={isValid ? styles.buttonActive : styles.buttonDisable}
              onClick={searchFlight}
            >
              <FaSearch />
              Search Flight
            </Link>
          </div>
        </section>
      </form>
    </div>
  );
};

export default SearchBar;
