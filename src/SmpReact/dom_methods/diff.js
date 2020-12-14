import dom from "../utils/dom";
import {createDomElement, renderComponent, setDomProps} from "./render";

//新旧节点相同：diff算法
export function diff(oldVNode, newVNode) {
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
}

//组件节点diff
function diffComponent(oldCompVNode, newCompVNode) {
  const {instance, vnode: oldVNode, elm} = oldCompVNode;
  const {props: nextProps} = newCompVNode;

  if (instance && oldVNode) {
    instance.__dirty = false;

    // 更新状态和属性
    instance.__nextProps = nextProps;
    if (!instance.__nextState) instance.__nextState = instance.state;

    // 复用旧组件实例和元素
    newCompVNode.instance = instance;
    newCompVNode.elm = elm;

    // 使用新属性、新状态，旧组件实例
    // 重新生成 新虚拟DOM
    const newVNode = renderComponent(newCompVNode);

    // 递归触发 diff
    diff(oldVNode, newVNode);
  }
}

//元素节点diff
function diffVNode(oldVNode, newVNode) {

  const {domElm, children: oldChild, text: oldText, props: oldProps} = oldVNode;
  const {children: newChild, text: newText, props: newProps} = newVNode;

  if (oldVNode === newVNode || !domElm) return;

  // 节点相同，dom类型一定相同
  newVNode.domElm = domElm;

  //更新属性
  diffProps(domElm, oldProps, newProps);

  const hasOldChild = Boolean(oldChild && oldChild.length);
  const hasNewChild = Boolean(newChild && newChild.length);

  if (newText !== undefined) {
    //新节点是文本节点
    dom.setTextContent(domElm, newText);
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
    // else if (oldText !== undefined) {
    // 当新旧均无子级
    // 这里有可能存在 <Text> 标签，且新内容为空
    // 因此直接清空旧元素文字
    // dom.setTextContent(domElm, '');
    // }
  }
}

//新旧节点不同：直接替换
function replaceVNode(oldVNode, newVNode) {

  const {domElm: oldDomElm} = oldVNode;
  const parentDom = dom.getParentNode(oldDomElm);

  //删除旧dom
  dom.removeChild(parentDom, oldDomElm);
  //创建新dom
  const newDomElm = createDomElement(newVNode);
  dom.appendChild(parentDom, newDomElm);

}

function diffProps(domElm, oldProps, newProps) {
  if (oldProps === newProps || !domElm) return;
  if (typeof oldProps === 'object' && typeof newProps === 'object') {
    let keys = Object.keys(oldProps);

    //处理旧属性
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const oldV = oldProps[key], newV = newProps[key];

      if (key === 'className' && oldV === 'ban') console.log(key, oldV, newV);

      if (key.startsWith("on")) {
        //处理事件
        if (typeof oldV === 'function' && oldV !== newV) {
          //当存在旧事件，且新旧值不一致时：事件解绑
          const eventName = key.substring(2).toLowerCase();
          dom.removeEvent(domElm, eventName, oldV);
        }
      } else {
        //普通属性处理
        if (newV === undefined || (key === 'className' && (newV === false || newV === null))) {
          // 若oldVNode中的属性在newVNode中不存在，则直接删除
          // class属性需要特殊处理
          dom.removeAttr(domElm, key === 'className' ? 'class' : key);
        }
      }
    }

    // 设置新属性
    setDomProps(domElm, newProps);
  }
}

//添加vnodes
function addVNodes(domElm, before, children, start, end) {
  for (let i = 0; i < end - start; i++) {
    let newDom = children[i].domElm || createDomElement(children[i]);
    dom.insertAfter(newDom, before);
    before = newDom;
  }
}

//删除vnodes
function removeVNodes(domElm, children, start, end) {
  for (let i = 0; i < end - start; i++) {
    dom.removeChild(domElm, children[i]);
  }
}

//对比子级列表
function diffChildren(parentElm, oldChild, newChild) {

  /**
   * 更新子级列表
   * 双列表游标 + while
   */

    // 初始化游标
  let oldStartIdx = 0, newStartIdx = 0;
  let oldEndIdx = oldChild.length - 1, newEndIdx = newChild.length - 1;

  // 列表首尾节点
  let oldStartVNode = oldChild[0], oldEndVNode = oldChild[oldEndIdx];
  let newStartVNode = newChild[0], newEndVNode = newChild[newEndIdx];

  let oldKeyToIdx, idxInOld, elmToMove, before;

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
    if (oldStartVNode == null) oldStartVNode = oldChild[++oldStartIdx];
    else if (oldEndVNode == null) oldEndVNode = oldChild[--oldEndIdx];
    else if (newStartVNode == null) newStartVNode = newChild[++newStartIdx];
    else if (newEndVNode == null) newEndVNode = newChild[--newEndIdx];
    else if (isSameVNode(oldStartVNode, newStartVNode)) {
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

      dom.insertBefore(parentElm, oldStartVNode.domElm, dom.getNextSibling(oldEndVNode.domElm));
      diff(oldStartVNode, newEndVNode);

      oldStartVNode = oldChild[++oldStartIdx];
      newEndVNode = newChild[--newEndIdx];
    } else if (isSameVNode(oldEndVNode, newStartVNode)) {

      dom.insertBefore(parent, oldEndVNode.domElm, oldStartVNode.domElm);
      diff(oldEndVNode, newStartVNode);

      oldEndVNode = oldChild[--oldEndIdx];
      newStartVNode = newChild[++newStartIdx];
    } else {
      /**
       * 3. 两端比对均不匹配
       * 进入 key 值比对
       */
      // 根据剩余的旧列表创建 key list
      if (!oldKeyToIdx) oldKeyToIdx = createKeyList(oldChild, oldStartIdx, oldEndIdx);

      // 判断新列表项的 key值 是否存在
      idxInOld = oldKeyToIdx[newStartVNode.key || ''];
      if (!idxInOld) {
        /*
         * 4. 新 key 值在旧列表中不存在
         * 直接将该节点插入
        */
        dom.insertBefore(parentElm, createDomElement(newStartVNode), oldStartVNode.domElm);
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
          dom.insertBefore(parentElm, elmToMove.domElm, oldStartVNode.domElm);
          diff(elmToMove, newStartVNode);

          // 清空旧列表项
          // 后续的比对可以直接跳过
          oldChild[idxInOld] = undefined;
        } else {
          /*
           * 7. 新旧节点类型不一致
           * key 效，直接创建元素并插入
          */
          dom.insertBefore(parentElm, createDomElement(newStartVNode), oldStartVNode.domElm);
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
      const vnode = newChild[newEndIdx + 1];
      before = vnode ? vnode.domElm : null;
      addVNodes(parentElm, before, newChild, newStartIdx, newEndIdx);
    } else {
      // 删除节点
      removeVNodes(parentElm, oldChild, oldStartIdx, oldEndIdx);
    }
  }
}

// 对比两vnode是否是相同的
function isSameVNode(oldVNode, newVNode) {
  return oldVNode.key === newVNode.key && oldVNode.type === newVNode.type;
}

//工具函数 创建key列表
function createKeyList(children, start, end) {
  let map = {};
  for (let i = start; i <= end - start; i++) {
    const {key} = children[i];
    map[key] = true;
  }
  return map;
}