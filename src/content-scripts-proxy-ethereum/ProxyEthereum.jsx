/* eslint-disable func-names */
/* eslint-disable no-alert */
import React from 'react';
import { notification } from 'antd';
// import {
//     proxyClient, ChromeMessage
// } from '../chrome';
import { render } from 'react-dom';
import DrawerDemo from './DrawerDemo';
// import { contentClient } from '../chrome';

export default class ProxyEthereum {
    constructor() {
        this.container = null;
        this.init();
    }

    // 'success' | 'info' | 'warning' | 'error';
    openNotificationWithIcon(type, message) {
        notification[type]({
            message: `${type}`,
            description: `${message}`
        });
    }

    initEthereumProxy() {
        const that = this;
        const handler = {
            apply(target, thisArg, argumentsList) {
                console.log(`proxy begin: ${argumentsList}`);
                const constList = [...argumentsList][0];
                console.log('constList :>> ', constList);
                if (typeof constList.method !== 'undefined') {
                    if (constList.method === 'eth_sendTransaction') {
                        render(
                            <DrawerDemo
                                message="This acction may be dangerous, please confirm!"
                                method={constList.method}
                                params={constList.params}
                                onClose={() => {
                                    this.hideContainer();
                                }}
                            />,
                            that.container
                        );
                        that.showContainer();
                        // that.openNotificationWithIcon('warning', { ...argumentsList });
                        // alert(
                        //     '此操作可能存在风险 \n'
                        //   + `method: ${constList.method}\n`
                        //   + `params: ${JSON.stringify(constList.params)}`
                        // );
                    }
                }
                return target(...argumentsList);
            }
        };
        const proxyETH = () => {
            console.log('window.ethereum :>> ', window.ethereum);
            if (typeof window.ethereum !== 'undefined') {
                console.log('find ethereum');
                const proxy1 = new Proxy(window.ethereum.request, handler);
                window.ethereum.request = proxy1;
            }
        };
        setTimeout(proxyETH, 1000);
    }

    init() {
        this.initContainer();
        this.initEthereumProxy();
        // 注意，必须设置了run_at=document_start 此段代码才会生效
        document.addEventListener('DOMContentLoaded', () => {
            // this.initContainer();
            // this.initMessageClient();
            // this.initEthereumProxy();
        });
        // setTimeout(() => {
        //     this.initEthereumProxy();
        // }, 1000);
    }

    // 初始化外层包裹元素
    initContainer() {
        const { document } = window;
        const base = document.querySelector(
            '#chrome-extension-content-base-element-ethereum'
        );
        if (base) {
            this.container = base;
        } else {
            this.container = document.createElement('div');
            this.container.setAttribute(
                'id',
                'chrome-extension-content-base-element-ethereum'
            );
            this.container.setAttribute('class', WRAPPER_CLASS_NAME);
            document.body.appendChild(this.container);
        }
    }

    showContainer() {
        document.querySelector('#chrome-extension-content-base-element-ethereum').setAttribute('style', 'display: block');
    }

    hideContainer() {
        document.querySelector('#chrome-extension-content-base-element-ethereum').setAttribute('style', 'display: none');
    }
}
