import React, { Component } from 'react'
import { View, Text } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import Taro, { getCurrentInstance } from '@tarojs/taro'
import AV from 'leancloud-storage/dist/av-live-query-weapp.js'

import './index.scss'

export default class Player extends Component {

  state = {
    nickName: null,
    avatarUrl: null
  }

  componentWillMount() { }

  componentDidMount() {
    this.fetchPlayer()
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  fetchPlayer = async () => {
    const query = new AV.Query('_User')
    try {
      const { nickName, avatarUrl } = (await query.get(this.props.id)).toJSON()
      this.setState({
        nickName,
        avatarUrl
      })
    } catch (error) {
      console.error(error)
    }
  }

  render() {
    const { nickName, avatarUrl } = this.state
    return (
      <View className='player'>
        <Text>{nickName}</Text>
      </View>
    )
  }
}