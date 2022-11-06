export interface Asset {
  id?: string
  owner_id: string
  collection_id: string
  name: string
  type: AssetType
  url: string
  attributes: Record<string,any>
  created?: number
  last_updated?: number
}

export enum AssetType {
  NFT = "NFT",
  STOCK = "STOCK",
  CRYPTOCURRENCY = "CRYPTOCURRENCY",
}