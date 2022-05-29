const Web3 = require('web3');

const web3 = new Web3();

const findInDictionary = (key) => {
    const res = web3.utils.sha3('approve(address,uint256)');
    console.log('res :>> ', res);
};

const exp = {
    findInDictionary
};

export default exp;
