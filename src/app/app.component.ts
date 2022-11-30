import { Component, OnInit, OnDestroy } from '@angular/core'
import { NavigationStart, Router } from '@angular/router'
import { AuthService } from './auth.service'
import { Subscription } from 'rxjs'
import { User } from './User'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Spotify Music'
  searchString: String
  token: User
  sub: Subscription

  constructor(private router: Router, private auth: AuthService) {}

  ngOnInit(): void {
    this.searchString = ''
    this.sub = this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.token = this.auth.readToken()
      }
    })
  }

  handleSearch() {
    this.router.navigate(['/search'], { queryParams: { q: this.searchString } })
    this.searchString = ''
  }

  logout() {
    localStorage.clear()
    this.router.navigate(['login'])
  }

  ngOnDestroy() {
    this.sub?.unsubscribe()
  }
}
