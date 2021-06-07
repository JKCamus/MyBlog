##说明

1. 该 demo 用于学习测试 React.memo 效果。
   测试总结：
   未使用 memo 进行优化，父组件任何状态发生改变都会引起子组件的无差别 reRender

并且如果只是引入 memo 进行包裹，也不能达到优化的目的。需要传入第二个参数进行粒度控制。

```js
const isEqual = (prevProps, nextProps) => {
  if (prevProps.number !== nextProps.number) {
    return false;
  }
  return true;
};
memo(MemoChild, isEqual);
//isEqual便是关键点，参数如上，进行一个重新渲染优化
```

则
Parent 中 step、count、number 变化，会引起 NormalChild 重新渲染，
但是 step、count 发生变化并不会引起 MemoChild 而只有 isEqual 控制的 number 发生变化才会引起 MemoChild 发生渲染
