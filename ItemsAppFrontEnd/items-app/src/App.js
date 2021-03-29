import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Row, Col, Tabs, Table } from "antd";
import itemAction from "./action";
import 'antd/dist/antd.css';
import "./App.css";

const { TabPane } = Tabs;

class App extends React.PureComponent {

  componentDidMount() {
    this.getItems();
  }

  getItems() {
    this.props.dispatch(itemAction.GetItems());
  }

  render() {
    const itemColumns = [
      {
        title: "ID",
        dataIndex: "id",
        key: "Id",
        sorter: (a, b) => a.Id - b.Id,
        sortDirections: ["descend", "ascend"],
      },
      {
        title: "ITEM",
        dataIndex: "itemName",
        key: "ItemName",
        sorter: (a, b) => a.ItemName - b.ItemName,
        sortDirections: ["descend", "ascend"],
      },
      {
        title: "COST",
        dataIndex: "cost",
        key: "Cost",
        sorter: (a, b) => a.Cost - b.Cost,
        sortDirections: ["descend", "ascend"],
      },
    ];
    return (
      <>
        <div className="p5-grid-page-container">
          <Row justify="center">
            <Col xs={24} md={24} lg={20}>
              <Tabs
                className="p5-tabs"
                size="large"
              >
                <TabPane
                  className="p5-tabs-pane"
                  tab="Items"
                  key="items"
                >
                  <div className="p5-grid-page-container">
                    <Row justify="center">
                      <Col span={24}>
                        <Table
                          loading={this.props.loading}
                          dataSource={this.props.items}
                          columns={itemColumns}
                          scroll={{ x: 700 }}
                          size="large"
                          rowKey='Id'
                        />
                      </Col>
                    </Row>
                  </div>
                </TabPane>

                <TabPane
                  className="p5-tabs-pane"
                  tab="Favorites"
                  key="favorites"
                > 
                  <h1>FAVORITES TAB LIS</h1>
                </TabPane>
              </Tabs>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

App.propTypes = {
  dispatch: PropTypes.func,
  items: PropTypes.arrayOf(PropTypes.shape({})),
  loading: PropTypes.bool,
};

App.defaultProps = {
  dispatch: () => {},
  items: [],
  loading: true,
};

function mapStateToProps(state) {
  const { items, loading } = state.AppState;
  return {
    items,
    loading
  };
}

const connectedApp = connect(mapStateToProps)(App);

export { connectedApp as default };
