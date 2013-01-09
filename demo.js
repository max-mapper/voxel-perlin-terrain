var createGame = require('voxel-engine')
var THREE = require('three')
var perlin = require('voxel-perlin-terrain')

var chunkSize = 32
var chunkDistance = 2

window.generator = perlin(chunkDistance, chunkSize)
window.game = createGame({
  generateVoxelChunk: generator,
  texturePath: './textures/',
  materials: ['grass', 'obsidian', 'dirt', 'whitewool', 'crate'],
  cubeSize: 25,
  chunkSize: chunkSize,
  chunkDistance: chunkDistance,
  startingPosition: [35, 1000, 35],
  worldOrigin: [0,0,0],
  controlOptions: {jump: 6}
})

// point camera down initially
game.controls.pitchObject.rotation.x = -1.5

game.on('collision', function (item) {
  game.removeItem(item)
})

var currentMaterial = 1

function createDebris (pos, value) {
  var mesh = new THREE.Mesh(
    new THREE.CubeGeometry(4, 4, 4),
    game.material
  )
  mesh.geometry.faces.forEach(function (face) {
    face.materialIndex = value - 1
  })
  mesh.translateX(pos.x)
  mesh.translateY(pos.y)
  mesh.translateZ(pos.z)
  
  return {
    mesh: mesh,
    size: 4,
    collisionRadius: 22,
    value: value
  }
}

function explode (pos, value) {
  if (!value) return
  var item = createDebris(pos, value)
  item.velocity = {
    x: (Math.random() * 2 - 1) * 0.05,
    y: (Math.random() * 2 - 1) * 0.05,
    z: (Math.random() * 2 - 1) * 0.05,
  }
  game.addItem(item)
  setTimeout(function (item) {
    game.removeItem(item)
  }, 15 * 1000 + Math.random() * 15 * 1000, item)
}

game.appendTo('#container')

game.on('mousedown', function (pos) {
  var cid = game.voxels.chunkAtPosition(pos)
  var vid = game.voxels.voxelAtPosition(pos)
  if (erase) {
    explode(pos, game.getBlock(pos))
    game.setBlock(pos, 0)
  } else {
    game.createBlock(pos, currentMaterial)
  }
})

var erase = true
window.addEventListener('keydown', function (ev) {
  if (ev.keyCode === 'X'.charCodeAt(0)) {
    erase = !erase
  }
  ctrlDown = ev.ctrlKey
})

function ctrlToggle (ev) { erase = !ev.ctrlKey }
window.addEventListener('keyup', ctrlToggle)
window.addEventListener('keydown', ctrlToggle)

game.requestPointerLock('canvas')
