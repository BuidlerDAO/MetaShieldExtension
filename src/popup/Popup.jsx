import React, { Component } from 'react';
import {
    Form, Input, Button, Checkbox,
    Typography, Space
} from 'antd';

import './Popup.scss';
import { go } from '../chrome';
import ModeSwitch from './ModeSwitch';

const { Title, Paragraph, Text } = Typography;

export default class Popup extends Component {
  state = {
      name: WRAPPER_CLASS_NAME,
      safeMode: false
  };

  setSafeMode(safeMode) {
      this.setState({
          safeMode
      });
  }

  gotoPage(pageUrl) {
      if (!pageUrl) {
          go('../html/view.html');
      }
      go(pageUrl);
  }

  render() {
      return (
          <div className={`${WRAPPER_CLASS_NAME}`}>
              <Title className="center-content" level={2}>Meta Shield</Title>
              <Paragraph className="center-content">
                  Keep you
                  {'  '}
                  <Text strong style={{ color: '#1da57a' }}>
                      &nbsp;safe&nbsp;
                  </Text>
                  {' '}
                  in
                  {' '}
                  <Text code>Web3</Text>
                  .
              </Paragraph>
              <Form
                  layout="Vertical"
                  name="basic"
                  className="basic-table"
                  initialValues={{ remember: true }}
              >
                  <ModeSwitch
                      safeMode={this.state.safeMode}
                      setSafeMode={(checked) => {
                          this.setSafeMode(checked);
                      }}
                  ></ModeSwitch>

                  <Form.Item
                      label="Address"
                      name="Address"
                      rules={[{ required: true, message: 'Please input your Address!' }]}
                  >
                      <Input />
                  </Form.Item>

                  {/* <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password />
                    </Form.Item> */}

                  {/* <Form.Item name="remember" valuePropName="checked">
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item> */}

                  {/* <Form.Item>
                        <Button
                            type="primary"
                            onClick={() => { this.gotoPage(); }}
                            className="form-button"
                        >
                            演示页面跳转
                        </Button>
                    </Form.Item> */}

                  <Form.Item>
                      <Button
                          type="primary"
                          onClick={() => {
                              this.gotoPage('https://mask2-web.vercel.app/');
                          }}
                          className="form-button"
                      >
                          Mask^2
                      </Button>
                  </Form.Item>
              </Form>
          </div>
      );
  }
}
