export class APIData {
  route: string;
  data: object;
  constructor(route: string, data?: object) {
    this.route = route
    this.data = data || {}
  }
}

export interface APIResponse {
  message: string;
  data: any;
}