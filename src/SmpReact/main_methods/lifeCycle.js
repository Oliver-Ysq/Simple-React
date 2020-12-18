/*
* hooks:
*   create  //创建后
*   insert  //挂载后
*   willupdate  //更新前
*   update  //更新后
*   willremove  //卸载前
* */

export function triggerHook(vnode, name) {
  if (!Array.isArray(vnode)) {
    const {hooks: _hooks} = vnode;
    let hook;
    if (_hooks) {
      hook = _hooks[name];
      hook && hook(vnode);
    }
  } else {
    for (let i = 0; i <= vnode.length; i++) {
      const {hooks: _hooks} = vnode[i];
      let hook;
      if (_hooks) {
        hook = _hooks[name];
        hook && hook(...vnode[i]);
      }
    }
  }
}