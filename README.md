# Simple-React 
- 构建一个自己的React库  

## 1. 从JSX开始 - `<div />`
- 初识JSX，总觉得他有什么魔法。直到那一次见到`React.createElement`
    ```
    //配置.babelrc
    "plugins": [
        [
          "transform-jsx",
          {
            "function": "SmpReact.createElement",
            "useVariables": true
          }
        ]
      ]
    ```
- 然后魔法被实现了
    ```
    const SmpReact = {
        createElement(tag) {
            console.log(tag);
        }
    };
    let el = <h1> hello </h1>;
    ```
  
## 2. Virtual Node - JS里的dom
#### 一个最简单的vnode
```
/*
  attributes: {id: "1"}
  children: ["hello"]
  elementName: "h1"
*/
```
- vnode并不是真正的视图元素，而是将真实的视图元素抽象为一个 Javascript 对象，包含完整描述了一个真实元素的所有信息，但并不具备渲染功能。  
- 同时由于 DOM 本身便是 树形结构，因此使用 Javascript 对象便能很好对整个页面结构进行描述。  

#### 为什么使用虚拟dom  
1. 虚拟 DOM 其实是一种牺牲最小性能与空间，换取架构优化的方式，能较大提升项目的可拓展性与可维护性；
2. 对 DOM 的操作进行集中化管理，更加安全稳定且高效；
3. 渲染与逻辑的解耦，高度的组件化与模块化，提升了代码复用性及开发效率；

#### 设计vnode
```
function createVNode(type, props, ref, key, children, elm, text) {
  return {
    type, //标签类型
    props,  //标签属性
    children, //子组件
    ref,  //获取视图元素
    key,  //唯一标识
    elm,  //视图元素
    text, //文本内容
  };
}
```

## 3. createElement - 生成虚拟dom
```
function createElement(tag) {
  const {elementName: type, attributes: data, children} = tag;
  const {key, ref, ...props} = data;

  // 处理子级列表中的 string or number 同样转换为 VNode
  if (children && children.length) {
    const length = children.length;
    for (let i = 0; i < length; i++) {
      const child = children[i];  //对每一个子节点进行遍历
      if (['string', 'number'].includes(typeof child)) {
          // 非标签的文字节点， vnode.type === undefined
          children[i] = createVnode(
            undefined,
            {},
            undefined,
            undefined,
            undefined,
            undefined,
            String(children[i])
          );
      }
    }
  }
  return createVnode(type, props, ref, key, children, undefined, undefined);
}
```

## 4. render - 从 Vnode 到 dom
#### 创建dom
1. 根据vnode类型创建真实dom
2. 为dom绑定属性和事件
```
function createDomElement(vnode) {
  const {children, type, text, props} = vnode;
  //type为字符串时表示其为dom元素
  if (type && typeof type === 'string') {
    //创建当前dom元素
    vnode.domElm = dom.createElement(vnode);
    //递归创建子元素
    if (Array.isArray(children)) {
      for (let i = 0; i < children.length; i++) {
        dom.appendChild(vnode.domElm, createDomElement(children[i]));
      }
    }
  } else if ((type === undefined || type === null) && text) {
    //type为文本节点
    vnode.domElm = dom.createTextNode(text);
  }
  //如果创建成功了，则设置dom元素的属性
  if (vnode.domElm) setDomProps(vnode.domElm, props);
  return vnode.domElm;
}


// 为dom元素设置属性
function setDomProps(domElm, props) {
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
          console.log('invalid eventHandler');
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
```
- 最终的功能集成在render中
```
//SmpReactDom.js
function render(vnode, parentDom) {
  const domElm = createDomElement(vnode); //创建dom元素
  dom.appendChild(parentDom, domElm);  //将dom元素插入父节点
  return domElm;
}
```
#### 渲染dom
```
const jsx = (
  <div name="parent">
    parent
    <h1 name="child" onClick={() => {console.log('hello');}}>
      Child
    </h1>
  </div>
);
SmpReactDom.render(jsx,document.getElementById("root"));
```

## 5. Diff算法 - 更新视图
- 说到虚拟 DOM 就马上能提到其核心的 diff 算法。
- 当我们通过 setState 去更新组件时，是重新生成一棵全新的完整 虚拟DOM 树，此时就需要对比新旧两棵树的差异点，再针对性更新。
- diff算法简而言之，是一种计算得出两个对象差异的算法。
#### 根本原理
1. 同层对比策略
    仅在同层比较，若出现dom跨层的情况，直接在原层删除，在新层新建。
2. 唯一标识key
    - 不加key：同层下相同类型的dom元素的更新可能会导致增删，消耗性能。
    - 加key：type+key可以准确定位同层的dom元素，可以直接调换顺序增删属性。
3. 组件模式策略
    - 不引入组件模式：任何层的节点更新都要从root节点进行遍历。
    - 引入组件模式：组件可以以本节点为root执行diff算法。
    
#### 总结dom diff流程
```
diff begin
if typeA === typeB && keyA === KeyB:
    update [events,props,children]
else:
    delete NodeA
    add NodeB
```
## 6. Component - 组件化
#### 为什么要设计Component
- Component保持了动态UI与逻辑的分离，让UI组件变得非常的高效易用。
- 注意：由于组件的加入，这时虚拟DOM(VNode) 就包含了两种类型: 组件节点和 元素节点。
#### 实现
1. render()函数由每个组价实例提供。
2. __vnode存储当前组件的元素节点
3. __component存储当前组件
```
class Component {

  constructor(props) {
    this.props = props;
  }

  render() {
    //由组件实例实现
    return null;
  }

  __createVNode() {
    // 用于封装重新执行 render 的逻辑

    // state 与 props 状态变更的逻辑
    this.__prevProps = this.props;
    this.__prevState = this.state;

    this.props = this.__nextProps;
    this.state = this.__nextState;

    this.__nextState = undefined;
    this.__nextProps = undefined;

    // 重新执行 render 生成 VNode
    this.__vnode = this.render();

    return this.__vnode;
  }
}
```
## 7. setState - 更新UI
#### 核心
获取组件实例先后渲染的新旧 VNode 再触发 diff 函数。
- 在上一步中我们已经将旧的vnode存储在`__vnode`中了。
- setState：更新状态，调用render生成新的vnode，进行diff
#### 基础实现
```
class Component{
    ...
    //更新state
      setState(partialState, callback) {
        // 合并状态, 暂存于即将更新态中
        if (typeof partialState === 'function') {
          partialState = partialState(this.state);
        }
    
        //setState帮你合并
        this.__nextState = {
          ...this.state,
          ...partialState,
        };
    
        // 调用更新，并执行回调
        this.__update();
        callback && callback();
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
      };
}
```

#### 优化实现
##### 问题
频繁调用setState需要不停的diff，可能导致主线程阻塞。
##### 解决
1. setState 异步更新。（最好是以微任务形式，不会阻塞UI渲染）
2. setState 合并。多次连续调用只会执行一次。  
```

```