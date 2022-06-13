"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = __importStar(require("body-parser"));
const path = __importStar(require("path"));
const fs_1 = require("fs");
const get_domain_data_1 = require("./src/get-domain-data");
var app = express();
// https://stackabuse.com/get-http-post-body-in-express-js/
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/assets/:asset_id", (req, res) => {
    res.sendFile(path.join(__dirname, req.originalUrl.substring(1)));
});
app.use("/lib/:lib_id", (req, res) => {
    res.sendFile(path.join(__dirname, req.originalUrl.substring(1)));
});
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});
app.get("/en", (req, res) => {
    res.sendFile(path.join(__dirname, "indexen.html"));
});
app.get("/indexen.html", (req, res) => {
    res.sendFile(path.join(__dirname, "indexen.html"));
});
app.get("/disclaimer", (req, res) => {
    res.sendFile(path.join(__dirname, "disclaimer.html"));
});
app.get("/privacy-policy", (req, res) => {
    res.sendFile(path.join(__dirname, "privacy-policy.html"));
});
app.get("/logo", (req, res) => {
    const logo = path.join(__dirname, "logo.png");
    const content = (0, fs_1.readFileSync)(logo, {
        encoding: "base64",
    });
    res.set("Content-Type", "image/png");
    res.send(Buffer.from(content, "base64"));
    res.status(200).end();
});
app.get("/404", (req, res) => {
    res.status(404).send("Not found");
});
app.get("/500", (req, res) => {
    res.status(500).send("Server Error");
});
// Error handler
app.use(function (err, req, res, next) {
    console.error(err);
    console.log(req);
    console.log(next);
    res.status(500).send("Internal Serverless Error");
});
app.get("/inwhitelist", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(process.env.FTMSCAN_API_KEY);
    console.log(process.env.TENCENT_SECRET_ID);
    yield (0, get_domain_data_1.getDomainData)(req, res);
}));
// Web 类型云函数，只能监听 9000 端口
app.listen(9000, () => {
    console.log("Server start on http://localhost:9000");
});
