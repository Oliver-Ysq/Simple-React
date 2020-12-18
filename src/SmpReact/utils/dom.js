/*
* 原生dom操作
* */

const dom = {
  //根据vnode.type创建dom元素
  createElement(vnode) {
    return document.createElement(vnode.type);
  },

  //创建text节点
  createTextNode(text) {
    return document.createTextNode(text);
  },

  //修改文本节点的值
  setTextContent(domElm, content) {
    if (domElm && ['string', 'number'].includes(typeof content)) {
      domElm.nodeValue = content;
    }
  },

  //得到父元素
  getParentNode(elm) {
    return elm && elm.parentNode;
  },

  //增加子元素
  appendChild(parent, child) {
    // 若在JSX中渲染列表，则需要批量处理。
    if (Array.isArray(child)) {
      for (let item of child) {
        parent.appendChild(item);
      }
    } else {
      parent.appendChild(child);
    }
  },

  //删除指定子元素
  removeChild(parent, child) {
    if (child && parent && child.parentNode) {
      parent.removeChild(child);
    }
  },

  //获取兄弟元素
  getNextSibling(domElm) {
    return domElm.nextSibling === null ? false : domElm.nextSibling;
  },

  //在前边插入节点
  insertBefore(parent, newNode, refNode) {
    if (refNode) {
      parent.insertBefore(newNode, refNode);
    } else {
      dom.appendChild(parent, newNode);
    }
  },

  //在dom后边插入新dom
  insertAfter(parent, newNode, before) {
    if (parent.lastChild === before) {
      parent.appendChild(newNode);
    } else {
      parent.insertBefore(newNode, before);
    }
  },

  //绑定一个或多个class
  addClass(domElm, classList) {
    if (typeof classList === 'string') domElm.classList.add(classList);
    else if (Array.isArray(classList)) domElm.classList.add(...classList);
  }
  ,

  //绑定事件
  bindEvent(domElm, type, fn) {
    domElm.addEventListener(type, fn);
  },

  //解绑事件
  removeEvent(domElm, type, fn) {
    domElm.removeEventListener(type, fn);
  },

  //设置属性
  setAttr(domElm, key, value) {
    domElm.setAttribute(key, value);
  },

  //删除属性
  removeAttr(domElm, key) {
    domElm.removeAttribute(key);
  },

  //删除一个或多个class
  removeClass(domElm, className) {
    if (typeof className === 'string') domElm.class.remove(className);
    else if (Array.isArray(className)) domElm.classList.remove(...className);
  }

};
export default dom;