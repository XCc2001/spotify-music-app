import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { MusicDataService } from '../musica-data.service'
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-artist-discography',
  templateUrl: './artist-discography.component.html',
  styleUrls: ['./artist-discography.component.css'],
})
export class ArtistDiscographyComponent implements OnInit, OnDestroy {
  albums: Array<any>
  artist: any

  sub: Subscription

  constructor(private route: ActivatedRoute, private mds: MusicDataService) {}

  ngOnInit(): void {
    let id = this.route.snapshot.params['id']
    this.sub = this.route.params.subscribe((param) => {
      this.mds
        .getAlbumsByArtistId(id)
        .subscribe(
          (data) =>
            (this.albums = data.items.filter(
              (thing, index, self) =>
                index ===
                self.findIndex(
                  (t) => t.place === thing.place && t.name === thing.name
                )
            ))
        )
    })

    this.mds.getArtistById(id).subscribe((data) => (this.artist = data))
  }

  ngOnDestroy() {
    this.sub?.unsubscribe()
  }
}
