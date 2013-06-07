var perlin = require('./')
var textures = "http://commondatastorage.googleapis.com/voxeltextures/"

var chunkSize = 32

window.generator = perlin('foo', 0, 5)

var game = require('voxel-hello-world')({
  texturePath: textures,
  playerSkin: textures + 'player.png',
  generateChunks: false,
  materialFlatColor: true,
  chunkDistance: 2,
  materials: ['#ffffff']
})

game.voxels.on('missingChunk', function(p) {
  var voxels = generator(p, chunkSize)
  var chunk = {
    position: p,
    dims: [chunkSize, chunkSize, chunkSize],
    voxels: voxels
  }
  game.showChunk(chunk)
})


var fly = require('voxel-fly')
var makeFly = fly(game)
makeFly(game.controls.target()).startFlying()

window.game = game
