import { contentClient, ChromeMessage } from '../chrome';

// 使用 postMessage 发送和监听消息
class ContentMsgClient {
    listenAndFrowardRequest() {
        console.log('content start listening message');
        return new Promise((resolve) => {
            window.addEventListener('message', async (e) => { // 监听 message 事件
                if (e.origin !== window.location.origin) { // 验证消息来源地址
                    return;
                }
                if (typeof e.data.msg_key === 'undefined') {
                    return;
                }
                if (e.data.msg_key !== 'network_request') {
                    return;
                }
                console.log('content received message');
                console.log('start sending message to background');
                const res = await contentClient.seedMessage(new ChromeMessage('network request', e.data));
                // post msg back to proxyClient
                this.postMsg(res);
            });
        });
    }

    postMsg(message) {
        const targetOrigin = window.location.origin;
        const msg = JSON.parse(JSON.stringify(message));
        window.postMessage(msg, targetOrigin);
    }
}

const contentMsgClient = new ContentMsgClient();

export {
    contentMsgClient
};
