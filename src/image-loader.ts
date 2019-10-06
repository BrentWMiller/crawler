export class ImageLoader {
  constructor() {}

  loadImage(url: string): Promise<any> {
    return new Promise((resolve) => {
      const image = new Image();

      image.onload = () => resolve({ element: image, url });
      image.onerror = (error) => resolve(null);

      image.src = url;
    });
  }
}
