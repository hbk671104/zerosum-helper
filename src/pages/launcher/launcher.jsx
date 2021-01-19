import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { AtActivityIndicator } from 'taro-ui'
import AV from 'leancloud-storage/dist/av-live-query-weapp.js'

import './launcher.scss'

export default class Launcher extends Component {

  componentWillMount() { }

  componentDidMount() {
    if (AV.User.current()) {
      Taro.reLaunch({ url: '../index/index' })
    } else {
      Taro.redirectTo({ url: '../login/login' })
    }
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  render() {
    return (
      <View className='page launcher'>
        <View className='group'>
          <Image className='logo' src={require('../../assets/logo.png')} />
        </View>
        <AtActivityIndicator className='loading-indicator' color='white' size={60} />
      </View>
    )
  }
}
