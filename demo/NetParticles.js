/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _NetParticles = __webpack_require__(2);

var NP = new _NetParticles.NetParticle(document.getElementById('board'));

NP.init();
NP.play();

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var max_particles = 50,
    velocity = { x: 1, y: 1 },
    color = 'white',
    opacity = .7,
    radius = 5,
    offset = 30;

var Particle = function () {
  function Particle(canvas, opts) {
    _classCallCheck(this, Particle);

    Object.assign(this, { color: color, opacity: opacity, radius: radius, offset: offset }, { canvas: canvas }, {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      velocity: { x: (Math.random() - 0.5) * velocity.x, y: (Math.random() - 0.5) * velocity.y },
      ctx: canvas.getContext('2d') ? canvas.getContext('2d') : undefined
    }, opts);
  }

  _createClass(Particle, [{
    key: 'update',
    value: function update() {
      if (this.x > this.canvas.width + this.offset || this.x < this.offset) this.velocity.x = -this.velocity.x;

      if (this.y > this.canvas.height + this.offset || this.y < this.offset) this.velocity.y = -this.velocity.y;

      this.x += this.velocity.x, this.y += this.velocity.y;
    }
  }, {
    key: 'draw',
    value: function draw() {
      try {
        this.ctx.beginPath();
        this.ctx.fillStyle = this.color, this.ctx.globalAlpha = this.opacity, this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        this.ctx.fill();
      } catch (e) {
        throw e;
      }
    }
  }]);

  return Particle;
}();

var ParticleNetwork = function () {
  function ParticleNetwork(canvas, opts) {
    _classCallCheck(this, ParticleNetwork);

    Object.assign(this, { max_particles: max_particles, velocity: velocity, color: color, opacity: opacity, radius: radius, offset: offset }, { canvas: canvas }, {
      particles: new Array(),
      ctx: canvas.getContext('2d') ? canvas.getContext('2d') : undefined
    }, opts);
  }

  _createClass(ParticleNetwork, [{
    key: 'init',
    value: function init() {
      for (var i = 0; i < this.max_particles; i++) {
        var opts = { color: this.color, opacity: this.opacity, radius: this.radius, offset: this.offset };
        this.particles.push(new Particle(this.canvas, opts));
      }
    }
  }, {
    key: 'draw',
    value: function draw() {
      var _this = this;

      var drawParticles = function drawParticles(cb) {
        var ind = 0;
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = _this.particles[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var particle = _step.value;

            particle.update();
            particle.draw();
            if (typeof cb == 'function') cb(_this.particles, particle, ind);
            ind++;
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      };

      var drawConnections = function drawConnections(particles, particle, ind) {
        for (var i = ind; i < particles.length; i++) {
          var distance = Math.sqrt(Math.pow(particle.x - particles[i].x, 2) + Math.pow(particle.y - particles[i].y, 2));

          if (distance > 120) continue;

          _this.ctx.beginPath();
          _this.ctx.strokeStyle = particle.color;
          _this.ctx.globalAlpha = (120 - distance) / 120;
          _this.ctx.lineWidth = particle.size / 7;
          _this.ctx.moveTo(particle.x, particle.y);
          _this.ctx.lineTo(particles[i].x, _this.particles[i].y);
          _this.ctx.stroke();
        }
      };

      drawParticles(drawConnections);
    }
  }]);

  return ParticleNetwork;
}();

var NetParticle = function () {
  function NetParticle(canvas) {
    var _this2 = this;

    var networks = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [new ParticleNetwork(canvas)];

    _classCallCheck(this, NetParticle);

    Object.assign(this, {
      canvas: canvas,
      ctx: canvas.getContext('2d') ? canvas.getContext('2d') : undefined,
      networks: networks
    });

    var resize = function resize() {
      var canvas = _this2.canvas;

      canvas.width = canvas.parentNode.getBoundingClientRect().width;
      canvas.height = canvas.parentNode.getBoundingClientRect().height;
    };

    window.addEventListener('resize', resize, false);
    resize();
  }

  _createClass(NetParticle, [{
    key: 'init',
    value: function init() {
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = this.networks[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var network = _step2.value;

          network.init();
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }
    }
  }, {
    key: 'play',
    value: function play() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = this.networks[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var network = _step3.value;

          network.draw();
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3.return) {
            _iterator3.return();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }

      window.requestAnimationFrame(this.play.bind(this));
    }
  }]);

  return NetParticle;
}();

exports.default = NetParticle;
exports.NetParticle = NetParticle;
exports.ParticleNetwork = ParticleNetwork;
exports.Particle = Particle;

/***/ })
/******/ ]);