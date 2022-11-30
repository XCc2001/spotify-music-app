import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { MusicDataService } from '../musica-data.service'
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css'],
})
export class SearchResultComponent implements OnInit, OnDestroy {
  results: any
  searchQuery: any
  sub: Subscription

  constructor(private route: ActivatedRoute, private mds: MusicDataService) {}

  ngOnInit(): void {
    this.sub = this.route.queryParams.subscribe((params) => {
      this.searchQuery = params['q'] || 0
      this.mds.searchArtists(this.searchQuery).subscribe((data) => {
        this.results = data.artists.items.filter(
          (item: any) => item.images.length > 0
        )
      })
    })
  }

  ngOnDestroy() {
    this.sub?.unsubscribe()
  }
}
