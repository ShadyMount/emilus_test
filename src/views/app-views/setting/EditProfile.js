import React, { Component } from "react";
import { Form, Button, Input, Row, Col, message, Spin, Empty } from "antd";
import { ROW_GUTTER } from "constants/ThemeConstant";
import { connect } from "react-redux";
import { updateSelectedClient } from "redux/actions/Clients";

export class EditProfile extends Component {
  render() {
    const onFinish = () => {
      const key = "updatable";
      message.loading({ content: "Updating...", key });
      this.props.updateSelectedClient();
      setTimeout(() => {
        message.success({ content: "Done!", key, duration: 2 });
        this.props.history.push("/app/basics/clients/clientsList");
      }, 1000);
    };

    const onFinishFailed = (errorInfo) => {
      console.log("Failed:", errorInfo);
    };

    if (!this.props.selectedClient) {
      this.props.history.push("/app/basics/clients/clientsList");

      return <Empty />;
    }

    const {
      name,
      email,
      username,
      phone: phoneNumber,
      website,
      address: addressData,
    } = this.props.selectedClient;

    const postcode = addressData.zipcode;
    const city = addressData.city;
    const address = addressData.suite + " " + addressData.street;

    return (
      <>
        <div className="mt-4">
          <Spin spinning={this.props.loading}>
            <Form
              aria-disabled={this.props.loading}
              name="basicInformation"
              layout="vertical"
              initialValues={{
                name: name,
                email: email,
                username: username,
                phoneNumber: phoneNumber,
                website: website,
                address: address,
                city: city,
                postcode: postcode,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              <Row>
                <Col xs={24} sm={24} md={24} lg={16}>
                  <Row gutter={ROW_GUTTER}>
                    <Col xs={24} sm={24} md={12}>
                      <Form.Item
                        label="Name"
                        name="name"
                        rules={[
                          {
                            required: true,
                            message: "Please input your name!",
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={12}>
                      <Form.Item
                        label="username"
                        name="username"
                        rules={[
                          {
                            required: true,
                            message: "Please input your username!",
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={12}>
                      <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                          {
                            required: true,
                            type: "email",
                            message: "Please enter a valid email!",
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={12}>
                      <Form.Item label="Phone Number" name="phoneNumber">
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={12}>
                      <Form.Item label="Website" name="website">
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={24}>
                      <Form.Item label="Address" name="address">
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={12}>
                      <Form.Item label="City" name="city">
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={12}>
                      <Form.Item label="Post code" name="postcode">
                        <Input />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Button type="primary" htmlType="submit">
                    Save Change
                  </Button>
                </Col>
              </Row>
            </Form>
          </Spin>
        </div>
      </>
    );
  }
}

const mapStateToProps = ({ clients }) => {
  const { loading, selectedClient } = clients;
  return { loading, selectedClient };
};

const mapDispatchToProps = { updateSelectedClient };

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
