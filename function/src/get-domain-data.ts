import { Network } from "./network"
import { isContract } from "./utils"
import { Request, Response } from "express"
import whitelist from "../data/whitelist.json"

export const getDomainData = async function (req: Request, res: Response) {
  console.log(req.query)

  var url = req.query["url"] as string
  var address = req.query["address"] as string
  var network = req.query["network"]


  if (url === undefined || address === undefined || network === undefined) {
    res.status(400).send({ code: "Query not find" })
    return
  }
  console.log(whitelist)

  var blackList = ["22.com"]

  const isContractResult = await isContract(address, network as Network)
  console.log(isContractResult)
  if (isContractResult.error) {
    // res.status(200).send(responseData)
    return {
      error: {
        message: isContractResult.error.message,
      },
    }
  }
  const responseData = {
    code: 200,
    status: "success",
    data: {
      contract: {
        IsContract: isContractResult.data, // true || false || "unknown"
        Verified: isContractResult.data // true || false  || "unknown"
      },
      domain: {
        status: blackList.includes(url)?
          "blacklist": whitelist.includes(url)?
            "whitelist" : "unknown"
      }
    }
  }
  res.status(200).send(responseData)
  return responseData
}

