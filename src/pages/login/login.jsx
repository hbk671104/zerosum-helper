import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import AV from 'leancloud-storage/dist/av-weapp.js';

import './login.scss'

export default class Login extends Component {

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() {
    Taro.hideHomeButton()
  }

  componentDidHide() { }

  setUserInfo = (user, info) => {
    Object.keys(info).forEach(key => {
      user.set(key, info[key])
    })
    return user
  }

  onGetUserInfo = async ({ detail }) => {
    try {
      const { code } = await Taro.login()
      const authData = await AV.Cloud.run("loginWechat", { code })
      if (authData) {
        let user = await AV.User.loginWithAuthData({
          openid: authData.openid,
          access_token: authData.session_key,
          expires_in: 7200,
        }, 'weapp')
        if (user) {
          const { userInfo } = detail
          console.log(userInfo)
          user = this.setUserInfo(user, userInfo)
          user = await user.save()
          if (user) {
            Taro.reLaunch({ url: '../index/index' })
          }
        }
      }
    } catch (error) {
      console.error(error)
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
