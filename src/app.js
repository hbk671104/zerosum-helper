import { Component } from 'react'
import './app.scss'
import AV from 'leancloud-storage/dist/av-weapp.js';
// import AV from 'leancloud-storage/dist/av-live-query-weapp.js'

class App extends Component {

  componentDidMount() {
    AV.init({
      appId: "4nUyAn9nnWGr8AUST0zgsf5O-gzGzoHsz",
      appKey: "mnTy8xLcGBGEJ5rzFCwzXLjp",
      serverURL: "https://4nuyan9n.lc-cn-n1-shared.com"
    });
  }

  componentDidShow() { }

  componentDidHide() { }

  componentDidCatchError() { }

  // this.props.children 是将要会渲染的页面
  render() {
    return this.props.children
  }
}

export default App
