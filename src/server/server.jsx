/* eslint-disable camelcase */
import md5 from 'blueimp-md5';

const baseURL = 'https://www.metashield.cc/';

const postVerificationCatBoss = (contractAddress, domain) => {
    const formData = new FormData();
    const address = contractAddress;
    const timestamp = Date.now();
    const network = 'ethereum';
    const formDataObject = {
        address,
        domain,
        network,
        timestamp
    };
    const reversedKeys = Object.keys(formDataObject).sort().reverse();
    console.log('reversedKeys :>> ', reversedKeys);
    let fullString = '';
    for (let i = 0; i < reversedKeys.length; i += 1) {
        const key = reversedKeys[i];
        const value = formDataObject[reversedKeys[i]];
        fullString += `&${key}=${value}`;
    }
    const dataString = fullString.slice(1);
    console.log('dataString :>> ', dataString);
    // timestamp=1654278331978&network=ethereum&domain=www.hao123.com&address=0x4d224452801aced8b2f0aebe155379bb5d594381
    const api_sign = md5(md5('dVO8oTE*ys#z7CKchQaGWM89F483ZCH!') + dataString).toLowerCase();
    console.log('api_sign :>> ', api_sign);
    // 3323d9bed6102790818b01118b15eb6e

    formData.append('address', address);
    formData.append('domain', domain);
    formData.append('network', network);
    formData.append('timestamp', timestamp);
    formData.append('api_sign', api_sign);

    const url = 'http://shield.metaworth.top/api/verification';
    return new Promise((resolve, reject) => {
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formData
        })
            .then((res) => res.json())
            .then((data) => resolve(data))
            .catch((err) => reject(err));
    });
};

const postVerification = (contractAddress, domain) => {
    const address = contractAddress;
    const url = domain;
    // const timestamp = Date.now();
    const network = 'ethereum';
    const formDataObject = {
        address,
        url,
        network
    };

    let fetchUrl = `${baseURL}/inwhitelist`;
    const paramsArray = [];
    // 拼接参数
    Object.keys(formDataObject).forEach((key) => paramsArray.push(`${key}=${formDataObject[key]}`));
    if (fetchUrl.search(/\?/) === -1) {
        fetchUrl += `?${paramsArray.join('&')}`;
    } else {
        fetchUrl += `&${paramsArray.join('&')}`;
    }

    return new Promise((resolve, reject) => {
        fetch(fetchUrl, {
            method: 'GET'
        })
            .then((res) => res.json())
            .then((data) => resolve(data))
            .catch((err) => reject(err));
    });
};

const server = {
    postVerification
};

export default server;
