import React, { Component } from 'react';
import { Drawer, Button } from 'antd';
import './DrawerDemo.scss';
// import { contentClient, ChromeMessage } from '../../chrome';

export default class DrawerDemo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // messageFromBg: null
        };
        this.showContainer();
    }

    hideContainer() {
        document.querySelector('#chrome-extension-content-base-element-ethereum').setAttribute('style', 'display: none');
    }

    showContainer() {
        document.querySelector('#chrome-extension-content-base-element-ethereum').setAttribute('style', 'display: block');
    }

    // Background 通讯
    // async sendMsgToBackground() {
    //     const res = await contentClient.seedMessage(new ChromeMessage('test connect'));

    //     this.setState({
    //         messageFromBg: res.msg
    //     });
    // }

    render() {
        const { message, method, params } = this.props;
        return (
            <Drawer
                title="Risk Warning"
                getContainer={document.querySelector('#chrome-extension-content-base-element-ethereum')}
                placement="left"
                closable={false}
                onClose={() => { this.hideContainer(); }}
                visible
            >
                <p>{message}</p>
                <p>
                    Method:
                    {' '}
                    {JSON.stringify(method)}
                </p>
                <p>
                    Params:
                    {' '}
                    {JSON.stringify(params)}
                </p>
                <Button type="primary" onClick={() => this.hideContainer()}>
                    Close
                </Button>
            </Drawer>
        );
    }
}
