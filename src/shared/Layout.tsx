import React, { useEffect } from "react";
import "antd/dist/antd.css";
// import './index.css';
import { Button, Col, Input, Layout, Menu, Row } from "antd";
import WeatherInfo from "../components/WeatherInfo";
import Chart from "../components/Chart";
import store from "../store";
import FILTER from "../components/Filter";

const { Header, Content, Footer } = Layout;

const items1 = ["Home", "About", "Contact"].map((key) => ({
  key,
  label: `${key}`,
}));


const MainLayout = () => {
  useEffect(() => {
    store.loadWeather();
  }, []);


  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["2"]}
          items={items1}
        />
      </Header>
      <Content
        style={{
          padding: "0 50px",
        }}
      >
        <Layout
          className="site-layout-background"
          style={{
            padding: "24px 0",
          }}
        >
          <Content
            style={{
              padding: "0 24px",
              minHeight: 280,
            }}
          >
            <FILTER />
            <Row gutter={24}>
              <Col span={12}>
                <Chart />
              </Col>
              <Col span={12}>
                <WeatherInfo />
              </Col>
            </Row>
          </Content>
        </Layout>
      </Content>
      <Footer
        style={{
          textAlign: "center",
        }}
      >
        ©2022 Created by @shankardesigner
      </Footer>
    </Layout>
  );
};

export default MainLayout;
