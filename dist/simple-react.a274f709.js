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
})({"E7Fp":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createVNode = createVNode;
exports.default = createElement;

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

// 创建一个虚拟dom
function createVNode(type, props, ref, key, children, domElm, text) {
  return {
    type: type,
    //标签类型
    props: props,
    //标签属性
    children: children,
    //子组件
    ref: ref,
    //获取DOM元素
    key: key,
    //唯一标识
    domElm: domElm,
    //DOM元素
    text: text //文本内容

  };
}

function createElement(tag) {
  var type = tag.elementName,
      data = tag.attributes,
      children = tag.children;

  var key = data.key,
      ref = data.ref,
      props = _objectWithoutProperties(data, ["key", "ref"]); // 处理子级列表中的 string or number 同样转换为 VNode


  if (children && children.length) {
    var length = children.length;

    for (var i = 0; i < length; i++) {
      var child = children[i]; //对每一个子节点进行遍历

      if (['string', 'number'].includes(_typeof(child))) {
        // 非标签的文字节点， vnode.type === undefined
        children[i] = createVNode(undefined, {}, undefined, undefined, undefined, undefined, String(children[i]));
      }
    }
  }

  return createVNode(type, props, ref, key, children, undefined, undefined);
}
},{}],"FhTM":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*
* 原生dom操作
* */
var dom = {
  //根据vnode.type创建dom元素
  createElement: function createElement(vnode) {
    return document.createElement(vnode.type);
  },
  //创建text节点
  createTextNode: function createTextNode(text) {
    return document.createTextNode(text);
  },
  //修改文本节点的值
  setTextContent: function setTextContent(domElm, content) {
    if (domElm && ['string', 'number'].includes(_typeof(content))) {
      domElm.nodeValue = content;
    }
  },
  //得到父元素
  getParentNode: function getParentNode(elm) {
    return elm && elm.parentNode;
  },
  //增加子元素
  appendChild: function appendChild(parent, child) {
    // 若在JSX中渲染列表，则需要批量处理。
    if (Array.isArray(child)) {
      var _iterator = _createForOfIteratorHelper(child),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var item = _step.value;
          parent.appendChild(item);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    } else {
      parent.appendChild(child);
    }
  },
  //删除指定子元素
  removeChild: function removeChild(parent, child) {
    if (child && parent && child.parentNode) {
      parent.removeChild(child);
    }
  },
  //获取兄弟元素
  getNextSibling: function getNextSibling(domElm) {
    return domElm.nextSibling === null ? false : domElm.nextSibling;
  },
  //在前边插入节点
  insertBefore: function insertBefore(parent, newNode, refNode) {
    if (refNode) {
      parent.insertBefore(newNode, refNode);
    } else {
      dom.appendChild(parent, newNode);
    }
  },
  //在dom后边插入新dom
  insertAfter: function insertAfter(parent, newNode, before) {
    if (parent.lastChild === before) {
      parent.appendChild(newNode);
    } else {
      parent.insertBefore(newNode, before);
    }
  },
  //绑定一个或多个class
  addClass: function addClass(domElm, classList) {
    var _domElm$classList;

    if (typeof classList === 'string') domElm.classList.add(classList);else if (Array.isArray(classList)) (_domElm$classList = domElm.classList).add.apply(_domElm$classList, _toConsumableArray(classList));
  },
  //绑定事件
  bindEvent: function bindEvent(domElm, type, fn) {
    domElm.addEventListener(type, fn);
  },
  //解绑事件
  removeEvent: function removeEvent(domElm, type, fn) {
    domElm.removeEventListener(type, fn);
  },
  //设置属性
  setAttr: function setAttr(domElm, key, value) {
    domElm.setAttribute(key, value);
  },
  //删除属性
  removeAttr: function removeAttr(domElm, key) {
    domElm.removeAttribute(key);
  },
  //删除一个或多个class
  removeClass: function removeClass(domElm, className) {
    var _domElm$classList2;

    if (typeof className === 'string') domElm.class.remove(className);else if (Array.isArray(className)) (_domElm$classList2 = domElm.classList).remove.apply(_domElm$classList2, _toConsumableArray(className));
  }
};
var _default = dom;
exports.default = _default;
},{}],"GEjr":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.triggerHook = triggerHook;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/*
* hooks:
*   create  //创建后
*   insert  //挂载后
*   willupdate  //更新前
*   update  //更新后
*   willremove  //卸载前
* */
function triggerHook(vnode, name) {
  if (!Array.isArray(vnode)) {
    var _hooks = vnode.hooks;
    var hook;

    if (_hooks) {
      hook = _hooks[name];
      hook && hook(vnode);
    }
  } else {
    for (var i = 0; i <= vnode.length; i++) {
      var _hooks2 = vnode[i].hooks;

      var _hook = void 0;

      if (_hooks2) {
        _hook = _hooks2[name];
        _hook && _hook.apply(void 0, _toConsumableArray(vnode[i]));
      }
    }
  }
}
},{}],"QABK":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createDomElement = createDomElement;
exports.setDomProps = setDomProps;
exports.renderComponent = renderComponent;
exports.default = render;

var _dom = _interopRequireDefault(require("../utils/dom"));

var _lifeCycle = require("../main_methods/lifeCycle");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

