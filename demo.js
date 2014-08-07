var perlin = require('./')
var textures = "http://commondatastorage.googleapis.com/voxeltextures/"

var game = require('voxel-hello-world')({
  generateChunks: false,
  chunkDistance: 2,
  texturePath : textures,
  materials: [['grass', 'dirt', 'grass_dirt'], 'brick', 'dirt'],
  materialFlatColor: false
});

window.generator = perlin('foo', 0, 5)
var chunkSize = 32

game.voxels.on('missingChunk', function(p) {
  var voxels = generator(p, chunkSize)
  var chunk = {
    position: p,
    dims: [chunkSize, chunkSize, chunkSize],
    voxels: voxels
  }
  game.showChunk(chunk)
})

game.paused = false

window.game = game
