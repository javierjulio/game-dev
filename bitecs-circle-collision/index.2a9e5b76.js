// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x) {
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"456jt":[function(require,module,exports) {
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "4a236f9275d0a351";
module.bundle.HMR_BUNDLE_ID = "2a5a8eb72a9e5b76";
"use strict";
function _createForOfIteratorHelper(o, allowArrayLike) {
    var it;
    if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
        if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
            if (it) o = it;
            var i = 0;
            var F = function F() {
            };
            return {
                s: F,
                n: function n() {
                    if (i >= o.length) return {
                        done: true
                    };
                    return {
                        done: false,
                        value: o[i++]
                    };
                },
                e: function e(_e) {
                    throw _e;
                },
                f: F
            };
        }
        throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    var normalCompletion = true, didErr = false, err;
    return {
        s: function s() {
            it = o[Symbol.iterator]();
        },
        n: function n() {
            var step = it.next();
            normalCompletion = step.done;
            return step;
        },
        e: function e(_e2) {
            didErr = true;
            err = _e2;
        },
        f: function f() {
            try {
                if (!normalCompletion && it.return != null) it.return();
            } finally{
                if (didErr) throw err;
            }
        }
    };
}
function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: mixed;
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
*/ var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData,
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function accept(fn) {
            this._acceptCallbacks.push(fn || function() {
            });
        },
        dispose: function dispose(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData = undefined;
}
module.bundle.Module = Module;
var checkedAssets, acceptedAssets, assetsToAccept;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
}
function getPort() {
    return HMR_PORT || location.port;
} // eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == 'https:' && !/localhost|127.0.0.1|0.0.0.0/.test(hostname) ? 'wss' : 'ws';
    var ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/'); // $FlowFixMe
    ws.onmessage = function(event) {
        checkedAssets = {
        };
        acceptedAssets = {
        };
        assetsToAccept = [];
        var data = JSON.parse(event.data);
        if (data.type === 'update') {
            // Remove error overlay if there is one
            if (typeof document !== 'undefined') removeErrorOverlay();
            var assets = data.assets.filter(function(asset) {
                return asset.envHash === HMR_ENV_HASH;
            }); // Handle HMR Update
            var handled = assets.every(function(asset) {
                return asset.type === 'css' || asset.type === 'js' && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear();
                assets.forEach(function(asset) {
                    hmrApply(module.bundle.root, asset);
                });
                for(var i = 0; i < assetsToAccept.length; i++){
                    var id = assetsToAccept[i][1];
                    if (!acceptedAssets[id]) hmrAcceptRun(assetsToAccept[i][0], id);
                }
            } else window.location.reload();
        }
        if (data.type === 'error') {
            // Log parcel errors to console
            var _iterator = _createForOfIteratorHelper(data.diagnostics.ansi), _step;
            try {
                for(_iterator.s(); !(_step = _iterator.n()).done;){
                    var ansiDiagnostic = _step.value;
                    var stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                    console.error('🚨 [parcel]: ' + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
                }
            } catch (err) {
                _iterator.e(err);
            } finally{
                _iterator.f();
            }
            if (typeof document !== 'undefined') {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html); // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    ws.onerror = function(e) {
        console.error(e.message);
    };
    ws.onclose = function() {
        console.warn('[parcel] 🚨 Connection to the HMR server was lost');
    };
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log('[parcel] ✨ Error resolved');
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement('div');
    overlay.id = OVERLAY_ID;
    var errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    var _iterator2 = _createForOfIteratorHelper(diagnostics), _step2;
    try {
        for(_iterator2.s(); !(_step2 = _iterator2.n()).done;){
            var diagnostic = _step2.value;
            var stack = diagnostic.codeframe ? diagnostic.codeframe : diagnostic.stack;
            errorHTML += "\n      <div>\n        <div style=\"font-size: 18px; font-weight: bold; margin-top: 20px;\">\n          \uD83D\uDEA8 ".concat(diagnostic.message, "\n        </div>\n        <pre>").concat(stack, "</pre>\n        <div>\n          ").concat(diagnostic.hints.map(function(hint) {
                return '<div>💡 ' + hint + '</div>';
            }).join(''), "\n        </div>\n        ").concat(diagnostic.documentation ? "<div>\uD83D\uDCDD <a style=\"color: violet\" href=\"".concat(diagnostic.documentation, "\" target=\"_blank\">Learn more</a></div>") : '', "\n      </div>\n    ");
        }
    } catch (err) {
        _iterator2.e(err);
    } finally{
        _iterator2.f();
    }
    errorHTML += '</div>';
    overlay.innerHTML = errorHTML;
    return overlay;
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute('href', link.getAttribute('href').split('?')[0] + '?' + Date.now()); // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href = links[i].getAttribute('href');
            var hostname = getHostname();
            var servedFromHMRServer = hostname === 'localhost' ? new RegExp('^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):' + getPort()).test(href) : href.indexOf(hostname + ':' + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(window.location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrApply(bundle, asset) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === 'css') reloadCSS();
    else if (asset.type === 'js') {
        var deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            var fn = new Function('require', 'module', 'exports', asset.output);
            modules[asset.id] = [
                fn,
                deps
            ];
        } else if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrAcceptCheck(bundle, id, depsByBundle) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToAccept.push([
        bundle,
        id
    ]);
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) return true;
    var parents = getParents(module.bundle.root, id); // If no parents, the asset is new. Prevent reloading the page.
    if (!parents.length) return true;
    return parents.some(function(v) {
        return hmrAcceptCheck(v[0], v[1], null);
    });
}
function hmrAcceptRun(bundle, id) {
    var cached = bundle.cache[id];
    bundle.hotData = {
    };
    if (cached && cached.hot) cached.hot.data = bundle.hotData;
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData);
    });
    delete bundle.cache[id];
    bundle(id);
    cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) // $FlowFixMe[method-unbinding]
        assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
    });
    acceptedAssets[id] = true;
}

},{}],"5L2jJ":[function(require,module,exports) {
var _bitecs = require("bitecs");
const Vector3 = {
    x: _bitecs.Types.f32,
    y: _bitecs.Types.f32,
    z: _bitecs.Types.f32
};
const Position = _bitecs.defineComponent(Vector3);
const Velocity = _bitecs.defineComponent(Vector3);
const Shape = _bitecs.defineComponent({
    radius: _bitecs.Types.f32,
    color: _bitecs.Types.f32
});
const movementQuery = _bitecs.defineQuery([
    Position,
    Velocity
]);
const rendererQuery = _bitecs.defineQuery([
    Position,
    Velocity,
    Shape
]);
const collisionQuery = _bitecs.defineQuery([
    Position,
    Velocity,
    Shape
]);
const collisionSystem = (world)=>{
    const ents = collisionQuery(world);
    for(let i = 0; i < ents.length; i++){
        const eid = ents[i];
        const rest = ents.slice(i + 1);
        for(let j = 0; j < rest.length; j++){
            const id = rest[j];
            var dx = Position.x[eid] - Position.x[id];
            var dy = Position.y[eid] - Position.y[id];
            var distance = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
            if (distance <= Shape.radius[eid] + Shape.radius[id]) {
                const vx = Position.x[eid] - Position.x[id];
                const vy = Position.y[eid] - Position.y[id];
                const unitNormalX = vx / distance;
                const unitNormalY = vy / distance;
                const unitTangentX = -unitNormalY;
                const unitTangentY = unitNormalX;
                const a_n = Velocity.x[eid] * unitNormalX + Velocity.y[eid] * unitNormalY;
                const b_n = Velocity.x[id] * unitNormalX + Velocity.y[id] * unitNormalY;
                const a_t = Velocity.x[eid] * unitTangentX + Velocity.y[eid] * unitTangentY;
                const b_t = Velocity.x[id] * unitTangentX + Velocity.y[id] * unitTangentY;
                const a_n_final = (a_n * (Shape.radius[eid] - Shape.radius[id]) + 2 * Shape.radius[id] * b_n) / (Shape.radius[eid] + Shape.radius[id]);
                const b_n_final = (b_n * (Shape.radius[id] - Shape.radius[eid]) + 2 * Shape.radius[eid] * a_n) / (Shape.radius[eid] + Shape.radius[id]);
                const a_n_x = unitNormalX * a_n_final;
                const a_n_y = unitNormalY * a_n_final;
                const b_n_x = unitNormalX * b_n_final;
                const b_n_y = unitNormalY * b_n_final;
                const a_t_x = unitTangentX * a_t;
                const a_t_y = unitTangentY * a_t;
                const b_t_x = unitTangentX * b_t;
                const b_t_y = unitTangentY * b_t;
                Velocity.x[eid] = a_n_x + a_t_x;
                Velocity.y[eid] = a_n_y + a_t_y;
                Velocity.x[id] = b_n_x + b_t_x;
                Velocity.y[id] = b_n_y + b_t_y;
            }
        }
    }
    return world;
};
const movementSystem = (world)=>{
    const ents = movementQuery(world);
    for(let i = 0; i < ents.length; i++){
        const eid = ents[i];
        Position.x[eid] += Velocity.x[eid];
        Position.y[eid] += Velocity.y[eid];
        Position.z[eid] += Velocity.z[eid];
        if (Position.x[eid] - Shape.radius[eid] < 0 || Position.x[eid] + Shape.radius[eid] > canvasWidth) Velocity.x[eid] *= -1.1;
        if (Position.y[eid] - Shape.radius[eid] < 0 || Position.y[eid] + Shape.radius[eid] > canvasHeight) Velocity.y[eid] *= -1.1;
    }
    return world;
};
let canvas = document.querySelector("canvas");
let canvasWidth = canvas.width = window.innerWidth;
let canvasHeight = canvas.height = window.innerHeight;
let ctx = canvas.getContext("2d");
const rendererSystem = (world)=>{
    const ents = rendererQuery(world);
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    for(let i = 0; i < ents.length; i++){
        const eid = ents[i];
        ctx.beginPath();
        ctx.arc(Position.x[eid], Position.y[eid], Shape.radius[eid], 0, 2 * Math.PI);
        ctx.fillStyle = `hsl(${Shape.color[eid]}, 50%, 50%)`;
        ctx.fill();
    // ctx.strokeStyle = "white";
    // ctx.stroke();
    }
    return world;
};
const timeSystem = (world)=>{
    const { time  } = world;
    const now = performance.now();
    const delta = now - time.then;
    time.delta = delta;
    time.elapsed += delta;
    time.then = now;
    return world;
};
const pipeline = _bitecs.pipe(movementSystem, collisionSystem, rendererSystem, timeSystem);
const world1 = _bitecs.createWorld();
world1.time = {
    delta: 0,
    elapsed: 0,
    then: performance.now()
};
const generateEntity = (x, y, vx, vy, radius)=>{
    const eid = _bitecs.addEntity(world1);
    _bitecs.addComponent(world1, Position, eid);
    Position.x[eid] = x;
    Position.y[eid] = y;
    _bitecs.addComponent(world1, Velocity, eid);
    Velocity.x[eid] = vx;
    Velocity.y[eid] = vy;
    _bitecs.addComponent(world1, Shape, eid);
    Shape.radius[eid] = radius;
    Shape.color[eid] = Math.random() * 360;
};
const DESIRED_NUM_OBJECTS = 100;
const MIN_RADIUS = 8;
const MAX_RADIUS = 30;
const SPEED_MULTIPLIER = 0.4;
const safeAreas = [];
const size = MAX_RADIUS * 2;
const start = MAX_RADIUS;
const maxHeight = canvasHeight - MAX_RADIUS;
const maxWidth = canvasWidth - MAX_RADIUS;
for(let x1 = start; x1 < maxWidth; x1 += size)for(let y1 = start; y1 < maxHeight; y1 += size)safeAreas.push({
    x: x1,
    y: y1
});
function randomRange(min, max) {
    return Math.random() * (max - min) + min;
}
const maxCells = Math.min(DESIRED_NUM_OBJECTS, safeAreas.length);
for(let i1 = 0; i1 < maxCells; i1++){
    const randomIndex = Math.floor(Math.random() * safeAreas.length);
    const safeArea = safeAreas.splice(randomIndex, 1)[0];
    generateEntity(safeArea.x, safeArea.y, SPEED_MULTIPLIER * (2 * Math.random() - 1), SPEED_MULTIPLIER * (2 * Math.random() - 1), Math.floor(randomRange(MIN_RADIUS, MAX_RADIUS)));
}
window.generateEntity = generateEntity;
// generateEntity(40, 40, SPEED_MULTIPLIER * (2 * Math.random() - 1), SPEED_MULTIPLIER * (2 * Math.random() - 1), MAX_RADIUS)
// generateEntity(40, 280, SPEED_MULTIPLIER * (2 * Math.random() - 1), SPEED_MULTIPLIER * (2 * Math.random() - 1), MAX_RADIUS)
const run = ()=>{
    pipeline(world1);
    requestAnimationFrame(run);
};
window.run = run;
run() // setInterval(() => {
 //   pipeline(world)
 // }, 16)
 // // Run!
 // function run() {
 //   // Compute delta and elapsed time
 //   var time = performance.now();
 //   var delta = time - lastTime;
 //   // Run all the systems
 //   world.execute(delta, time);
 //   lastTime = time;
 //   requestAnimationFrame(run);
 // }
 // var lastTime = performance.now();
 // run();
 // import {
 //   createWorld,
 //   Types,
 //   defineComponent,
 //   defineQuery,
 //   addEntity,
 //   addComponent,
 //   pipe,
 // } from 'bitecs'
 // import InputManager from './input-manager'
 // const input = new InputManager(window)
 // input.addEventListeners()
 // const SHAPE_ASTEROID = 0
 // const SHAPE_SPACESHIP = 1
 // const Vector3 = { x: Types.f32, y: Types.f32, z: Types.f32 }
 // const Position = defineComponent(Vector3)
 // const Velocity = defineComponent(Vector3)
 // const PlayerControlled = defineComponent()
 // const Asteroid = defineComponent()
 // const Shape = defineComponent({ type: Types.f32 })
 // const movementQuery = defineQuery([Position, Velocity])
 // const motionControlQuery = defineQuery([Position, Velocity, PlayerControlled])
 // const rendererQuery = defineQuery([Position, Velocity, Shape])
 // // asteroids collide with player (game over)
 // // bullets collide with asteroid (hit)
 // // asteroids DO NOT COLLIDE with other asteroids
 // const asteroidQuery = defineQuery([Position, Velocity, Asteroid])
 // const playerQuery = defineQuery([Position, Velocity, PlayerControlled])
 // const collisionSystem = (world) => {
 //   const player = playerQuery(world)
 //   const ents = asteroidQuery(world)
 //   for (let i = 0; i < player.length; i++) {
 //     const eid = player[i]
 //     for (let j = 0; j < ents.length; j++) {
 //       const id = ents[j]
 //       if (eid === id) {
 //         continue;
 //       }
 //       const radius = 10
 //       var dx = (Position.x[eid] + radius) - (Position.x[id] + radius);
 //       var dy = (Position.y[eid] + radius) - (Position.y[id] + radius);
 //       var distance = Math.sqrt(dx * dx + dy * dy);
 //       if (distance < radius + radius) {
 //         console.log("collision detected")
 //         Velocity.x[eid] *= -1
 //         Velocity.y[eid] *= -1
 //         Velocity.x[id] *= -1
 //         Velocity.y[id] *= -1
 //       }
 //     }
 //   }
 //   // // for (let i = 0; i < ents.length; i++) {
 //   // //   const eid = ents[i]
 //   // //   for (let j = 0; j < ents.length; j++) {
 //   // //     const id = ents[j]
 //   // //     if (eid === id) {
 //   // //       continue;
 //   // //     }
 //   //     const radius = 10
 //   //     const eid = 0
 //   //     const id = 1
 //   //     var dx = (Position.x[eid] + radius) - (Position.x[id] + radius);
 //   //     var dy = (Position.y[eid] + radius) - (Position.y[id] + radius);
 //   //     var distance = Math.sqrt(dx * dx + dy * dy);
 //   //     if (distance < radius + radius) {
 //   //       console.log("collision detected")
 //   //       Velocity.x[eid] *= -1
 //   //       Velocity.y[eid] *= -1
 //   //       Velocity.x[id] *= -1
 //   //       Velocity.y[id] *= -1
 //   //     }
 //   // //   }
 //   // // }
 //   return world
 // }
 // const movementSystem = (world) => {
 //   const ents = movementQuery(world)
 //   for (let i = 0; i < ents.length; i++) {
 //     const eid = ents[i]
 //     Position.x[eid] += Velocity.x[eid]
 //     Position.y[eid] += Velocity.y[eid]
 //     Position.z[eid] += Velocity.z[eid]
 //   }
 //   return world
 // }
 // const motionControlSystem = (world) => {
 //   const ents = motionControlQuery(world)
 //   for (let i = 0; i < ents.length; i++) {
 //     const eid = ents[i]
 //     if (input.keyPoll.up !== 0) {
 //       Velocity.y[eid] -= 0.01
 //     } else if (input.keyPoll.down !== 0) {
 //       Velocity.y[eid] += 0.01
 //     }
 //     if (input.keyPoll.left !== 0) {
 //       Velocity.x[eid] -= 0.01
 //     } else if (input.keyPoll.right !== 0) {
 //       Velocity.x[eid] += 0.01
 //     }
 //   }
 //   return world
 // }
 // let canvas = document.querySelector("canvas");
 // let canvasWidth = canvas.width = window.innerWidth;
 // let canvasHeight = canvas.height = window.innerHeight;
 // let ctx = canvas.getContext("2d");
 // const rendererSystem = (world) => {
 //   const ents = rendererQuery(world)
 //   ctx.clearRect(0, 0, canvasWidth, canvasHeight)
 //   for (let i = 0; i < ents.length; i++) {
 //     const eid = ents[i]
 //     if (Shape.type[eid] === SHAPE_ASTEROID) {
 //       ctx.beginPath();
 //       ctx.arc(Position.x[eid], Position.y[eid], 10, 0, 2 * Math.PI);
 //       ctx.strokeStyle = "white";
 //       ctx.stroke();
 //     }
 //     else if (Shape.type[eid] === SHAPE_SPACESHIP) {
 //       ctx.beginPath();
 //       ctx.arc(Position.x[eid], Position.y[eid], 10, 0, 2 * Math.PI);
 //       ctx.fillStyle = "white";
 //       ctx.fill();
 //     }
 //   }
 //   return world
 // }
 // const timeSystem = world => {
 //   const { time } = world
 //   const now = performance.now()
 //   const delta = now - time.then
 //   time.delta = delta
 //   time.elapsed += delta
 //   time.then = now
 //   return world
 // }
 // const pipeline = pipe(motionControlSystem, movementSystem, collisionSystem, rendererSystem, timeSystem)
 // const world = createWorld()
 // world.time = { delta: 0, elapsed: 0, then: performance.now() }
 // const generateAsteroid = (x, y) => {
 //   const eid = addEntity(world)
 //   addComponent(world, Asteroid, eid)
 //   addComponent(world, Position, eid)
 //   Position.x[eid] = x
 //   Position.y[eid] = y
 //   addComponent(world, Velocity, eid)
 //   Velocity.x[eid] = 0.1
 //   Velocity.y[eid] = 0.1
 //   addComponent(world, Shape, eid)
 //   Shape.type[eid] = SHAPE_ASTEROID
 // }
 // generateAsteroid(0, 0)
 // generateAsteroid(50, 0)
 // const createPlayer = (x, y, vx, vy) => {
 //   const eid = addEntity(world)
 //   addComponent(world, PlayerControlled, eid)
 //   addComponent(world, Position, eid)
 //   Position.x[eid] = x
 //   Position.y[eid] = y
 //   addComponent(world, Velocity, eid)
 //   Velocity.x[eid] = vx
 //   Velocity.y[eid] = vy
 //   addComponent(world, Shape, eid)
 //   Shape.type[eid] = SHAPE_SPACESHIP
 // }
 // createPlayer(100, 0, -0.1, 0.1)
 // const run = () => {
 //   pipeline(world)
 //   requestAnimationFrame(run)
 // }
 // run()
 // // setInterval(() => {
 // //   pipeline(world)
 // // }, 16)
 // // // Run!
 // // function run() {
 // //   // Compute delta and elapsed time
 // //   var time = performance.now();
 // //   var delta = time - lastTime;
 // //   // Run all the systems
 // //   world.execute(delta, time);
 // //   lastTime = time;
 // //   requestAnimationFrame(run);
 // // }
 // // var lastTime = performance.now();
 // // run();
;

},{"bitecs":"9tw4x"}],"9tw4x":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Changed", ()=>Changed
);
parcelHelpers.export(exports, "DESERIALIZE_MODE", ()=>DESERIALIZE_MODE
);
parcelHelpers.export(exports, "Not", ()=>Not
);
parcelHelpers.export(exports, "Types", ()=>Types
);
parcelHelpers.export(exports, "addComponent", ()=>addComponent
);
parcelHelpers.export(exports, "addEntity", ()=>addEntity
);
parcelHelpers.export(exports, "commitRemovals", ()=>commitRemovals
);
parcelHelpers.export(exports, "createWorld", ()=>createWorld
);
parcelHelpers.export(exports, "defineComponent", ()=>defineComponent
);
parcelHelpers.export(exports, "defineDeserializer", ()=>defineDeserializer
);
parcelHelpers.export(exports, "defineQuery", ()=>defineQuery
);
parcelHelpers.export(exports, "defineSerializer", ()=>defineSerializer
);
parcelHelpers.export(exports, "defineSystem", ()=>defineSystem
);
parcelHelpers.export(exports, "deleteWorld", ()=>deleteWorld
);
parcelHelpers.export(exports, "enterQuery", ()=>enterQuery
);
parcelHelpers.export(exports, "exitQuery", ()=>exitQuery
);
parcelHelpers.export(exports, "getEntityComponents", ()=>getEntityComponents
);
parcelHelpers.export(exports, "hasComponent", ()=>hasComponent
);
parcelHelpers.export(exports, "parentArray", ()=>parentArray
);
parcelHelpers.export(exports, "pipe", ()=>pipe
);
parcelHelpers.export(exports, "registerComponent", ()=>registerComponent
);
parcelHelpers.export(exports, "registerComponents", ()=>registerComponents
);
parcelHelpers.export(exports, "removeComponent", ()=>removeComponent
);
parcelHelpers.export(exports, "removeEntity", ()=>removeEntity
);
parcelHelpers.export(exports, "removeQuery", ()=>removeQuery
);
parcelHelpers.export(exports, "resetChangedQuery", ()=>resetChangedQuery
);
parcelHelpers.export(exports, "resetWorld", ()=>resetWorld
);
parcelHelpers.export(exports, "setDefaultSize", ()=>setDefaultSize
);
// src/Constants.js
var TYPES_ENUM = {
    i8: "i8",
    ui8: "ui8",
    ui8c: "ui8c",
    i16: "i16",
    ui16: "ui16",
    i32: "i32",
    ui32: "ui32",
    f32: "f32",
    f64: "f64",
    eid: "eid"
};
var TYPES_NAMES = {
    i8: "Int8",
    ui8: "Uint8",
    ui8c: "Uint8Clamped",
    i16: "Int16",
    ui16: "Uint16",
    i32: "Int32",
    ui32: "Uint32",
    eid: "Uint32",
    f32: "Float32",
    f64: "Float64"
};
var TYPES = {
    i8: Int8Array,
    ui8: Uint8Array,
    ui8c: Uint8ClampedArray,
    i16: Int16Array,
    ui16: Uint16Array,
    i32: Int32Array,
    ui32: Uint32Array,
    f32: Float32Array,
    f64: Float64Array,
    eid: Uint32Array
};
var UNSIGNED_MAX = {
    uint8: 256,
    uint16: 65536,
    uint32: 2 ** 32
};
// src/Storage.js
var roundToMultiple = (mul)=>(x)=>Math.ceil(x / mul) * mul
;
var roundToMultiple4 = roundToMultiple(4);
var $storeRef = Symbol("storeRef");
var $storeSize = Symbol("storeSize");
var $storeMaps = Symbol("storeMaps");
var $storeFlattened = Symbol("storeFlattened");
var $storeBase = Symbol("storeBase");
var $storeType = Symbol("storeType");
var $storeArrayElementCounts = Symbol("storeArrayElementCounts");
var $storeSubarrays = Symbol("storeSubarrays");
var $subarrayCursors = Symbol("subarrayCursors");
var $subarray = Symbol("subarray");
var $subarrayFrom = Symbol("subarrayFrom");
var $subarrayTo = Symbol("subarrayTo");
var $parentArray = Symbol("subStore");
var $tagStore = Symbol("tagStore");
var $queryShadow = Symbol("queryShadow");
var $serializeShadow = Symbol("serializeShadow");
var $indexType = Symbol("indexType");
var $indexBytes = Symbol("indexBytes");
var $isEidType = Symbol("isEidType");
var stores = {
};
var resize = (ta, size)=>{
    const newBuffer = new ArrayBuffer(size * ta.BYTES_PER_ELEMENT);
    const newTa = new ta.constructor(newBuffer);
    newTa.set(ta, 0);
    return newTa;
};
var createShadow = (store, key)=>{
    if (!ArrayBuffer.isView(store)) {
        const shadowStore = store[$parentArray].slice(0);
        store[key] = store.map((_, eid)=>{
            const from = store[eid][$subarrayFrom];
            const to = store[eid][$subarrayTo];
            return shadowStore.subarray(from, to);
        });
    } else store[key] = store.slice(0);
};
var resizeSubarray = (metadata, store, size)=>{
    const cursors = metadata[$subarrayCursors];
    let type = store[$storeType];
    const length = store[0].length;
    const indexType = length <= UNSIGNED_MAX.uint8 ? TYPES_ENUM.ui8 : length <= UNSIGNED_MAX.uint16 ? TYPES_ENUM.ui16 : TYPES_ENUM.ui32;
    if (cursors[type] === 0) {
        const arrayElementCount = metadata[$storeArrayElementCounts][type];
        const array = new TYPES[type](roundToMultiple4(arrayElementCount * size));
        array.set(metadata[$storeSubarrays][type]);
        metadata[$storeSubarrays][type] = array;
        array[$indexType] = TYPES_NAMES[indexType];
        array[$indexBytes] = TYPES[indexType].BYTES_PER_ELEMENT;
    }
    const start = cursors[type];
    let end = 0;
    for(let eid = 0; eid < size; eid++){
        const from = cursors[type] + eid * length;
        const to = from + length;
        store[eid] = metadata[$storeSubarrays][type].subarray(from, to);
        store[eid][$subarrayFrom] = from;
        store[eid][$subarrayTo] = to;
        store[eid][$subarray] = true;
        store[eid][$indexType] = TYPES_NAMES[indexType];
        store[eid][$indexBytes] = TYPES[indexType].BYTES_PER_ELEMENT;
        end = to;
    }
    cursors[type] = end;
    store[$parentArray] = metadata[$storeSubarrays][type].subarray(start, end);
};
var resizeRecursive = (metadata, store, size)=>{
    Object.keys(store).forEach((key)=>{
        const ta = store[key];
        if (Array.isArray(ta)) {
            resizeSubarray(metadata, ta, size);
            store[$storeFlattened].push(ta);
        } else if (ArrayBuffer.isView(ta)) {
            store[key] = resize(ta, size);
            store[$storeFlattened].push(store[key]);
        } else if (typeof ta === "object") resizeRecursive(metadata, store[key], size);
    });
};
var resizeStore = (store, size)=>{
    if (store[$tagStore]) return;
    store[$storeSize] = size;
    store[$storeFlattened].length = 0;
    Object.keys(store[$subarrayCursors]).forEach((k)=>{
        store[$subarrayCursors][k] = 0;
    });
    resizeRecursive(store, store, size);
};
var resetStoreFor = (store, eid)=>{
    if (store[$storeFlattened]) store[$storeFlattened].forEach((ta)=>{
        if (ArrayBuffer.isView(ta)) ta[eid] = 0;
        else ta[eid].fill(0);
    });
};
var createTypeStore = (type, length)=>{
    const totalBytes = length * TYPES[type].BYTES_PER_ELEMENT;
    const buffer = new ArrayBuffer(totalBytes);
    const store = new TYPES[type](buffer);
    store[$isEidType] = type === TYPES_ENUM.eid;
    return store;
};
var parentArray = (store)=>store[$parentArray]
;
var createArrayStore = (metadata, type, length)=>{
    const size = metadata[$storeSize];
    const store = Array(size).fill(0);
    store[$storeType] = type;
    store[$isEidType] = type === TYPES_ENUM.eid;
    const cursors = metadata[$subarrayCursors];
    const indexType = length <= UNSIGNED_MAX.uint8 ? TYPES_ENUM.ui8 : length <= UNSIGNED_MAX.uint16 ? TYPES_ENUM.ui16 : TYPES_ENUM.ui32;
    if (!length) throw new Error("bitECS - Must define component array length");
    if (!TYPES[type]) throw new Error(`bitECS - Invalid component array property type ${type}`);
    if (!metadata[$storeSubarrays][type]) {
        const arrayElementCount = metadata[$storeArrayElementCounts][type];
        const array = new TYPES[type](roundToMultiple4(arrayElementCount * size));
        metadata[$storeSubarrays][type] = array;
        array[$indexType] = TYPES_NAMES[indexType];
        array[$indexBytes] = TYPES[indexType].BYTES_PER_ELEMENT;
    }
    const start = cursors[type];
    let end = 0;
    for(let eid = 0; eid < size; eid++){
        const from = cursors[type] + eid * length;
        const to = from + length;
        store[eid] = metadata[$storeSubarrays][type].subarray(from, to);
        store[eid][$subarrayFrom] = from;
        store[eid][$subarrayTo] = to;
        store[eid][$subarray] = true;
        store[eid][$indexType] = TYPES_NAMES[indexType];
        store[eid][$indexBytes] = TYPES[indexType].BYTES_PER_ELEMENT;
        end = to;
    }
    cursors[type] = end;
    store[$parentArray] = metadata[$storeSubarrays][type].subarray(start, end);
    return store;
};
var isArrayType = (x)=>Array.isArray(x) && typeof x[0] === "string" && typeof x[1] === "number"
;
var createStore = (schema, size)=>{
    const $store = Symbol("store");
    if (!schema || !Object.keys(schema).length) {
        stores[$store] = {
            [$storeSize]: size,
            [$tagStore]: true,
            [$storeBase]: ()=>stores[$store]
        };
        return stores[$store];
    }
    schema = JSON.parse(JSON.stringify(schema));
    const arrayElementCounts = {
    };
    const collectArrayElementCounts = (s)=>{
        const keys = Object.keys(s);
        for (const k of keys){
            if (isArrayType(s[k])) {
                if (!arrayElementCounts[s[k][0]]) arrayElementCounts[s[k][0]] = 0;
                arrayElementCounts[s[k][0]] += s[k][1];
            } else if (s[k] instanceof Object) collectArrayElementCounts(s[k]);
        }
    };
    collectArrayElementCounts(schema);
    const metadata = {
        [$storeSize]: size,
        [$storeMaps]: {
        },
        [$storeSubarrays]: {
        },
        [$storeRef]: $store,
        [$subarrayCursors]: Object.keys(TYPES).reduce((a, type)=>({
                ...a,
                [type]: 0
            })
        , {
        }),
        [$storeFlattened]: [],
        [$storeArrayElementCounts]: arrayElementCounts
    };
    if (schema instanceof Object && Object.keys(schema).length) {
        const recursiveTransform = (a, k)=>{
            if (typeof a[k] === "string") {
                a[k] = createTypeStore(a[k], size);
                a[k][$storeBase] = ()=>stores[$store]
                ;
                metadata[$storeFlattened].push(a[k]);
            } else if (isArrayType(a[k])) {
                const [type, length] = a[k];
                a[k] = createArrayStore(metadata, type, length);
                a[k][$storeBase] = ()=>stores[$store]
                ;
                metadata[$storeFlattened].push(a[k]);
            } else if (a[k] instanceof Object) a[k] = Object.keys(a[k]).reduce(recursiveTransform, a[k]);
            return a;
        };
        stores[$store] = Object.assign(Object.keys(schema).reduce(recursiveTransform, schema), metadata);
        stores[$store][$storeBase] = ()=>stores[$store]
        ;
        return stores[$store];
    }
};
// src/Util.js
var SparseSet = ()=>{
    const dense = [];
    const sparse = [];
    dense.sort = function(comparator) {
        const result = Array.prototype.sort.call(this, comparator);
        for(let i = 0; i < dense.length; i++)sparse[dense[i]] = i;
        return result;
    };
    const has = (val)=>dense[sparse[val]] === val
    ;
    const add = (val)=>{
        if (has(val)) return;
        sparse[val] = dense.push(val) - 1;
    };
    const remove = (val)=>{
        if (!has(val)) return;
        const index = sparse[val];
        const swapped = dense.pop();
        if (swapped !== val) {
            dense[index] = swapped;
            sparse[swapped] = index;
        }
    };
    return {
        add,
        remove,
        has,
        sparse,
        dense
    };
};
// src/Serialize.js
var DESERIALIZE_MODE = {
    REPLACE: 0,
    APPEND: 1,
    MAP: 2
};
var resized = false;
var setSerializationResized = (v)=>{
    resized = v;
};
var concat = (a, v)=>a.concat(v)
;
var not = (fn)=>(v)=>!fn(v)
;
var storeFlattened = (c)=>c[$storeFlattened]
;
var isFullComponent = storeFlattened;
var isProperty = not(isFullComponent);
var isModifier = (c)=>typeof c === "function"
;
var isNotModifier = not(isModifier);
var isChangedModifier = (c)=>isModifier(c) && c()[1] === "changed"
;
var isWorld = (w)=>Object.getOwnPropertySymbols(w).includes($componentMap)
;
var fromModifierToComponent = (c)=>c()[0]
;
var canonicalize = (target)=>{
    if (isWorld(target)) return [
        [],
        new Map()
    ];
    const fullComponentProps = target.filter(isNotModifier).filter(isFullComponent).map(storeFlattened).reduce(concat, []);
    const changedComponentProps = target.filter(isChangedModifier).map(fromModifierToComponent).filter(isFullComponent).map(storeFlattened).reduce(concat, []);
    const props = target.filter(isNotModifier).filter(isProperty);
    const changedProps = target.filter(isChangedModifier).map(fromModifierToComponent).filter(isProperty);
    const componentProps = [
        ...fullComponentProps,
        ...props,
        ...changedComponentProps,
        ...changedProps
    ];
    const allChangedProps = [
        ...changedComponentProps,
        ...changedProps
    ].reduce((map, prop)=>{
        const $ = Symbol();
        createShadow(prop, $);
        map.set(prop, $);
        return map;
    }, new Map());
    return [
        componentProps,
        allChangedProps
    ];
};
var defineSerializer = (target, maxBytes = 20000000)=>{
    const worldSerializer = isWorld(target);
    let [componentProps, changedProps] = canonicalize(target);
    const buffer = new ArrayBuffer(maxBytes);
    const view = new DataView(buffer);
    const entityComponentCache = new Map();
    return (ents)=>{
        if (resized) {
            [componentProps, changedProps] = canonicalize(target);
            resized = false;
        }
        if (worldSerializer) {
            componentProps = [];
            target[$componentMap].forEach((c, component)=>{
                if (component[$storeFlattened]) componentProps.push(...component[$storeFlattened]);
                else componentProps.push(component);
            });
        }
        let world;
        if (Object.getOwnPropertySymbols(ents).includes($componentMap)) {
            world = ents;
            ents = ents[$entityArray];
        } else world = eidToWorld.get(ents[0]);
        let where = 0;
        if (!ents.length) return buffer.slice(0, where);
        const cache = new Map();
        for(let pid = 0; pid < componentProps.length; pid++){
            const prop = componentProps[pid];
            const component = prop[$storeBase]();
            const $diff = changedProps.get(prop);
            const shadow = $diff ? prop[$diff] : null;
            if (!cache.has(component)) cache.set(component, new Map());
            view.setUint8(where, pid);
            where += 1;
            const countWhere = where;
            where += 4;
            let writeCount = 0;
            for(let i = 0; i < ents.length; i++){
                const eid = ents[i];
                let componentCache = entityComponentCache.get(eid);
                if (!componentCache) componentCache = entityComponentCache.set(eid, new Set()).get(eid);
                componentCache.add(eid);
                const newlyAddedComponent = shadow && cache.get(component).get(eid) || !componentCache.has(component) && hasComponent(world, component, eid);
                cache.get(component).set(eid, newlyAddedComponent);
                if (newlyAddedComponent) componentCache.add(component);
                else if (!hasComponent(world, component, eid)) {
                    componentCache.delete(component);
                    continue;
                }
                const rewindWhere = where;
                view.setUint32(where, eid);
                where += 4;
                if (prop[$tagStore]) {
                    writeCount++;
                    continue;
                }
                if (ArrayBuffer.isView(prop[eid])) {
                    const type = prop[eid].constructor.name.replace("Array", "");
                    const indexType = prop[eid][$indexType];
                    const indexBytes = prop[eid][$indexBytes];
                    const countWhere2 = where;
                    where += indexBytes;
                    let arrayWriteCount = 0;
                    for(let i2 = 0; i2 < prop[eid].length; i2++){
                        if (shadow) {
                            const changed = shadow[eid][i2] !== prop[eid][i2];
                            shadow[eid][i2] = prop[eid][i2];
                            if (!changed && !newlyAddedComponent) continue;
                        }
                        view[`set${indexType}`](where, i2);
                        where += indexBytes;
                        const value = prop[eid][i2];
                        view[`set${type}`](where, value);
                        where += prop[eid].BYTES_PER_ELEMENT;
                        arrayWriteCount++;
                    }
                    if (arrayWriteCount > 0) {
                        view[`set${indexType}`](countWhere2, arrayWriteCount);
                        writeCount++;
                    } else {
                        where = rewindWhere;
                        continue;
                    }
                } else {
                    if (shadow) {
                        const changed = shadow[eid] !== prop[eid];
                        shadow[eid] = prop[eid];
                        if (!changed && !newlyAddedComponent) {
                            where = rewindWhere;
                            continue;
                        }
                    }
                    const type = prop.constructor.name.replace("Array", "");
                    view[`set${type}`](where, prop[eid]);
                    where += prop.BYTES_PER_ELEMENT;
                    writeCount++;
                }
            }
            if (writeCount > 0) view.setUint32(countWhere, writeCount);
            else where -= 5;
        }
        return buffer.slice(0, where);
    };
};
var newEntities = new Map();
var defineDeserializer = (target)=>{
    const isWorld2 = Object.getOwnPropertySymbols(target).includes($componentMap);
    let [componentProps] = canonicalize(target);
    return (world, packet, mode = 0)=>{
        const deserializedEntities = [];
        newEntities.clear();
        if (resized) {
            [componentProps] = canonicalize(target);
            resized = false;
        }
        if (isWorld2) {
            componentProps = [];
            target[$componentMap].forEach((c, component)=>{
                if (component[$storeFlattened]) componentProps.push(...component[$storeFlattened]);
                else componentProps.push(component);
            });
        }
        const localEntities = world[$localEntities];
        const localEntityLookup = world[$localEntityLookup];
        const view = new DataView(packet);
        let where = 0;
        while(where < packet.byteLength){
            const pid = view.getUint8(where);
            where += 1;
            const entityCount = view.getUint32(where);
            where += 4;
            const prop = componentProps[pid];
            for(let i = 0; i < entityCount; i++){
                let eid = view.getUint32(where);
                where += 4;
                if (mode === DESERIALIZE_MODE.MAP) {
                    if (localEntities.has(eid)) eid = localEntities.get(eid);
                    else if (newEntities.has(eid)) eid = newEntities.get(eid);
                    else {
                        const newEid = addEntity(world);
                        localEntities.set(eid, newEid);
                        localEntityLookup.set(newEid, eid);
                        newEntities.set(eid, newEid);
                        eid = newEid;
                    }
                }
                if (mode === DESERIALIZE_MODE.APPEND || mode === DESERIALIZE_MODE.REPLACE && !world[$entitySparseSet].has(eid)) {
                    const newEid = newEntities.get(eid) || addEntity(world);
                    newEntities.set(eid, newEid);
                    eid = newEid;
                }
                const component = prop[$storeBase]();
                if (!hasComponent(world, component, eid)) addComponent(world, component, eid);
                deserializedEntities.push(eid);
                if (component[$tagStore]) continue;
                if (ArrayBuffer.isView(prop[eid])) {
                    const array = prop[eid];
                    const count = view[`get${array[$indexType]}`](where);
                    where += array[$indexBytes];
                    for(let i2 = 0; i2 < count; i2++){
                        const index = view[`get${array[$indexType]}`](where);
                        where += array[$indexBytes];
                        const value = view[`get${array.constructor.name.replace("Array", "")}`](where);
                        where += array.BYTES_PER_ELEMENT;
                        if (prop[$isEidType]) {
                            let localEid = localEntities.get(value);
                            if (!world[$entitySparseSet].has(localEid)) localEid = addEntity(world);
                            prop[eid][index] = localEid;
                        } else prop[eid][index] = value;
                    }
                } else {
                    const value = view[`get${prop.constructor.name.replace("Array", "")}`](where);
                    where += prop.BYTES_PER_ELEMENT;
                    if (prop[$isEidType]) {
                        let localEid = localEntities.get(value);
                        if (!world[$entitySparseSet].has(localEid)) localEid = addEntity(world);
                        prop[eid] = localEid;
                    } else prop[eid] = value;
                }
            }
        }
        return deserializedEntities;
    };
};
// src/Entity.js
var $entityMasks = Symbol("entityMasks");
var $entityComponents = Symbol("entityComponents");
var $entitySparseSet = Symbol("entitySparseSet");
var $entityArray = Symbol("entityArray");
var $entityIndices = Symbol("entityIndices");
var $removedEntities = Symbol("removedEntities");
var defaultSize = 100000;
var globalEntityCursor = 0;
var globalSize = defaultSize;
var resizeThreshold = ()=>globalSize - globalSize / 5
;
var getGlobalSize = ()=>globalSize
;
var removed = [];
var resetGlobals = ()=>{
    globalSize = defaultSize;
    globalEntityCursor = 0;
    removed.length = 0;
};
var setDefaultSize = (size)=>{
    defaultSize = size;
    resetGlobals();
};
var getEntityCursor = ()=>globalEntityCursor
;
var eidToWorld = new Map();
var addEntity = (world)=>{
    if (globalEntityCursor >= resizeThreshold()) {
        const size = globalSize;
        const amount = Math.ceil(size / 2 / 4) * 4;
        const newSize = size + amount;
        globalSize = newSize;
        resizeWorlds(newSize);
        resizeComponents(newSize);
        setSerializationResized(true);
        console.info(`\u{1F47E} bitECS - resizing all data stores from ${size} to ${newSize}`);
    }
    const eid = removed.length > 0 ? removed.shift() : globalEntityCursor++;
    world[$entitySparseSet].add(eid);
    eidToWorld.set(eid, world);
    world[$notQueries].forEach((q)=>{
        const match = queryCheckEntity(world, q, eid);
        if (match) queryAddEntity(q, eid);
    });
    world[$entityComponents].set(eid, new Set());
    return eid;
};
var removeEntity = (world, eid)=>{
    if (!world[$entitySparseSet].has(eid)) return;
    world[$queries].forEach((q)=>{
        queryRemoveEntity(world, q, eid);
    });
    removed.push(eid);
    world[$entitySparseSet].remove(eid);
    world[$entityComponents].delete(eid);
    world[$localEntities].delete(world[$localEntityLookup].get(eid));
    world[$localEntityLookup].delete(eid);
    for(let i = 0; i < world[$entityMasks].length; i++)world[$entityMasks][i][eid] = 0;
};
var getEntityComponents = (world, eid)=>Array.from(world[$entityComponents].get(eid))
;
// src/Query.js
function Not(c) {
    return ()=>[
            c,
            "not"
        ]
    ;
}
function Changed(c) {
    return ()=>[
            c,
            "changed"
        ]
    ;
}
function Any(...comps) {
    return function QueryAny() {
        return comps;
    };
}
function All(...comps) {
    return function QueryAll() {
        return comps;
    };
}
function None(...comps) {
    return function QueryNone() {
        return comps;
    };
}
var $queries = Symbol("queries");
var $notQueries = Symbol("notQueries");
var $queryAny = Symbol("queryAny");
var $queryAll = Symbol("queryAll");
var $queryNone = Symbol("queryNone");
var $queryMap = Symbol("queryMap");
var $dirtyQueries = Symbol("$dirtyQueries");
var $queryComponents = Symbol("queryComponents");
var $enterQuery = Symbol("enterQuery");
var $exitQuery = Symbol("exitQuery");
var enterQuery = (query)=>(world)=>{
        if (!world[$queryMap].has(query)) registerQuery(world, query);
        const q = world[$queryMap].get(query);
        const entered = q.entered.dense.slice();
        q.entered = SparseSet();
        return entered;
    }