// 创建dom元素：虚拟dom => dom
function createDomElement(vnode) {
  //若type为function：组件元素
  //先render出vnode节点
  if (Array.isArray(vnode)) {
    //如果是vnode是列表，则批量创建dom，并返回dom列表
    var list = [];

    for (var i = 0; i < vnode.length; i++) {
      list.push(createDomElement(vnode[i]));
    }

    return list;
  } else {
    if (typeof vnode.type === 'function') {
      /**********    组件 ==> 组件实例 ==> 元素节点（elVNode）    ***********/
      vnode = renderComponent(vnode);
    }

    var _vnode = vnode,
        children = _vnode.children,
        type = _vnode.type,
        text = _vnode.text,
        props = _vnode.props;

    if (type && typeof type === 'string') {
      //type为字符串：dom元素
      vnode.domElm = _dom.default.createElement(vnode); //创建当前dom元素
      // triggerHook(vnode, 'create');

      if (Array.isArray(children)) {
        //递归创建子元素
        for (var _i = 0; _i < children.length; _i++) {
          var newDom = createDomElement(children[_i]);

          _dom.default.appendChild(vnode.domElm, newDom);

          (0, _lifeCycle.triggerHook)(Array.isArray(newDom) ? newDom[0].vnode : newDom.vnode, 'insert');
        }
      }
    } else if ((type === undefined || type === null) && text) {
      //type为undefined：文本节点
      vnode.domElm = _dom.default.createTextNode(text);
    }

    if (vnode.domElm) {
      //如果创建成功了，则设置dom元素的属性
      setDomProps(vnode.domElm, props);
      vnode.domElm.vnode = vnode; //为dom元素记录下创造它的vnode

      return vnode.domElm; //将创建的dom元素 和 insert周期 同时返回
    } else {
      //创建失败，则renderComponent后的vnode依然是组件节点，需要递归render
      return createDomElement(vnode);
    }
  }
} // 为dom元素设置属性


function setDomProps(domElm, props) {
  if (domElm && _typeof(props) === 'object') {
    var keys = Object.keys(props);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      var value = props[key];

      if (key.startsWith('on')) {
        // 事件绑定
        if (typeof value === 'function') {
          var eventName = key.substring(2).toLowerCase(); // 去出on之后的字符串并转换为小写

          _dom.default.bindEvent(domElm, eventName, value);
        } else {
          console.log('Invalid EventHandler');
        }
      } else if (key === 'className' && typeof value === 'string') {
        // 添加class
        var classList = value.split(" ").filter(function (v) {
          return v !== "";
        });

        _dom.default.addClass(domElm, classList);
      } else {
        // 属性设置
        _dom.default.setAttr(domElm, key, value);
      }
    }
  }
}
/**********    组件 ==> 组件实例 ==> 元素节点（elVNode）    ***********/


function renderComponent(compVNode) {
  var Comp = compVNode.type,
      props = compVNode.props; //compVNode：组件； instance：组件实例。  vnode：元素节点；

  var instance = compVNode.instance; // 当 instance 已经存在时，则不需要重新创建实例

  if (!instance) {
    // 传入 props，初始化组件实例
    // 支持：类组件、函数组件
    if (Comp.prototype && Comp.prototype.render) {
      instance = new Comp(props);
    } // 初次渲染时：将来的属性与状态其实便是与当前值一致


    instance.__nextProps = props;
    instance.__nextState = instance.state;
  } // 调用 render 获取元素节点 VNode


  var vnode = instance.__createVNode(); //class继承


  if (props.className) vnode.props.className = props.className; // 组件、元素、实例之间保持相互引用，有利于双向连接整棵虚拟树

  instance.__component = compVNode; //组件

  compVNode.instance = instance; //组件实例

  compVNode.vnode = vnode; //元素节点

  vnode.component = compVNode; //组件

  return vnode;
} // 渲染函数


function render(vnode, parentDom) {
  var domElm = createDomElement(vnode); //创建dom元素（可能是dom元素列表）

  _dom.default.appendChild(parentDom, domElm); //将dom元素插入父节点


  (0, _lifeCycle.triggerHook)(domElm.vnode, 'insert');
  return domElm;
}
},{"../utils/dom":"FhTM","../main_methods/lifeCycle":"GEjr"}],"Fq0C":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.diff = diff;

var _dom = _interopRequireDefault(require("../utils/dom"));

var _render = require("./render");

var _lifeCycle = require("../main_methods/lifeCycle");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

//新旧节点相同：diff算法
function diff(oldVNode, newVNode) {
  if (isSameVNode(oldVNode, newVNode)) {
    if (typeof oldVNode.type === 'function') {
      // 组件节点
      diffComponent(oldVNode, newVNode);
    } else {
      // 元素节点，直接执行比对
      diffVNode(oldVNode, newVNode);
    }
  } else {
    console.log('not same vnode');
    replaceVNode(oldVNode, newVNode);
  }
} //组件节点diff


