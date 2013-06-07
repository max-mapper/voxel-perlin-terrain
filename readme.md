# voxel-perlin-terrain

generate voxel terrain using [perlin noise](http://en.wikipedia.org/wiki/Perlin_noise)

this is designed to work out of the box with [voxel-engine](https://npmjs.org/package/voxel-engine)

## install

`npm install voxel-perlin-terrain`

## api

```javascript
var terrain = require('voxel-perlin-terrain')
var chunkSize = 32

// initialize your noise with a seed, floor height, ceiling height and scale factor
var generateChunk = terrain('foo', 0, 5, 20)

// then hook it up to your game as such:

game.voxels.on('missingChunk', function(p) {
  var voxels = generateChunk(p, chunkSize)
  var chunk = {
    position: p,
    dims: [chunkSize, chunkSize, chunkSize],
    voxels: voxels
  }
  game.showChunk(chunk)
})

// note that your game should have generateChunks: false
```

chunk data is returned in the format of the [voxel](https://npmjs.org/package/voxel) module

## license

BSD