;
var exitQuery = (query)=>(world)=>{
        if (!world[$queryMap].has(query)) registerQuery(world, query);
        const q = world[$queryMap].get(query);
        const exited = q.exited.dense.slice();
        q.exited = SparseSet();
        return exited;
    }
;
var registerQuery = (world, query)=>{
    const components2 = [];
    const notComponents = [];
    const changedComponents = [];
    query[$queryComponents].forEach((c)=>{
        if (typeof c === "function") {
            const [comp, mod] = c();
            if (!world[$componentMap].has(comp)) registerComponent(world, comp);
            if (mod === "not") notComponents.push(comp);
            if (mod === "changed") {
                changedComponents.push(comp);
                components2.push(comp);
            }
        } else {
            if (!world[$componentMap].has(c)) registerComponent(world, c);
            components2.push(c);
        }
    });
    const mapComponents = (c)=>world[$componentMap].get(c)
    ;
    const allComponents = components2.concat(notComponents).map(mapComponents);
    const sparseSet = SparseSet();
    const archetypes = [];
    const changed = [];
    const toRemove = SparseSet();
    const entered = SparseSet();
    const exited = SparseSet();
    const generations = allComponents.map((c)=>c.generationId
    ).reduce((a, v)=>{
        if (a.includes(v)) return a;
        a.push(v);
        return a;
    }, []);
    const reduceBitflags = (a, c)=>{
        if (!a[c.generationId]) a[c.generationId] = 0;
        a[c.generationId] |= c.bitflag;
        return a;
    };
    const masks = components2.map(mapComponents).reduce(reduceBitflags, {
    });
    const notMasks = notComponents.map(mapComponents).reduce(reduceBitflags, {
    });
    const hasMasks = allComponents.reduce(reduceBitflags, {
    });
    const flatProps = components2.filter((c)=>!c[$tagStore]
    ).map((c)=>Object.getOwnPropertySymbols(c).includes($storeFlattened) ? c[$storeFlattened] : [
            c
        ]
    ).reduce((a, v)=>a.concat(v)
    , []);
    const shadows = flatProps.map((prop)=>{
        const $ = Symbol();
        createShadow(prop, $);
        return prop[$];
    }, []);
    const q = Object.assign(sparseSet, {
        archetypes,
        changed,
        components: components2,
        notComponents,
        changedComponents,
        allComponents,
        masks,
        notMasks,
        hasMasks,
        generations,
        flatProps,
        toRemove,
        entered,
        exited,
        shadows
    });
    world[$queryMap].set(query, q);
    world[$queries].add(q);
    allComponents.forEach((c)=>{
        c.queries.add(q);
    });
    if (notComponents.length) world[$notQueries].add(q);
    for(let eid = 0; eid < getEntityCursor(); eid++){
        if (!world[$entitySparseSet].has(eid)) continue;
        const match = queryCheckEntity(world, q, eid);
        if (match) queryAddEntity(q, eid);
    }
};
var diff = (q, clearDiff)=>{
    if (clearDiff) q.changed = [];
    const { flatProps , shadows  } = q;
    for(let i = 0; i < q.dense.length; i++){
        const eid = q.dense[i];
        let dirty = false;
        for(let pid = 0; pid < flatProps.length; pid++){
            const prop = flatProps[pid];
            const shadow = shadows[pid];
            if (ArrayBuffer.isView(prop[eid])) {
                for(let i2 = 0; i2 < prop[eid].length; i2++)if (prop[eid][i2] !== shadow[eid][i2]) {
                    dirty = true;
                    break;
                }
                shadow[eid].set(prop[eid]);
            } else if (prop[eid] !== shadow[eid]) {
                dirty = true;
                shadow[eid] = prop[eid];
            }
        }
        if (dirty) q.changed.push(eid);
    }
    return q.changed;
};
var flatten = (a, v)=>a.concat(v)
;
var aggregateComponentsFor = (mod)=>(x)=>x.filter((f)=>f.name === mod().constructor.name
        ).reduce(flatten)
