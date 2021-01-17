import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { AtActivityIndicator } from 'taro-ui'

import './launcher.scss'

export default class Launcher extends Component {

  componentWillMount() { }

  componentDidMount() {
    setTimeout(() => {
      Taro.redirectTo({ url: '../login/login' })
    }, 1000)
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
