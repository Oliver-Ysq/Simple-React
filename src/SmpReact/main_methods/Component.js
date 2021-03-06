import {diff} from "../dom_methods/diff";
import {enqueueRender} from "./update";

export default class Component {

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

  __hooks = {

    // 元素节点 创建时机
    create: () => {},

    // 元素节点 插入时机，触发 didMount
    insert: () => this.componentDidMount(),

    // 元素节点 更新之前，触发 getSnapshotBeforeUpdate
    willupdate: (vnode) => {
      this.__snapshot = this.getSnapshotBeforeUpdate(this.__prevProps, this.__prevState);
    },

    // 元素节点 更新之后， 触发 didUpdate
    update: (oldVNode, vnode) => {
      this.componentDidUpdate(this.__prevProps, this.__prevState, this.__snapshot);
      this.__snapshot = undefined;
    },

    // 元素节点 卸载之前， 触发 willUnmount
    willremove: (vnode) => this.componentWillUnmount(),
  };

  //生命周期函数
  getSnapshotBeforeUpdate(prevProps, prevState) { return undefined; }

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState, snapshot) { }

  componentWillUnmount() { }

  constructor(props) {
    this.props = props;
    this.__setStateCallbacks = [];
  }

  render() {
    //由组件实例实现
    return null;
  }

  __createVNode() {
    // 该方法用于封装重新执行 render 的逻辑

    // state 与 props 状态变更的逻辑
    this.__prevProps = this.props;
    this.__prevState = this.state;

    this.props = this.__nextProps;
    this.state = this.__nextState;

    this.__nextState = undefined;
    this.__nextProps = undefined;

    // 重新执行 render 生成 VNode
    this.__vnode = this.render();

    //绑定生命周期
    this.__vnode.hooks = this.__hooks;

    return this.__vnode;
  }

  //更新state
  setState(operater, callback) {
    // 合并状态, 暂存于即将更新态中
    if (typeof operater === 'function') operater = operater(this.state, this.props);

    //setState帮你合并

    this.__nextState = {
      ...this.state,
      ...operater,
    };

    // 调用更新，并执行回调
    callback && this.__setStateCallbacks.push(callback);

    enqueueRender(this);
  }

  //更新状态，调用diff
  __update() {

    // 临时存储 旧虚拟节点 (oldVNode)
    const oldVNode = this.__vnode;

    this.__nextProps = this.props;
    if (!this.__nextState) this.__nextState = this.state;

    // 重新生成 新虚拟节点(newVNode)
    this.__vnode = this.__createVNode();

    // 调用 diff，更新 VNode
    diff(oldVNode, this.__vnode);

    this.__dirty = false;
  };
}

function deepEqual(object1, object2) {
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (let index = 0; index < keys1.length; index++) {
    const val1 = object1[keys1[index]];
    const val2 = object2[keys2[index]];
    const areObjects = isObject(val1) && isObject(val2);
    if (areObjects && !deepEqual(val1, val2) ||
      !areObjects && val1 !== val2) {
      return false;
    }
  }

  return true;
}

function isObject(object) {
  return object != null && typeof object === 'object';
}