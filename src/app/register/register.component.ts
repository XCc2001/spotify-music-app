import { Component, OnInit } from '@angular/core'
import { NgForm } from '@angular/forms'
import { AuthService } from '../auth.service'
import { RegisterUser } from '../RegisterUser'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerUser: RegisterUser = { userName: '', password: '', password2: '' }
  warning: string
  success = false
  loading = false

  constructor(private auth: AuthService) {}

  ngOnInit(): void {}

  onSubmit(f: NgForm) {
    if (this.registerUser.userName != '') {
      if (this.registerUser.password == this.registerUser.password2) {
        this.loading = true
        this.auth.register(this.registerUser).subscribe(
          () => {
            this.success = true
            this.warning = null
            this.loading = false
          },
          (err) => {
            this.success = false
            this.warning = err.error.message
            this.loading = false
          }
        )
      } else {
        this.warning = 'passwords not match'
      }
    } else {
      this.warning = 'username cannot be blank'
    }
  }
}
