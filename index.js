var Perlin = require('./perlin')
var generator = new Perlin()

module.exports = function generate(l, h) {
  var d = [ h[0]-l[0], h[1]-l[1], h[2]-l[2] ]
  var voxels = new Int8Array(d[0]*d[1]*d[2])
  
  generator.generate( [l[0], l[2]], [h[0], h[2]], function ( point, value ) {
    var y = ~~scale(value, 0, 1, 0, d[1])
    var x = point[0]
    var z = point[1]
    var idx = voxelIndex(x, y, z, d[1], d[2])
    voxels[idx] = 1
  })
  
  return {voxels: voxels, dims: d}

}

function voxelIndex(x, y, z, ySize, zSize) {
  return x + y*ySize + z*zSize*zSize
}

function scale( x, fromLow, fromHigh, toLow, toHigh ) {
  return ( x - fromLow ) * ( toHigh - toLow ) / ( fromHigh - fromLow ) + toLow
}
;