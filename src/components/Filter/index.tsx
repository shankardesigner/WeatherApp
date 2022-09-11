import { Col, Row, Switch, Typography, Input, Button, Skeleton } from "antd";
import { observer } from "mobx-react-lite";
import moment from "moment";
import React, { useEffect, useState } from "react";
import store from "../../store";

const { Search } = Input;
const { Title } = Typography;

const todaysDate = new Date();

const FILTER = observer(() => {
  const city = store.city;
  const weatherKeys = store.availableDates || [];
  const currentTemp = store.getWeather();
  const [date, setDate] = useState(todaysDate);

  const switchDates = (type: "prev" | "next") => {
    if (type === "prev") {
      const newDate = moment(date).subtract(1, "days").toDate();
      setDate(newDate);
      store.setCurrentWeather(moment(newDate).format("MMM Do"));
    }
    if (type === "next") {
      const newDate = moment(date).add(1, "days").toDate();
      setDate(newDate);
      store.setCurrentWeather(moment(newDate).format("MMM Do"));
    }
  };

  const onTempChange = () => {
    store.toggleTemperature();
  };

  const onSearchHandle = (searchTerm: string) => {
    store.loadWeather(searchTerm);
  };

  return (
    <Row>
      <Col span={12}>
        <Row justify="space-between">
          <Col span={12}>
            {store.error && (
              <div
                id="nest-messages_user_name_help"
                className="ant-form-item-explain ant-form-item-explain-connected"
                role="alert"
              >
                <div className="ant-form-item-explain-error">{store.error}</div>
              </div>
            )}
            <Title level={4}>
              Weather forecast of {`${city.name} ${city.country}`}
            </Title>
          </Col>
          <Col span={7}>
            <strong>Show in: &nbsp; </strong>{" "}
            <Switch
              checkedChildren="Celsius"
              unCheckedChildren="Fahrenheit"
              defaultChecked
              onClick={onTempChange}
            />
          </Col>
        </Row>
      </Col>
      <Col span={12}>
        <Row justify="end" gutter={6}>
          <Col span={12}>
            <Search
              placeholder="Enter City"
              enterButton="Search"
              size="large"
              onSearch={onSearchHandle}
              // loading
            />
          </Col>
          <Col span={10}>
            <Row justify="end">
              <Col span={12}>
                <Button
                  size="large"
                  onClick={() => switchDates("prev")}
                  disabled={
                    moment(weatherKeys[0]).format("MMM Do") ===
                    moment(date).format("MMM Do")
                  }
                >
                  Previous Day
                </Button>
              </Col>
              <Col span={12}>
                <Button
                  size="large"
                  onClick={() => switchDates("next")}
                  disabled={
                    moment(weatherKeys[weatherKeys.length - 1]).format(
                      "MMM Do"
                    ) === moment(date).format("MMM Do")
                  }
                >
                  Next Day
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
    </Row>
  );
});

export default FILTER;
