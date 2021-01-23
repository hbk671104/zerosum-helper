import React, { Component } from 'react'
import { View, Text } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import Taro, { getCurrentInstance } from '@tarojs/taro'
import AV from 'leancloud-storage/dist/av-live-query-weapp.js'

import Player from '../../components/player'
import './gameroom.scss'

const user = AV.User.current()

export default class Gameroom extends Component {

  state = {
    score: {
      [user.get('objectId')]: 0
    }
  }

  componentWillMount() { }

  componentDidMount() {
    // this.subscribe()
  }

  componentWillUnmount() { }

  componentDidShow() {
    Taro.hideHomeButton()
  }

  componentDidHide() { }

  subscribe = async () => {
    const { roomId } = getCurrentInstance().router.params
    const query = new AV.Query('Room').equalTo('objectId', roomId)

    try {
      const liveQuery = await query.subscribe()
      liveQuery.on('update', (room, keys) => {
        console.log(keys)
      })
    } catch (error) {
      console.error(error)
    }
  }

  render() {
    const { score } = this.state
    const players = Object.keys(score)
    return (
      <View className='page gameroom'>
        {players.map(p => <Player key={p} id={p} score={score[p]} />)}
      </View>
    )
  }
}
