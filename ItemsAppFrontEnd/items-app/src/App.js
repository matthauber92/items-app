import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  Row,
  Col,
  Tabs,
  Table,
  Tooltip,
  Button,
  Modal,
  Input,
  Space,
} from "antd";
import { ToastContainer, toast } from "react-toastify";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ExclamationCircleOutlined, SearchOutlined, StarOutlined, StarFilled, PlusCircleOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import ItemsModal from './common/components/modals'
import itemAction from "./action";
import 'antd/dist/antd.css';
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

const { TabPane } = Tabs;

class App extends React.PureComponent {
  constructor(props) {
    super(props);
    this.favoriteList = [];
    this.state = {
      itemId: 0,
      editItem: false,
      visible: false,
      searchText: '',
      searchColumn: '',
      activeTab: 'items',
      item: {
        Id: 0,
        ItemName: '',
        Cost: 0,
      }
    };
  }

  componentDidMount() {
    this.getItems();
    if(sessionStorage.length > 0 || localStorage.length > 0) {
      this.getFavorites();
    }
  }

  getFavorites = () => {
    if (sessionStorage.length > 0) {
      const sessionList = JSON.parse(sessionStorage.getItem('favorite-list'));
      this.favoriteList = sessionList;
    } else if (localStorage.length > 0) {
      const sessionList = JSON.parse(localStorage.getItem('favorite-list'));
      this.favoriteList = sessionList;
    } else
      this.favoriteList = [];
  };

  addFavorite = (item) => {
    this.favoriteList.push(item);
    localStorage.setItem('favorite-list', JSON.stringify(this.favoriteList));    
    sessionStorage.setItem('favorite-list', JSON.stringify(this.favoriteList));
    toast(`Added ${item.itemName} to favorites.`); 
    this.getItems();
    this.getFavorites();
  };

  removeFavorite = (item) => {
    if(this.favoriteList !== null) {
      const list = this.favoriteList.filter(x => x.id !== item.id);
      sessionStorage.setItem('favorite-list', JSON.stringify(list));
      localStorage.setItem('favorite-list', JSON.stringify(this.favoriteList));
      toast(`Removed ${item.itemName} from favorites.`); 
      this.getItems();
      this.getFavorites();
    } else
      return;
  };

  getItems = () => {
    this.props.dispatch(itemAction.GetItems());
  };
  
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

  removeItem = (item) => {
    Modal.confirm({
      title:`Are you sure you want to remove ${item.itemName}?`,
      icon: <ExclamationCircleOutlined />,
      onOk: async () => { await this.props.dispatch(itemAction.DeleteItem(item)); this.getItems(); this.removeFavorite(item); this.getFavorites(); },
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
  };

  UpdateTabPage = (tab) => {
    this.setState({ activeTab: tab });
    this.getFavorites();
  };

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = (clearFilters) => {
    clearFilters();
    this.setState({ searchText: "" });
  };

  getItemSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => this.handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              this.setState({
                searchText: selectedKeys[0],
                searchedColumn: dataIndex,
              });
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} className="search" />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : "",
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => this.searchInput.select(), 100);
      }
    },
    render: (text) =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

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
        ...this.getItemSearchProps('itemName'),
        render: (text, row) =>
        this.props.items !== null ? (
          <Button type="text" className="item" onClick={() => { this.showModal(); this.setState({ item: row, itemId: row.id, editItem: true }); }}>
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
        ...this.getItemSearchProps('cost'),
      },
      {
        title: this.state.activeTab === 'items' ? 'Favorite' : '',
        render: (row) =>
        this.state.activeTab === 'items' && (
          <>
            {
              this.favoriteList == null ? (
              <Tooltip key="submit" title={`Add ${row.itemName} to favorites`}>
                <Button
                  type="button"
                  onClick={() => { this.addFavorite(row); }}
                  icon={<StarOutlined />}
                  size="large"
                  style={{ width: 100, border: 'none !important', backgroundColor: 'none !important' }}
                >
                </Button>
              </Tooltip>
              ) :
              this.favoriteList.filter(data => data.id === row.id).length === 0 ? 
              <Tooltip key="submit" title={`Add ${row.itemName} to favorites`}>
                <Button
                  type="button"
                  onClick={() => { this.addFavorite(row); }}
                  icon={<StarOutlined />}
                  size="large"
                  style={{ width: 100, border: 'none !important', backgroundColor: 'none !important' }}
                >
                </Button>
              </Tooltip> :
              <Tooltip key="submit" title={`Remove ${row.itemName} from favorites`}>
                <Button
                  onClick={() => this.removeFavorite(row)}
                  icon={<StarFilled />}
                  size="large"
                  style={{ width: 100, border: 'none !important', backgroundColor: 'none !important' }}
                >
                </Button>
              </Tooltip>
            }
          </>
        ),
      },
      {
        render: (row) =>
        this.state.activeTab === 'items' && (
          <Tooltip key="submit" title={`Remove ${row.itemName}`}>
            <FontAwesomeIcon
              id={`DeleteItem-${row.id}`}
              icon={faTrash}
              className="trash"
              onClick={() => this.removeItem(row) }
              size="2x" />
            </Tooltip>
        ),
      },
    ];
    return (
      <>
        <ToastContainer autoclose={3000} position={toast.POSITION.TOP_CENTER} />
        <Row justify="center">
          <Col xs={24} md={20} lg={18}>
            <span>
              <h1>
                <Tooltip title="Add Item">
                  <PlusCircleOutlined
                    id="AddItem"
                    className="add-icon"
                    alt="addIcon"
                    onClick={() => { this.showModal(); this.setState({ editItem: false }); }}
                  />
                </Tooltip>
              </h1>
            </span>
          </Col>
        </Row>
        <div>
          <Row justify="center">
            <Col xs={24} md={24} lg={20}>
              <Tabs
                size="large"
                onTabClick={(e) => this.UpdateTabPage(e)}
              >
                <TabPane
                  tab="Items"
                  key="items"
                >
                  <div>
                    <Row justify="center">
                      <Col span={24}>
                        <Table
                          key="rowKey"
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
                  tab="Favorites"
                  key="favorites"
                > 
                  <Table
                    key="rowKey"
                    dataSource={this.favoriteList !== null && this.favoriteList.length > 0 ? this.favoriteList : null}
                    columns={itemColumns}
                    scroll={{ x: 700 }}
                    size="large"
                    rowKey='Id' 
                  />
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
    itemName: PropTypes.string,
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
