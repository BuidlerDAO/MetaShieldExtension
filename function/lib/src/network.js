"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateAddress = exports.networkOptions = void 0;
exports.networkOptions = [
    { value: "arbitrum", label: "Arbitrum" },
    { value: "aurora", label: "Aurora" },
    { value: "avalanche", label: "Avalanche" },
    { value: "bsc", label: "BSC" },
    { value: "celo", label: "Celo" },
    { value: "ethereum", label: "Ethereum" },
    { value: "fantom", label: "Fantom" },
    { value: "gnosis", label: "Gnosis (API unreliable)" },
    { value: "hsc", label: "HSC" },
    { value: "moonbeam", label: "Moonbeam" },
    { value: "moonriver", label: "Moonriver" },
    { value: "optimism", label: "Optimism" },
    { value: "polygon", label: "Polygon" },
];
function validateAddress(address) {
    return /^0x[0-9a-fA-F]{40}$/.test(address);
}
exports.validateAddress = validateAddress;
