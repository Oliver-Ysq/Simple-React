import dom from "../utils/dom";
import {triggerHook} from "../main_methods/lifeCycle";

// 创建dom元素：虚拟dom => dom
export function createDomElement(vnode) {
  //若type为function：组件元素
  //先render出vnode节点

  if (Array.isArray(vnode)) {
    //如果是vnode是列表，则批量创建dom，并返回dom列表

    let list = [];
    for (let i = 0; i < vnode.length; i++)
      list.push(createDomElement(vnode[i]));
    return list;

  } else {
    if (typeof vnode.type === 'function') {
      /**********    组件 ==> 组件实例 ==> 元素节点（elVNode）    ***********/
      vnode = renderComponent(vnode);
    }
    const {children, type, text, props} = vnode;
    if (type && typeof type === 'string') {
      //type为字符串：dom元素
      vnode.domElm = dom.createElement(vnode);//创建当前dom元素
      // triggerHook(vnode, 'create');
      if (Array.isArray(children)) {
        //递归创建子元素
        for (let i = 0; i < children.length; i++) {
          let newDom = createDomElement(children[i]);
          dom.appendChild(vnode.domElm, newDom);
          triggerHook(Array.isArray(newDom) ? newDom[0].vnode : newDom.vnode, 'insert');
        }

      }
    } else if ((type === undefined || type === null) && text) {
      //type为undefined：文本节点
      vnode.domElm = dom.createTextNode(text);
    }

    if (vnode.domElm) {//如果创建成功了，则设置dom元素的属性
      setDomProps(vnode.domElm, props);

      vnode.domElm.vnode = vnode; //为dom元素记录下创造它的vnode

      return vnode.domElm;  //将创建的dom元素 和 insert周期 同时返回
    } else {  //创建失败，则renderComponent后的vnode依然是组件节点，需要递归render
      return createDomElement(vnode);
    }
  }
}

// 为dom元素设置属性
export function setDomProps(domElm, props) {
  if (domElm && typeof props === 'object') {
    const keys = Object.keys(props);
    for (let i = 0; i < keys.length; i++) {

      const key = keys[i];
      const value = props[key];

      if (key.startsWith('on')) {
        // 事件绑定
        if (typeof value === 'function') {
          const eventName = key.substring(2).toLowerCase();  // 去出on之后的字符串并转换为小写
          dom.bindEvent(domElm, eventName, value);
        } else {
          console.log('Invalid EventHandler');
        }
      } else if (key === 'className') {
        // 添加class
        dom.addClass(domElm, value);
      } else {
        // 属性设置
        dom.setAttr(domElm, key, value);
      }

    }
  }
}

/**********    组件 ==> 组件实例 ==> 元素节点（elVNode）    ***********/
export function renderComponent(compVNode) {
  const {type: Comp, props} = compVNode;  //compVNode：组件； instance：组件实例。  vnode：元素节点；
  let instance = compVNode.instance;
  // 当 instance 已经存在时，则不需要重新创建实例
  if (!instance) {
    // 传入 props，初始化组件实例
    // 支持：类组件、函数组件
    if (Comp.prototype && Comp.prototype.render) {
      instance = new Comp(props);
    }

    // 初次渲染时：将来的属性与状态其实便是与当前值一致
    instance.__nextProps = props;
    instance.__nextState = instance.state;
  }

  // 调用 render 获取元素节点 VNode
  const vnode = instance.__createVNode();

  //class继承
  if (props.className) vnode.props.className = props.className;

  // 组件、元素、实例之间保持相互引用，有利于双向连接整棵虚拟树
  instance.__component = compVNode; //组件
  compVNode.instance = instance;  //组件实例
  compVNode.vnode = vnode;    //元素节点
  vnode.component = compVNode;  //组件

  return vnode;
}

// 渲染函数
export default function render(vnode, parentDom) {
  const domElm = createDomElement(vnode); //创建dom元素（可能是dom元素列表）
  dom.appendChild(parentDom, domElm);  //将dom元素插入父节点
  triggerHook(domElm.vnode, 'insert');
  return domElm;
}