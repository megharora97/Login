import React, { Component } from 'react'
import { View, StyleSheet, ActivityIndicator, Dimensions, TouchableOpacity } from 'react-native'
import { Button, Input, Icon, Text, Image, CheckBox } from "react-native-elements";
import Colors from "../Utils/Colorss";
import Styles from './Styless';
import Config from '../Utils/Config';
import { Dropdown } from 'react-native-material-dropdown-v2';

const { width, height } = Dimensions.get("window");

export default class GlobalDropdown extends Component {
    render() {
        const { SelectedValue, Label, Viewstyle, containerstylewidth, ImageAvailable, ImageUrl, heightstyle, Fontsize, marginleftwidth, IconNeeded, FontFamily, borderwidth, IconColor, Data, ItemonPress, } = this.props
        return (
            <View style={Styles().PickerMainContainer}>
                <TouchableOpacity style={Styles().PickerChildContainer} >
                    <View>
                        {ImageAvailable ?
                            <Image
                                source={{ uri: ImageUrl }}
                                style={{ width: height / 35, height: height / 35, justifyContent: 'center' }}
                                placeholderStyle={{ backgroundColor: Colors.trans }}
                                resizeMode='contain'
                                resizeMethod='resize'
                            />
                            : null}
                    </View>
                    <View style={Viewstyle}>
                        <Dropdown
                            label={Label}
                            value={SelectedValue}
                            dropdownPosition={0}
                            dropdownOffset={{ top: 0, left: 0 }}
                            style={{ marginBottom: 0, backgroundColor: Colors.trans, borderBottomWidth: 0, height: heightstyle }}
                            underlineColor={"transparent"}
                            itemColor={Colors.Black}
                            itemTextStyle={[Styles().ProductCategoryPickerText, { fontSize: Fontsize, alignItems: 'center', fontFamily: FontFamily }]}
                            containerStyle={{
                                width: containerstylewidth,
                                backgroundColor: Colors.trans,
                                borderWidth: borderwidth,
                                borderColor: Colors.Grey50,
                            }}
                            valueExtractor={({ value }) => value}
                            rippleInsets={{ top: 0, bottom: 0, left: 0, right: 0 }}
                            onChangeText={ItemonPress}
                            data={Data}
                        />
                    </View>
                    <View>
                        {IconNeeded ?
                            <Icon
                                name={Config.DownArror}
                                type={Config.TypeArrow}
                                color={IconColor}
                                size={height / 50}
                            />
                            : null}
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

