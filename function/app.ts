import { Request, Response, Application } from "express"
import express = require("express");


import   * as bodyParser from "body-parser"
import  * as path from "path"
import { readFileSync } from "fs"
import { getDomainData } from "./src/get-domain-data"

var app: Application = express()

// https://stackabuse.com/get-http-post-body-in-express-js/
app.use(bodyParser.urlencoded({ extended: true }))
app.use("/assets/:asset_id",(req, res)=>{
  res.sendFile(path.join(__dirname, req.originalUrl.substring(1)))
})
app.use("/vendor/:id",(req, res)=>{
  res.sendFile(path.join(__dirname, req.originalUrl.substring(1)))
})

app.get("/", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "index.html"))
})

app.get("/en", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "indexen.html"))
})

app.get("/indexen.html", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "indexen.html"))
})

app.get("/disclaimer", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "disclaimer.html"))
})

app.get("/privacy-policy", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "privacy-policy.html"))
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
  res.status(404).send("Not found")
})

app.get("/500", (req: Request, res: Response) => {
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
  console.log(process.env.FTMSCAN_API_KEY)
  console.log(process.env.TENCENT_SECRET_ID)
  await getDomainData(req, res)
})

// Web 类型云函数，只能监听 9000 端口
app.listen(9000, () => {
  console.log("Server start on http://localhost:9000")
})
