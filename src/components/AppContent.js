import React, { useState, useEffect } from 'react';
import { Col, Row, Tabs } from 'antd';
import AppTable from './AppTable';
import axios from 'axios';

const { TabPane } = Tabs;

const AppContent = () => {
  // STATE
  const [dataAPI, setDataAPI] = useState({
    dataAll: [],
    dataLineChopp: [],
    dataLinePasta: [],
    dataLineAlmond: [],
    dataRMP: [],
  });

  // GET ALL DATA API
  const getAllData = async () => {
    const fullAPIs = [
      'http://demokitiot.ddns.net:9191/downtimes',
      'http://demokitiot.ddns.net:9191/downtimes/chopp',
      'http://demokitiot.ddns.net:9191/downtimes/pasta',
      'http://demokitiot.ddns.net:9191/downtimes/almond',
      'http://demokitiot.ddns.net:9191/downtimes/rmp',
    ];

    axios.all(fullAPIs.map((fullAPI) => axios.get(fullAPI))).then(
      axios.spread((...fullDataAPI) => {
        const allData = fullDataAPI[0].data;
        const allDataChopp = fullDataAPI[1].data;
        const allDataPasta = fullDataAPI[2].data;
        const allDataAlmond = fullDataAPI[3].data;
        const allDataRMP = fullDataAPI[4].data;
        setDataAPI({
          dataAll: allData,
          dataLineChopp: allDataChopp,
          dataLinePasta: allDataPasta,
          dataLineAlmond: allDataAlmond,
          dataRMP: allDataRMP,
        });
      })
    );
  };

  // Looping rendering
  useEffect(() => {
    getAllData();
  }, []);

  // TAB PANEL
  const tabPanes = [
    { key: '1', tab: 'Home', content: <AppTable dataApi={dataAPI.dataAll} /> },
    {
      key: '2',
      tab: 'Line Chopp',
      content: <AppTable dataApi={dataAPI.dataLineChopp} />,
    },
    {
      key: '3',
      tab: 'Line Pasta',
      content: <AppTable dataApi={dataAPI.dataLinePasta} />,
    },
    {
      key: '4',
      tab: 'Line Almond',
      content: <AppTable dataApi={dataAPI.dataLineAlmond} />,
    },
    {
      key: '5',
      tab: 'RMP',
      content: <AppTable dataApi={dataAPI.dataRMP} />,
    },
  ];

  const callback = (key) => {
    // console.log(key);
  };

  return (
    <>
      <Row align='middle' justify='center'>
        <Col xs={22} sm={18} md={18} xl={12}>
          <Tabs
            // defaultActiveKey='1'
            onChange={callback}
            centered
            // onTabClick={callback}
          >
            {tabPanes.map((pane) => {
              return (
                <TabPane key={pane.key} tab={pane.tab}>
                  {pane.content}
                </TabPane>
              );
            })}
          </Tabs>
        </Col>
      </Row>
    </>
  );
};

export default AppContent;