function diffComponent(oldCompVNode, newCompVNode) {
  var instance = oldCompVNode.instance,
      oldVNode = oldCompVNode.vnode,
      elm = oldCompVNode.elm;
  var nextProps = newCompVNode.props;

  if (instance && oldVNode) {
    instance.__dirty = false; // 更新状态和属性

    instance.__nextProps = nextProps;
    if (!instance.__nextState) instance.__nextState = instance.state; // 复用旧组件实例和元素

    newCompVNode.instance = instance;
    newCompVNode.elm = elm; // 使用新属性、新状态，旧组件实例
    // 重新生成 新虚拟DOM

    var newVNode = (0, _render.renderComponent)(newCompVNode); // 递归触发 diff

    diff(oldVNode, newVNode);
  }
} //元素节点diff


function diffVNode(oldVNode, newVNode) {
  var domElm = oldVNode.domElm,
      oldChild = oldVNode.children,
      oldText = oldVNode.text,
      oldProps = oldVNode.props;
  var newChild = newVNode.children,
      newText = newVNode.text,
      newProps = newVNode.props;
  if (oldVNode === newVNode || !domElm) return;
  (0, _lifeCycle.triggerHook)(newVNode, 'willupdate'); // 节点相同，dom类型一定相同

  newVNode.domElm = domElm; //更新属性

  diffProps(domElm, oldProps, newProps);
  var hasOldChild = Boolean(oldChild && oldChild.length);
  var hasNewChild = Boolean(newChild && newChild.length);

  if (newText !== undefined) {
    //新节点是文本节点
    _dom.default.setTextContent(domElm, newText);
  } else {
    // 新节点是元素节点
    if (hasOldChild && hasNewChild) {
      // 新旧节点均存在子级列表时，直接 diff 列表
      if (oldChild !== newChild) diffChildren(domElm, oldChild, newChild);
    } else if (hasNewChild) {
      // 旧节点不包含子级，而新节点包含子级：直接新增新子级
      addVNodes(domElm, null, newChild, 0, newChild.length - 1);
    } else if (hasOldChild) {
      // 新子级不包含元素，而旧节点包含子级：则需要删除旧子级
      removeVNodes(domElm, oldChild, 0, oldChild.length - 1);
    }
  }

  (0, _lifeCycle.triggerHook)(newVNode, 'update');
} //新旧节点不同：直接替换


function replaceVNode(oldVNode, newVNode) {
  var oldDomElm = oldVNode.domElm;

  var parentDom = _dom.default.getParentNode(oldDomElm);

  console.log(oldVNode, newVNode);
  (0, _lifeCycle.triggerHook)(oldDomElm, 'willremove'); //删除旧dom

  _dom.default.removeChild(parentDom, oldDomElm); //创建新dom


  var newDomElm = (0, _render.createDomElement)(newVNode);

  _dom.default.appendChild(parentDom, newDomElm);

  (0, _lifeCycle.triggerHook)(newDomElm.vnode, 'insert');
}

function diffProps(domElm, oldProps, newProps) {
  if (oldProps === newProps || !domElm) return;

  if (_typeof(oldProps) === 'object' && _typeof(newProps) === 'object') {
    var keys = Object.keys(oldProps); //处理旧属性

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      var oldV = oldProps[key],
          newV = newProps[key];

      if (key.startsWith("on")) {
        //处理事件
        if (typeof oldV === 'function' && oldV !== newV) {
          //当存在旧事件，且新旧值不一致时：事件解绑
          //由于检测逻辑是对比函数地址，所以不支持行内使用：
          //      onClick={()=>{...}} 或 onClick={this.fn.bind(this)}
          //因为以上写法会生成新的函数导致无法对比
          var eventName = key.substring(2).toLowerCase();

          _dom.default.removeEvent(domElm, eventName, oldV);
        }
      } else {
        //普通属性处理
        if (newV === undefined) {
          // 若oldVNode中的属性在newVNode中不存在，则直接删除
          _dom.default.removeAttr(domElm, key === 'className' ? 'class' : key);
        } else if (key === 'className' && typeof newV === 'string') {
          (function () {
            var oldList = oldV.split(" ");
            var newList = newV.split(" ");
            var delList = oldList.filter(function (v) {
              return !newList.includes(v);
            }).filter(function (v) {
              return v !== "";
            });

            _dom.default.removeClass(domElm, delList);
          })();
        }
      }
    } // 设置新属性


    (0, _render.setDomProps)(domElm, newProps);
  }
} //添加vnodes


function addVNodes(domElm, before, children, start, end) {
  before = !before ? null : before.domElm;

  for (var i = start; i <= end; i++) {
    var newDom = void 0;

    if (children[i].domElm) {
      newDom = children[i].domElm;

      _dom.default.insertAfter(domElm, newDom, before);
    } else {
      newDom = (0, _render.createDomElement)(children[i]);

      _dom.default.insertAfter(domElm, newDom, before);

      (0, _lifeCycle.triggerHook)(newDom.vnode, 'insert');
    }

    before = newDom;
  }
} //删除vnodes


function removeVNodes(domElm, children, start, end) {
  for (var i = start; i <= end; i++) {
    (0, _lifeCycle.triggerHook)(children[i], 'willremove');

    _dom.default.removeChild(domElm, children[i].domElm);
  }
} //对比子级列表


