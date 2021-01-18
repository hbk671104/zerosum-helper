import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { AtButton } from 'taro-ui'
// import AV from 'leancloud-storage/dist/av-weapp.js'
import AV from 'leancloud-storage/dist/av-live-query-weapp.js'

import { generateRoomNumber } from '../../utils/index'
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

  createRoom = async () => {
    const room = new AV.Object('Room')
    const user = AV.User.current()
    const roomNumber = generateRoomNumber()
    room.set('owner', user)
    room.set('player', {
      [user.get('objectId')]: 0
    })
    room.set('roomNumber', roomNumber)
    await room.save()

    // const query = new LQ.Query('Room');
    // query.equalTo('roomNumber', roomNumber);
    // query.subscribe().then((liveQuery) => {
    //   // 订阅成功
    //   console.log(liveQuery);
    // });
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
          <AtButton>
            加入房间
          </AtButton>
        </View>
      </View>
    )
  }
}
