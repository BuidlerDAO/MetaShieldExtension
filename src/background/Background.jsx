import {
    create, backgroundClient, ChromeMessage
} from '../chrome';

export default class Background {
    constructor() {
        this.init();
    }

    init() {
        // this.initContentMenu();
        this.initMessageClient();
    }

    // 初始化右键菜单
    initContentMenu() {
        create({
            id: 'demo',
            title: '演示右键功能',
            onclick: () => {
                backgroundClient.seedMessage(new ChromeMessage('show drawer'));
            }
        });
    }

    // 初始化消息通道
    initMessageClient() {
        console.log('initMessageClient in background');
        backgroundClient.listen('network request', (res, sendResponse) => {
            const domain = res.params.value;
            const etherscanURL = 'https://etherscan.io';
            const fetchUrl = `${etherscanURL}/address/${domain}`;
            fetch(fetchUrl)
                .then((fetchRes) => fetchRes.text())
                .then((text) => { sendResponse(new ChromeMessage('network request success', text)); })
                .catch((err) => { sendResponse(new ChromeMessage('network request error', err)); });
        });
    }
}