function diffChildren(parentElm, oldChild, newChild) {
  /**
   * 更新子级列表
   * 双列表游标 + while
   */
  if (Array.isArray(oldChild[0])) oldChild = oldChild[0];
  if (Array.isArray(newChild[0])) newChild = newChild[0]; // 初始化游标

  var oldStartIdx = 0,
      newStartIdx = 0;
  var oldEndIdx = oldChild.length - 1,
      newEndIdx = newChild.length - 1; // 列表首尾节点

  var oldStartVNode = oldChild[0],
      oldEndVNode = oldChild[oldEndIdx];
  var newStartVNode = newChild[0],
      newEndVNode = newChild[newEndIdx];
  var oldKeyToIdx, idxInOld, elmToMove, before;
  /**
   * 当起始游标 < 终止游标时，
   * 表示列表中仍有未 diff 的节点
   * 进入循环
   */

  while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
    /**
     * 1. 排除非有效的节点
     * 剔除列表中包含的 undefined || false || null
     */
    if (oldStartVNode == null) oldStartVNode = oldChild[++oldStartIdx];else if (oldEndVNode == null) oldEndVNode = oldChild[--oldEndIdx];else if (newStartVNode == null) newStartVNode = newChild[++newStartIdx];else if (newEndVNode == null) newEndVNode = newChild[--newEndIdx];else if (isSameVNode(oldStartVNode, newStartVNode)) {
      /**
       * 2. 正反向两两比对列表首项与末项匹配成功
       * 移动游标，递归 diff 两个节点
       * 均未匹配上，则进入 3. key 值比对
       */
      diff(oldStartVNode, newStartVNode);
      oldStartVNode = oldChild[++oldStartIdx];
      newStartVNode = newChild[++newStartIdx];
    } else if (isSameVNode(oldEndVNode, newEndVNode)) {
      diff(oldEndVNode, newEndVNode);
      oldEndVNode = oldChild[--oldEndIdx];
      newEndVNode = newChild[--newEndIdx];
    } else if (isSameVNode(oldStartVNode, newEndVNode)) {
      _dom.default.insertBefore(parentElm, oldStartVNode.domElm, _dom.default.getNextSibling(oldEndVNode.domElm));

      diff(oldStartVNode, newEndVNode);
      oldStartVNode = oldChild[++oldStartIdx];
      newEndVNode = newChild[--newEndIdx];
    } else if (isSameVNode(oldEndVNode, newStartVNode)) {
      _dom.default.insertBefore(parentElm, oldEndVNode.domElm, oldStartVNode.domElm);

      diff(oldEndVNode, newStartVNode);
      oldEndVNode = oldChild[--oldEndIdx];
      newStartVNode = newChild[++newStartIdx];
    } else {
      /**
       * 3. 两端比对均不匹配
       * 进入 key 值比对
       */
      // 根据剩余的旧列表创建 key list
      if (!oldKeyToIdx) oldKeyToIdx = createKeyList(oldChild, oldStartIdx, oldEndIdx); // 判断新列表项的 key值 是否存在

      idxInOld = oldKeyToIdx[newStartVNode.key || ''];

      if (!idxInOld) {
        /*
         * 4. 新 key 值在旧列表中不存在
         * 直接将该节点插入
        */
        var newDom = (0, _render.createDomElement)(newStartVNode);

        _dom.default.insertBefore(parentElm, newDom, oldStartVNode.domElm);

        (0, _lifeCycle.triggerHook)(newDom.vnode, 'insert');
        newStartVNode = newChild[++newStartIdx];
      } else {
        /*
        * 5. 新 key 在旧列表中存在时
        * 继续判断是否为同类型节点
        */
        elmToMove = oldChild[idxInOld];

        if (isSameVNode(elmToMove, newStartVNode)) {
          /*
          * 6. 新旧节点类型一致
          * key 有效，直接移动并 diff
          */
          _dom.default.insertBefore(parentElm, elmToMove.domElm, oldStartVNode.domElm);

          diff(elmToMove, newStartVNode); // 清空旧列表项
          // 后续的比对可以直接跳过

          oldChild[idxInOld] = undefined;
        } else {
          /*
           * 7. 新旧节点类型不一致
           * key 效，直接创建元素并插入
          */
          var _newDom = (0, _render.createDomElement)(newStartVNode);

          _dom.default.insertBefore(parentElm, _newDom, oldStartVNode.domElm);

          (0, _lifeCycle.triggerHook)(_newDom.vnode, 'insert');
        }

        newStartVNode = newChild[++newStartIdx];
      }
    }
  }
  /*
   * 8. 当有游标列表为空时，则结束循环，进入策略3
   * 当 旧列表为空 时，则创建并插入新列表中的剩余节点
   * 当 新列表为空 时，则删除旧列表中的剩余节点
  */


  if (oldStartIdx <= oldEndIdx || newStartIdx <= newEndIdx) {
    if (oldStartIdx > oldEndIdx) {
      // 新增节点
      var vnode = newChild[newEndIdx + 1];
      addVNodes(parentElm, vnode, newChild, newStartIdx, newEndIdx);
    } else {
      // 删除节点
      removeVNodes(parentElm, oldChild, oldStartIdx, oldEndIdx);
    }
  }
} // 对比两vnode是否是相同的


function isSameVNode(oldVNode, newVNode) {
  return oldVNode.key === newVNode.key && oldVNode.type === newVNode.type;
} //工具函数 创建key列表


function createKeyList(children, start, end) {
  var map = {};

  for (var i = start; i <= end; i++) {
    var key = children[i].key;
    if (key) map[key] = i;
  }

  return map;
}
},{"../utils/dom":"FhTM","./render":"QABK","../main_methods/lifeCycle":"GEjr"}],"gvwW":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.enqueueRender = enqueueRender;

