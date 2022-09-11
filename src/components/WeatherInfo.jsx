import React, { useEffect, useState } from "react";
import "./index.css";
import feather from "feather-icons";
import { observer } from "mobx-react-lite";
import store from "../store";
import moment from "moment";
import { Col, Row, Skeleton } from "antd";

const WeatherInfo = observer(() => {
  const [weather, setWeather] = useState(null);
  const tempCurrentWeather = store.currentWeather;
  const city = store.city;

  useEffect(() => {
    feather.replace();
    if (store.weather) {
      setWeather(store.weather);
    }
  }, []);

  const currentWeather = tempCurrentWeather[0];
  if (store.loading) {
    return (
      <Row>
        <Col span={12}>
          <Skeleton />
        </Col>
      </Row>
    );
  }
  if (!!!currentWeather) return <>Loading...</>;

  return (
    <div className="weather-container-holder">
      <div className="weather-side">
        <div className="weather-gradient"></div>
        <div className="date-container">
          <h2 className="date-dayname">
            {moment(currentWeather.dtText).format("dddd")}
          </h2>
          <span className="date-day">
            {moment(currentWeather.dtText).format("MMM Do YY")}
          </span>
          <i className="location-icon" data-feather="map-pin"></i>
          <span className="location">{`${city.name}, ${city.country}`}</span>
        </div>
        <div className="weather-container">
          <i className="weather-icon" data-feather="sunny"></i>
          <h1 className="weather-temp">
            {parseInt(`${currentWeather.temp}`).toFixed(2)}°
            {store.currentTemperature}
          </h1>
          <h3 className="weather-desc">{currentWeather.description}</h3>
        </div>
      </div>
      <div className="info-side">
        <div className="today-info-container">
          <div className="today-info">
            <div className="humidity">
              {" "}
              <span className="title">HUMIDITY</span>
              <span className="value">{currentWeather.humidity} %</span>
              <div className="clear"></div>
            </div>
            <div className="wind">
              {" "}
              <span className="title">WIND</span>
              <span className="value">{currentWeather.windSpeed} km/h</span>
              <div className="clear"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default WeatherInfo;
