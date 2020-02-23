// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
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

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
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
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/ts/cvData.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cvData = {
  name: "Marko Medic",
  location: "Novi Sad, Serbia (GMT/UTC +1)",
  skills: ["HTML5", "CSS3", "SCSS", "JS", "TS", "REACT", "VUE", "NODE JS", "PHP", "WORDPRESS", "MySQL", "PHOTOSHOP..."],
  email: "marko.medic59@gmail.com",
  github: "https://github.com/Markorf",
  linkedIn: "https://linkedin.com/in/marko-medic-119b99130"
};
},{}],"C:/Users/marko/AppData/Roaming/npm/node_modules/parcel/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"C:/Users/marko/AppData/Roaming/npm/node_modules/parcel/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"C:/Users/marko/AppData/Roaming/npm/node_modules/parcel/src/builtins/bundle-url.js"}],"src/scss/style.scss":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"C:/Users/marko/AppData/Roaming/npm/node_modules/parcel/src/builtins/css-loader.js"}],"src/ts/app.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var cvData_1 = require("./cvData");

require("../scss/style.scss");

var mainOl = document.querySelector("#cvList");
var mainFooter = document.querySelector(".main-footer");
var aboutSection = mainFooter.querySelector("section.about");
var closeIcons = mainFooter.querySelectorAll(".close-icon");

function aboutMe() {
  return toggleVisibility(aboutSection);
}

function contactMe() {
  location.href = "mailto:marko.medic59@gmail.com?subject=Your title&body=Your message";
}

function getResume() {
  window.open("https://drive.google.com/u/0/uc?id=1n_5Zlz1NVtOFiq7Xh94i6UWiiihhojAi&export=download");
}

function toggleVisibility(currentElement) {
  var _a, _b;

  if (currentElement.classList.contains("invisible")) {
    currentElement.classList.remove("invisible");
    (_a = currentElement.parentElement) === null || _a === void 0 ? void 0 : _a.classList.remove("hidden");
  } else {
    currentElement.classList.add("invisible");
    (_b = currentElement.parentElement) === null || _b === void 0 ? void 0 : _b.classList.add("hidden");
  }
}

function getNewCV(passedData) {
  var newObject = Object.assign({}, passedData);
  newObject.getResume = getResume;
  newObject.aboutMe = aboutMe;
  newObject.contactMe = contactMe;

  for (var propName in newObject) {
    appendData(propName, newObject);
  }

  return newObject;
}

var newData = getNewCV(cvData_1.cvData);
createLastListElement();

function appendData(propName, passedData) {
  var liElement = document.createElement("li");
  var leftDiv = document.createElement("div");
  leftDiv.classList.add("divForName");
  leftDiv.textContent = String(propName) + ":"; // razmak

  var rightDiv = document.createElement("div");
  rightDiv.classList.add("divForValue");
  var textForDiv = getTextValue(liElement, passedData, propName);
  rightDiv.innerHTML = textForDiv;
  liElement.appendChild(leftDiv);
  liElement.appendChild(rightDiv);

  if (mainOl instanceof Element) {
    mainOl.appendChild(liElement);
  } else {
    console.warn("".concat(mainOl, " is not element"));
  }
}

function getTextValue(currentListEl, passedData, passedName) {
  var currentValue = passedData[passedName];

  if (typeof currentValue == "string") {
    if (currentValue.startsWith("https") || currentValue.startsWith("www")) {
      return "<a target=\"_blank\" href=".concat(currentValue, ">\"").concat(currentValue, "\",</a>");
    }

    return "\"".concat(currentValue, ",\"");
  } else if (Array.isArray(currentValue)) {
    currentListEl.classList.add("arrayClass");
    var arrWithStrings = currentValue.map(function (skil) {
      return " \"".concat(skil, "\"");
    });
    return "[".concat(arrWithStrings, "],");
  } else if (typeof currentValue == "function") {
    currentListEl.style.cursor = "pointer";
    currentListEl.classList.add("functionClass");

    if (passedName === "aboutMe") {
      currentListEl.addEventListener("click", function () {
        passedData.aboutMe();
      });
    } else if (passedName === "contactMe") {
      currentListEl.addEventListener("click", function () {
        passedData.contactMe();
      });
    } else if (passedName === "getResume") {
      currentListEl.addEventListener("click", function () {
        passedData.getResume();
      });
    }

    return "{...},";
  } else {
    return "\"".concat(String(currentValue), "\",");
  }
}

function createLastListElement() {
  var lastLiElement = document.createElement("li");
  var spanElement = document.createElement("span");
  spanElement.textContent = "};";
  spanElement.classList.add("colored");
  lastLiElement.appendChild(spanElement);
  mainOl.appendChild(lastLiElement);
}

var hideElement = function hideElement(e) {
  var _a;

  var elem = e.target;
  (_a = elem.parentElement) === null || _a === void 0 ? void 0 : _a.classList.add("invisible");
  mainFooter.classList.contains("hidden") ? mainFooter.classList.remove("hidden") : mainFooter.classList.add("hidden");
};

closeIcons === null || closeIcons === void 0 ? void 0 : closeIcons.forEach(function (closeIcon) {
  return closeIcon.addEventListener("click", function (e) {
    return hideElement(e);
  });
});
},{"./cvData":"src/ts/cvData.ts","../scss/style.scss":"src/scss/style.scss"}],"C:/Users/marko/AppData/Roaming/npm/node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "56386" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["C:/Users/marko/AppData/Roaming/npm/node_modules/parcel/src/builtins/hmr-runtime.js","src/ts/app.ts"], null)
//# sourceMappingURL=/app.059ad2b5.js.map