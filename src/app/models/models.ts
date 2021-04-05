export interface IFlickrPhoto {
  farm: string;
  id: string;
  secret: string;
  server: string;
  title: string;
}

export interface IFlickrOutput {
  photos: {
    photo: IFlickrPhoto[];
  };
}

export interface IImage {
  image: {
    url: string;
    title: string;
  };
}

export interface IStorageValue {
  value: IImage[];
}
