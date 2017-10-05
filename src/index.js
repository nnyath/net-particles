'use strict';

let canvas = document.getElementById('board')
let ctx = canvas.getContext ? canvas.getContext('2d') : undefined

const win = window

const DEFAULT_OPTS = {
  MAX_POINTS : 10,
  COLOR: 'white',
  velocity: 2,
  offset : 20
}

class controller{
  constructor(canvas,ctx){
    this.ctx = ctx
  }
}

class particle{

  constructor(canvas, opts = DEFAULT_OPTS, x = Math.random() * canvas.width, y = Math.random() * canvas.height, velocity = { x : (Math.random() - 0.5) * opts.velocity, y : (Math.random() - 0.5 * opts.velocity) }){
    this.parent = canvas
    this.ctx = canvas.getContext ? canvas.getContext('2d') : undefined
    this.opts = opts
    this.x = x
    this.y = y
    this.velocity = { x, y } = velocity
  }

  update(){
    if(this.x > this.parent.width + this.opts.offset || this.x < this.opts.offset)
      this.velocity.x = -this.velocity.x

    if(this.y > this.parent.height + this.opts.offset || this.y < this.opts.offset)
      this.velocity.y = -this.velocity.y

    this.x += this.velocity.x
    this.y += this.velocity.y  
  }

  draw(){
    if(!this.ctx){
      throw new error('Cannot draw on canvas')
    }

    this.ctx.beginPath()
    this.ctx.fillStyle = this.opts.COLOR
    this.ctx.globalAlpha = 0.7
    this.ctx.arc(this.x, this.y, 5, 0, Math.PI * 2)
    this.ctx.fill()
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
      this.collection.push(new particle(canvas))
      this.collection[i].draw()
    }
  }

  update(){
    this.ctx.clearRect(0, 0, this.parent.width, this.parent.height); 
    this.collection.forEach(particle => {
      if(!this.ctx){
        throw new error('Cannot draw on canvas')
      }
      particle.update() 
      particle.draw()
    })

    win.requestAnimationFrame(this.update.bind(this))

  }
}

let network = new particleNetwork(canvas)
console.log(network)
network.init()
network.update()

