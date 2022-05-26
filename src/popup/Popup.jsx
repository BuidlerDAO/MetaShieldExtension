import React, { Component } from 'react';
import {
    Form, Input, Button, Checkbox
} from 'antd';
import './Popup.scss';
import { go } from '../chrome';

export default class Popup extends Component {

    state = {
        name: WRAPPER_CLASS_NAME
    }

    gotoPage(pageUrl) {
        if(!pageUrl){
            go('../html/view.html');
        }
        go(pageUrl)
    }

    render() {
        return (
            <div className={`${WRAPPER_CLASS_NAME}`}>
                <h2 style={{display:"flex",justifyContent:"center"}}>Keep you safe in web3</h2>
                <Form
                    layout="Vertical"
                    name="basic"
                    className="basic-table"
                    initialValues={{ remember: true }}
                >
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
                            onClick={() => { this.gotoPage('https://mask2-web.vercel.app/'); }}
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
