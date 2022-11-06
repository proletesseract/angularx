import { Component, OnInit } from '@angular/core';
import { APIData, APIResponse } from 'src/app/models/api-data.model';
import { APIService } from 'src/app/services/api.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public authenticated: boolean = false;

  constructor(
    private apiService: APIService
  ) { }

  ngOnInit(): void {
    localStorage.removeItem('token')
  }

  async login() {
    this.apiService.postAPI(new APIData('auth', {
      email: 'craigmacgregor@gmail.com',
      password: '1234'
    })).subscribe((res) => {
      const apiRes = res as APIResponse
      if (apiRes.message === 'OK' && apiRes.data && apiRes.data.auth_token) {
        localStorage.setItem('token', apiRes.data.auth_token)
        this.authenticated = true
      } else {
        console.error('unable to authenticate')
      }
    })
  }

  async logout() {
    this.authenticated = false
    localStorage.removeItem('token')
  }

}
