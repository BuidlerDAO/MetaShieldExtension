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
exports.getDomainData = void 0;
const utils_1 = require("./utils");
const whitelist_json_1 = __importDefault(require("../data/whitelist.json"));
const getDomainData = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(req.query);
        var url = req.query["url"];
        var address = req.query["address"];
        var network = req.query["network"];
        if (url === undefined || address === undefined || network === undefined) {
            res.status(400).send({ code: "Query not find" });
            return;
        }
        console.log(whitelist_json_1.default);
        var blackList = ["22.com"];
        const isContractResult = yield (0, utils_1.isContract)(address, network);
        console.log(isContractResult);
        if (isContractResult.error) {
            // res.status(200).send(responseData)
            return {
                error: {
                    message: isContractResult.error.message,
                },
            };
        }
        const responseData = {
            code: 200,
            status: "success",
            data: {
                contract: {
                    IsContract: isContractResult.data,
                    Verified: isContractResult.data // true || false  || "unknown"
                },
                domain: {
                    status: blackList.includes(url) ?
                        "blacklist" : whitelist_json_1.default.includes(url) ?
                        "whitelist" : "unknown"
                }
            }
        };
        res.status(200).send(responseData);
        return responseData;
    });
};
exports.getDomainData = getDomainData;
