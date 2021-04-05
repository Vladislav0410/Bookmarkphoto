import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IFlickrPhoto, IFlickrOutput } from '../models/models';
import { url } from '../config/config';

@Injectable({
  providedIn: 'root',
})
export class FlickrService {
  constructor(private _http: HttpClient) {}

  search_keyword(keyword: string) {
    const params = `api_key=${environment.flickr.key}&text=${keyword}&format=json&nojsoncallback=1`;
    return this._http.get(url + params).pipe(
      map((res: IFlickrOutput) => {
        const urlArr = [];
        res.photos.photo.forEach((ph: IFlickrPhoto) => {
          const photoObj = {
            url: `https://farm${ph.farm}.staticflickr.com/${ph.server}/${ph.id}_${ph.secret}`,
            title: ph.title,
          };
          urlArr.push(photoObj);
        });
        return urlArr;
      })
    );
  }
}
