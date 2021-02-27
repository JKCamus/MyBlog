import React from 'react'



class MyErrorBoundary extends React.Component {
  state = {
    error: null,
  };

  static getDerivedStateFromError(error) {
    // 更新 state，下次渲染可以展示错误相关的 UI
    return { error: error };
  }

  componentDidCatch(error, info) {

    console.log(error, info)
  }

  render() {
    if (this.state.error) {
      // 渲染出错时的 UI
      return <p>Something broke</p>;
    }
    return this.props.children;
  }
}

export default MyErrorBoundary;
