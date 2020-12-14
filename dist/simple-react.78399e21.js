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
})({"src/SmpReact/main_methods/createElement.js":[function(require,module,exports) {
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
},{}],"src/SmpReact/utils/dom.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*
  原生dom操作
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
    parent.appendChild(child);
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
  //在后边插入节点
  insertAfter: function insertAfter(newNode, refNode) {
    var parent = refNode.parentNode;

    if (parent.lastChild === refNode) {
      parent.appendChild(newNode);
    } else {
      parent.insertBefore(newNode, refNode.nextSibling);
    }
  },
  //绑定class
  addClass: function addClass(domElm, className) {
    domElm.classList.add(className);
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
  }
};
var _default = dom;
exports.default = _default;
},{}],"src/SmpReact/dom_methods/render.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createDomElement = createDomElement;
exports.setDomProps = setDomProps;
exports.renderComponent = renderComponent;
exports.default = render;

var _dom = _interopRequireDefault(require("../utils/dom"));

var _createElement = require("../main_methods/createElement");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

// 创建dom元素：虚拟dom => dom
function createDomElement(vnode) {
  //type为function：组件元素
  //先render出vnode节点
  if (Array.isArray(vnode)) {
    //如果是vnode是列表，则为他们增加父节点
    vnode = (0, _createElement.createVNode)('div', undefined, undefined, undefined, vnode, undefined);
  }

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

    if (Array.isArray(children)) {
      //递归创建子元素
      for (var i = 0; i < children.length; i++) {
        _dom.default.appendChild(vnode.domElm, createDomElement(children[i]));
      }
    }
  } else if ((type === undefined || type === null) && text) {
    //type为undefined：文本节点
    vnode.domElm = _dom.default.createTextNode(text);
  }

  if (vnode.domElm) {
    //如果创建成功了，则设置dom元素的属性
    setDomProps(vnode.domElm, props);
    return vnode.domElm;
  } else {
    //创建失败，则renderComponent后的vnode依然是组件节点，需要递归rener
    return createDomElement(vnode);
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
          console.log('invalid eventHandler');
        }
      } else if (key === 'className') {
        // 添加class
        _dom.default.addClass(domElm, value);
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


  var vnode = instance.__createVNode(); // 组件、元素、实例之间保持相互引用，有利于双向连接整棵虚拟树


  instance.__component = compVNode; //组件

  compVNode.instance = instance; //组件实例

  compVNode.vnode = vnode; //元素节点

  vnode.component = compVNode; //组件

  return vnode;
} // 渲染函数


function render(vnode, parentDom) {
  var domElm = createDomElement(vnode); //创建dom元素

  _dom.default.appendChild(parentDom, domElm); //将dom元素插入父节点


  return domElm;
}
},{"../utils/dom":"src/SmpReact/utils/dom.js","../main_methods/createElement":"src/SmpReact/main_methods/createElement.js"}],"src/SmpReact/dom_methods/diff.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.diff = diff;

var _dom = _interopRequireDefault(require("../utils/dom"));

var _render = require("./render");

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
  if (oldVNode === newVNode || !domElm) return; // 节点相同，dom类型一定相同

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
    } // else if (oldText !== undefined) {
    // 当新旧均无子级
    // 这里有可能存在 <Text> 标签，且新内容为空
    // 因此直接清空旧元素文字
    // dom.setTextContent(domElm, '');
    // }

  }
} //新旧节点不同：直接替换


function replaceVNode(oldVNode, newVNode) {
  var oldDomElm = oldVNode.domElm;

  var parentDom = _dom.default.getParentNode(oldDomElm); //删除旧dom


  _dom.default.removeChild(parentDom, oldDomElm); //创建新dom


  var newDomElm = (0, _render.createDomElement)(newVNode);

  _dom.default.appendChild(parentDom, newDomElm);
}

function diffProps(domElm, oldProps, newProps) {
  if (oldProps === newProps || !domElm) return;

  if (_typeof(oldProps) === 'object' && _typeof(newProps) === 'object') {
    var keys = Object.keys(oldProps); //处理旧属性

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      var oldV = oldProps[key],
          newV = newProps[key];
      if (key === 'className' && oldV === 'ban') console.log(key, oldV, newV);

      if (key.startsWith("on")) {
        //处理事件
        if (typeof oldV === 'function' && oldV !== newV) {
          //当存在旧事件，且新旧值不一致时：事件解绑
          var eventName = key.substring(2).toLowerCase();

          _dom.default.removeEvent(domElm, eventName, oldV);
        }
      } else {
        //普通属性处理
        if (newV === undefined || key === 'className' && (newV === false || newV === null)) {
          // 若oldVNode中的属性在newVNode中不存在，则直接删除
          // class属性需要特殊处理
          _dom.default.removeAttr(domElm, key === 'className' ? 'class' : key);
        }
      }
    } // 设置新属性


    (0, _render.setDomProps)(domElm, newProps);
  }
} //添加vnodes


