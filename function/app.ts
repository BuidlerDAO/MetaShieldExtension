import { Request, Response, Application } from "express"
import express = require("express");


import * as bodyParser from "body-parser"
import * as path from "path"
import { readFileSync } from "fs"
import { getDomainData } from "./src/get-domain-data"
import "dotenv/config"
import { analytics } from "./src/analytics"


var app: Application = express()

// https://stackabuse.com/get-http-post-body-in-express-js/
app.use(bodyParser.urlencoded({ extended: true }))
app.use("/assets/:asset_id",(req, res)=>{
  res.sendFile(path.join(__dirname, req.originalUrl.substring(1)))
})

app.use("/lib/:lib_id",(req, res)=>{
  res.sendFile(path.join(__dirname, req.originalUrl.substring(1)))
})

app.get("/", (req: Request, res: Response) => {
  analytics.track("/zh")
  res.sendFile(path.join(__dirname, "index.html"))
})

app.get("/en", (req: Request, res: Response) => {
  analytics.track("/en")
  res.sendFile(path.join(__dirname, "indexen.html"))
})

app.get("/indexen.html", (req: Request, res: Response) => {
  analytics.track("/en")
  res.sendFile(path.join(__dirname, "indexen.html"))
})

app.get("/disclaimer", (req: Request, res: Response) => {
  analytics.track("/disclaimer")
  res.sendFile(path.join(__dirname, "disclaimer.html"))
})

app.get("/privacy-policy", (req: Request, res: Response) => {
  analytics.track("/privacy-policy")
  res.sendFile(path.join(__dirname, "privacy-policy.html"))
})

app.get("/test-example", (req: Request, res: Response) => {
  analytics.track("/test-example")
  res.sendFile(path.join(__dirname, "test-example.html"))
})

app.get("/logo", (req: Request, res: Response) => {
  const logo = path.join(__dirname, "logo.png")
  const content = readFileSync(logo, {
    encoding: "base64",
  })
  res.set("Content-Type", "image/png")
  res.send(Buffer.from(content, "base64"))
  res.status(200).end()
})

app.get("/404", (req: Request, res: Response) => {
  analytics.track("/404")
  res.status(404).send("Not found")
})

app.get("/500", (req: Request, res: Response) => {
  analytics.track("/500")
  res.status(500).send("Server Error")
})

// Error handler
app.use(function (err: any, req: any, res: any, next: any) {
  console.error(err)
  console.log(req)
  console.log(next)
  res.status(500).send("Internal Serverless Error")
})

app.get("/inwhitelist", async (req: Request, res: Response) => {
  analytics.track("inWhitelist", {req: req.query})
  await getDomainData(req, res)
})

// Web 类型云函数，只能监听 9000 端口
app.listen(9000, () => {
  console.log("Server start on http://localhost:9000")
})
