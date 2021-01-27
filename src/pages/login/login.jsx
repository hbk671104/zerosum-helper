import React, { Component } from 'react'
import Taro, { getCurrentInstance } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import AV from 'leancloud-storage/dist/av-live-query-weapp.js'

import { multiSet } from '../../utils/index'
import './login.scss'

export default class Login extends Component {

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() {
    Taro.hideHomeButton()
  }

  componentDidHide() { }

  onGetUserInfo = async ({ detail }) => {
    Taro.showLoading({ title: '正在登录...' })
    try {
      let user = await AV.User.loginWithMiniApp()

      // set user info
      const { userInfo } = detail
      user = multiSet(user, userInfo)
      user = await user.save()

      const { roomId } = getCurrentInstance().router.params
      if (roomId) {
        Taro.reLaunch({ url: `../gameroom/gameroom?roomId=${roomId}` })
        return
      }

      // jump to index page
      Taro.reLaunch({ url: '../index/index' })
    } catch (error) {
      console.error(error)
    } finally {
      Taro.hideLoading()
    }
  }

  render() {
    return (
      <View className='page login'>
        <View className='group'>
          <Image className='logo' src={require('../../assets/logo.png')} />
        </View>
        <AtButton
          className='login-button'
          openType='getUserInfo'
          onGetUserInfo={this.onGetUserInfo}
        >
          微信登录
        </AtButton>
      </View>
    )
  }
}
