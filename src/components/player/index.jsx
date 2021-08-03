import React, { Component } from "react";
import { View, Text, Image } from "@tarojs/components";
import { AtButton, AtAvatar } from "taro-ui";
import Taro, { getCurrentInstance } from "@tarojs/taro";
import AV from "leancloud-storage/dist/av-live-query-weapp.js";

import "./index.scss";

export default class Player extends Component {
  state = {
    nickName: null,
    avatarUrl: null
  };

  componentWillMount() {}

  componentDidMount() {
    this.fetchPlayer();
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  fetchPlayer = async () => {
    const query = new AV.Query("_User");
    try {
      const { nickName, avatarUrl } = (await query.get(this.props.id)).toJSON();
      this.setState({
        nickName,
        avatarUrl
      });
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    const { nickName, avatarUrl } = this.state;
    const { self, score, onPlusClick } = this.props;
    return (
      <View className="player">
        <AtAvatar image={avatarUrl} text={nickName} size="large" />
        <View className="score-container">
          <Text className="score">{score}</Text>
        </View>
        {!self && (
          <View className="plus-container" onClick={onPlusClick}>
            <Image className="plus" src={require("../../assets/plus.png")} />
          </View>
        )}
      </View>
    );
  }
}
