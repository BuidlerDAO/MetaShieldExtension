const postVerification = ({ contractAddress, domain }) => {
    const formData = new FormData();
    const timeStamp = Date.now();
    const network = 'ethereum';
    const formDataObject = {
        contractAddress,
        domain,
        network,
        timeStamp
    };
    const reversedKeys = Object.keys(formDataObject).sort().reverse();
    console.log('reversedKeys :>> ', reversedKeys);
    formData.append('address', contractAddress);
    formData.append('domain', domain);
    formData.append('network', 'ethereum');
    formData.append('timeStamp', timeStamp);

    const url = 'http://shield.metaworth.top/Api/Home/listsApi/Home/verification';
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

const server = {
    postVerification
};

export default server;
