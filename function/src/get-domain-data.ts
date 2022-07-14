import { Network } from "./network"
import { isContract, isVerified } from "./utils"
import { Request, Response } from "express"
import whitelist from "../data/domain_whitelist.json"
import useBlacklist from "../data/domain_use_blacklist.json"
import contractBlacklist from "../data/contract_blacklist.json"
import { analytics } from "./analytics"

export const getDomainData = async function (req: Request, res: Response) {
  var url = req.query["url"] as string
  var address = req.query["address"] as string
  var network = req.query["network"]


  if (url === undefined || address === undefined || network === undefined) {
    res.status(400).send({ code: "Query not find" })
    return
  }

  analytics.track("site:"+url)

  const status = (useBlacklist.includes(url) || contractBlacklist.includes(address))?
          "blacklist": whitelist.includes(url)?
            "whitelist" : "unknown"
  analytics.track("domain-status:"+status.toString())
  var responseData, isContractResultData, isVerifiedResultData, errorData: string | boolean | undefined
  if(status!="unknown"){
    responseData = getResponseData("unknown", "unknown", status)
  }else{
    const isContractResult = await isContract(address, network as Network)
    const isVerifiedResult = await isVerified(address, network as Network)
    // console.log(isContractResult)
    isContractResultData = isContractResult.error ? "unknown" :isContractResult.data
    isVerifiedResultData = isVerifiedResult.error ? "unknown" :isVerifiedResult.data
    errorData = isContractResult.error?"isContractResult function returned an error":isVerifiedResult.error ?"isVerifiedResult function returned an error": undefined
    responseData = getResponseData(isContractResultData, isVerifiedResultData, "unknown", errorData)
  }
  // analytics.track("inWhitelist", {req: req.query, res: responseData})
  res.status(200).send(responseData)
  return responseData
}

function getResponseData(contract: boolean | string, verified: boolean | string, status: string, error?: boolean | string | undefined){
  return {
    code: 200,
    status: "success",
    data: {
      contract: {
        contract: contract, // true || false || "unknown"
        verified: verified // true || false  || "unknown"
      },
      domain: {
        status: status,
      }
    },
    error: error,
  }
}
