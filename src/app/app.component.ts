import { Component, OnDestroy } from '@angular/core';
import { LocalStorageService } from './service/local-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy {
  title = 'photolist';
  tab: boolean = false;

  constructor(private _localStorageService: LocalStorageService) {}

  selectPage(key: string) {
    this.tab = key == 'bookmark';
  }

  ngOnDestroy() {
    this._localStorageService.remove();
  }
}
