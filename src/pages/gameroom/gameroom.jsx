import React, { Component } from "react";
import { View, Text } from "@tarojs/components";
import { AtFab, AtActionSheet, AtActionSheetItem } from "taro-ui";
import Taro, { getCurrentInstance } from "@tarojs/taro";
import AV from "leancloud-storage/dist/av-live-query-weapp.js";

import Player from "../../components/player";
import "./gameroom.scss";

export default class Gameroom extends Component {
  state = {
    score: null,
    showActionSheet: false
  };

  componentWillMount() {
    if (!AV.User.current()) {
      const { roomId } = getCurrentInstance().router.params;
      Taro.redirectTo({
        url: `../login/login?roomId=${roomId}`
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

  onShareAppMessage(options) {
    const { roomId } = getCurrentInstance().router.params;
    return {
      title: "房间已开，快来加入！",
      path: `pages/gameroom/gameroom?roomId=${roomId}`
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
    const { roomId } = getCurrentInstance().router.params;
    const query = new AV.Query("Room").equalTo("objectId", roomId);

    Taro.showNavigationBarLoading();
    try {
      const { score } = (await query.get(roomId)).toJSON();
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
    const { roomId } = getCurrentInstance().router.params;
    const query = new AV.Query("Room").equalTo("objectId", roomId);

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
    const { roomId } = getCurrentInstance().router.params;
    const room = AV.Object.createWithoutData("Room", roomId);
    room.set("status", "closed");

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
          <AtActionSheetItem>邀请玩家</AtActionSheetItem>
          <AtActionSheetItem>账单记录</AtActionSheetItem>
          <AtActionSheetItem onClick={this.onCloseRoomButtonClick}>
            <Text style="color:red;">关闭房间</Text>
          </AtActionSheetItem>
        </AtActionSheet>
      </View>
    );
  }
}
