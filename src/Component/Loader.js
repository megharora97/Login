import React, { Component } from 'react'
import { View, StyleSheet, ActivityIndicator, Dimensions } from 'react-native'
import { Button, Input, Icon, Text, Overlay, Image } from "react-native-elements";
import Colors from "../Utils/Colorss";
import Styles from '../Component/Styless'
const loader = require("../../assets/loader1.gif")

const { width, height } = Dimensions.get("window");

export default class Loader extends Component {
  render() {
    return (
      <View style={[Styles().loadingAvatar]}>
        <View style={Styles().Loader}>
          <Image
            source={loader}
            resizeMode="contain"
            resizeMethod='resize'
            placeholderStyle={{ backgroundColor: Colors.trans }}
            style={Styles().ImageMy}
            tintColor={Colors.Pinkk}
          />
        </View>
      </View>
    );
  }
}



