const toArrayBuffer = require('buffer-to-arraybuffer')
//const CanvasConverter = require('canvas-to-buffer')
const parseDDS = require('parse-dds')
const renderCubemap = require('preview-dds/lib/render-cubemap')
const renderCompressed = require('preview-dds/lib/render-compressed')
const arrayBufferToBuffer = require('arraybuffer-to-buffer')

export async function convertDDSToPNG(buffer: Buffer): Promise<Buffer | null> {
  const data = toArrayBuffer(buffer)
  const dds = parseDDS(data)
  console.log('Size', dds.shape.join('x'))
  console.log('Format', dds.format)

  let canvas
  if (dds.cubemap) {
    canvas = renderCubemap(dds, data, {})
  } else {
    canvas = renderCompressed(dds, data, {})
  }

  /*
  let fileReader = new FileReader();
  fileReader.onload = function(event) {
    pngBuffer = event.target.result;
  };
  fileReader.readAsArrayBuffer(blob);
  */

  // Convert canvas to Blob
  canvas.toBlob(async (blob: Blob) => {
    /*
    const fileReader = new FileReader()
    fileReader.onload = function (event) {
      if (!event.target) {
        return null
      }
      // Convert Blob to ArrayBuffer
      if (event.target.result instanceof ArrayBuffer) {
        const arrayBuffer = event.target.result
        // Convert ArrayBuffer to Buffer
        const pngBuffer = arrayBufferToBuffer(arrayBuffer)
        console.log('returning pngBuffer')
        return pngBuffer
      }
      return null
    }
    fileReader.readAsArrayBuffer(blob)
    */
    const arrBuffer = await new Response(blob).arrayBuffer()
    const pngBuffer = arrayBufferToBuffer(arrBuffer)
    console.log('returning pngBuffer')
    return pngBuffer
  }, 'image/png')

  //const frame = new CanvasConverter(canvas, { types: ['png'] })
  //const pngBuffer = outBuffer
  return null
}
