import { Injectable } from '@angular/core';
import { IStorageValue } from '../models/models';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private _localStorage: Storage;
  private _key: string = 'store';

  constructor() {
    this._localStorage = window.localStorage;
  }

  get() {
    const data = this._localStorage.getItem(this._key);
    return data ? JSON.parse(data) : [];
  }

  set(value: IStorageValue) {
    this._localStorage.setItem(this._key, JSON.stringify(value));
  }

  remove() {
    this._localStorage.removeItem(this._key);
  }
}
