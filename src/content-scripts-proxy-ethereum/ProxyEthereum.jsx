/* eslint-disable func-names */
/* eslint-disable no-alert */
import React from 'react';
import { render } from 'react-dom';
import {
    Drawer, Button, Alert, notification, Col, Row
} from 'antd';
import { proxyClient } from './message.js';
import DrawerDemo from './DrawerDemo';
import server from '../server/server';
import './ProxyEthereum.scss';

const dictionary = {
    '0x095ea7b3': 'approve',
    '0xa22cb465': 'setApprovalForAll'
};

export default class ProxyEthereum {
    constructor() {
        this.container = null;
        this.init();
    }

    isNotableAction(constList) {
        // 检查是否为关注的交易
        const notableActionList = ['approve', 'setApprovalForAll'];
        if (typeof constList.method !== 'undefined') {
            if (constList.method === 'eth_sendTransaction') {
                const functionName = dictionary[constList.params[0].data.substring(0, 10)];
                if (notableActionList.includes(functionName)) {
                    return true;
                }
            }
        }
        return false;
    }

    getDrawerType(verificationData) {
        if (verificationData.domain.status === 'whitelist') {
            return 'success';
        } if (verificationData.domain.status === 'blacklist') {
            return 'danger';
        }
        return 'warning';
    }

    renderDrawer(type, verification, contractAddress, domain, constList) {
        this.showContainer();
        render(
            <DrawerDemo
                style={{ width: '50%' }}
                type={type}
                contractAddress={contractAddress}
                domain={domain}
                verification={verification}
                method={constList.method}
                params={constList.params}
                onClose={() => {
                    this.hideContainer();
                }}
            />,
            this.container
        );
    }

    initEthereumProxy() {
        const that = this;
        // 初始化代理
        const handler = {
            async apply(target, thisArg, argumentsList) {
                const constList = [...argumentsList][0];
                // console.log('constList :>> ', constList);
                if (that.isNotableAction(constList)) {
                    const contractAddress = constList.params[0].to;
                    // 获取一级域名
                    const domain = document.domain.split('.').slice(-2).join('.');
                    // 检查合约和域名安全性
                    const verificationData = await that.verifyContractAndDomain({
                        contractAddress,
                        domain
                    });
                    if (verificationData.status && verificationData.status === 'success') {
                        const verification = verificationData.data;
                        const type = (domain === 'looksrare.org') ? 'danger' : that.getDrawerType(verificationData.data);
                        // const type = 'warning';
                        // 获取验证信息，渲染消息框
                        that.renderDrawer(type, verification, contractAddress, domain, constList);
                        if (type === 'success') {
                            return target(...argumentsList);
                        }
                        // 监听用户选择
                        const decisionData = await proxyClient.listen();
                        if (decisionData.value === 'continue') {
                            return target(...argumentsList);
                        }
                        return null;
                    }
                    // 检查合约和域名安全性时出错
                    const type = 'error';
                    that.renderDrawer(type, 'verification', 'contractAddress', domain, constList);
                }
                return target(...argumentsList);
            }
        };
        // eslint-disable-next-line no-use-before-define
        const proxyInterval = setInterval(proxyETH(), 1000);
        function proxyETH() {
            if (typeof window.ethereum !== 'undefined') {
                console.log('Found ethereum');
                const proxy1 = new Proxy(window.ethereum.request, handler);
                window.ethereum.request = proxy1;
                clearInterval(proxyInterval);
            } else {
                console.log('Did not find ethereum');
            }
        }
        // setTimeout(() => { proxyETH(); }, 1500);
    }

    // 封装 fetch 请求： 检验合约和域名安全性
    verifyContractAndDomain({ contractAddress, domain }) {
        return server.postVerification(contractAddress, domain);
        // const mockData = {
        //     status: 'success',
        //     data: {
        //         contract: {
        //             IsContract: true,
        //             Verified: true
        //         },
        //         domain: {
        //             status: 'blacklist' // "blacklist" || "whitelist" || "unknown"
        //         }
        //     }
        // };
        // const pms = new Promise((resolve, reject) => {
        //     resolve(mockData);
        // });
        // return pms;
    }

    test() {
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
        const contractAddress = '0x4d224452801aced8b2f0aebe155379bb5d594381';
        const domain = window.location.hostname;
        if (domain.includes('tencent')) {
            this.renderDrawer('danger', mockData.data, '0x4d224452801aced8b2f0aebe155379bb5d594381', domain, cl);
        } else if (domain.includes('google')) {
            this.renderDrawer('warning', mockData.data, '0x4d224452801aced8b2f0aebe155379bb5d594381', domain, cl);
        } else if (domain.includes('github')) {
            this.renderDrawer('success', mockData.data, '0x4d224452801aced8b2f0aebe155379bb5d594381', domain, cl);
        }
    }

    init() {
        this.initContainer();
        this.initEthereumProxy();
        this.test();
        // 注意，必须设置了run_at=document_start 此段代码才会生效
        // document.addEventListener('DOMContentLoaded', () => {
        //     // this.initContainer();
        //     // this.initMessageClient();
        // });
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
