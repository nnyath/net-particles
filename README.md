# Net Particles
## Yet another HTML5 Canvas particle network animation*, **

***CURRENTLY IN PRE-PRE-RELEASE**<br>
****AKA WORK TO BE DONE**

Inspired by the likes of [Canvas Particle Network](https://github.com/JulianLaval/canvas-particle-network) and multitude of other point network animations out there. This one stands out (slightly) with the following
* Modern ES Module Implementation
* Multiple customizable, particle network animation layer support
* Optional automatic canvas resizing
* Included dev environment

This comes in at 3.8kb babelfied & uglified sizing at 1.5kb gzipped.

## Install
---
Use your favorite package manager

```javascript
yarn add net-particles
-or-
npm install net-particles
```

## Default Usage
---

NetParticles's default animation implementation works by simply providing the Canvas's DOM element. 

**Start by adding the default dependency to your JS file**
```javascript
// The ES6 Way
import NetParticles from 'net-particles'

-or-

// The CommonJS Way
var NetParticles = require('net-particles').NetParticle
```
**Then create a new instance of NetParticle with the Canvas element as an argument. <br>Initialize the object via `init()` and begin the animation via `play()`**

```javascript
let NetP = new NetParticles(document.getElementById('CanvasID'))
NetP.init()
NetP.play()
```

## Customizing Quickstart
---

**Start customizing by adding the additional object type**
```javascript
// The ES6 Way
import {NetParticles, ParticleNetwork} from 'net-particles'

-or-

// The CommonJS Way
var NetParticles = require('net-particles').NetParticles
var ParticleNetwork = require('net-particles').ParticleNetwork
```
**Create an array of ParticleNetworks using the targetted Canvas element and customized options. <br>Add them to the NetParticle controller**

```javascript

let CanvasEl = document.getElementById('CanvasID')

let PN1 = new ParticleNetwork(CanvasEl, { color:red, velocity:{ x:3, y:3 } })
let PN2 = new ParticleNetwork(CanvasEL, { color:blue, opacity:.5 })
let PN3 = new ParticleNetwork(CanvasEL)

let PNArray = [PN1,PN2,PN3]

let NetP = new NetParticle(CanvasEL, PNArray)
```

**Init and Play**
```javascript
NetP.init()
NetP.play()
```

## Options
---
NetParticle can be customized in these ways _(with more ways coming in the future)_ via the config object passed to `ParticleNetwork`'s arguments

**max_particles**

Total number of particles in the ParticleNetwork
```javascript
{max_particles : INT }
```

**velocity**

Point's X and Y velocity base modifier

```javascript
{x: DOUBLE, y: DOUBLE}
```

**color**

Point's color (uses CSS values)

```javascript
{color : STRING}
```

**opacity**

Point's opacity. Should be less than 1
```javascript
{opacity : DOUBLE}
```


**radius**

Point's radius (affects size)
```javascript
{radius : INT || DOUBLE}
```

**offset**

Offset used to calculate bouncing back from the edge of the canvas (in pixels)
```javascript
{offset : INT}
```

### License
---
The MIT License (MIT)<br>
Copyright (c) 2017 [Kenny Inthirath ](mailto:kenny.inthirath@gmail.com)
