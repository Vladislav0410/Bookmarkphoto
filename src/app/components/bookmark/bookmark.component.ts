import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../../service/local-storage.service';

@Component({
  selector: 'app-bookmark',
  templateUrl: './bookmark.component.html',
  styleUrls: ['./bookmark.component.scss'],
})
export class BookmarkComponent implements OnInit {
  data = this._localStorageService.get();

  constructor(private _localStorageService: LocalStorageService) {}

  ngOnInit(): void {}

  remoteImage(key: string) {
    this.data = this.data.filter((t) => t !== key);
    this._localStorageService.set(this.data);
  }
}
