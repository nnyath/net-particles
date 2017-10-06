'use strict';


const
  max_particles = 100,
  velocity = {x: 1.5, y: 2},
  color = 'white',
  opacity = .7,
  radius = 5,
  offset = 30


class Particle {

  constructor(canvas, opts){
    Object.assign(this,
      { color, opacity, radius, offset },
      { canvas }, 
      {
        x:Math.random() * canvas.width, 
        y:Math.random() * canvas.height,
        velocity : {x:(Math.random() - 0.5) * velocity.x, y:(Math.random() - 0.5) * velocity.y },
        ctx: canvas.getContext('2d') ? canvas.getContext('2d') : undefined
      }, 
      opts)
  }

  update(){
    if(this.x > this.canvas.width + this.offset || this.x < this.offset)
      this.velocity.x = -this.velocity.x

    if(this.y > this.canvas.height + this.offset || this.y < this.offset)
      this.velocity.y = -this.velocity.y

    Object.assign(this,
      {
        x : this.x+=this.velocity.x,
        y : this.y+=this.velocity.y
      })
  }

  draw(){
    try{
      this.ctx.beginPath()

      Object.assign(this.ctx, {
          fillStyle : this.color, 
          globalAlpha : this.opacity, 
      })
      
      this.ctx.arc(this.x, this.y, this.radius,0,Math.PI*2)
      this.ctx.fill()

    }catch(e){
      throw e
    }
  }
}

class ParticleNetwork {

  constructor(canvas, opts){
    Object.assign(this,
      { max_particles, velocity, color, opacity, radius, offset },
      { canvas },
      { 
        particles : new Array(),
        ctx : canvas.getContext('2d') ? canvas.getContext('2d') : undefined
      },
      opts
    )
  }

  init(){
    for(let i = 0; i<this.max_particles; i++){
      let opts = {color:this.color,opacity:this.opacity,radius:this.radius,offset:this.offset}
      this.particles.push(new Particle(this.canvas, opts))
    }
  }

  draw(){

    const drawParticles = (cb) => {
      let ind = 0
      for(let particle of this.particles){
        particle.update()
        particle.draw()
        if(typeof cb == 'function')
          cb(this.particles,particle,ind)
        ind++
      }
    }

    const drawConnections = (particles,particle,ind) => {
      for(let i=ind; i<particles.length;i++){
        let distance = Math.sqrt( Math.pow(particle.x - particles[i].x, 2) + Math.pow(particle.y - particles[i].y, 2))
        
        if(distance > 120)
          continue

        this.ctx.beginPath()
        Object.assign(this.ctx,{
          strokeStyle : particle.color,
          globalAlpha : (120 - distance) / 120,
          lineWidth : particle.size / 7
        })
        this.ctx.moveTo(particle.x, particle.y)
        this.ctx.lineTo(particles[i].x, this.particles[i].y)
        this.ctx.stroke()
      }
    }

    drawParticles(drawConnections)
  }

}

class NetParticle {
  constructor(canvas, networks = [new ParticleNetwork(canvas)]){
    Object.assign(this,
      {
        canvas,
        ctx : canvas.getContext('2d') ? canvas.getContext('2d') : undefined, 
        networks
      })
  }

  init(){
    for(let network of this.networks)
      network.init()
  }

  play(){
    this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height)
    for(let network of this.networks)
      network.draw()
    window.requestAnimationFrame(this.play.bind(this))  
  }
}

let NP = new NetParticle(document.getElementById('board'))
NP.init()
NP.play()




let resize = () => {
  document.getElementById('board').width = window.innerWidth -100
  document.getElementById('board').height = window.innerHeight-100
}

window.addEventListener('resize', resize, false)



resize()