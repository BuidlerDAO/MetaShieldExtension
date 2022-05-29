/* eslint-disable func-names */
/* eslint-disable no-alert */
import React from 'react';
import { render } from 'react-dom';
import {
    Drawer, Button, Alert, notification, Col, Row
} from 'antd';
import DrawerDemo from './DrawerDemo';
import './ProxyEthereum.scss';

const dictionary = {
    '0x095ea7b': 'approve'
};

export default class ProxyEthereum {
    constructor() {
        this.container = null;
        this.init();
    }

    isNotableAction(constList) {
        const notableActionList = ['approve'];
        if (typeof constList.method !== 'undefined') {
            if (constList.method === 'eth_sendTransaction') {
                const functionName = dictionary[constList.params[0].data.substring(0, 9)];
                if (notableActionList.includes(functionName)) {
                    return true;
                }
            }
        }
        return false;
    }

    renderDrawer(type, message, description, constList) {
        render(
            <DrawerDemo
                style={{ width: '50%' }}
                type={type}
                message={message}
                description={description}
                method={constList.method}
                params={constList.params}
                onClose={() => {
                    this.hideContainer();
                }}
            />,
            this.container
        );
        this.showContainer();
    }

    initEthereumProxy() {
        const that = this;
        // 初始化代理
        const handler = {
            apply(target, thisArg, argumentsList) {
                console.log(`proxy begin: ${argumentsList}`);
                const constList = [...argumentsList][0];
                console.log('constList :>> ', constList);
                if (that.isNotableAction(constList)) {
                    // 检查合约和域名安全性
                    that.verifyContractAndDomain({
                        contractAddress: constList.params[0].to,
                        domain: window.location.hostname
                    }).then((data) => {
                        console.log('data :>> ', data);
                        if (data.status === 'success') {
                            // 检查通过，可以执行
                            const type = 'success';
                            const message = 'This action is new ????';
                            const description = 'This is safe';
                            that.renderDrawer(type, message, description, constList);
                        } else {
                            console.log('object :>> ');
                        }
                    }).catch((err) => {
                        console.log('err :>> ', err);
                    });

                    // that.openNotificationWithIcon('warning', { ...argumentsList });
                    // alert(
                    //     '此操作可能存在风险 \n'
                    //   + `method: ${constList.method}\n`
                    //   + `params: ${JSON.stringify(constList.params)}`
                    // );
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

    // 封装 fetch 请求： 检验合约和域名安全性
    verifyContractAndDomain() {
        // const url = `https://metashield.vercel.app/api/contract?network=ethereum&address`;
        // return new Promise((resolve, reject) => {
        //     fetch(url)
        //         .then((res) => res.json())
        //         .then((data) => resolve(data))
        //         .catch((err) => reject(err));
        // });
        const mockData = {
            status: 'success',
            data: {
                contract: {
                    IsContract: true,
                    Verified: true
                },
                domain: {
                    status: 'whitelist' // "blacklist" || "whitelist" || "unknown"
                }
            }
        };
        const pms = new Promise((resolve, reject) => {
            resolve(mockData);
        });
        return pms;
    }

    test() {
        const cl = {
            method: 'eth_sendTransaction',
            params: [
                {
                    from: '0x6cab10630c4f2db291e2372b8cdcb2d07529332b',
                    data: '0x095ea7b30000000000000000000000006cab10630c4f2db291e2372b8cdcb2d07529332b0000000000000000000000000000000000000000000000000000000000000001',
                    to: '0x4d224452801aced8b2f0aebe155379bb5d594381',
                    maxPriorityFeePerGas: '0x3B9ACA00',
                    maxFeePerGas: '0x53d867b62'
                }
            ]
        };
        // this.renderDrawer('success', 'This action is safe!', 'This is safe', cl);
    }

    init() {
        this.initContainer();
        this.initEthereumProxy();
        this.test();
        // 注意，必须设置了run_at=document_start 此段代码才会生效
        document.addEventListener('DOMContentLoaded', () => {
            // this.initContainer();
            // this.initMessageClient();
        });
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
        const contentStyle = 'position: fixed; top: 0; left: 0; display: block; width: 100%; height: 10%; z-index: 9999;';
        document.querySelector('#chrome-extension-content-base-element-ethereum').setAttribute('style', contentStyle);
        // const contentStyle = 'display: block;';
        // document.querySelector('#chrome-extension-content-base-element-ethereum').setAttribute('style', contentStyle);
    }

    hideContainer() {
        const contentStyle = 'position: fixed; top: 0; left: 0; display: none; width: 100%; height: 10%; z-index: 9999;';
        document.querySelector('#chrome-extension-content-base-element-ethereum').setAttribute('style', contentStyle);
        // const contentStyle = 'display: none;';
        // document.querySelector('#chrome-extension-content-base-element-ethereum').setAttribute('style', contentStyle);
    }
}