var defer = function defer(fn) {
  Promise.resolve().then(fn);
}; //微任务 不阻塞宏任务（渲染等


var updateQueue = []; // 队列更新 API

function enqueueRender(updater) {
  // 将所有 updater 同步推入更新队列中
  // 为实例添加一个属性 __dirty，标识是否处于待更新状态
  // 初始 和 更新完毕，该值会被置为 false
  // 推入队列时，标记为 true
  if (!updater.__dirty && (updater.__dirty = true) && updateQueue.push(updater) === 1) {
    // 异步化冲洗队列
    // 最终只执行一次冲洗
    defer(flushRenderQueue);
  }
} // 合并一次循环中多次 updater


function flushRenderQueue() {
  if (updateQueue.length) {
    // 排序更新队列
    updateQueue.sort(); // 循环队列出栈

    var curUpdater = updateQueue.pop();

    while (curUpdater) {
      // 当组件处于 待更新态 时，触发组件更新
      // 如果该组件已经被更新完毕，则该状态为 false
      // 则后续的更新均不再执行
      if (curUpdater.__dirty) {
        // 调用组件自身的更新函数
        curUpdater.__update(); // 执行 callback


        flushCallback(curUpdater);
      }

      curUpdater = updateQueue.pop();
    }
  }
} // 执行缓存在 updater.__setStateCallbacks 上的回调


function flushCallback(updater) {
  var callbacks = updater.__setStateCallbacks;
  var cbk;

  if (callbacks && callbacks.length) {
    while (cbk = callbacks.shift()) {
      cbk.call(updater);
    }
  }
}
},{}],"noHc":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _diff = require("../dom_methods/diff");

var _update = require("./update");

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Component = /*#__PURE__*/function () {
  _createClass(Component, [{
    key: "getSnapshotBeforeUpdate",
    //生命周期函数
    value: function getSnapshotBeforeUpdate(prevProps, prevState) {
      return undefined;
    } // 通过保持三份不同的时期的快照
    // 有利于对组件的状态及属性的管理和追踪
    // 属性
    // public __prevProps
    // public props = {}
    // public __nextProps
    // 状态
    // public __prevState
    // public state = {}
    // public __nextState
    // 储存当前组件渲染出的VNode
    // public __vnode
    // 储存组件节点
    // public __component

  }, {
    key: "componentDidMount",
    value: function componentDidMount() {}
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState, snapshot) {}
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {}
  }]);

  function Component(props) {
    var _this = this;

    _classCallCheck(this, Component);

    this.__hooks = {
      // 元素节点 创建时机
      create: function create() {},
      // 元素节点 插入时机，触发 didMount
      insert: function insert() {
        return _this.componentDidMount();
      },
      // 元素节点 更新之前，触发 getSnapshotBeforeUpdate
      willupdate: function willupdate(vnode) {
        _this.__snapshot = _this.getSnapshotBeforeUpdate(_this.__prevProps, _this.__prevState);
      },
      // 元素节点 更新之后， 触发 didUpdate
      update: function update(oldVNode, vnode) {
        _this.componentDidUpdate(_this.__prevProps, _this.__prevState, _this.__snapshot);

        _this.__snapshot = undefined;
      },
      // 元素节点 卸载之前， 触发 willUnmount
      willremove: function willremove(vnode) {
        return _this.componentWillUnmount();
      }
    };
    this.props = props;
    this.__setStateCallbacks = [];
  }

  _createClass(Component, [{
    key: "render",
    value: function render() {
      //由组件实例实现
      return null;
    }
  }, {
    key: "__createVNode",
    value: function __createVNode() {
      // 该方法用于封装重新执行 render 的逻辑
      // state 与 props 状态变更的逻辑
      this.__prevProps = this.props;
      this.__prevState = this.state;
      this.props = this.__nextProps;
      this.state = this.__nextState;
      this.__nextState = undefined;
      this.__nextProps = undefined; // 重新执行 render 生成 VNode

      this.__vnode = this.render(); //绑定生命周期

      this.__vnode.hooks = this.__hooks;
      return this.__vnode;
    } //更新state

  }, {
    key: "setState",
    value: function setState(operater, callback) {
      // 合并状态, 暂存于即将更新态中
      if (typeof operater === 'function') operater = operater(this.state, this.props); //setState帮你合并

      this.__nextState = _extends({}, this.state, operater); // 调用更新，并执行回调

      callback && this.__setStateCallbacks.push(callback);
      (0, _update.enqueueRender)(this);
    } //更新状态，调用diff

  }, {
    key: "__update",
    value: function __update() {
      // 临时存储 旧虚拟节点 (oldVNode)
      var oldVNode = this.__vnode;
      this.__nextProps = this.props;
      if (!this.__nextState) this.__nextState = this.state; // 重新生成 新虚拟节点(newVNode)

      this.__vnode = this.__createVNode(); // 调用 diff，更新 VNode

      (0, _diff.diff)(oldVNode, this.__vnode);
      this.__dirty = false;
    }
  }]);

  return Component;
}();

exports.default = Component;

