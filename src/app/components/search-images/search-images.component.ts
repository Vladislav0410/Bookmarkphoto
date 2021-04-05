import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs/internal/Subscription';
import { FlickrService } from '../../service/flickr.service';
import { LocalStorageService } from '../../service/local-storage.service';
import { IImage } from '../../models/models';

@Component({
  selector: 'app-search-images',
  templateUrl: './search-images.component.html',
  styleUrls: ['./search-images.component.scss'],
})
export class SearchImagesComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  images = [];
  keyword: string;
  pageIndex: number = 0;
  pageSize: number = 15;
  lowValue: number = 0;
  highValue: number = this.pageSize;

  private _subscription: Subscription;

  constructor(
    private _flickrService: FlickrService,
    private _localStorageService: LocalStorageService
  ) {}

  ngOnInit() {}

  bookmark(image: IImage) {
    let bookmarkArr = this._localStorageService.get();
    bookmarkArr.push(image);
    bookmarkArr = bookmarkArr.filter(
      (thing, index, self) =>
        index ===
        self.findIndex((t) => t.url === thing.url && t.title === thing.title)
    );
    this._localStorageService.set(bookmarkArr);
  }

  search(event: Event) {
    const element = event.currentTarget as HTMLInputElement;
    this.keyword = element.value;
    if (this.keyword && this.keyword.length > 0) {
      this._subscription = this._flickrService
        .search_keyword(this.keyword)
        .subscribe((res) => {
          this.images = res;
        });
    }
  }

  getPaginatorData(event: PageEvent) {
    if (event.pageIndex === this.pageIndex + 1) {
      this.lowValue = this.lowValue + this.pageSize;
      this.highValue = this.highValue + this.pageSize;
    } else if (event.pageIndex === this.pageIndex - 1) {
      this.lowValue = this.lowValue - this.pageSize;
      this.highValue = this.highValue - this.pageSize;
    }
    this.pageIndex = event.pageIndex;
  }

  ngOnDestroy() {
    if (this._subscription) {
      this._subscription.unsubscribe();
    }
  }
}
