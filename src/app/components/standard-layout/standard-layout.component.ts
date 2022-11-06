import { Component, OnInit } from '@angular/core'
import { AuthService, UserModel } from 'src/app/services/auth.service'

@Component({
  selector: 'app-standard-layout',
  templateUrl: './standard-layout.component.html',
  styleUrls: ['./standard-layout.component.scss']
})
export class StandardLayoutComponent implements OnInit {

  public user:UserModel = new UserModel()

  constructor(
    public authServ: AuthService,
  ) { }

  ngOnInit() {

    this.authServ.loggedInUserObserver.subscribe((data: UserModel) => {
      this.user = data
    })
  }

}
