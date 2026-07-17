export const createImage = (url) =>
  new Promise((resolve, reject) => {
    const image = new Image()
    image.addEventListener('load', () => resolve(image))
    image.addEventListener('error', (error) => reject(error))
    image.setAttribute('crossOrigin', 'anonymous') // needed to avoid cross-origin issues on CodeSandbox
    image.src = url
  })

export function getRadianAngle(degreeValue) {
  return (degreeValue * Math.PI) / 180
}

/**
 * Returns the new bounding area of a rotated rectangle.
 */
export function rotateSize(width, height, rotation) {
  const rotRad = getRadianAngle(rotation)

  return {
    width:
      Math.abs(Math.cos(rotRad) * width) + Math.abs(Math.sin(rotRad) * height),
    height:
      Math.abs(Math.sin(rotRad) * width) + Math.abs(Math.cos(rotRad) * height),
  }
}

/**
 * This function was adapted from the one in the ReadMe of https://github.com/DominicTobias/react-image-crop
 */
export default async function getCroppedImg(
  imageSrc,
  pixelCrop,
  rotation = 0,
  flip = { horizontal: false, vertical: false },
  fileName = 'cropped.jpeg'
) {
  const image = await createImage(imageSrc)
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  if (!ctx) {
    return null
  }

  const rotRad = getRadianAngle(rotation)

  // calculate bounding box of the rotated image
  const { width: bBoxWidth, height: bBoxHeight } = rotateSize(
    image.width,
    image.height,
    rotation
  )

  // set canvas size to match the bounding box
  canvas.width = bBoxWidth
  canvas.height = bBoxHeight

  // translate canvas context to a central location to allow rotating and flipping around the center
  ctx.translate(bBoxWidth / 2, bBoxHeight / 2)
  ctx.rotate(rotRad)
  ctx.scale(flip.horizontal ? -1 : 1, flip.vertical ? -1 : 1)
  ctx.translate(-image.width / 2, -image.height / 2)

  // draw rotated image
  ctx.drawImage(image, 0, 0)

  const croppedCanvas = document.createElement('canvas')

  const croppedCtx = croppedCanvas.getContext('2d')

  if (!croppedCtx) {
    return null
  }

  // Limit maximum dimension to save storage space (e.g. max 1200px)
  const MAX_DIMENSION = 1200;
  let finalWidth = pixelCrop.width;
  let finalHeight = pixelCrop.height;

  if (finalWidth > MAX_DIMENSION || finalHeight > MAX_DIMENSION) {
    if (finalWidth > finalHeight) {
      finalHeight = Math.round((MAX_DIMENSION / finalWidth) * finalHeight);
      finalWidth = MAX_DIMENSION;
    } else {
      finalWidth = Math.round((MAX_DIMENSION / finalHeight) * finalWidth);
      finalHeight = MAX_DIMENSION;
    }
  }

  // Set the size of the cropped canvas
  croppedCanvas.width = finalWidth;
  croppedCanvas.height = finalHeight;

  // Draw the cropped image onto the new canvas
  croppedCtx.drawImage(
    canvas,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    finalWidth,
    finalHeight
  )

  // As a blob
  return new Promise((resolve, reject) => {
    // Gunakan format image/webp dengan kualitas 0.8 untuk kompresi maksimal tanpa hilang kualitas
    croppedCanvas.toBlob((file) => {
      if (file) {
        file.name = fileName.replace(/\.[^/.]+$/, "") + ".webp";
        // Konversi Blob menjadi objek File agar bisa digunakan persis seperti hasil input type file
        const croppedFile = new File([file], file.name, { type: 'image/webp' });
        resolve(croppedFile);
      } else {
        reject(new Error("Canvas is empty"));
      }
    }, 'image/webp', 0.8)
  })
}
