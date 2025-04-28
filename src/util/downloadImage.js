export const downloadCroppedImage = (img, ratio, fileName = 'cropped-image.jpg') => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const { width, height } = img;
  let cropWidth = width;
  let cropHeight = width / ratio;

  if (cropHeight > height) {
    cropHeight = height;
    cropWidth = height * ratio;
  }

  const sx = (width - cropWidth) / 2;
  const sy = (height - cropHeight) / 2;

  canvas.width = cropWidth;
  canvas.height = cropHeight;

  ctx.drawImage(img, sx, sy, cropWidth, cropHeight, 0, 0, cropWidth, cropHeight);

  // Create a download link
  canvas.toBlob((blob) => {
    if (blob) {
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = fileName;
      link.click();
      URL.revokeObjectURL(link.href);
    }
  }, 'image/jpeg');
};