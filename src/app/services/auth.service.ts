import { Injectable } from '@angular/core'
import { JwtHelperService } from '@auth0/angular-jwt'
import { BehaviorSubject } from 'rxjs'

export class UserModel {
  id?: string
  email?: string
  firstName?: string
  lastName?: string
  permissions?: Record<string, boolean>
  status?: string
  isEnterpriseUser?: boolean
}

@Injectable()
export class AuthService {

  public loggedInUser = new BehaviorSubject(new UserModel())
  public loggedInUserObserver = this.loggedInUser.asObservable()


  constructor(
    private jwtHelper: JwtHelperService,
  ) {

  }

  loggedIn = false;

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token') as string|undefined
    return !this.jwtHelper.isTokenExpired(token)
  }

}

