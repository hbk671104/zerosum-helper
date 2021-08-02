import React, { Component } from "react";
import { View, Text, Button } from "@tarojs/components";
import { AtFab, AtActionSheet, AtActionSheetItem, AtButton } from "taro-ui";
import Taro, { getCurrentInstance } from "@tarojs/taro";
import AV from "leancloud-storage/dist/av-live-query-weapp.js";

import Player from "../../components/player";
import "./gameroom.scss";

export default class Gameroom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      score: {},
      showActionSheet: false
    };
    this.roomId = getCurrentInstance().router.params.roomId;
    this.currentUser = AV.User.current().toJSON();
  }

  componentWillMount() {
    if (!this.currentUser) {
      Taro.redirectTo({
        url: `../login/login?roomId=${this.roomId}`
      });
    }
  }

  componentDidMount() {
    this.fetch();
    this.subscribe();
  }

  componentWillUnmount() {}

  componentDidShow() {
    Taro.hideHomeButton();
  }

  componentDidHide() {}

  onShareAppMessage() {
    const { nickName } = this.currentUser;
    return {
      title: `${nickName}邀请你加入房间，还不快来！`,
      path: `pages/gameroom/gameroom?roomId=${this.roomId}`
    };
  }

  onPlusClick = p => () => {};

  onCloseRoomButtonClick = () => {
    Taro.showModal({
      title: "提示",
      content: "确定关闭房间吗？",
      success: res => {
        if (res.confirm) {
          this.closeRoom();
        }
      }
    });
  };

  fetch = async () => {
    const query = new AV.Query("Room").equalTo("objectId", this.roomId);

    Taro.showNavigationBarLoading();
    try {
      const { score } = (await query.get(this.roomId)).toJSON();
      this.setState({
        score
      });
    } catch (error) {
      console.error(error);
    } finally {
      Taro.hideNavigationBarLoading();
    }
  };

  subscribe = async () => {
    const query = new AV.Query("Room").equalTo("objectId", this.roomId);

    try {
      const liveQuery = await query.subscribe();
      liveQuery.on("update", (room, keys) => {
        console.log(room.toJSON(), keys);
      });
    } catch (error) {
      console.error(error);
    }
  };

  closeRoom = async () => {
    const room = AV.Object.createWithoutData("Room", this.roomId);
    room.set("isOpen", false);

    Taro.showLoading({
      title: "正在关闭房间..."
    });
    try {
      await room.save();
      Taro.redirectTo({
        url: "../index/index"
      });
    } catch (error) {
      console.error(error);
    } finally {
      Taro.hideLoading();
    }
  };

  render() {
    const { score, showActionSheet } = this.state;
    return (
      <View className="page gameroom">
        {!!score &&
          Object.keys(score).map(p => (
            <Player
              key={p}
              id={p}
              score={score[p]}
              onPlusClick={this.onPlusClick(p)}
            />
          ))}
        <AtFab
          className="menu"
          onClick={() => this.setState({ showActionSheet: true })}
        >
          <Text className="at-fab__icon at-icon at-icon-menu"></Text>
        </AtFab>
        <AtActionSheet
          isOpened={showActionSheet}
          cancelText="取消"
          onClose={() => this.setState({ showActionSheet: false })}
        >
          <AtActionSheetItem className="share-item">
            <AtButton className="share-button" openType="share">
              邀请玩家
            </AtButton>
          </AtActionSheetItem>
          <AtActionSheetItem>账单记录</AtActionSheetItem>
          <AtActionSheetItem onClick={this.onCloseRoomButtonClick}>
            <Text style="color:red;">关闭房间</Text>
          </AtActionSheetItem>
        </AtActionSheet>
      </View>
    );
  }
}
