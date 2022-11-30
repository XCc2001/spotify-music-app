import { Component, OnDestroy, OnInit } from '@angular/core'
import { MusicDataService } from '../musica-data.service'

@Component({
  selector: 'app-new-releases',
  templateUrl: './new-releases.component.html',
  styleUrls: ['./new-releases.component.css'],
})
export class NewReleasesComponent implements OnInit, OnDestroy {
  releases: any
  private sub: any

  constructor(private data: MusicDataService) {}

  ngOnInit(): void {
    this.sub = this.data
      .getNewReleases()
      .subscribe((data) => (this.releases = data.albums.items))
  }

  ngOnDestroy() {
    this.sub?.unsubscribe()
  }
}