;
var getAnyComponents = aggregateComponentsFor(Any);
var getAllComponents = aggregateComponentsFor(All);
var getNoneComponents = aggregateComponentsFor(None);
var defineQuery = (...args)=>{
    let components2;
    let any, all, none;
    if (Array.isArray(args[0])) components2 = args[0];
    if (components2 === void 0 || components2[$componentMap] !== void 0) return (world)=>world ? world[$entityArray] : components2[$entityArray]
    ;
    const query = function(world, clearDiff = true) {
        if (!world[$queryMap].has(query)) registerQuery(world, query);
        const q = world[$queryMap].get(query);
        commitRemovals(world);
        if (q.changedComponents.length) return diff(q, clearDiff);
        return q.dense;
    };
    query[$queryComponents] = components2;
    query[$queryAny] = any;
    query[$queryAll] = all;
    query[$queryNone] = none;
    return query;
};
var queryCheckEntity = (world, q, eid)=>{
    const { masks , notMasks , generations  } = q;
    let or = 0;
    for(let i = 0; i < generations.length; i++){
        const generationId = generations[i];
        const qMask = masks[generationId];
        const qNotMask = notMasks[generationId];
        const eMask = world[$entityMasks][generationId][eid];
        if (qNotMask && (eMask & qNotMask) !== 0) return false;
        if (qMask && (eMask & qMask) !== qMask) return false;
    }
    return true;
};
var queryAddEntity = (q, eid)=>{
    q.toRemove.remove(eid);
    if (!q.has(eid)) q.entered.add(eid);
    q.add(eid);
};
var queryCommitRemovals = (q)=>{
    for(let i = q.toRemove.dense.length - 1; i >= 0; i--){
        const eid = q.toRemove.dense[i];
        q.toRemove.remove(eid);
        q.remove(eid);
    }
};
var commitRemovals = (world)=>{
    if (!world[$dirtyQueries].size) return;
    world[$dirtyQueries].forEach(queryCommitRemovals);
    world[$dirtyQueries].clear();
};
var queryRemoveEntity = (world, q, eid)=>{
    if (!q.has(eid) || q.toRemove.has(eid)) return;
    q.toRemove.add(eid);
    world[$dirtyQueries].add(q);
    q.exited.add(eid);
};
var resetChangedQuery = (world, query)=>{
    const q = world[$queryMap].get(query);
    q.changed = [];
};
var removeQuery = (world, query)=>{
    const q = world[$queryMap].get(query);
    world[$queries].delete(q);
    world[$queryMap].delete(query);
};
// src/Component.js
var $componentMap = Symbol("componentMap");
var components = [];
var resizeComponents = (size)=>{
    components.forEach((component)=>resizeStore(component, size)
    );
};
var defineComponent = (schema)=>{
    const component = createStore(schema, getGlobalSize());
    if (schema && Object.keys(schema).length) components.push(component);
    return component;
};
var incrementBitflag = (world)=>{
    world[$bitflag] *= 2;
    if (world[$bitflag] >= 2 ** 31) {
        world[$bitflag] = 1;
        world[$entityMasks].push(new Uint32Array(world[$size]));
    }
};
var registerComponent = (world, component)=>{
    if (!component) throw new Error(`bitECS - Cannot register null or undefined component`);
    const queries = new Set();
    const notQueries = new Set();
    const changedQueries = new Set();
    world[$queries].forEach((q)=>{
        if (q.allComponents.includes(component)) queries.add(q);
    });
    world[$componentMap].set(component, {
        generationId: world[$entityMasks].length - 1,
        bitflag: world[$bitflag],
        store: component,
        queries,
        notQueries,
        changedQueries
    });
    if (component[$storeSize] < getGlobalSize()) resizeStore(component, getGlobalSize());
    incrementBitflag(world);
};
var registerComponents = (world, components2)=>{
    components2.forEach((c)=>registerComponent(world, c)
    );
};
var hasComponent = (world, component, eid)=>{
    const registeredComponent = world[$componentMap].get(component);
    if (!registeredComponent) return false;
    const { generationId , bitflag  } = registeredComponent;
    const mask = world[$entityMasks][generationId][eid];
    return (mask & bitflag) === bitflag;
};
var addComponent = (world, component, eid, reset = true)=>{
    if (eid === void 0) throw new Error("bitECS - entity is undefined.");
    if (!world[$entitySparseSet].has(eid)) throw new Error("bitECS - entity does not exist in the world.");
    if (!world[$componentMap].has(component)) registerComponent(world, component);
    if (hasComponent(world, component, eid)) return;
    const c = world[$componentMap].get(component);
    const { generationId , bitflag , queries , notQueries  } = c;
    world[$entityMasks][generationId][eid] |= bitflag;
    queries.forEach((q)=>{
        if (q.toRemove.has(eid)) q.toRemove.remove(eid);
        const match = queryCheckEntity(world, q, eid);
        if (match) queryAddEntity(q, eid);
        if (!match) queryRemoveEntity(world, q, eid);
    });
    world[$entityComponents].get(eid).add(component);
    if (reset) resetStoreFor(component, eid);
};
var removeComponent = (world, component, eid, reset = false)=>{
    if (eid === void 0) throw new Error("bitECS - entity is undefined.");
    if (!world[$entitySparseSet].has(eid)) throw new Error("bitECS - entity does not exist in the world.");
    if (!hasComponent(world, component, eid)) return;
    const c = world[$componentMap].get(component);
    const { generationId , bitflag , queries  } = c;
    world[$entityMasks][generationId][eid] &= ~bitflag;
    queries.forEach((q)=>{
        if (q.toRemove.has(eid)) q.toRemove.remove(eid);
        const match = queryCheckEntity(world, q, eid);
        if (match) queryAddEntity(q, eid);
        if (!match) queryRemoveEntity(world, q, eid);
    });
    world[$entityComponents].get(eid).delete(component);
    if (reset) resetStoreFor(component, eid);
};
// src/World.js
var $size = Symbol("size");
var $resizeThreshold = Symbol("resizeThreshold");
var $bitflag = Symbol("bitflag");
var $archetypes = Symbol("archetypes");
var $localEntities = Symbol("localEntities");
var $localEntityLookup = Symbol("localEntityLookp");
var worlds = [];
var resizeWorlds = (size)=>{
    worlds.forEach((world)=>{
        world[$size] = size;
        for(let i = 0; i < world[$entityMasks].length; i++){
            const masks = world[$entityMasks][i];
            world[$entityMasks][i] = resize(masks, size);
        }
        world[$resizeThreshold] = world[$size] - world[$size] / 5;
    });
};
var createWorld = (obj = {
})=>{
    const world = obj;
    resetWorld(world);
    worlds.push(world);
    return world;
};
var resetWorld = (world)=>{
    const size = getGlobalSize();
    world[$size] = size;
    if (world[$entityArray]) world[$entityArray].forEach((eid)=>removeEntity(world, eid)
    );
    world[$entityMasks] = [
        new Uint32Array(size)
    ];
    world[$entityComponents] = new Map();
    world[$archetypes] = [];
    world[$entitySparseSet] = SparseSet();
    world[$entityArray] = world[$entitySparseSet].dense;
    world[$bitflag] = 1;
    world[$componentMap] = new Map();
    world[$queryMap] = new Map();
    world[$queries] = new Set();
    world[$notQueries] = new Set();
    world[$dirtyQueries] = new Set();
    world[$localEntities] = new Map();
    world[$localEntityLookup] = new Map();
    return world;
};
var deleteWorld = (world)=>{
    Object.getOwnPropertySymbols(world).forEach(($)=>{
        delete world[$];
    });
    Object.keys(world).forEach((key)=>{
        delete world[key];
    });
    worlds.splice(worlds.indexOf(world), 1);
};
// src/System.js
var defineSystem = (update)=>(world, ...args)=>{
        update(world, ...args);
        return world;
    }
;
// src/index.js
var pipe = (...fns)=>(input)=>{
        let tmp = input;
        for(let i = 0; i < fns.length; i++){
            const fn = fns[i];
            tmp = fn(tmp);
        }
        return tmp;
    }
;
var Types = TYPES_ENUM;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"ciiiV":[function(require,module,exports) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, '__esModule', {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === 'default' || key === '__esModule' || dest.hasOwnProperty(key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}]},["456jt","5L2jJ"], "5L2jJ", "parcelRequire8bbd")

//# sourceMappingURL=index.2a9e5b76.js.map
