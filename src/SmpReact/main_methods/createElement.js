// 创建一个虚拟dom
export function createVNode(type, props, ref, key, children, domElm, text) {
  return {
    type, //标签类型
    props,  //标签属性
    children, //子组件
    ref,  //获取DOM元素
    key,  //唯一标识
    domElm,  //DOM元素
    text, //文本内容
  };
}

export default function createElement(tag) {
  const {elementName: type, attributes: data, children} = tag;
  const {key, ref, ...props} = data;

  // 处理子级列表中的 string or number 同样转换为 VNode
  if (children && children.length) {
    const length = children.length;
    for (let i = 0; i < length; i++) {
      const child = children[i];  //对每一个子节点进行遍历
      if (['string', 'number'].includes(typeof child)) {
        // 非标签的文字节点， vnode.type === undefined
        children[i] = createVNode(
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
  return createVNode(type, props, ref, key, children, undefined, undefined);
}