function deepEqual(object1, object2) {
  var keys1 = Object.keys(object1);
  var keys2 = Object.keys(object2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (var index = 0; index < keys1.length; index++) {
    var val1 = object1[keys1[index]];
    var val2 = object2[keys2[index]];
    var areObjects = isObject(val1) && isObject(val2);

    if (areObjects && !deepEqual(val1, val2) || !areObjects && val1 !== val2) {
      return false;
    }
  }

  return true;
}

function isObject(object) {
  return object != null && _typeof(object) === 'object';
}
},{"../dom_methods/diff":"Fq0C","./update":"gvwW"}],"opxX":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _createElement = _interopRequireDefault(require("./main_methods/createElement"));

var _Component = _interopRequireDefault(require("./main_methods/Component"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SmpReact = {
  createElement: _createElement.default,
  Component: _Component.default
};
var _default = SmpReact;
exports.default = _default;
},{"./main_methods/createElement":"E7Fp","./main_methods/Component":"noHc"}],"Ki7F":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _render = _interopRequireDefault(require("./dom_methods/render"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SmpReactDom = {
  render: _render.default
};
var _default = SmpReactDom;
exports.default = _default;
},{"./dom_methods/render":"QABK"}],"EQHX":[function(require,module,exports) {

},{}],"H8l0":[function(require,module,exports) {
module.exports = "gamepad.80fea397.png";
},{}],"nikT":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _SmpReact = _interopRequireDefault(require("../../SmpReact/SmpReact"));

var _gamepad = _interopRequireDefault(require("../../assets/gamepad.png"));

require("./style.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var Header = /*#__PURE__*/function (_SmpReact$Component) {
  _inherits(Header, _SmpReact$Component);

  var _super = _createSuper(Header);

  function Header(props) {
    _classCallCheck(this, Header);

    return _super.call(this, props);
  }

  _createClass(Header, [{
    key: "render",
    value: function render() {
      var _this = this;

      return _SmpReact.default.createElement({
        elementName: "header",
        attributes: {
          className: "wrapper"
        },
        children: [_SmpReact.default.createElement({
          elementName: "div",
          attributes: {
            class: "box"
          },
          children: [_SmpReact.default.createElement({
            elementName: "img",
            attributes: {
              className: "logo",
              src: _gamepad.default,
              alt: ""
            },
            children: null
          }), _SmpReact.default.createElement({
            elementName: "div",
            attributes: {
              class: "textWrapper"
            },
            children: [_SmpReact.default.createElement({
              elementName: "div",
              attributes: {
                className: "leftTitle"
              },
              children: ["SmpReact"]
            }), _SmpReact.default.createElement({
              elementName: "div",
              attributes: {
                className: "tips"
              },
              children: ["powered by SmpReact"]
            })]
          })]
        }), _SmpReact.default.createElement({
          elementName: "div",
          attributes: {
            className: "buttons"
          },
          children: [_SmpReact.default.createElement({
            elementName: "div",
            attributes: {
              className: (this.props.page === 0 ? 'active' : '') + ' title pointer',
              onClick: function onClick() {
                return _this.props.setPage(0);
              }
            },
            children: ["Counter"]
          }), _SmpReact.default.createElement({
            elementName: "div",
            attributes: {
              className: (this.props.page === 1 ? 'active' : '') + ' title pointer',
              onClick: function onClick() {
                return _this.props.setPage(1);
              }
            },
            children: ["TodoList"]
          })]
        })]
      });
    }
  }]);

  return Header;
}(_SmpReact.default.Component);

exports.default = Header;
},{"../../SmpReact/SmpReact":"opxX","../../assets/gamepad.png":"H8l0","./style.css":"EQHX"}],"vyL3":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _SmpReact = _interopRequireDefault(require("../../SmpReact/SmpReact"));

require("./style.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var Footer = /*#__PURE__*/function (_SmpReact$Component) {
  _inherits(Footer, _SmpReact$Component);

  var _super = _createSuper(Footer);

  function Footer() {
    _classCallCheck(this, Footer);

    return _super.call(this);
  }

  _createClass(Footer, [{
    key: "render",
    value: function render() {
      return _SmpReact.default.createElement({
        elementName: "footer",
        attributes: {},
        children: [_SmpReact.default.createElement({
          elementName: "div",
          attributes: {
            className: "txt"
          },
          children: ["Oliver-ysq"]
        }), _SmpReact.default.createElement({
          elementName: "div",
          attributes: {
            className: "txt"
          },
          children: [_SmpReact.default.createElement({
            elementName: "a",
            attributes: {
              target: "_blank",
              href: "https://github.com/Oliver-Ysq"
            },
            children: ["https://github.com/Oliver-Ysq"]
          })]
        })]
      });
    }
  }]);

  return Footer;
}(_SmpReact.default.Component);

exports.default = Footer;
},{"../../SmpReact/SmpReact":"opxX","./style.css":"EQHX"}],"iR8q":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _SmpReact = _interopRequireDefault(require("../../SmpReact/SmpReact"));

