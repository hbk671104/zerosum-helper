import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import AV from 'leancloud-storage/dist/av-live-query-weapp.js'

import './index.scss'

export default class Index extends Component {

  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() {
    Taro.hideHomeButton()
  }

  componentDidHide() { }

  onRoomCreateClick = e => {
    e.stopPropagation()
    this.createRoom()
  }

  onRoomJoinClick = e => {
    e.stopPropagation()
    // this.joinRoom()
  }

  createRoom = async () => {
    let room = new AV.Object('Room')
    const user = AV.User.current()
    room.set('owner', user)
    room.set('score', {
      [user.get('objectId')]: 0
    })

    Taro.showLoading('正在创建房间...')
    try {
      room = await room.save()
      const roomId = room.get('objectId')
      Taro.redirectTo({
        url: `../gameroom/gameroom?roomId=${roomId}`
      })
    } catch (error) {
      console.error(error)
    } finally {
      Taro.hideLoading()
    }
  }

  render() {
    return (
      <View className='page index'>
        <View className='group'>
          <Image className='logo' src={require('../../assets/logo.png')} />
        </View>
        <View className='button-group'>
          <AtButton className='create-room' onClick={this.onRoomCreateClick}>
            创建房间
          </AtButton>
          <AtButton onClick={this.onRoomJoinClick}>
            加入房间
          </AtButton>
        </View>
      </View>
    )
  }
}