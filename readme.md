# voxel-perlin-terrain

generate voxel terrain using [perlin noise](http://en.wikipedia.org/wiki/Perlin_noise)

this is designed to work out of the box with [voxel-engine](https://npmjs.org/package/voxel-engine)

## install

`npm install voxel-perlin-terrain`

## api

```javascript
var terrain = require('voxel-perlin-terrain')

// initialize your noise, returns a function
var chunkSize = 32
var chunkDistance = 2
var generator = terrain(chunkDistance, chunkSize)

// the returned function is for getting specific chunks
var chunkData = generator([0,0,0], [32,32,32])
```

chunk data is returned in the format of the [voxel](https://npmjs.org/package/voxel) module

## license

BSD