require("./style.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var interval;

var Counter = /*#__PURE__*/function (_SmpReact$Component) {
  _inherits(Counter, _SmpReact$Component);

  var _super = _createSuper(Counter);

  function Counter(props) {
    var _this;

    _classCallCheck(this, Counter);

    _this = _super.call(this, props);
    _this.state = {
      canIclick: true,
      disabled: false,
      x: 0
    };
    _this.calc = _this.calc.bind(_assertThisInitialized(_this));
    _this.setInterval = _this.setInterval.bind(_assertThisInitialized(_this));
    _this.clearInterval = _this.clearInterval.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(Counter, [{
    key: "calc",
    value: function calc(e) {
      if (!this.state.canIclick) return;

      switch (parseInt(e.target.id)) {
        case 1:
          this.props.setN(this.props.n + 1);
          break;

        case 2:
          this.props.setN(this.props.n - 1);
          break;

        case 3:
          this.props.setN(this.props.n * 2);
          break;

        case 4:
          this.props.setN(0);
          break;

        default:
          throw new Error();
      }
    }
  }, {
    key: "clearInterval",
    value: function (_clearInterval) {
      function clearInterval() {
        return _clearInterval.apply(this, arguments);
      }

      clearInterval.toString = function () {
        return _clearInterval.toString();
      };

      return clearInterval;
    }(function () {
      if (!this.state.canIclick) {
        clearInterval(interval);
        console.log("定时器已关闭");
      }

      this.setState({
        canIclick: true,
        disabled: false
      });
    })
  }, {
    key: "setInterval",
    value: function (_setInterval) {
      function setInterval() {
        return _setInterval.apply(this, arguments);
      }

      setInterval.toString = function () {
        return _setInterval.toString();
      };

      return setInterval;
    }(function () {
      if (!this.state.canIclick) return false;
      var that = this;
      interval = setInterval(function () {
        that.props.setN(that.props.n + 1);
      }, 1000);
      this.setState({
        disabled: true,
        canIclick: false
      });
    })
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      console.log('Counter Mount！');
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      console.log('Counter unmount！');
    }
  }, {
    key: "render",
    value: function render() {
      return _SmpReact.default.createElement({
        elementName: "div",
        attributes: {
          className: "listWrapper maxH"
        },
        children: [_SmpReact.default.createElement({
          elementName: "div",
          attributes: {
            className: "display"
          },
          children: [this.props.n]
        }), _SmpReact.default.createElement({
          elementName: "div",
          attributes: {
            className: "btnWrapper"
          },
          children: [_SmpReact.default.createElement({
            elementName: "div",
            attributes: {},
            children: [_SmpReact.default.createElement({
              elementName: "button",
              attributes: {
                className: 'button ' + (this.state.disabled ? 'ban' : ''),
                id: 1,
                onClick: this.calc
              },
              children: ["+1"]
            }), _SmpReact.default.createElement({
              elementName: "button",
              attributes: {
                className: 'button ' + (this.state.disabled ? 'ban' : ''),
                id: 2,
                onClick: this.calc
              },
              children: ["-1"]
            }), _SmpReact.default.createElement({
              elementName: "button",
              attributes: {
                className: 'button ' + (this.state.disabled ? 'ban' : ''),
                id: 3,
                onClick: this.calc
              },
              children: ["\xD72"]
            }), _SmpReact.default.createElement({
              elementName: "button",
              attributes: {
                className: 'button ' + (this.state.disabled ? 'ban' : ''),
                id: 4,
                onClick: this.calc
              },
              children: ["clear"]
            })]
          }), _SmpReact.default.createElement({
            elementName: "div",
            attributes: {
              class: "secondLine"
            },
            children: [_SmpReact.default.createElement({
              elementName: "button",
              attributes: {
                className: "button",
                onClick: this.setInterval
              },
              children: ["setInterval"]
            }), _SmpReact.default.createElement({
              elementName: "button",
              attributes: {
                className: "button",
                onClick: this.clearInterval
              },
              children: ["clearInterval"]
            })]
          })]
        })]
      });
    }
  }]);

  return Counter;
}(_SmpReact.default.Component);

exports.default = Counter;
},{"../../SmpReact/SmpReact":"opxX","./style.css":"EQHX"}],"YvTQ":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _SmpReact = _interopRequireDefault(require("../../SmpReact/SmpReact"));

