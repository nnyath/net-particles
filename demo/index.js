import NetParticle from '../src/NetParticles.js'

let NP = new NetParticle(document.getElementById('board'))

NP.init()
NP.play()

setTimeout(()=>{
  console.log('pausing')
  NP.togglePause()
},10000)

setTimeout(()=>{
  console.log('unpausing')
  NP.togglePause()
},15000)