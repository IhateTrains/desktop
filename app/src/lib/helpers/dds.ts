const toArrayBuffer = require('buffer-to-arraybuffer')
const CanvasConverter = require('canvas-to-buffer')
const parseDDS = require('parse-dds')
const renderCubemap = require('preview-dds/lib/render-cubemap')
const renderCompressed = require('preview-dds/lib/render-compressed')

export function convertDDSToPNG(buffer: Buffer): Buffer {
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

  const frame = new CanvasConverter(canvas, { types: ['png'] })
  const pngBuffer = frame.toBuffer()
  return pngBuffer
}
