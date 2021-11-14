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
})({"diaDU":[function(require,module,exports) {
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "4a236f9275d0a351";
module.bundle.HMR_BUNDLE_ID = "7358a1e5133a4809";
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

},{}],"3wyMm":[function(require,module,exports) {
var _ecsy = require("ecsy");
var _position = require("./components/position");
var _motion = require("./components/motion");
const NUM_ELEMENTS = 4;
const SPEED_MULTIPLIER = 0.1;
const SHAPE_SIZE = 20;
const SHAPE_HALF_SIZE = SHAPE_SIZE / 2;
// Initialize canvas
let canvas = document.querySelector("canvas");
let canvasWidth = canvas.width = window.innerWidth;
let canvasHeight = canvas.height = window.innerHeight;
let ctx = canvas.getContext("2d");
//----------------------
// Components
//----------------------
// drawSpaceship(position) {
//   ctx.save();
//   ctx.translate(position.x >> 0, position.y >> 0);
//   // ctx.rotate(ship.angle);
//   ctx.strokeStyle = '#000';
//   // ctx.lineWidth = (Math.random() > 0.9) ? 2 : 1;
//   ctx.beginPath();
//   ctx.moveTo(10, 0);
//   ctx.lineTo(-10, -10);
//   ctx.lineTo(-10, 10);
//   ctx.lineTo(10, 0);
//   ctx.stroke();
//   ctx.closePath();
//   ctx.restore();
// }
// Velocity component
// class Velocity {
//   constructor() {
//     this.x = this.y = 0;
//   }
// }
// Shape component
class Shape {
    constructor(){
        this.primitive = 'box';
    }
}
// Renderable component
class Renderable extends _ecsy.TagComponent {
}
//----------------------
// Systems
//----------------------
// MovableSystem
class MovableSystem extends _ecsy.System {
    // This method will get called on every frame by default
    execute(delta2, time2) {
        // Iterate through all the entities on the query
        this.queries.moving.results.forEach((entity)=>{
            var motion = entity.getComponent(_motion.Motion);
            var position = entity.getMutableComponent(_position.Position);
            position.x += motion.x * delta2;
            position.y += motion.y * delta2;
            position.rotation += motion.angularVelocity * delta2;
            console.log(position.rotation, motion.angularVelocity);
            if (position.x > canvasWidth + SHAPE_HALF_SIZE) position.x = -SHAPE_HALF_SIZE;
            if (position.x < -SHAPE_HALF_SIZE) position.x = canvasWidth + SHAPE_HALF_SIZE;
            if (position.y > canvasHeight + SHAPE_HALF_SIZE) position.y = -SHAPE_HALF_SIZE;
            if (position.y < -SHAPE_HALF_SIZE) position.y = canvasHeight + SHAPE_HALF_SIZE;
        });
    }
}
// Define a query of entities that have "Velocity" and "Position" components
MovableSystem.queries = {
    moving: {
        components: [
            _motion.Motion,
            _position.Position
        ]
    }
};
// RendererSystem
class RendererSystem extends _ecsy.System {
    // This method will get called on every frame by default
    execute(delta1, time1) {
        ctx.globalAlpha = 1;
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);
        //ctx.globalAlpha = 0.6;
        // Iterate through all the entities on the query
        this.queries.renderables.results.forEach((entity)=>{
            var shape = entity.getComponent(Shape);
            var position = entity.getComponent(_position.Position);
            // var motion = entity.getComponent(Motion);
            if (shape.primitive === 'box') // this.drawBox(position);
            this.drawBox(position);
            else // this.drawCircle(position);
            this.drawSpaceship(position);
        });
    }
    drawSpaceship(position) {
        ctx.save();
        ctx.translate(position.x >> 0, position.y >> 0);
        ctx.rotate(position.rotation * 180 / Math.PI);
        ctx.strokeStyle = '#000';
        // ctx.lineWidth = (Math.random() > 0.9) ? 2 : 1;
        ctx.beginPath();
        ctx.moveTo(10, 0);
        ctx.lineTo(-10, -10);
        ctx.lineTo(-10, 10);
        ctx.lineTo(10, 0);
        ctx.stroke();
        ctx.closePath();
        ctx.restore();
    }
    drawCircle(position1) {
        ctx.fillStyle = "#888";
        ctx.beginPath();
        ctx.arc(position1.x, position1.y, SHAPE_HALF_SIZE, 0, 2 * Math.PI, false);
        ctx.fill();
        ctx.lineWidth = 1;
        ctx.strokeStyle = "#222";
        ctx.stroke();
    }
    drawBox(position2) {
        // ctx.save();
        // ctx.beginPath();
        // // ctx.lineWidth = (Math.random() > 0.2) ? 4 : 3;
        // ctx.strokeStyle = "#000";
        // var j = 7// (Math.random() * 2 + 7) >> 0;
        // var sides = j;
        // let doublePI = Math.PI * 2;
        // let angle = 0
        // let radius = 30
        // ctx.translate(position.x + radius / 2, position.y + radius / 2);
        // ctx.rotate(position.rotation * 180 / Math.PI);
        // ctx.translate(-(position.x + radius / 2), -(position.y + radius / 2));
        // ctx.fillStyle= "#000";
        // ctx.moveTo((position.x + Math.cos(doublePI * (j / sides) + angle) * radius) >> 0, (position.y + Math.sin(doublePI * (j / sides) + angle) * radius) >> 0);
        // for(j; j > -1; --j) {
        //   ctx.lineTo(
        //     (position.x + Math.cos(doublePI * (j / sides) + angle) * radius) >> 0,
        //     (position.y + Math.sin(doublePI * (j / sides) + angle) * radius) >> 0
        //   )
        // }
        // ctx.fill();
        // ctx.stroke();
        // ctx.closePath();
        // ctx.restore();
        // return;
        // let angle = 0
        // let radius = 30
        // ctx.save();
        // ctx.beginPath();
        // ctx.translate(position.x >> 0, position.y >> 0);
        // ctx.fillStyle= "#000";
        // ctx.moveTo(radius, 0);
        // while( angle < Math.PI * 2 ) {
        //   var length = ( 0.75 + Math.random() * 0.25 ) * radius;
        //   var posX = Math.cos( angle ) * length;
        //   var posY = Math.sin( angle ) * length;
        //   ctx.lineTo(posX, posY);
        //   angle += Math.random() * 0.5;
        // }
        // ctx.lineTo( radius, 0 );
        // ctx.fill();
        // ctx.closePath();
        // ctx.restore();
        // return;
        ctx.save();
        ctx.beginPath();
        // //Set the origin to the center of the object
        ctx.translate(position2.x + SHAPE_SIZE / 2, position2.y + SHAPE_SIZE / 2);
        ctx.rotate(position2.rotation * 180 / Math.PI);
        ctx.translate(-position2.x - SHAPE_SIZE / 2, -position2.y - SHAPE_SIZE / 2);
        ctx.fillStyle = "#f28d89";
        ctx.rect(position2.x - SHAPE_HALF_SIZE, position2.y - SHAPE_HALF_SIZE, SHAPE_SIZE, SHAPE_SIZE);
        ctx.fill();
        ctx.lineWidth = 1;
        ctx.strokeStyle = "#800904";
        ctx.stroke();
        ctx.closePath();
        ctx.restore();
    }
}
// Define a query of entities that have "Renderable" and "Shape" components
RendererSystem.queries = {
    renderables: {
        components: [
            Renderable,
            Shape
        ]
    }
};
// Create world and register the systems on it
var world = new _ecsy.World();
world.registerSystem(MovableSystem).registerSystem(RendererSystem);
// Some helper functions when creating the components
function getRandomVelocity() {
    return {
        x: SPEED_MULTIPLIER * (2 * Math.random() - 1),
        y: SPEED_MULTIPLIER * (2 * Math.random() - 1),
        angularVelocity: (2 * Math.random() - 1) * 0.00005,
        damping: 0
    };
}
// new Motion(
//   ( Math.random() - 0.5 ) * 4 * ( 50 - radius ),
//   ( Math.random() - 0.5 ) * 4 * ( 50 - radius ),
//   Math.random() * 2 - 1,
//   0
// )
// ctx.fillStyle= "#000";
// ctx.fill();
// ctx.lineWidth = 1;
// ctx.strokeStyle = "#800904";
// ctx.stroke();
// var angle : Number = 0;
// graphics.beginFill( 0xFFFFFF );
// graphics.moveTo( radius, 0 );
// while( angle < Math.PI * 2 )
// {
//   var length : Number = ( 0.75 + Math.random() * 0.25 ) * radius;
//   var posX : Number = Math.cos( angle ) * length;
//   var posY : Number = Math.sin( angle ) * length;
//   graphics.lineTo( posX, posY );
//   angle += Math.random() * 0.5;
// }
// graphics.lineTo( radius, 0 );
// graphics.endFill();
function getRandomPosition() {
    return {
        x: Math.random() * canvasWidth,
        y: Math.random() * canvasHeight,
        rotation: 0
    };
}
function getRandomShape() {
    return {
        primitive: Math.random() >= 0.5 ? 'circle' : 'box'
    };
}
for(let i = 0; i < NUM_ELEMENTS; i++)world.createEntity().addComponent(_motion.Motion, getRandomVelocity()).addComponent(Shape, getRandomShape()).addComponent(_position.Position, getRandomPosition()).addComponent(Renderable);
// Run!
function run() {
    // Compute delta and elapsed time
    var time = performance.now();
    var delta = time - lastTime;
    // Run all the systems
    world.execute(delta, time);
    lastTime = time;
    requestAnimationFrame(run);
}
var lastTime = performance.now();
run();

},{"ecsy":"9qAY6","./components/position":"eJ39T","./components/motion":"haevn"}],"9qAY6":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Component", ()=>Component1
);
parcelHelpers.export(exports, "Not", ()=>Not
);
parcelHelpers.export(exports, "System", ()=>System
);
parcelHelpers.export(exports, "SystemStateComponent", ()=>SystemStateComponent
);
parcelHelpers.export(exports, "TagComponent", ()=>TagComponent
);
parcelHelpers.export(exports, "Types", ()=>Types
);
parcelHelpers.export(exports, "Version", ()=>Version1
);
parcelHelpers.export(exports, "World", ()=>World
);
parcelHelpers.export(exports, "_Entity", ()=>Entity
);
parcelHelpers.export(exports, "createComponentClass", ()=>createComponentClass
);
parcelHelpers.export(exports, "createType", ()=>createType
);
parcelHelpers.export(exports, "enableRemoteDevtools", ()=>enableRemoteDevtools
);
/**
 * Return the name of a component
 * @param {Component} Component
 * @private
 */ function getName(Component) {
    return Component.name;
}
/**
 * Return a valid property name for the Component
 * @param {Component} Component
 * @private
 */ function componentPropertyName(Component) {
    return getName(Component);
}
/**
 * Get a key from a list of components
 * @param {Array(Component)} Components Array of components to generate the key
 * @private
 */ function queryKey(Components) {
    var names = [];
    for(var n = 0; n < Components.length; n++){
        var T = Components[n];
        if (typeof T === "object") {
            var operator = T.operator === "not" ? "!" : T.operator;
            names.push(operator + getName(T.Component));
        } else names.push(getName(T));
    }
    return names.sort().join("-");
}
// Detector for browser's "window"
const hasWindow = typeof window !== "undefined";
// performance.now() "polyfill"
const now = hasWindow && typeof window.performance !== "undefined" ? performance.now.bind(performance) : Date.now.bind(Date);
/**
 * @private
 * @class EventDispatcher
 */ class EventDispatcher {
    constructor(){
        this._listeners = {
        };
        this.stats = {
            fired: 0,
            handled: 0
        };
    }
    /**
   * Add an event listener
   * @param {String} eventName Name of the event to listen
   * @param {Function} listener Callback to trigger when the event is fired
   */ addEventListener(eventName4, listener) {
        let listeners = this._listeners;
        if (listeners[eventName4] === undefined) listeners[eventName4] = [];
        if (listeners[eventName4].indexOf(listener) === -1) listeners[eventName4].push(listener);
    }
    /**
   * Check if an event listener is already added to the list of listeners
   * @param {String} eventName Name of the event to check
   * @param {Function} listener Callback for the specified event
   */ hasEventListener(eventName1, listener1) {
        return this._listeners[eventName1] !== undefined && this._listeners[eventName1].indexOf(listener1) !== -1;
    }
    /**
   * Remove an event listener
   * @param {String} eventName Name of the event to remove
   * @param {Function} listener Callback for the specified event
   */ removeEventListener(eventName2, listener2) {
        var listenerArray = this._listeners[eventName2];
        if (listenerArray !== undefined) {
            var index = listenerArray.indexOf(listener2);
            if (index !== -1) listenerArray.splice(index, 1);
        }
    }
    /**
   * Dispatch an event
   * @param {String} eventName Name of the event to dispatch
   * @param {Entity} entity (Optional) Entity to emit
   * @param {Component} component
   */ dispatchEvent(eventName3, entity4, component1) {
        this.stats.fired++;
        var listenerArray = this._listeners[eventName3];
        if (listenerArray !== undefined) {
            var array = listenerArray.slice(0);
            for(var i = 0; i < array.length; i++)array[i].call(this, entity4, component1);
        }
    }
    /**
   * Reset stats counters
   */ resetCounters() {
        this.stats.fired = this.stats.handled = 0;
    }
}
class Query {
    /**
   * @param {Array(Component)} Components List of types of components to query
   */ constructor(Components, manager){
        this.Components = [];
        this.NotComponents = [];
        Components.forEach((component)=>{
            if (typeof component === "object") this.NotComponents.push(component.Component);
            else this.Components.push(component);
        });
        if (this.Components.length === 0) throw new Error("Can't create a query without components");
        this.entities = [];
        this.eventDispatcher = new EventDispatcher();
        // This query is being used by a reactive system
        this.reactive = false;
        this.key = queryKey(Components);
        // Fill the query with the existing entities
        for(var i = 0; i < manager._entities.length; i++){
            var entity = manager._entities[i];
            if (this.match(entity)) {
                // @todo ??? this.addEntity(entity); => preventing the event to be generated
                entity.queries.push(this);
                this.entities.push(entity);
            }
        }
    }
    /**
   * Add entity to this query
   * @param {Entity} entity
   */ addEntity(entity1) {
        entity1.queries.push(this);
        this.entities.push(entity1);
        this.eventDispatcher.dispatchEvent(Query.prototype.ENTITY_ADDED, entity1);
    }
    /**
   * Remove entity from this query
   * @param {Entity} entity
   */ removeEntity(entity2) {
        let index = this.entities.indexOf(entity2);
        if (~index) {
            this.entities.splice(index, 1);
            index = entity2.queries.indexOf(this);
            entity2.queries.splice(index, 1);
            this.eventDispatcher.dispatchEvent(Query.prototype.ENTITY_REMOVED, entity2);
        }
    }
    match(entity3) {
        return entity3.hasAllComponents(this.Components) && !entity3.hasAnyComponents(this.NotComponents);
    }
    toJSON() {
        return {
            key: this.key,
            reactive: this.reactive,
            components: {
                included: this.Components.map((C)=>C.name
                ),
                not: this.NotComponents.map((C)=>C.name
                )
            },
            numEntities: this.entities.length
        };
    }
    /**
   * Return stats for this query
   */ stats() {
        return {
            numComponents: this.Components.length,
            numEntities: this.entities.length
        };
    }
}
Query.prototype.ENTITY_ADDED = "Query#ENTITY_ADDED";
Query.prototype.ENTITY_REMOVED = "Query#ENTITY_REMOVED";
Query.prototype.COMPONENT_CHANGED = "Query#COMPONENT_CHANGED";
class System {
    canExecute() {
        if (this._mandatoryQueries.length === 0) return true;
        for(let i = 0; i < this._mandatoryQueries.length; i++){
            var query = this._mandatoryQueries[i];
            if (query.entities.length === 0) return false;
        }
        return true;
    }
    constructor(world5, attributes){
        this.world = world5;
        this.enabled = true;
        // @todo Better naming :)
        this._queries = {
        };
        this.queries = {
        };
        this.priority = 0;
        // Used for stats
        this.executeTime = 0;
        if (attributes && attributes.priority) this.priority = attributes.priority;
        this._mandatoryQueries = [];
        this.initialized = true;
        if (this.constructor.queries) for(var queryName in this.constructor.queries){
            var queryConfig = this.constructor.queries[queryName];
            var Components = queryConfig.components;
            if (!Components || Components.length === 0) throw new Error("'components' attribute can't be empty in a query");
            var query = this.world.entityManager.queryComponents(Components);
            this._queries[queryName] = query;
            if (queryConfig.mandatory === true) this._mandatoryQueries.push(query);
            this.queries[queryName] = {
                results: query.entities
            };
            // Reactive configuration added/removed/changed
            var validEvents = [
                "added",
                "removed",
                "changed"
            ];
            const eventMapping = {
                added: Query.prototype.ENTITY_ADDED,
                removed: Query.prototype.ENTITY_REMOVED,
                changed: Query.prototype.COMPONENT_CHANGED // Query.prototype.ENTITY_CHANGED
            };
            if (queryConfig.listen) validEvents.forEach((eventName)=>{
                if (!this.execute) console.warn(`System '${this.constructor.name}' has defined listen events (${validEvents.join(", ")}) for query '${queryName}' but it does not implement the 'execute' method.`);
                // Is the event enabled on this system's query?
                if (queryConfig.listen[eventName]) {
                    let event = queryConfig.listen[eventName];
                    if (eventName === "changed") {
                        query.reactive = true;
                        if (event === true) {
                            // Any change on the entity from the components in the query
                            let eventList = this.queries[queryName][eventName] = [];
                            query.eventDispatcher.addEventListener(Query.prototype.COMPONENT_CHANGED, (entity)=>{
                                // Avoid duplicates
                                if (eventList.indexOf(entity) === -1) eventList.push(entity);
                            });
                        } else if (Array.isArray(event)) {
                            let eventList = this.queries[queryName][eventName] = [];
                            query.eventDispatcher.addEventListener(Query.prototype.COMPONENT_CHANGED, (entity, changedComponent)=>{
                                // Avoid duplicates
                                if (event.indexOf(changedComponent.constructor) !== -1 && eventList.indexOf(entity) === -1) eventList.push(entity);
                            });
                        }
                    } else {
                        let eventList = this.queries[queryName][eventName] = [];
                        query.eventDispatcher.addEventListener(eventMapping[eventName], (entity)=>{
                            // @fixme overhead?
                            if (eventList.indexOf(entity) === -1) eventList.push(entity);
                        });
                    }
                }
            });
        }
    }
    stop() {
        this.executeTime = 0;
        this.enabled = false;
    }
    play() {
        this.enabled = true;
    }
    // @question rename to clear queues?
    clearEvents() {
        for(let queryName in this.queries){
            var query = this.queries[queryName];
            if (query.added) query.added.length = 0;
            if (query.removed) query.removed.length = 0;
            if (query.changed) {
                if (Array.isArray(query.changed)) query.changed.length = 0;
                else for(let name in query.changed)query.changed[name].length = 0;
            }
        }
    }
    toJSON() {
        var json = {
            name: this.constructor.name,
            enabled: this.enabled,
            executeTime: this.executeTime,
            priority: this.priority,
            queries: {
            }
        };
        if (this.constructor.queries) {
            var queries = this.constructor.queries;
            for(let queryName in queries){
                let query = this.queries[queryName];
                let queryDefinition = queries[queryName];
                let jsonQuery = json.queries[queryName] = {
                    key: this._queries[queryName].key
                };
                jsonQuery.mandatory = queryDefinition.mandatory === true;
                jsonQuery.reactive = queryDefinition.listen && (queryDefinition.listen.added === true || queryDefinition.listen.removed === true || queryDefinition.listen.changed === true || Array.isArray(queryDefinition.listen.changed));
                if (jsonQuery.reactive) {
                    jsonQuery.listen = {
                    };
                    const methods = [
                        "added",
                        "removed",
                        "changed"
                    ];
                    methods.forEach((method)=>{
                        if (query[method]) jsonQuery.listen[method] = {
                            entities: query[method].length
                        };
                    });
                }
            }
        }
        return json;
    }
}
function Not(Component) {
    return {
        operator: "not",
        Component: Component
    };
}
class SystemManager {
    constructor(world1){
        this._systems = [];
        this._executeSystems = []; // Systems that have `execute` method
        this.world = world1;
        this.lastExecutedSystem = null;
    }
    registerSystem(SystemClass, attributes1) {
        if (!(SystemClass.prototype instanceof System)) throw new Error(`System '${SystemClass.name}' does not extends 'System' class`);
        if (this.getSystem(SystemClass) !== undefined) {
            console.warn(`System '${SystemClass.name}' already registered.`);
            return this;
        }
        var system = new SystemClass(this.world, attributes1);
        if (system.init) system.init(attributes1);
        system.order = this._systems.length;
        this._systems.push(system);
        if (system.execute) {
            this._executeSystems.push(system);
            this.sortSystems();
        }
        return this;
    }
    unregisterSystem(SystemClass1) {
        let system = this.getSystem(SystemClass1);
        if (system === undefined) {
            console.warn(`Can unregister system '${SystemClass1.name}'. It doesn't exist.`);
            return this;
        }
        this._systems.splice(this._systems.indexOf(system), 1);
        if (system.execute) this._executeSystems.splice(this._executeSystems.indexOf(system), 1);
        // @todo Add system.unregister() call to free resources
        return this;
    }
    sortSystems() {
        this._executeSystems.sort((a, b)=>{
            return a.priority - b.priority || a.order - b.order;
        });
    }
    getSystem(SystemClass2) {
        return this._systems.find((s)=>s instanceof SystemClass2
        );
    }
    getSystems() {
        return this._systems;
    }
    removeSystem(SystemClass3) {
        var index = this._systems.indexOf(SystemClass3);
        if (!~index) return;
        this._systems.splice(index, 1);
    }
    executeSystem(system1, delta, time) {
        if (system1.initialized) {
            if (system1.canExecute()) {
                let startTime = now();
                system1.execute(delta, time);
                system1.executeTime = now() - startTime;
                this.lastExecutedSystem = system1;
                system1.clearEvents();
            }
        }
    }
    stop() {
        this._executeSystems.forEach((system)=>system.stop()
        );
    }
    execute(delta1, time1, forcePlay) {
        this._executeSystems.forEach((system)=>(forcePlay || system.enabled) && this.executeSystem(system, delta1, time1)
        );
    }
    stats() {
        var stats = {
            numSystems: this._systems.length,
            systems: {
            }
        };
        for(var i = 0; i < this._systems.length; i++){
            var system = this._systems[i];
            var systemStats = stats.systems[system.constructor.name] = {
                queries: {
                },
                executeTime: system.executeTime
            };
            for(var name in system.ctx)systemStats.queries[name] = system.ctx[name].stats();
        }
        return stats;
    }
}
class ObjectPool {
    // @todo Add initial size
    constructor(T, initialSize){
        this.freeList = [];
        this.count = 0;
        this.T = T;
        this.isObjectPool = true;
        var extraArgs = null;
        if (arguments.length > 1) {
            extraArgs = Array.prototype.slice.call(arguments);
            extraArgs.shift();
        }
        this.createElement = extraArgs ? ()=>{
            return new T(...extraArgs);
        } : ()=>{
            return new T();
        };
        if (typeof initialSize !== "undefined") this.expand(initialSize);
    }
    acquire() {
        // Grow the list by 20%ish if we're out
        if (this.freeList.length <= 0) this.expand(Math.round(this.count * 0.2) + 1);
        var item = this.freeList.pop();
        return item;
    }
    release(item) {
        item.reset();
        this.freeList.push(item);
    }
    expand(count) {
        for(var n = 0; n < count; n++)this.freeList.push(this.createElement());
        this.count += count;
    }
    totalSize() {
        return this.count;
    }
    totalFree() {
        return this.freeList.length;
    }
    totalUsed() {
        return this.count - this.freeList.length;
    }
}
/**
 * @private
 * @class QueryManager
 */ class QueryManager {
    constructor(world2){
        this._world = world2;
        // Queries indexed by a unique identifier for the components it has
        this._queries = {
        };
    }
    onEntityRemoved(entity) {
        for(var queryName in this._queries){
            var query = this._queries[queryName];
            if (entity.queries.indexOf(query) !== -1) query.removeEntity(entity);
        }
    }
    /**
   * Callback when a component is added to an entity
   * @param {Entity} entity Entity that just got the new component
   * @param {Component} Component Component added to the entity
   */ onEntityComponentAdded(entity5, Component18) {
        // @todo Use bitmask for checking components?
        // Check each indexed query to see if we need to add this entity to the list
        for(var queryName in this._queries){
            var query = this._queries[queryName];
            if (!!~query.NotComponents.indexOf(Component18) && ~query.entities.indexOf(entity5)) {
                query.removeEntity(entity5);
                continue;
            }
            // Add the entity only if:
            // Component is in the query
            // and Entity has ALL the components of the query
            // and Entity is not already in the query
            if (!~query.Components.indexOf(Component18) || !query.match(entity5) || ~query.entities.indexOf(entity5)) continue;
            query.addEntity(entity5);
        }
    }
    /**
   * Callback when a component is removed from an entity
   * @param {Entity} entity Entity to remove the component from
   * @param {Component} Component Component to remove from the entity
   */ onEntityComponentRemoved(entity6, Component2) {
        for(var queryName in this._queries){
            var query = this._queries[queryName];
            if (!!~query.NotComponents.indexOf(Component2) && !~query.entities.indexOf(entity6) && query.match(entity6)) {
                query.addEntity(entity6);
                continue;
            }
            if (!!~query.Components.indexOf(Component2) && !!~query.entities.indexOf(entity6) && !query.match(entity6)) {
                query.removeEntity(entity6);
                continue;
            }
        }
    }
    /**
   * Get a query for the specified components
   * @param {Component} Components Components that the query should have
   */ getQuery(Components1) {
        var key = queryKey(Components1);
        var query = this._queries[key];
        if (!query) this._queries[key] = query = new Query(Components1, this._world);
        return query;
    }
    /**
   * Return some stats from this class
   */ stats() {
        var stats = {
        };
        for(var queryName in this._queries)stats[queryName] = this._queries[queryName].stats();
        return stats;
    }
}
class SystemStateComponent {
}
SystemStateComponent.isSystemStateComponent = true;
/**
 * @private
 * @class EntityManager
 */ class EntityManager {
    constructor(world3){
        this.world = world3;
        this.componentsManager = world3.componentsManager;
        // All the entities in this instance
        this._entities = [];
        this._entitiesByNames = {
        };
        this._queryManager = new QueryManager(this);
        this.eventDispatcher = new EventDispatcher();
        this._entityPool = new ObjectPool(this.world.options.entityClass, this.world.options.entityPoolSize);
        // Deferred deletion
        this.entitiesWithComponentsToRemove = [];
        this.entitiesToRemove = [];
        this.deferredRemovalEnabled = true;
    }
    getEntityByName(name1) {
        return this._entitiesByNames[name1];
    }
    /**
   * Create a new entity
   */ createEntity(name2) {
        var entity = this._entityPool.acquire();
        entity.alive = true;
        entity.name = name2 || "";
        if (name2) {
            if (this._entitiesByNames[name2]) console.warn(`Entity name '${name2}' already exist`);
            else this._entitiesByNames[name2] = entity;
        }
        entity._world = this;
        this._entities.push(entity);
        this.eventDispatcher.dispatchEvent(ENTITY_CREATED, entity);
        return entity;
    }
    // COMPONENTS
    /**
   * Add a component to an entity
   * @param {Entity} entity Entity where the component will be added
   * @param {Component} Component Component to be added to the entity
   * @param {Object} values Optional values to replace the default attributes
   */ entityAddComponent(entity7, Component3, values) {
        if (~entity7._ComponentTypes.indexOf(Component3)) {
            // @todo Just on debug mode
            console.warn("Component type already exists on entity.", entity7, Component3.name);
            return;
        }
        entity7._ComponentTypes.push(Component3);
        if (Component3.__proto__ === SystemStateComponent) entity7.numStateComponents++;
        var componentPool = this.world.componentsManager.getComponentsPool(Component3);
        var component = componentPool.acquire();
        entity7._components[Component3.name] = component;
        if (values) {
            if (component.copy) component.copy(values);
            else for(var name in values)component[name] = values[name];
        }
        this._queryManager.onEntityComponentAdded(entity7, Component3);
        this.world.componentsManager.componentAddedToEntity(Component3);
        this.eventDispatcher.dispatchEvent(COMPONENT_ADDED, entity7, Component3);
    }
    /**
   * Remove a component from an entity
   * @param {Entity} entity Entity which will get removed the component
   * @param {*} Component Component to remove from the entity
   * @param {Bool} immediately If you want to remove the component immediately instead of deferred (Default is false)
   */ entityRemoveComponent(entity8, Component4, immediately) {
        var index = entity8._ComponentTypes.indexOf(Component4);
        if (!~index) return;
        this.eventDispatcher.dispatchEvent(COMPONENT_REMOVE, entity8, Component4);
        if (immediately) this._entityRemoveComponentSync(entity8, Component4, index);
        else {
            if (entity8._ComponentTypesToRemove.length === 0) this.entitiesWithComponentsToRemove.push(entity8);
            entity8._ComponentTypes.splice(index, 1);
            entity8._ComponentTypesToRemove.push(Component4);
            var componentName = getName(Component4);
            entity8._componentsToRemove[componentName] = entity8._components[componentName];
            delete entity8._components[componentName];
        }
        // Check each indexed query to see if we need to remove it
        this._queryManager.onEntityComponentRemoved(entity8, Component4);
        if (Component4.__proto__ === SystemStateComponent) {
            entity8.numStateComponents--;
            // Check if the entity was a ghost waiting for the last system state component to be removed
            if (entity8.numStateComponents === 0 && !entity8.alive) entity8.remove();
        }
    }
    _entityRemoveComponentSync(entity9, Component5, index) {
        // Remove T listing on entity and property ref, then free the component.
        entity9._ComponentTypes.splice(index, 1);
        var propName = componentPropertyName(Component5);
        var componentName = getName(Component5);
        var component = entity9._components[componentName];
        delete entity9._components[componentName];
        this.componentsManager._componentPool[propName].release(component);
        this.world.componentsManager.componentRemovedFromEntity(Component5);
    }
    /**
   * Remove all the components from an entity
   * @param {Entity} entity Entity from which the components will be removed
   */ entityRemoveAllComponents(entity10, immediately1) {
        let Components = entity10._ComponentTypes;
        for(let j = Components.length - 1; j >= 0; j--)if (Components[j].__proto__ !== SystemStateComponent) this.entityRemoveComponent(entity10, Components[j], immediately1);
    }
    /**
   * Remove the entity from this manager. It will clear also its components
   * @param {Entity} entity Entity to remove from the manager
   * @param {Bool} immediately If you want to remove the component immediately instead of deferred (Default is false)
   */ removeEntity(entity11, immediately2) {
        var index = this._entities.indexOf(entity11);
        if (!~index) throw new Error("Tried to remove entity not in list");
        entity11.alive = false;
        if (entity11.numStateComponents === 0) {
            // Remove from entity list
            this.eventDispatcher.dispatchEvent(ENTITY_REMOVED, entity11);
            this._queryManager.onEntityRemoved(entity11);
            if (immediately2 === true) this._releaseEntity(entity11, index);
            else this.entitiesToRemove.push(entity11);
        }
        this.entityRemoveAllComponents(entity11, immediately2);
    }
    _releaseEntity(entity12, index1) {
        this._entities.splice(index1, 1);
        if (this._entitiesByNames[entity12.name]) delete this._entitiesByNames[entity12.name];
        // Prevent any access and free
        entity12._world = null;
        this._entityPool.release(entity12);
    }
    /**
   * Remove all entities from this manager
   */ removeAllEntities() {
        for(var i = this._entities.length - 1; i >= 0; i--)this.removeEntity(this._entities[i]);
    }
    processDeferredRemoval() {
        if (!this.deferredRemovalEnabled) return;
        for(let i = 0; i < this.entitiesToRemove.length; i++){
            let entity = this.entitiesToRemove[i];
            let index = this._entities.indexOf(entity);
            this._releaseEntity(entity, index);
        }
        this.entitiesToRemove.length = 0;
        for(let i1 = 0; i1 < this.entitiesWithComponentsToRemove.length; i1++){
            let entity = this.entitiesWithComponentsToRemove[i1];
            while(entity._ComponentTypesToRemove.length > 0){
                let Component = entity._ComponentTypesToRemove.pop();
                var propName = componentPropertyName(Component);
                var componentName = getName(Component);
                var component = entity._componentsToRemove[componentName];
                delete entity._componentsToRemove[componentName];
                this.componentsManager._componentPool[propName].release(component);
                this.world.componentsManager.componentRemovedFromEntity(Component);
            //this._entityRemoveComponentSync(entity, Component, index);
            }
        }
        this.entitiesWithComponentsToRemove.length = 0;
    }
    /**
   * Get a query based on a list of components
   * @param {Array(Component)} Components List of components that will form the query
   */ queryComponents(Components2) {
        return this._queryManager.getQuery(Components2);
    }
    // EXTRAS
    /**
   * Return number of entities
   */ count() {
        return this._entities.length;
    }
    /**
   * Return some stats
   */ stats() {
        var stats = {
            numEntities: this._entities.length,
            numQueries: Object.keys(this._queryManager._queries).length,
            queries: this._queryManager.stats(),
            numComponentPool: Object.keys(this.componentsManager._componentPool).length,
            componentPool: {
            },
            eventDispatcher: this.eventDispatcher.stats
        };
        for(var cname in this.componentsManager._componentPool){
            var pool = this.componentsManager._componentPool[cname];
            stats.componentPool[cname] = {
                used: pool.totalUsed(),
                size: pool.count
            };
        }
        return stats;
    }
}
const ENTITY_CREATED = "EntityManager#ENTITY_CREATE";
const ENTITY_REMOVED = "EntityManager#ENTITY_REMOVED";
const COMPONENT_ADDED = "EntityManager#COMPONENT_ADDED";
const COMPONENT_REMOVE = "EntityManager#COMPONENT_REMOVE";
class DummyObjectPool {
    constructor(T1){
        this.isDummyObjectPool = true;
        this.count = 0;
        this.used = 0;
        this.T = T1;
    }
    acquire() {
        this.used++;
        this.count++;
        return new this.T();
    }
    release() {
        this.used--;
    }
    totalSize() {
        return this.count;
    }
    totalFree() {
        return Infinity;
    }
    totalUsed() {
        return this.used;
    }
}
class ComponentManager {
    constructor(){
        this.Components = {
        };
        this._componentPool = {
        };
        this.numComponents = {
        };
    }
    registerComponent(Component6) {
        if (this.Components[Component6.name]) {
            console.warn(`Component type: '${Component6.name}' already registered.`);
            return;
        }
        this.Components[Component6.name] = Component6;
        this.numComponents[Component6.name] = 0;
    }
    componentAddedToEntity(Component7) {
        if (!this.Components[Component7.name]) this.registerComponent(Component7);
        this.numComponents[Component7.name]++;
    }
    componentRemovedFromEntity(Component8) {
        this.numComponents[Component8.name]--;
    }
    getComponentsPool(Component9) {
        var componentName = componentPropertyName(Component9);
        if (!this._componentPool[componentName]) {
            if (Component9.prototype.reset) this._componentPool[componentName] = new ObjectPool(Component9);
            else {
                console.warn(`Component '${Component9.name}' won't benefit from pooling because 'reset' method was not implemented.`);
                this._componentPool[componentName] = new DummyObjectPool(Component9);
            }
        }
        return this._componentPool[componentName];
    }
}
var name4 = "ecsy";
var version = "0.2.5";
var description = "Entity Component System in JS";
var main = "build/ecsy.js";
var module = "build/ecsy.module.js";
var types = "src/index.d.ts";
var scripts = {
    build: "rollup -c && npm run docs",
    docs: "rm docs/api/_sidebar.md; typedoc --readme none --mode file --excludeExternals --plugin typedoc-plugin-markdown  --theme docs/theme --hideSources --hideBreadcrumbs --out docs/api/ --includeDeclarations --includes 'src/**/*.d.ts' src; touch docs/api/_sidebar.md",
    "dev:docs": "nodemon -e ts -x 'npm run docs' -w src",
    dev: "concurrently --names 'ROLLUP,DOCS,HTTP' -c 'bgBlue.bold,bgYellow.bold,bgGreen.bold' 'rollup -c -w -m inline' 'npm run dev:docs' 'npm run dev:server'",
    "dev:server": "http-server -c-1 -p 8080 --cors",
    lint: "eslint src test examples",
    start: "npm run dev",
    test: "ava",
    travis: "npm run lint && npm run test && npm run build",
    "watch:test": "ava --watch"
};
var repository = {
    type: "git",
    url: "git+https://github.com/fernandojsg/ecsy.git"
};
var keywords = [
    "ecs",
    "entity component system"
];
var author = "Fernando Serrano <fernandojsg@gmail.com> (http://fernandojsg.com)";
var license = "MIT";
var bugs = {
    url: "https://github.com/fernandojsg/ecsy/issues"
};
var ava = {
    files: [
        "test/**/*.test.js"
    ],
    sources: [
        "src/**/*.js"
    ],
    require: [
        "babel-register",
        "esm"
    ]
};
var jspm = {
    files: [
        "package.json",
        "LICENSE",
        "README.md",
        "build/ecsy.js",
        "build/ecsy.min.js",
        "build/ecsy.module.js"
    ],
    directories: {
    }
};
var homepage = "https://github.com/fernandojsg/ecsy#readme";
var devDependencies = {
    ava: "^1.4.1",
    "babel-cli": "^6.26.0",
    "babel-core": "^6.26.3",
    "babel-eslint": "^10.0.3",
    "babel-loader": "^8.0.6",
    concurrently: "^4.1.2",
    "docsify-cli": "^4.4.0",
    eslint: "^5.16.0",
    "eslint-config-prettier": "^4.3.0",
    "eslint-plugin-prettier": "^3.1.2",
    "http-server": "^0.11.1",
    nodemon: "^1.19.4",
    prettier: "^1.19.1",
    rollup: "^1.29.0",
    "rollup-plugin-json": "^4.0.0",
    "rollup-plugin-terser": "^5.2.0",
    typedoc: "^0.15.8",
    "typedoc-plugin-markdown": "^2.2.16",
    typescript: "^3.7.5"
};
var pjson = {
    name: name4,
    version: version,
    description: description,
    main: main,
    "jsnext:main": "build/ecsy.module.js",
    module: module,
    types: types,
    scripts: scripts,
    repository: repository,
    keywords: keywords,
    author: author,
    license: license,
    bugs: bugs,
    ava: ava,
    jspm: jspm,
    homepage: homepage,
    devDependencies: devDependencies
};
const Version1 = pjson.version;
var nextId = 0;
class Entity {
    constructor(world4){
        this._world = world4 || null;
        // Unique ID for this entity
        this.id = nextId++;
        // List of components types the entity has
        this._ComponentTypes = [];
        // Instance of the components
        this._components = {
        };
        this._componentsToRemove = {
        };
        // Queries where the entity is added
        this.queries = [];
        // Used for deferred removal
        this._ComponentTypesToRemove = [];
        this.alive = false;
        //if there are state components on a entity, it can't be removed completely
        this.numStateComponents = 0;
    }
    // COMPONENTS
    getComponent(Component10, includeRemoved) {
        var component = this._components[Component10.name];
        if (!component && includeRemoved === true) component = this._componentsToRemove[Component10.name];
        return component;
    }
    getRemovedComponent(Component11) {
        return this._componentsToRemove[Component11.name];
    }
    getComponents() {
        return this._components;
    }
    getComponentsToRemove() {
        return this._componentsToRemove;
    }
    getComponentTypes() {
        return this._ComponentTypes;
    }
    getMutableComponent(Component12) {
        var component = this._components[Component12.name];
        for(var i = 0; i < this.queries.length; i++){
            var query = this.queries[i];
            // @todo accelerate this check. Maybe having query._Components as an object
            // @todo add Not components
            if (query.reactive && query.Components.indexOf(Component12) !== -1) query.eventDispatcher.dispatchEvent(Query.prototype.COMPONENT_CHANGED, this, component);
        }
        return component;
    }
    addComponent(Component13, values1) {
        this._world.entityAddComponent(this, Component13, values1);
        return this;
    }
    removeComponent(Component14, forceImmediate) {
        this._world.entityRemoveComponent(this, Component14, forceImmediate);
        return this;
    }
    hasComponent(Component15, includeRemoved1) {
        return !!~this._ComponentTypes.indexOf(Component15) || includeRemoved1 === true && this.hasRemovedComponent(Component15);
    }
    hasRemovedComponent(Component16) {
        return !!~this._ComponentTypesToRemove.indexOf(Component16);
    }
    hasAllComponents(Components3) {
        for(var i = 0; i < Components3.length; i++){
            if (!this.hasComponent(Components3[i])) return false;
        }
        return true;
    }
    hasAnyComponents(Components4) {
        for(var i = 0; i < Components4.length; i++){
            if (this.hasComponent(Components4[i])) return true;
        }
        return false;
    }
    removeAllComponents(forceImmediate1) {
        return this._world.entityRemoveAllComponents(this, forceImmediate1);
    }
    // EXTRAS
    // Initialize the entity. To be used when returning an entity to the pool
    reset() {
        this.id = nextId++;
        this._world = null;
        this._ComponentTypes.length = 0;
        this.queries.length = 0;
        this._components = {
        };
    }
    remove(forceImmediate2) {
        return this._world.removeEntity(this, forceImmediate2);
    }
}
const DEFAULT_OPTIONS = {
    entityPoolSize: 0,
    entityClass: Entity
};
class World {
    constructor(options = {
    }){
        this.options = Object.assign({
        }, DEFAULT_OPTIONS, options);
        this.componentsManager = new ComponentManager(this);
        this.entityManager = new EntityManager(this);
        this.systemManager = new SystemManager(this);
        this.enabled = true;
        this.eventQueues = {
        };
        if (hasWindow && typeof CustomEvent !== "undefined") {
            var event = new CustomEvent("ecsy-world-created", {
                detail: {
                    world: this,
                    version: Version1
                }
            });
            window.dispatchEvent(event);
        }
        this.lastTime = now();
    }
    registerComponent(Component17) {
        this.componentsManager.registerComponent(Component17);
        return this;
    }
    registerSystem(System1, attributes2) {
        this.systemManager.registerSystem(System1, attributes2);
        return this;
    }
    unregisterSystem(System2) {
        this.systemManager.unregisterSystem(System2);
        return this;
    }
    getSystem(SystemClass4) {
        return this.systemManager.getSystem(SystemClass4);
    }
    getSystems() {
        return this.systemManager.getSystems();
    }
    execute(delta2, time2) {
        if (!delta2) {
            time2 = now();
            delta2 = time2 - this.lastTime;
            this.lastTime = time2;
        }
        if (this.enabled) {
            this.systemManager.execute(delta2, time2);
            this.entityManager.processDeferredRemoval();
        }
    }
    stop() {
        this.enabled = false;
    }
    play() {
        this.enabled = true;
    }
    createEntity(name3) {
        return this.entityManager.createEntity(name3);
    }
    stats() {
        var stats = {
            entities: this.entityManager.stats(),
            system: this.systemManager.stats()
        };
        console.log(JSON.stringify(stats, null, 2));
    }
}
class Component1 {
}
Component1.isComponent = true;
class TagComponent {
    reset() {
    }
}
TagComponent.isTagComponent = true;
function createType(typeDefinition) {
    var mandatoryFunctions = [
        "create",
        "reset",
        "clear"
    ];
    var undefinedFunctions = mandatoryFunctions.filter((f)=>{
        return !typeDefinition[f];
    });
    if (undefinedFunctions.length > 0) throw new Error(`createType expect type definition to implements the following functions: ${undefinedFunctions.join(", ")}`);
    typeDefinition.isType = true;
    return typeDefinition;
}
/**
 * Standard types
 */ var Types = {
};
Types.Number = createType({
    baseType: Number,
    isSimpleType: true,
    create: (defaultValue)=>{
        return typeof defaultValue !== "undefined" ? defaultValue : 0;
    },
    reset: (src, key, defaultValue)=>{
        if (typeof defaultValue !== "undefined") src[key] = defaultValue;
        else src[key] = 0;
    },
    clear: (src, key)=>{
        src[key] = 0;
    }
});
Types.Boolean = createType({
    baseType: Boolean,
    isSimpleType: true,
    create: (defaultValue)=>{
        return typeof defaultValue !== "undefined" ? defaultValue : false;
    },
    reset: (src, key, defaultValue)=>{
        if (typeof defaultValue !== "undefined") src[key] = defaultValue;
        else src[key] = false;
    },
    clear: (src, key)=>{
        src[key] = false;
    }
});
Types.String = createType({
    baseType: String,
    isSimpleType: true,
    create: (defaultValue)=>{
        return typeof defaultValue !== "undefined" ? defaultValue : "";
    },
    reset: (src, key, defaultValue)=>{
        if (typeof defaultValue !== "undefined") src[key] = defaultValue;
        else src[key] = "";
    },
    clear: (src, key)=>{
        src[key] = "";
    }
});
Types.Array = createType({
    baseType: Array,
    create: (defaultValue)=>{
        if (typeof defaultValue !== "undefined") return defaultValue.slice();
        return [];
    },
    reset: (src, key, defaultValue)=>{
        if (typeof defaultValue !== "undefined") src[key] = defaultValue.slice();
        else src[key].length = 0;
    },
    clear: (src, key)=>{
        src[key].length = 0;
    },
    copy: (src, dst, key)=>{
        src[key] = dst[key].slice();
    }
});
var standardTypes = {
    number: Types.Number,
    boolean: Types.Boolean,
    string: Types.String
};
/**
 * Try to infer the type of the value
 * @param {*} value
 * @return {String} Type of the attribute
 * @private
 */ function inferType(value) {
    if (Array.isArray(value)) return Types.Array;
    if (standardTypes[typeof value]) return standardTypes[typeof value];
    else return null;
}
function createComponentClass(schema, name) {
    //var Component = new Function(`return function ${name}() {}`)();
    for(let key4 in schema){
        let type = schema[key4].type;
        if (!type) schema[key4].type = inferType(schema[key4].default);
    }
    var Component = function() {
        for(let key in schema){
            var attr = schema[key];
            let type = attr.type;
            if (type && type.isType) this[key] = type.create(attr.default);
            else this[key] = attr.default;
        }
    };
    if (typeof name !== "undefined") Object.defineProperty(Component, "name", {
        value: name
    });
    Component.prototype.schema = schema;
    var knownTypes = true;
    for(let key1 in schema){
        var attr1 = schema[key1];
        if (!attr1.type) attr1.type = inferType(attr1.default);
        var type1 = attr1.type;
        if (!type1) {
            console.warn(`Unknown type definition for attribute '${key1}'`);
            knownTypes = false;
        }
    }
    if (!knownTypes) {
        console.warn(`This component can't use pooling because some data types are not registered. Please provide a type created with 'createType'`);
        for(var key2 in schema){
            let attr = schema[key2];
            Component.prototype[key2] = attr.default;
        }
    } else {
        Component.prototype.copy = function(src) {
            for(let key in schema)if (src[key]) {
                let type = schema[key].type;
                if (type.isSimpleType) this[key] = src[key];
                else if (type.copy) type.copy(this, src, key);
                else // @todo Detect that it's not possible to copy all the attributes
                // and just avoid creating the copy function
                console.warn(`Unknown copy function for attribute '${key}' data type`);
            }
        };
        Component.prototype.reset = function() {
            for(let key in schema){
                let attr = schema[key];
                let type = attr.type;
                if (type.reset) type.reset(this, key, attr.default);
            }
        };
        Component.prototype.clear = function() {
            for(let key in schema){
                let type = schema[key].type;
                if (type.clear) type.clear(this, key);
            }
        };
        for(let key3 in schema){
            let attr = schema[key3];
            let type = attr.type;
            Component.prototype[key3] = attr.default;
            if (type.reset) type.reset(Component.prototype, key3, attr.default);
        }
    }
    return Component;
}
function generateId(length) {
    var result = "";
    var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    var charactersLength = characters.length;
    for(var i = 0; i < length; i++)result += characters.charAt(Math.floor(Math.random() * charactersLength));
    return result;
}
function injectScript(src, onLoad) {
    var script = document.createElement("script");
    // @todo Use link to the ecsy-devtools repo?
    script.src = src;
    script.onload = onLoad;
    (document.head || document.documentElement).appendChild(script);
}
/* global Peer */ function hookConsoleAndErrors(connection) {
    var wrapFunctions = [
        "error",
        "warning",
        "log"
    ];
    wrapFunctions.forEach((key)=>{
        if (typeof console[key] === "function") {
            var fn = console[key].bind(console);
            console[key] = (...args)=>{
                connection.send({
                    method: "console",
                    type: key,
                    args: JSON.stringify(args)
                });
                return fn.apply(null, args);
            };
        }
    });
    window.addEventListener("error", (error)=>{
        connection.send({
            method: "error",
            error: JSON.stringify({
                message: error.error.message,
                stack: error.error.stack
            })
        });
    });
}
function includeRemoteIdHTML(remoteId) {
    let infoDiv = document.createElement("div");
    infoDiv.style.cssText = `
    align-items: center;
    background-color: #333;
    color: #aaa;
    display:flex;
    font-family: Arial;
    font-size: 1.1em;
    height: 40px;
    justify-content: center;
    left: 0;
    opacity: 0.9;
    position: absolute;
    right: 0;
    text-align: center;
    top: 0;
  `;
    infoDiv.innerHTML = `Open ECSY devtools to connect to this page using the code:&nbsp;<b style="color: #fff">${remoteId}</b>&nbsp;<button onClick="generateNewCode()">Generate new code</button>`;
    document.body.appendChild(infoDiv);
    return infoDiv;
}
function enableRemoteDevtools(remoteId) {
    if (!hasWindow) {
        console.warn("Remote devtools not available outside the browser");
        return;
    }
    window.generateNewCode = ()=>{
        window.localStorage.clear();
        remoteId = generateId(6);
        window.localStorage.setItem("ecsyRemoteId", remoteId);
        window.location.reload(false);
    };
    remoteId = remoteId || window.localStorage.getItem("ecsyRemoteId");
    if (!remoteId) {
        remoteId = generateId(6);
        window.localStorage.setItem("ecsyRemoteId", remoteId);
    }
    let infoDiv = includeRemoteIdHTML(remoteId);
    window.__ECSY_REMOTE_DEVTOOLS_INJECTED = true;
    window.__ECSY_REMOTE_DEVTOOLS = {
    };
    let Version = "";
    // This is used to collect the worlds created before the communication is being established
    let worldsBeforeLoading = [];
    let onWorldCreated = (e)=>{
        var world = e.detail.world;
        Version = e.detail.version;
        worldsBeforeLoading.push(world);
    };
    window.addEventListener("ecsy-world-created", onWorldCreated);
    let onLoaded = ()=>{
        var peer = new Peer(remoteId);
        peer.on("open", ()=>{
            peer.on("connection", (connection)=>{
                window.__ECSY_REMOTE_DEVTOOLS.connection = connection;
                connection.on("open", function() {
                    // infoDiv.style.visibility = "hidden";
                    infoDiv.innerHTML = "Connected";
                    // Receive messages
                    connection.on("data", function(data) {
                        if (data.type === "init") {
                            var script = document.createElement("script");
                            script.setAttribute("type", "text/javascript");
                            script.onload = ()=>{
                                script.parentNode.removeChild(script);
                                // Once the script is injected we don't need to listen
                                window.removeEventListener("ecsy-world-created", onWorldCreated);
                                worldsBeforeLoading.forEach((world)=>{
                                    var event = new CustomEvent("ecsy-world-created", {
                                        detail: {
                                            world: world,
                                            version: Version
                                        }
                                    });
                                    window.dispatchEvent(event);
                                });
                            };
                            script.innerHTML = data.script;
                            (document.head || document.documentElement).appendChild(script);
                            script.onload();
                            hookConsoleAndErrors(connection);
                        } else if (data.type === "executeScript") {
                            let value = eval(data.script);
                            if (data.returnEval) connection.send({
                                method: "evalReturn",
                                value: value
                            });
                        }
                    });
                });
            });
        });
    };
    // Inject PeerJS script
    injectScript("https://cdn.jsdelivr.net/npm/peerjs@0.3.20/dist/peer.min.js", onLoaded);
}
if (hasWindow) {
    const urlParams = new URLSearchParams(window.location.search);
    // @todo Provide a way to disable it if needed
    if (urlParams.has("enable-remote-devtools")) enableRemoteDevtools();
}

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

},{}],"eJ39T":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Position", ()=>Position
);
var _ecsy = require("ecsy");
const Position = _ecsy.createComponentClass({
    x: {
        default: 0
    },
    y: {
        default: 0
    },
    rotation: {
        default: 0
    }
}, "Position");

},{"ecsy":"9qAY6","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"haevn":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Motion", ()=>Motion
);
var _ecsy = require("ecsy");
const Motion = _ecsy.createComponentClass({
    x: {
        default: 0
    },
    y: {
        default: 0
    },
    angularVelocity: {
        default: 0
    },
    damping: {
        default: 0
    }
}, "Motion");

},{"ecsy":"9qAY6","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}]},["diaDU","3wyMm"], "3wyMm", "parcelRequire8bbd")

//# sourceMappingURL=index.133a4809.js.map
