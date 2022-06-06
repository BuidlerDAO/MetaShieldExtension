"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getContract = exports.getCode = exports.isVerified = exports.isContract = exports.config = void 0;
const axios_1 = __importDefault(require("axios"));
const API_TIMEOUT = 5000;
exports.config = {
    ethereum: {
        scanDomain: "api.etherscan.io",
        apiKey: process.env.ETHERSCAN_API_KEY || "",
    },
    bsc: {
        scanDomain: "api.bscscan.com",
        apiKey: process.env.BSCSCAN_API_KEY || "",
    },
    avalanche: {
        scanDomain: "api.snowtrace.io",
        apiKey: process.env.SNOWTRACE_API_KEY || "",
    },
    fantom: {
        scanDomain: "api.ftmscan.com",
        apiKey: process.env.FTMSCAN_API_KEY || "",
    },
    arbitrum: {
        scanDomain: "api.arbiscan.io",
        apiKey: process.env.ARBISCAN_API_KEY || "",
    },
    polygon: {
        scanDomain: "api.polygonscan.com",
        apiKey: process.env.POLYGONSCAN_API_KEY || "",
    },
    aurora: {
        scanDomain: "api.aurorascan.dev",
        apiKey: process.env.AURORASCAN_API_KEY || "",
    },
    optimism: {
        scanDomain: "api-optimistic.etherscan.io",
        apiKey: process.env.OPTIMISTIC_ETHERSCAN_API_KEY || "",
    },
    celo: {
        scanDomain: "api.celoscan.xyz",
        apiKey: process.env.CELOSCAN_API_KEY || "",
    },
    gnosis: {
        scanDomain: "blockscout.com/xdai/mainnet",
        apiKey: "", // no api key needed
    },
    hsc: {
        scanDomain: "api.hooscan.com",
        apiKey: process.env.HOOSCAN_API_KEY || "",
    },
    moonriver: {
        scanDomain: "api-moonriver.moonscan.io",
        apiKey: process.env.MOONRIVIER_MOONSCAN_API_KEY || "",
    },
    moonbeam: {
        scanDomain: "api-moonbeam.moonscan.io",
        apiKey: process.env.MOONBEAM_MOONSCAN_API_KEY || "",
    },
};
function isContract(address, network) {
    return __awaiter(this, void 0, void 0, function* () {
        let isContractResult = yield _isContract(address, network, "txlist");
        if (isContractResult.error &&
            isContractResult.error.message.toString().includes("No transactions found")) {
            return _isContract(address, network, "txlistinternal");
        }
        return isContractResult;
    });
}
exports.isContract = isContract;
function _isContract(address, network, action) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { data } = yield axios_1.default.get(`https://${exports.config[network].scanDomain}/api`, {
                params: {
                    module: "account",
                    action,
                    address,
                    startblock: 0,
                    endblock: 99999999,
                    page: 1,
                    offset: 1,
                    sort: "asc",
                    apikey: exports.config[network].apiKey,
                },
                timeout: API_TIMEOUT,
            });
            console.log("_isContract data:");
            console.log(data);
            if (data.status === "1") {
                // contract creation txn
                return { data: data.result[0].to === "" };
            }
            return {
                error: {
                    message: `[${data.message}] ${data.result}`,
                },
            };
        }
        catch (error) {
            console.log("_isContract: error:");
            console.log(JSON.stringify(error, Object.getOwnPropertyNames(error)));
            return {
                error: {
                    message: "unknown error",
                },
            };
        }
    });
}
function isVerified(address, network) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log("config[network].apiKey===");
            console.log(exports.config[network].apiKey);
            const { data } = yield axios_1.default.get(`https://${exports.config[network].scanDomain}/api`, {
                params: {
                    module: "contract",
                    action: "getsourcecode",
                    address,
                    apikey: exports.config[network].apiKey,
                },
                timeout: API_TIMEOUT,
            });
            if (data.status === "0") {
                return {
                    error: {
                        message: `[${data.message}] ${data.result}`,
                    },
                };
            }
            let result = data.result[0];
            return {
                data: result.ABI !== "Contract source code not verified",
            };
        }
        catch (error) {
            console.log(JSON.stringify(error, Object.getOwnPropertyNames(error)));
            return {
                error: {
                    message: "unknown error",
                },
            };
        }
    });
}
exports.isVerified = isVerified;
function getCode(address, network) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { data } = yield axios_1.default.get(`https://${exports.config[network].scanDomain}/api`, {
                params: {
                    module: "contract",
                    action: "getsourcecode",
                    address,
                    apikey: exports.config[network].apiKey,
                },
                timeout: API_TIMEOUT,
            });
            if (data.status === "0") {
                return {
                    error: {
                        message: `[${data.message}] ${data.result}`,
                    },
                };
            }
            let result = data.result[0];
            // it is the implementation
            if (result.Proxy === "0" || result.Implementation === address) {
                return {
                    data: parseSourceCode(result.SourceCode),
                };
            }
            // it is the proxy, go to implementation
            return getCode(result.Implementation, network);
        }
        catch (error) {
            console.log(JSON.stringify(error, Object.getOwnPropertyNames(error)));
            return {
                error: {
                    message: "unknown error",
                },
            };
        }
    });
}
exports.getCode = getCode;
function getContract(address, network) {
    return __awaiter(this, void 0, void 0, function* () {
        const isVerifiedResult = yield isVerified(address, network);
        if (isVerifiedResult.error) {
            return {
                error: {
                    message: isVerifiedResult.error.message,
                },
            };
        }
        return {
            data: {
                IsContract: true,
                Verified: isVerifiedResult.data,
            },
        };
    });
}
exports.getContract = getContract;
function parseSourceCode(sourceCode) {
    try {
        const jsonStr = sourceCode.substring(1, sourceCode.length - 1);
        const obj = JSON.parse(jsonStr);
        sourceCode = Object.entries(obj.sources).reduce((prev, curr, i) => prev +
            "\n" +
            (i === 0
                ? curr[1].content
                : filterOutSolidityFileHeader(curr[1].content)), "");
    }
    catch (error) {
        // ignore
    }
    return sourceCode;
}
function filterOutSolidityFileHeader(sourceCode) {
    const lines = sourceCode.split("\n");
    const filteredLines = lines.filter((line) => {
        return !line.startsWith("pragma solidity") && !line.startsWith("import");
    });
    return filteredLines.join("\n");
}
