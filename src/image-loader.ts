export class ImageLoader {
  constructor() {}

  loadImage(url: string) {
    return new Promise((resolve) => {
      const image = new Image();

      image.onload = () => resolve(url);
      image.onerror = (error) => resolve({ url, status: 'error', error: error });

      image.src = url;
    });
  }
}
