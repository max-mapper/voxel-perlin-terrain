var noise = require('perlin').noise

module.exports = function(seed, floor, ceiling, divisor) {
  floor = floor || 0
  ceiling = ceiling || 20 // minecraft's limit
  divisor = divisor || 50
  noise.seed(seed)
  return function generateChunk(position, width) {
    var startX = position[0] * width
    var startY = position[1] * width
    var startZ = position[2] * width
    var chunk = new Int8Array(width * width * width)
    pointsInside(startX, startZ, width, function(x, z) {
      var n = noise.simplex2(x / divisor , z / divisor)
      var y = ~~scale(n, -1, 1, floor, ceiling)
      if (y === floor || startY < y && y < startY + width) {
        var xidx = Math.abs((width + x % width) % width)
        var yidx = Math.abs((width + y % width) % width)
        var zidx = Math.abs((width + z % width) % width)
        var idx = xidx + yidx * width + zidx * width * width
        chunk[idx] = 1
      }
    })
    return chunk
  }
}

function pointsInside(startX, startY, width, func) {
  for (var x = startX; x < startX + width; x++)
    for (var y = startY; y < startY + width; y++)
      func(x, y)
}

function scale( x, fromLow, fromHigh, toLow, toHigh ) {
  return ( x - fromLow ) * ( toHigh - toLow ) / ( fromHigh - fromLow ) + toLow
}
;