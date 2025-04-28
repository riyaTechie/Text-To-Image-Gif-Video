import gifshot from 'gifshot';

export function generateGifFromImages(imageArray, gifWidth = 300, gifHeight = 300, interval = 0.5) {
  return new Promise((resolve, reject) => {
    gifshot.createGIF(
      {
        images: imageArray,
        gifWidth,
        gifHeight,
        interval, // seconds per frame
        numFrames: imageArray.length,
      },
      function (obj) {
        if (!obj.error) {
          resolve(obj.image); // base64 GIF string
        } else {
          reject(obj.errorMsg || 'GIF generation failed');
        }
      }
    );
  });
}
