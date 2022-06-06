import { Request, Response, Application } from "express"
import express = require("express");


import   * as bodyParser from "body-parser"
import  * as path from "path"
import { readFileSync } from "fs"
import { getDomainData } from "./src/get-domain-data"

var app: Application = express()

// https://stackabuse.com/get-http-post-body-in-express-js/
app.use(bodyParser.urlencoded({ extended: true }))

app.get("/", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "index.html"))
})

app.get("/release", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "index.html"))
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

// Web 类型云函数，只能监听 9000 端口
app.listen(9000, () => {
  console.log("Server start on http://localhost:9000")
})



app.get("/inwhitelist", async (req: Request, res: Response) => {
  await getDomainData(req, res)
  // res.status(200).send({ tip: "You should use the post request, see doc: https://githubbot.ahaclub.net" })
})

