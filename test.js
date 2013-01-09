var perlinTerrain = require('./index')
var t = perlinTerrain(2, 32)([0, -32, 0], [32, 0, 32])
console.log(t)
// perlinTerrain(2, 32)([0, 0, 32], [32, 32, 64])
// perlinTerrain(2, 32)([32, 32, 32], [64, 64, 64])

// [0, 0, 32], [32, 32, 64]
// [0, -32, 0], [32, 0, 32]
// [32, 32, -64], [64, 64, -32]
// [32, 32, 32], [64, 64, 64]