require("./style.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var TodoList = /*#__PURE__*/function (_SmpReact$Component) {
  _inherits(TodoList, _SmpReact$Component);

  var _super = _createSuper(TodoList);

  function TodoList(props) {
    var _this;

    _classCallCheck(this, TodoList);

    _this = _super.call(this, props);

    _this.handleAdd = function () {
      /*  箭头函数中的this相当于应用了闭包。
      *   由于箭头函数中没有this，所以在声明时绑定了this为所在词法环境中的this。
      *   this指向了组件实例。
      * */
      console.log(_assertThisInitialized(_this));
      var res = window.prompt('请输入待办事项');
      if (res === null || res === "") return;else {
        var list = _this.props.list;
        list.unshift({
          content: res,
          id: new Date().valueOf()
        });

        _this.props.setList(list);
      }
    };

    _this.handleDelete = _this.handleDelete.bind(_assertThisInitialized(_this));
    _this.handleFinish = _this.handleFinish.bind(_assertThisInitialized(_this));
    _this.handleAdd = _this.handleAdd.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(TodoList, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      console.log('todoList Mount！');
    }
  }, {
    key: "handleFinish",
    value: function handleFinish(e) {
      var list = this.props.list;
      var len = list.length,
          newList = [],
          finishItem;

      for (var i = 0; i < len; i++) {
        if (parseInt(list[i].id) === parseInt(e.target.id)) {
          if (list[i].done === true) return;
          list[i].done = true;
          finishItem = list[i];
        } else newList.push(list[i]);
      }

      newList.push(finishItem);
      this.props.setList(newList);
    }
  }, {
    key: "handleDelete",
    value: function handleDelete(e) {
      this.props.setList(this.props.list.filter(function (v) {
        return parseInt(v.id) !== parseInt(e.target.id);
      }));
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      return _SmpReact.default.createElement({
        elementName: "div",
        attributes: {
          className: "listWrapper todoWrapper"
        },
        children: [this.props.list.map(function (v) {
          return _SmpReact.default.createElement({
            elementName: "div",
            attributes: {
              key: v.id,
              className: "card"
            },
            children: [_SmpReact.default.createElement({
              elementName: "div",
              attributes: {
                className: (v.done ? 'finish-text' : '') + " card-content"
              },
              children: [v.content]
            }), _SmpReact.default.createElement({
              elementName: "div",
              attributes: {
                className: "card-btn"
              },
              children: [_SmpReact.default.createElement({
                elementName: "button",
                attributes: {
                  className: "btn finish-btn",
                  id: v.id,
                  onClick: _this2.handleFinish
                },
                children: ["\u5B8C\u6210"]
              }), _SmpReact.default.createElement({
                elementName: "button",
                attributes: {
                  className: "btn del-btn",
                  id: v.id,
                  onClick: _this2.handleDelete
                },
                children: ["\u5220\u9664"]
              })]
            })]
          });
        }), _SmpReact.default.createElement({
          elementName: "div",
          attributes: {
            className: "newItem",
            onClick: this.handleAdd
          },
          children: ["\u6DFB\u52A0"]
        })]
      });
    }
  }]);

  return TodoList;
}(_SmpReact.default.Component);

exports.default = TodoList;
},{"../../SmpReact/SmpReact":"opxX","./style.css":"EQHX"}],"DPRK":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _SmpReact = _interopRequireDefault(require("./src/SmpReact/SmpReact"));

require("./App.css");

var _Header = _interopRequireDefault(require("./src/components/Header/Header"));

var _Footer = _interopRequireDefault(require("./src/components/Footer/Footer"));

var _Counter = _interopRequireDefault(require("./src/components/Counter/Counter"));

var _TodoList = _interopRequireDefault(require("./src/components/TodoList/TodoList"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var App = /*#__PURE__*/function (_SmpReact$Component) {
  _inherits(App, _SmpReact$Component);

  var _super = _createSuper(App);

  function App() {
    var _this;

    _classCallCheck(this, App);

    _this = _super.call(this);
    _this.state = {
      n: 0,
      list: [{
        content: "周末去爬山！",
        id: 0,
        done: false
      }, {
        content: "周五收拾房间！",
        id: 1,
        done: false
      }],
      page: 0
    };

    _this.setN = function (newN) {
      _this.setState({
        n: newN
      });
    };

    _this.setPage = function (newPage) {
      _this.setState({
        page: newPage
      });
    };

    _this.setList = function (newList) {
      _this.setState({
        list: newList
      });
    };

    return _this;
  }

  _createClass(App, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      return _SmpReact.default.createElement({
        elementName: "div",
        attributes: {
          className: "page"
        },
        children: [_SmpReact.default.createElement({
          elementName: _Header.default,
          attributes: {
            setPage: function setPage(n) {
              return _this2.setPage(n);
            },
            page: this.state.page
          },
          children: null
        }), _SmpReact.default.createElement({
          elementName: "main",
          attributes: {},
          children: [_SmpReact.default.createElement({
            elementName: _Counter.default,
            attributes: {
              className: this.state.page === 1 ? 'none' : '',
              setN: function setN(n) {
                _this2.setN(n);
              },
              n: this.state.n
            },
            children: null
          }), _SmpReact.default.createElement({
            elementName: _TodoList.default,
            attributes: {
              className: this.state.page === 0 ? 'none' : '',
              list: this.state.list,
              setList: this.setList
            },
            children: null
          })]
        }), _SmpReact.default.createElement({
          elementName: _Footer.default,
          attributes: {},
          children: null
        })]
      });
    }
  }]);

  return App;
}(_SmpReact.default.Component);

exports.default = App;
},{"./src/SmpReact/SmpReact":"opxX","./App.css":"EQHX","./src/components/Header/Header":"nikT","./src/components/Footer/Footer":"vyL3","./src/components/Counter/Counter":"iR8q","./src/components/TodoList/TodoList":"YvTQ"}],"deHo":[function(require,module,exports) {
"use strict";

var _SmpReact = _interopRequireDefault(require("./src/SmpReact/SmpReact"));

var _SmpReactDom = _interopRequireDefault(require("./src/SmpReact/SmpReactDom"));

var _App = _interopRequireDefault(require("./App"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_SmpReactDom.default.render(_SmpReact.default.createElement({
  elementName: _App.default,
  attributes: {},
  children: null
}), document.getElementById("root"));
},{"./src/SmpReact/SmpReact":"opxX","./src/SmpReact/SmpReactDom":"Ki7F","./App":"DPRK"}]},{},["deHo"], null)
//# sourceMappingURL=simple-react.a274f709.js.map