class Media {
  constructor(data, photographer) {
    this.id = data.id;
    this.photographerId = data.photographerId;
    this.title = data.title;
    this.likes = data.likes;
    this.date = data.date;
    this.price = data.price;
    this.photographer = photographer;
    this.isVideo = Boolean(data.video);
  }
}
class ImageMedia extends Media {
  constructor(data, photographer) {
    super(data, photographer);
    this.image = data.image;
  }
}
class VideoMedia extends Media {
  constructor(data, photographer) {
    super(data, photographer);
    this.video = data.video;
  }
}

export { Media, ImageMedia, VideoMedia };