import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { AtButton } from 'taro-ui'

import './index.scss'

export default class Index extends Component {

  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() {
    Taro.hideHomeButton()
  }

  componentDidHide() { }

  render() {
    return (
      <View className='page index'>
        <View className='group'>
          <Image className='logo' src={require('../../assets/logo.png')} />
        </View>
        <View className='button-group'>
          <AtButton className='create-room'>
            创建房间
          </AtButton>
          <AtButton>
            加入房间
          </AtButton>
        </View>
      </View>
    )
  }
}
