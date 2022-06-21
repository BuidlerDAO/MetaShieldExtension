/* eslint-disable camelcase */
// import md5 from 'blueimp-md5';
const baseURL = 'https://www.metashield.cc';
const etherscanURL = 'https://etherscan.io';

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
        // 超时处理
        const timer = setTimeout(() => {
            resolve({
                status: 'success',
                data: {
                    contract: {
                        contract: 'unknown',
                        verified: 'unknown'
                    },
                    domain: {
                        status: '"unknown"' // "blacklist" || "whitelist" || "unknown"
                    }
                }
            });
        }, 3000);

        fetch(fetchUrl, {
            method: 'GET'
        })
            .then((res) => {
                clearTimeout(timer);
                return res.json();
            })
            .then((data) => resolve(data))
            .catch((err) => reject(err));
    });
};

const getVerification = async (contractAddress, domain) => {
    
};

const server = {
    postVerification,
    getVerification
};

export default server;
