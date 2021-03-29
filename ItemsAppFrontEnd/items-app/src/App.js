import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Row, Col, Tabs, Table, Tooltip, Button, Modal } from "antd";
import { ToastContainer, toast } from "react-toastify";
import { faPlusCircle, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ExclamationCircleOutlined } from '@ant-design/icons';
import ItemsModal from './common/components/modals'
import itemAction from "./action";
import 'antd/dist/antd.css';
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

const { TabPane } = Tabs;

class App extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      itemId: 0,
      editItem: false,
      visible: false,
      item: {
        Id: 0,
        ItemName: '',
        Cost: 0,
      }
    };
  }

  componentDidMount() {
    this.getItems();
  }

  getItems() {
    this.props.dispatch(itemAction.GetItems());
  }
  
  addItem = async (item) => {
    await this.props.dispatch(itemAction.AddItem(item));
    this.getItems();
    this.setState({ visible: false });
  };

  updateItem = async (item) => {
    await this.props.dispatch(itemAction.UpdateItem(this.state.itemId, item));
    this.getItems();
    this.setState({ visible: false });
  };

  showModal = () => {
    this.setState({ visible: true });
  };

  removeItem = (id) => {
    Modal.confirm({
      title: 'Are you sure you want to remove item?',
      icon: <ExclamationCircleOutlined />,
      onOk: () => { this.props.dispatch(itemAction.DeleteItem(id)); this.getItems(); },
      okText: 'Yes',
      cancelText: 'No',
    });
  }

  onSubmit = (data) => {
    if(!this.state.editItem) {
      this.addItem(data);
    } else {
      this.updateItem(data);
    }
    this.setState({ item: null });
  }

  handleCancel = () => {
    this.setState({ item: null });
    this.setState({ visible: false });
  };

  render() {
    const itemColumns = [
      {
        title: "ID",
        dataIndex: "id",
        key: "id",
        sorter: (a, b) => a.id - b.id,
        sortDirections: ["descend", "ascend"],
      },
      {
        title: "ITEM",
        dataIndex: "itemName",
        key: "itemName",
        sorter: (a, b) => a.itemName.length - b.itemName.length,
        sortDirections: ["descend", "ascend"],
        render: (text, row, index) =>
        this.props.items !== null ? (
          <Button type="text" className="item" onClick={() => {this.showModal(); this.setState({ item: this.props.items[index], itemId: this.props.items[index].id, editItem: true }); }}>
            {text}
          </Button>
        ) : (
          text
        ),
      },
      {
        title: "COST",
        dataIndex: "cost",
        key: "cost",
        sorter: (a, b) => a.cost - b.cost,
        sortDirections: ["descend", "ascend"],
      },
      {
        title: <FontAwesomeIcon icon={faTrash} id="DeleteItem"size="1x" />,
        render: (text, row, index) =>
        this.props.items !== null && (
          <FontAwesomeIcon
            id={`DeleteItem-${this.props.items[index].id}`}
            icon={faTrash}
            className="trash"
            onClick={() => this.removeItem(this.props.items[index].id)}
            size="1x" />
        ),
      },
    ];
    return (
      <>
        <ToastContainer autoclose={3000} position={toast.POSITION.TOP_RIGHT} />
        <Row justify="center">
          <Col xs={24} md={20} lg={18}>
            <span>
              <h1 className="p5-page-h1-header">
                <Tooltip title="Add Item">
                  <FontAwesomeIcon
                    icon={faPlusCircle}
                    id="AddItem"
                    className="add-icon"
                    alt="addIcon"
                    onClick={() => { this.showModal(); this.setState({ editItem: false }); }}
                    pull="right"
                    size="1x"
                  />
                </Tooltip>
              </h1>
            </span>
          </Col>
        </Row>
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
                  <h1>FAVORITES TAB LIST</h1>
                </TabPane>
              </Tabs>
            </Col>
          </Row>

          <ItemsModal
            visible={this.state.visible}
            item={this.state.item !== null ? this.state.item : null}
            handleOk={() => this.handleCancel()}
            handleCancel={() => this.handleCancel()}
            onSubmit={(e) => this.onSubmit(e)}
            title={!this.state.editItem ? 'ADD ITEM' : 'EDIT ITEM'}
            btnTxt="SAVE"
            isEdit={this.state.editItem}
          />
        </div>
      </>
    );
  }
}

App.propTypes = {
  dispatch: PropTypes.func,
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
  })),
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
