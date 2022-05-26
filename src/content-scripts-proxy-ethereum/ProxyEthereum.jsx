import React from 'react';
import { notification } from 'antd';
// import { render } from 'less';
// import DrawerDemo from './DrawerDemo';

export default class ProxyEthereum {
  constructor() {
    this.container = null;
    this.init();
  }

  // 'success' | 'info' | 'warning' | 'error';
  openNotificationWithIcon(type, message) {
    notification[type]({
      message: `${type}`,
      description: `${message}`,
    });
  }

  initEthereumProxy() {
    const that = this;
    const handler = {
      apply: function (target, thisArg, argumentsList) {
        console.log(`proxy begin: ${argumentsList}`);
        const constList = [...argumentsList][0];
        console.log('constList :>> ', constList);
        if (typeof constList.method != 'undefined') {
          if (constList.method === 'eth_sendTransaction') {
            // that.openNotificationWithIcon('warning', { ...argumentsList });
            // render(
            //   <DrawerDemo
            //     onClose={() => {
            //       this.hideContainer();
            //     }}
            //   />,
            //   that.container
            // );
            alert(JSON.stringify(...argumentsList));
          }
        }
        console.log(...argumentsList);
        return target(...argumentsList);
      },
    };
    const proxyETH = () => {
      console.log('window.ethereum :>> ', window.ethereum);
      if (typeof window.ethereum != 'undefined') {
        console.log('find ethereum');
        const proxy1 = new Proxy(window.ethereum.request, handler);
        window.ethereum.request = proxy1;
      }
    };
    setTimeout(proxyETH, 1000);
  }

  init() {
    // 注意，必须设置了run_at=document_start 此段代码才会生效
    // document.addEventListener('DOMContentLoaded', () => {
      // this.initContainer();
      // this.initMessageClient();
    // });
    this.initEthereumProxy();
  }

  // // 初始化消息通道
  // initMessageClient() {
  //   const { container } = this;

  //   contentClient.listen('show drawer', () => {
  //     this.showContainer();

  //     render(
  //       <DrawerDemo
  //         onClose={() => {
  //           this.hideContainer();
  //         }}
  //       />,
  //       container
  //     );
  //   });
  // }

  // // 初始化外层包裹元素
  // initContainer() {
  //   const { document } = window;
  //   const base = document.querySelector(
  //     '#chrome-extension-content-base-element-ethereum'
  //   );
  //   if (base) {
  //     this.container = base;
  //   } else {
  //     this.container = document.createElement('div');
  //     this.container.setAttribute(
  //       'id',
  //       'chrome-extension-content-base-element-ethereum'
  //     );
  //     this.container.setAttribute('class', WRAPPER_CLASS_NAME);
  //     document.body.appendChild(this.container);
  //   }
  // }

  // showContainer() {
  //   this.container.setAttribute('style', 'display: block');
  // }

  // hideContainer() {
  //   this.container.setAttribute('style', 'display: none');
  // }
}
