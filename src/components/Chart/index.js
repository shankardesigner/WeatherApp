import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { observer } from "mobx-react-lite";
import store from "../../store";
import moment from "moment";
import { Col, Row, Skeleton } from "antd";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip
);

const Chart = observer(() => {
  const weather = store.currentWeather;
  const tempCurrentWeather = store.currentWeather;
  const labels = weather?.map((dl) => dl.time);
  const datasets = weather?.map((ds) => ds.temp);

   const options = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: (tooltipItems) => {
            return tooltipItems?.formattedValue+ '°' + store.currentTemperature
          },
        }
      }
    }
  };

  if (store.loading) {
    return (
      <Row>
        <Col span={12}>
          <Skeleton />
        </Col>
      </Row>
    );
  }

  return (
    <div>
      <Line
        options={options}
        data={{
          labels,
          datasets: [
            {
              data: datasets,
              borderColor: "rgb(255, 99, 132)",
              backgroundColor: "rgba(255, 99, 132, 0.5)",
            },
          ],
        }}
      />
      <div className="week-container">
        <ul className="week-list">
          {tempCurrentWeather?.map((dt, index) => (
            <li className="active" key={index}>
              {/* <i className="day-icon" data-feather="sun"></i> */}
              <span className="day-name">
                {moment(dt.dtText).format("dddd")}
              </span>
              <span className="day-name">{dt.time}</span>
              <span className="day-temp">
                {parseInt(`${dt.temp}`).toFixed(2)}°{store.currentTemperature}
              </span>
            </li>
          ))}
          <div className="clear"></div>
        </ul>
      </div>
    </div>
  );
});

export default Chart;
