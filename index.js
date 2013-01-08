var Perlin = require('perlin')
var voxel = require('voxel')
var generator = new Perlin()

module.exports = function generate(chunkDistance, chunkSize) {
  var width = chunkDistance * 2 * chunkSize
  var noise = this.noise = new Int8Array(width * width)
  var lowerLeft = [0, 0]
  var upperRight = [width, width]
  generator.generate( lowerLeft, upperRight, function ( point, value ) {
    noise[point[0] + point[1]*width] = ~~scale(value, 0, 1, 0, chunkSize)
  })
  
  // todo: investigate using typed array 'views' to lower memory footprint
  return function perlinChunk(l, h) {
    var fromLow = chunkSize * -chunkDistance
    var fromHigh = chunkSize * chunkDistance
    var toLow = lowerLeft[0]
    var toHigh = upperRight[0]
    return voxel.generate(l, h, function(x, y, z, n) {
      x = scale(x, fromLow, fromHigh, toLow, toHigh)
      z = scale(z, fromLow, fromHigh, toLow, toHigh)
      y = scale(y, fromLow, fromHigh, toLow, toHigh)
      return y > noise[x + z*width] ? 0 : 1
    })
  }
}

function scale( x, fromLow, fromHigh, toLow, toHigh ) {
  return ( x - fromLow ) * ( toHigh - toLow ) / ( fromHigh - fromLow ) + toLow
}
;