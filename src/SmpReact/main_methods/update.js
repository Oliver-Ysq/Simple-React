const defer = fn => {Promise.resolve().then(fn);}; //微任务 不阻塞宏任务（渲染等

const updateQueue = [];

// 队列更新 API
export function enqueueRender(updater) {
  // 将所有 updater 同步推入更新队列中
  // 为实例添加一个属性 __dirty，标识是否处于待更新状态
  // 初始 和 更新完毕，该值会被置为 false
  // 推入队列时，标记为 true
  if (
    !updater.__dirty &&
    (updater.__dirty = true) &&
    updateQueue.push(updater) === 1
  ) {
    // 异步化冲洗队列
    // 最终只执行一次冲洗
    defer(flushRenderQueue);
  }
}

// 合并一次循环中多次 updater
function flushRenderQueue() {
  if (updateQueue.length) {
    // 排序更新队列
    updateQueue.sort();

    // 循环队列出栈
    let curUpdater = updateQueue.pop();
    while (curUpdater) {

      // 当组件处于 待更新态 时，触发组件更新
      // 如果该组件已经被更新完毕，则该状态为 false
      // 则后续的更新均不再执行
      if (curUpdater.__dirty) {
        // 调用组件自身的更新函数
        curUpdater.__update();

        // 执行 callback
        flushCallback(curUpdater);
      }
      // curUpdater.__dirty = false;
      curUpdater = updateQueue.pop();
    }
  }
}

// 执行缓存在 updater.__setStateCallbacks 上的回调
function flushCallback(updater) {
  const callbacks = updater.__setStateCallbacks;
  let cbk;
  if (callbacks && callbacks.length) {
    while (cbk = callbacks.shift()) cbk.call(updater);
  }
}