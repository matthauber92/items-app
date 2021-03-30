import React from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { Formik } from 'formik';
import * as Yup from 'yup';
import 'antd/dist/antd.css';
import {
  Modal,
  Input,
  Form,
  Row,
  Col,
  Button,
  Tooltip,
} from 'antd';
import '../../../App.css';

class ItemsModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ItemName: '',
      Cost: 0,
    };
  }

  pivotData(vals) {
    const pivotData = {
      ItemName: vals.ItemName,
      Cost: vals.Cost,
    };
    return pivotData;
  }

  render() {
    return (
      <>
        <Modal
          visible={this.props.visible}
          title={this.props.title}
          onOk={() => this.props.handleCancel()}
          onCancel={() => this.props.handleCancel()}
          footer={[
          ]}
        >
      <Formik
        enableReinitialize
        initialValues={{
          ItemName: this.props.item == null ? this.state.ItemName : this.props.item.itemName,
          Cost: this.props.item == null ? this.state.Cost : this.props.item.cost,
        }}
        validationSchema={Yup.object().shape({
            ItemName: Yup.string()
              .typeError('Item Name is required')
              .required('Item Name is required'),
            Cost: Yup.number()
              .typeError('Cost is required')
              .required('Cost is required'),
          })}
        onSubmit={(values) => { this.props.onSubmit(this.pivotData(values)); }}
        render={({
          values,
          errors,
          touched,
          handleChange,
          handleSubmit,
        }) => (
          <Form
            id="item-form"
            name={this.props.title}
            autoComplete="off"
            onChange={handleChange}
            onSubmit={handleSubmit}
          >
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Form.Item
                  validateStatus={errors && errors.ItemName && touched.ItemName ? 'error' : null}
                  help={errors && touched.ItemName && errors.ItemName}
                >
                  <div className="form-label"><b>Item Name</b></div>
                  <Input
                    type="text"
                    id="ItemName"
                    name="ItemName"
                    placeholder="Item Name"
                    value={values.ItemName}
                    onChange={handleChange}
                    autoComplete="ItemName"
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  validateStatus={errors && errors.Cost && touched.Cost ? 'error' : null}
                  help={errors && touched.Cost && errors.Cost}
                >
                  <div className="form-label"><b>Cost</b></div>
                  <Input
                    type="number"
                    id="Cost"
                    name="Cost"
                    placeholder="Cost"
                    value={values.Cost}
                    onChange={handleChange}
                    autoComplete="Cost"
                  />
                </Form.Item>
              </Col>
            </Row>
            <Tooltip title={this.props.btnTxt}>
                <Button block key="submit" type="primary" style={{ marginBottom: '10px' }} loading={this.props.loading} onClick={handleSubmit}>
                  {this.props.btnTxt}
                </Button>
            </Tooltip>
            <Tooltip key="back" title="Cancel">
                <Button block type="secondary" onClick={() => this.props.handleCancel()}>
                  Cancel
                </Button>
            </Tooltip>,
          </Form>
        )}
        />
        </Modal>
      </>
    );
  }
}

ItemsModal.propTypes = {
    onSubmit: PropTypes.func,
    handleOk: PropTypes.func,
    handleCancel: PropTypes.func,
    item: PropTypes.shape({
        id: PropTypes.number,
        itemName: PropTypes.string,
        cost: PropTypes.number
    }),
    loading: PropTypes.bool,
    visible: PropTypes.bool,
    title: PropTypes.string,
    btnTxt: PropTypes.string,
  };
  
  ItemsModal.defaultProps = {
    handleSubmit: () => {},
    handleOk: () => {},
    handleCancel: () => {},
    item: {
        id: 0,
        itemName: '',
        cost: 0,
    },
    loading: true,
    visible: false,
    title: "",
    btnTxt: "",
  };
  
  function mapStateToProps(state) {
    const { loading } = state.AppState;
    return {
      loading
    };
  }
  
  const connectedItemsModal = connect(mapStateToProps)(ItemsModal);
  
  export { connectedItemsModal as default };
