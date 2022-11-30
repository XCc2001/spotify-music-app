import { Component, OnDestroy, OnInit } from '@angular/core'
import { MatSnackBar } from '@angular/material/snack-bar'
import { ActivatedRoute } from '@angular/router'
import { MusicDataService } from '../musica-data.service'
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css'],
})
export class AlbumComponent implements OnInit, OnDestroy {
  id: number
  album: any
  sub: Subscription

  constructor(
    private route: ActivatedRoute,
    private mds: MusicDataService,
    private msb: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id']
    this.sub = this.mds
      .getAlbumById(this.id)
      .subscribe((data) => (this.album = data))
  }

  addToFavourites(trackID: number) {
    this.mds.addToFavourites(trackID).subscribe(
      (data) => {
        this.msb.open('Adding to Favourites...', 'Done', { duration: 1500 })
      },
      (err) => {
        this.msb.open('Unable to Favourites...', 'Done', { duration: 1500 })
        console.log(err)
      }
    )
  }

  ngOnDestroy() {
    this.sub?.unsubscribe()
  }
}
