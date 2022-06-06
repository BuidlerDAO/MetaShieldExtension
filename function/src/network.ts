export type Result<T> =
  | {
      data: T
      error?: never
    }
  | {
      data?: never
      error: { message: string }
    }

interface NetworkOption {
  readonly value: Network
  readonly label: string
}

export const networkOptions: readonly NetworkOption[] = [
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
]

export type Network =
  | "arbitrum"
  | "aurora"
  | "avalanche"
  | "bsc"
  | "celo"
  | "ethereum"
  | "fantom"
  | "gnosis"
  | "hsc"
  | "moonbeam"
  | "moonriver"
  | "optimism"
  | "polygon"

export function validateAddress(address: string): boolean {
  return /^0x[0-9a-fA-F]{40}$/.test(address)
}