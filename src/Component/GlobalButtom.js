import React, { Component } from 'react'
import { View, StyleSheet, ActivityIndicator, Dimensions } from 'react-native'
import { Button, Input, Icon, Text, Overlay, Image } from "react-native-elements";
import Colors from "../Utils/Colorss";
import Styles from './Styless';
import Config from '../Utils/Config';
const { width, height } = Dimensions.get("window");

export default class GlobalButton extends Component {
    render() {
        const { ButtonTitle, ButtonType, ButtonWidth, onButtonPress, ButtonHeight, Bottoncolor, buttonStyle, disabled } = this.props
        return (
            <View style={{ width: ButtonWidth, justifyContent: 'center', }}>
                <Button
                    disabled={disabled}
                    disabledTitleStyle={[Styles().SolidButtonText, { color: Colors.White }]}
                    disabledStyle={[Styles().ButtonStyle, { height: ButtonHeight ? ButtonHeight : height / 20, backgroundColor: Colors.Grey94, borderColor: Colors.trans }]}
                    titleStyle={[Styles().SolidButtonText, { color: ButtonType == 'solid' ? Colors.White : Bottoncolor }]}
                    buttonStyle={[Styles().ButtonStyle, { height: ButtonHeight ? ButtonHeight : height / 20, backgroundColor: ButtonType == 'solid' ? Bottoncolor : Colors.trans, borderColor: Bottoncolor }]}
                    title={ButtonTitle}
                    type={ButtonType}
                    onPress={onButtonPress}
                />
            </View>
        );
    }
}