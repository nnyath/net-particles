'use strict';

let canvas = document.getElementById('board')
let ctx = canvas.getContext ? canvas.getContext('2d') : undefined

const win = window

const DEFAULT_OPTS = {
  MAX_POINTS : 30,
  COLOR: 'white',
  VELOCITY: 1.5,
  OFFSET : 20,
  OPACITY: 0.7,
  SIZE: 5
}

class controller{
  constructor(canvas,ctx){
    this.ctx = ctx
  }
}

class particle{

  constructor(canvas, opts = DEFAULT_OPTS, x = Math.random() * canvas.width, y = Math.random() * canvas.height, VELOCITY = { x : (Math.random() - 0.5) * opts.VELOCITY, y : (Math.random() - 0.5 * opts.VELOCITY) }){
    this.parent = canvas
    this.ctx = canvas.getContext ? canvas.getContext('2d') : undefined
    this.opts = opts
    this.x = x
    this.y = y
    this.VELOCITY = { x, y } = VELOCITY
  }

  draw(){
    if(!this.ctx){
      throw new error('Cannot draw on canvas')
    }

    this.ctx.beginPath()
    this.ctx.fillStyle = this.opts.COLOR
    this.ctx.globalAlpha = this.opts.OPACITY
    this.ctx.arc(this.x, this.y, this.opts.SIZE, 0, Math.PI * 2)
    this.ctx.fill()
  }

  update(){
    if(this.x > this.parent.width + this.opts.OFFSET || this.x < this.opts.OFFSET)
      this.VELOCITY.x = -this.VELOCITY.x

    if(this.y > this.parent.height + this.opts.OFFSET || this.y < this.opts.OFFSET)
      this.VELOCITY.y = -this.VELOCITY.y

    this.x += this.VELOCITY.x
    this.y += this.VELOCITY.y  
  }

}

class particleNetwork{
  constructor(canvas, opts = DEFAULT_OPTS){
    this.parent = canvas
    this.ctx = canvas.getContext ? canvas.getContext('2d') : undefined
    this.opts = opts
    this.collection = new Array()
  }

  init(){
    for(let i=0;i<this.opts.MAX_POINTS;i++){
      this.collection.push(new particle(canvas, this.opts))
      this.collection[i].draw()
    }
  }

  update(){
    
    let drawParticles = () => {
      this.collection.forEach((particle,ind) => {
        if(!this.ctx){
          throw new error('Cannot draw on canvas')
        }
        particle.update() 
        particle.draw()
        drawConnections(particle, ind)
      })
    }

    let drawConnections = (particle, ind) => {
      for(let i=ind;this.collection.length>i;i++){
        let distance = Math.sqrt( Math.pow(particle.x - this.collection[i].x, 2) + Math.pow(particle.y - this.collection[i].y, 2))
        
        if(distance > 120)
          continue

        this.ctx.beginPath()
        this.ctx.strokeStyle = this.opts.COLOR
        this.ctx.globalAlpha = ((120 - distance) / 120) * this.opts.SIZE
        this.ctx.lineWidth = (this.opts.SIZE * 2) / 7
        this.ctx.moveTo(particle.x, particle.y)
        this.ctx.lineTo(this.collection[i].x, this.collection[i].y)
        this.ctx.stroke()
      }
    }
    
    drawParticles(this.collection)
    // console.log('drawing')
    
  }
}

class networkController{
  constructor(canvas, x = new Array(), ...y){
    this.parent = canvas
    this.ctx = canvas.getContext ? canvas.getContext('2d') : undefined
    this.networks = Array.isArray(x) ? x : [x,...y]
  }

  init(){
    this.networks.forEach( network => network.init()) 
  }

  update(){
    this.ctx.clearRect(0, 0, this.parent.width, this.parent.height);
    this.networks.forEach( network => network.update()) 
    win.requestAnimationFrame(this.update.bind(this))
  }

}

let network = new particleNetwork(canvas)
let network2 = new particleNetwork(canvas, {
  MAX_POINTS : 15,
  COLOR: 'white',
  VELOCITY: 1,
  OFFSET : 20,
  OPACITY : .3,
  SIZE : 7
})

let network3 = new particleNetwork(canvas, {
  MAX_POINTS : 15,
  COLOR: 'white',
  VELOCITY: 1,
  OFFSET : 20,
  OPACITY : .9,
  SIZE : 3
})

console.log(network2.opts)

let nc = new networkController(canvas, network, network2, network3)
nc.init()
nc.update()