function addVNodes(domElm, before, children, start, end) {
  for (var i = 0; i < end - start; i++) {
    var newDom = children[i].domElm || (0, _render.createDomElement)(children[i]);

    _dom.default.insertAfter(newDom, before);

    before = newDom;
  }
} //删除vnodes


function removeVNodes(domElm, children, start, end) {
  for (var i = 0; i < end - start; i++) {
    _dom.default.removeChild(domElm, children[i]);
  }
} //对比子级列表


function diffChildren(parentElm, oldChild, newChild) {
  /**
   * 更新子级列表
   * 双列表游标 + while
   */
  // 初始化游标
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
      _dom.default.insertBefore(parent, oldEndVNode.domElm, oldStartVNode.domElm);

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
        _dom.default.insertBefore(parentElm, (0, _render.createDomElement)(newStartVNode), oldStartVNode.domElm);

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
          _dom.default.insertBefore(parentElm, (0, _render.createDomElement)(newStartVNode), oldStartVNode.domElm);
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
      before = vnode ? vnode.domElm : null;
      addVNodes(parentElm, before, newChild, newStartIdx, newEndIdx);
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

  for (var i = start; i <= end - start; i++) {
    var key = children[i].key;
    map[key] = true;
  }

  return map;
}
},{"../utils/dom":"src/SmpReact/utils/dom.js","./render":"src/SmpReact/dom_methods/render.js"}],"src/SmpReact/main_methods/update.js":[function(require,module,exports) {
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
      } // curUpdater.__dirty = false;


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
},{}],"src/SmpReact/main_methods/Component.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _diff = require("../dom_methods/diff");

var _update = require("./update");

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Component = /*#__PURE__*/function () {
  // 通过保持三份不同的时期的快照
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
  function Component(props) {
    _classCallCheck(this, Component);

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

      this.__vnode = this.render();
      return this.__vnode;
    } //更新state

  }, {
    key: "setState",
    value: function setState(operater, callback) {
      console.log('setstate'); // 合并状态, 暂存于即将更新态中

      if (typeof operater === 'function') {
        operater = operater(this.state, this.props);
      } //setState帮你合并


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
},{"../dom_methods/diff":"src/SmpReact/dom_methods/diff.js","./update":"src/SmpReact/main_methods/update.js"}],"src/SmpReact/SmpReact.js":[function(require,module,exports) {
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
},{"./main_methods/createElement":"src/SmpReact/main_methods/createElement.js","./main_methods/Component":"src/SmpReact/main_methods/Component.js"}],"src/SmpReact/SmpReactDom.js":[function(require,module,exports) {
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
},{"./dom_methods/render":"src/SmpReact/dom_methods/render.js"}],"node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
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
},{}],"node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
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
},{"./bundle-url":"node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"App.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"node_modules/parcel-bundler/src/builtins/css-loader.js"}],"src/assets/gamepad.png":[function(require,module,exports) {
module.exports = "/gamepad.1dac9da6.png";
},{}],"src/components/Header/style.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"node_modules/parcel-bundler/src/builtins/css-loader.js"}],"src/components/Header/Header.jsx":[function(require,module,exports) {
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
                className: "title"
              },
              children: ["Counter-Demo"]
            }), _SmpReact.default.createElement({
              elementName: "div",
              attributes: {
                className: "tips"
              },
              children: ["powered by SmpReact"]
            })]
          })]
        })]
      });
    }
  }]);

  return Footer;
}(_SmpReact.default.Component);

exports.default = Footer;
},{"../../SmpReact/SmpReact":"src/SmpReact/SmpReact.js","../../assets/gamepad.png":"src/assets/gamepad.png","./style.css":"src/components/Header/style.css"}],"src/components/Footer/style.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"node_modules/parcel-bundler/src/builtins/css-loader.js"}],"src/components/Footer/Footer.jsx":[function(require,module,exports) {
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
},{"../../SmpReact/SmpReact":"src/SmpReact/SmpReact.js","./style.css":"src/components/Footer/style.css"}],"src/components/Counter/style.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"node_modules/parcel-bundler/src/builtins/css-loader.js"}],"src/components/Counter/Counter.jsx":[function(require,module,exports) {
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

