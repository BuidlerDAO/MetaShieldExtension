// proxy scripts 发送和监听消息
class ProxyClient {
    listenDecision() {
        console.log('listening message');
        return new Promise((resolve) => {
            window.addEventListener('message', (e) => { // 监听 message 事件
                if (e.origin !== window.location.origin) { // 验证消息来源地址
                    return;
                }
                if (typeof e.data.msg_key === 'undefined') {
                    return;
                }
                if (e.data.msg_key !== 'user_decision') {
                    return;
                }
                resolve(e.data);
            });
        });
    }

    listenRequest() {
        console.log('listening request result');
        return new Promise((resolve) => {
            window.addEventListener('message', (e) => { // 监听 message 事件
                if (e.origin !== window.location.origin) { // 验证消息来源地址
                    return;
                }
                if (typeof e.data.msg === 'undefined') {
                    return;
                }
                if (!e.data.msg.includes('network request')) {
                    return;
                }
                resolve(e.data);
            });
        });
    }

    postMsg(message) {
        const targetOrigin = window.location.origin;
        const msg = JSON.parse(JSON.stringify(message));
        window.postMessage(msg, targetOrigin);
    }
}

const proxyClient = new ProxyClient();

export {
    proxyClient
};
