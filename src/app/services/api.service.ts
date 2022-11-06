import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { APIData } from 'src/app/models/api-data.model'
import { environment as config } from 'src/environments/environment'

@Injectable({
  providedIn: 'root',
})
export class APIService {

  constructor(private http: HttpClient) {}

  postAPI(data: APIData) {

    const token = localStorage.getItem('token') || ''

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-access-token': token,
      }),
    }

    const endpoint = `${config.api.url}/${data.route}`

    return this.http.post(endpoint, data.data, httpOptions)
   
  }

  getAPI(data: APIData) {

    const token = localStorage.getItem('token') || ''

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-access-token': token,
      }),
    }

    const endpoint = `${config.api.url}/${data.route}`

    return this.http.get(endpoint, httpOptions)
  }


}