var Counter = /*#__PURE__*/function (_SmpReact$Component) {
  _inherits(Counter, _SmpReact$Component);

  var _super = _createSuper(Counter);

  function Counter(props) {
    _classCallCheck(this, Counter);

    return _super.call(this, props);
  }

  _createClass(Counter, [{
    key: "render",
    value: function render() {
      var _this = this;

      console.log(this.props.disabled);
      return _SmpReact.default.createElement({
        elementName: "div",
        attributes: {
          className: "listWrapper"
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
                className: this.props.disabled && 'ban',
                onClick: function onClick() {
                  return _this.props.add();
                }
              },
              children: ["+1"]
            }), _SmpReact.default.createElement({
              elementName: "button",
              attributes: {
                className: this.props.disabled && 'ban',
                onClick: function onClick() {
                  return _this.props.minus();
                }
              },
              children: ["-1"]
            }), _SmpReact.default.createElement({
              elementName: "button",
              attributes: {
                className: this.props.disabled && 'ban',
                onClick: function onClick() {
                  return _this.props.mult();
                }
              },
              children: ["\xD72"]
            }), _SmpReact.default.createElement({
              elementName: "button",
              attributes: {
                className: this.props.disabled && 'ban',
                onClick: function onClick() {
                  return _this.props.clear();
                }
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
                onClick: function onClick() {
                  return _this.props.setInterval();
                }
              },
              children: ["setInterval"]
            }), _SmpReact.default.createElement({
              elementName: "button",
              attributes: {
                onClick: function onClick() {
                  return _this.props.clearInterval();
                }
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
},{"../../SmpReact/SmpReact":"src/SmpReact/SmpReact.js","./style.css":"src/components/Counter/style.css"}],"App.jsx":[function(require,module,exports) {
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
      interval: null,
      flag: true,
      disabled: false
    };

    _this.calc = function (type) {
      switch (type) {
        case 0:
          _this.setState({
            n: _this.state.n + 1
          });

          break;

        case 1:
          _this.setState({
            n: _this.state.n - 1
          });

          break;

        case 2:
          _this.setState({
            n: 2 * _this.state.n
          });

          break;

        case 3:
          _this.setState({
            n: 0
          });

          break;

        default:
          throw new Error();
      }
    };

    _this.setInterval = function () {
      if (!_this.state.flag) return false;

      var that = _assertThisInitialized(_this);

      _this.setState({
        disabled: true,
        interval: setInterval(function () {
          that.setState({
            n: that.state.n + 1
          });
        }, 1000),
        flag: false
      });
    };

    _this.clearInterval = function () {
      if (_this.state.flag === false) {
        clearInterval(_this.state.interval);
        window.alert("定时器已关闭");
      }

      _this.setState({
        flag: true,
        interval: null,
        disabled: false
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
          attributes: {},
          children: null
        }), _SmpReact.default.createElement({
          elementName: "main",
          attributes: {},
          children: [_SmpReact.default.createElement({
            elementName: _Counter.default,
            attributes: {
              disabled: this.state.disabled,
              n: this.state.n,
              interval: this.state.interval,
              add: function add() {
                return _this2.calc(0);
              },
              minus: function minus() {
                return _this2.calc(1);
              },
              mult: function mult() {
                return _this2.calc(2);
              },
              clear: function clear() {
                return _this2.calc(3);
              },
              setInterval: function setInterval() {
                return _this2.setInterval();
              },
              clearInterval: function clearInterval() {
                return _this2.clearInterval();
              }
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
},{"./src/SmpReact/SmpReact":"src/SmpReact/SmpReact.js","./App.css":"App.css","./src/components/Header/Header":"src/components/Header/Header.jsx","./src/components/Footer/Footer":"src/components/Footer/Footer.jsx","./src/components/Counter/Counter":"src/components/Counter/Counter.jsx"}],"index.jsx":[function(require,module,exports) {
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
},{"./src/SmpReact/SmpReact":"src/SmpReact/SmpReact.js","./src/SmpReact/SmpReactDom":"src/SmpReact/SmpReactDom.js","./App":"App.jsx"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "6901" + '/');

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
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.jsx"], null)
//# sourceMappingURL=/simple-react.78399e21.js.map