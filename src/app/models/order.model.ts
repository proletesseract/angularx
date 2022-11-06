export interface Order {
  id?: string
  user_id: string
  asset_id: string
  order_type: OrderType
  amount: number
  currency: AcceptedCurrencies
  order_status: OrderStatus
  created?: number
  last_updated?: number
}

export enum OrderType {
  BUY = "BUY",
  SELL = "SELL",
}

export enum OrderStatus {
  OPEN = "OPEN",
  CLOSED = "CLOSED",
  FILLED = "FILLED",
  PARTIAL = "PARTIAL",
}

export enum AcceptedCurrencies {
  USD = "USD",
  BTC = "BTC",
  ETH = "ETH",
}
