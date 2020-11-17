import React, { Component } from 'react'
import { View, StyleSheet, ActivityIndicator, Dimensions } from 'react-native'
import {  Image, CheckBox } from "react-native-elements";
import Styles from './Styless';
const { width, height } = Dimensions.get("window");

export default class GlobalCheckbox extends Component {
    render() {
        const { Title, CheckedIcon, UnCheckedIcon, IconType, Checked, CheckedColor, OnPress, ViewStyle, WrapperAlignment } = this.props
        return (
            <CheckBox
                wrapperStyle={WrapperAlignment}
                title={Title}
                checkedIcon={CheckedIcon}
                uncheckedIcon={UnCheckedIcon}
                checkedColor={CheckedColor}
                checked={Checked}
                textStyle={[Styles().GlobalCheckboxTextStyle]}
                containerStyle={[Styles().CheckBoxContainerStyle, ViewStyle]}
                iconType={IconType}
                onPress={OnPress}
            />
        );
    }
}