
const fs = require('fs-extra')
const stringify = require("json-stringify-pretty-compact")

;(() => {
  const poi = fs.readJSONSync('./poi/final.json')
  const kc3 = {}
  for (const k of Object.keys(poi)) {
    const {route, spots} = poi[k]
    const [area, cell] = k.split('-').map(n => Number(n))
    const world = `World ${area}-${cell}`
    const map = {}
    for (const id of Object.keys(route)) {
      const r = route[id]
      if (r[0] == null) continue
      if (spots[r[0]][2] === 'start') r[0] = 'Start'
      map[id] = r
    }
    kc3[world] = map
  }
  fs.writeJSONSync('kc3kai.json', kc3, {spaces: '\t'})
  fs.writeFileSync('kc3kai_compact.json', stringify(kc3))
})()

// Regexp
//  \[\n\s*("\w+"),\n\s*("\w+")\s*\]
//  [ \1, \2 ]
