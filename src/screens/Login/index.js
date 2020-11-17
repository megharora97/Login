import React, { Component } from 'react';
import { Dimensions, Image as I, Alert, FlatList, ScrollView, StatusBar, Keyboard, TouchableOpacity, SafeAreaView, View, KeyboardAvoidingView, } from 'react-native';
import { Button, Image, Text, Icon, Input, Divider } from 'react-native-elements';
import Colors from '../../Utils/Colorss';
import Fonts from '../../Utils/CustomFonts';
import axios from 'axios';
import Config from '../../Utils/Config';
import Styles from '../../Component/Styless';
import TextJson from '../../Component/TextJson';
import GlobalButton from '../../Component/GlobalButtom';
import GlobalInput from '../../Component/GlobalInput';
import Snackbar from 'react-native-paper/lib/module/components/Snackbar';
import { callLoginApi, } from '../../Services/Api';
import AsyncStorage from '@react-native-community/async-storage';
import Loader from '../../Component/Loader';
import { StackActions } from '@react-navigation/native';

const { height, width } = Dimensions.get('window');

let FocusValue = null;
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            Email_error: '',
            Password: '',
            Password_error: '',
            securePass: true,
            visible: false,
            ErrorMessage: '',
            loading: false,


        }
    }

    async UNSAFE_componentWillMount() {
        const Logged = JSON.parse(await AsyncStorage.getItem('userInfo1'))
        if (Logged) {
            this.setState({ loading: true })
            this.props.navigation.dispatch(
                StackActions.replace('Home', {
                    user: 'megha',
                })
            );
        }
    }



    LoginApi(email, Password) {
        this.setState({ loading: true })
        callLoginApi(email, Password)
            .then((res) => {
                this.setState({ loading: false })
                console.log('callLoginApi Success res1 :- ', res);
                if (res.status === "Success") {
                    let Response = res
                    if (Response && Response != '') {
                        console.log("callLoginApi Response", Response);
                        this.senddata(Response)
                    }
                } else {
                    alert(res.result)
                }
            })
            .catch((error) => {
                this.setState({ loading: false })
                console.log('error in callLoginApi', error);
                alert(error)
            })
    }

    async senddata(Response) {
        console.log("Response", Response);
        await AsyncStorage.setItem('userInfo1', JSON.stringify(Response))
        this.props.navigation.push('Home',)
    }

    validateEmail(email) {
        console.log('validateEmail :- ' + email);
        var Email_Regex = Config.EmailRegex;
        return Email_Regex.test(email);
    }

    validateLoginFields() {
        Keyboard.dismiss();
        const { email, Email_error, Password, Password_error, } = this.state;
        console.log('email', email, 'Password', Password);
        this.setState({ Email_error: '', Password_error: '' })

        let EmailN = ''
        if (email) { EmailN = email.trim() }
        let EmailValid = false
        if (EmailN) { EmailValid = this.validateEmail(EmailN) }
        let PasswordN = ''
        if (Password) { PasswordN = Password.trim() }
        if (PasswordN) { PasswordN = String(PasswordN) }


        if (!EmailN && !PasswordN) {
            this.setState({ ErrorMessage: 'Please Enter email & Password' })
            this._onToggleSnackBar();
            FocusValue = this.EmailInput
        }
        else if (!EmailN) {
            this.setState({ ErrorMessage: 'Please Enter email Address' })
            this._onToggleSnackBar();
            FocusValue = this.EmailInput
        }
        else if (!EmailValid) {
            this.setState({ ErrorMessage: 'Please Enter Valid email Address' })
            FocusValue = this.EmailInput
            this._onToggleSnackBar();
        }
        else if (!PasswordN) {
            this.setState({ ErrorMessage: 'Please Enter Password' })
            FocusValue = this.PasswordInput
            this._onToggleSnackBar();
        }
        else if (PasswordN.length < 3) {
            this.setState({ ErrorMessage: 'Minimum 6 Characters are required' })
            FocusValue = this.PasswordInput
            this._onToggleSnackBar();
        }
        else {
            this.EmailInput.clear(); this.PasswordInput.clear(); this.setState({ email: '', Password: '', Confirmpassword: '' });
            this.LoginApi(email, Password)
        }
    }


    FocusToFields() {
        FocusValue.focus();
    }

    _onToggleSnackBar = () => {
        setTimeout(() => {
            this.setState(state => ({ visible: !state.visible }));
        }, 300);
    };

    _onDismissSnackBar = () => this.setState({ visible: false });

    render() {
        const { email, Email_error, loading, Password, Password_error, securePass, visible, ErrorMessage } = this.state;

        return (
            <SafeAreaView style={Styles().container}>
                <KeyboardAvoidingView style={{ flex: 1, width: '100%' }} >
                    <ScrollView style={{ flex: 1, width: '100%' }} keyboardShouldPersistTaps='handled' showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>

                        <View style={{ height: height / 2.5, width: width, justifyContent: 'flex-end', alignItems: 'center', }}>
                            <Text style={{ fontSize: height / 30, fontWeight: 'bold' }}>{TextJson.Welcome}</Text>
                            <Text style={{ fontSize: height / 45, marginVertical: height / 30 }}>{TextJson.Login}</Text>
                        </View>

                        <View style={{ width: width, justifyContent: 'center', alignItems: 'center', }}>
                            <View style={{ width: '90%', justifyContent: 'center', alignItems: 'center' }}>

                                <View style={{ marginBottom: Config.margin }}>
                                    <View style={Styles().LoginInputView}>
                                        <GlobalInput
                                            AutoCapitalize="none"
                                            InputStyle={Styles().input_style, Styles().loginInputstyle}
                                            OnChangeText={value => this.setState({ email: value, Email_error: '' })}
                                            Value={email}
                                            SecureTextEntry={false}
                                            KeyboardType='email-address'
                                            Label={'Email'}
                                            ReturnKeyType='next'
                                            OnSubmitEditing={() => this.PasswordInput.focus()}
                                            Ref={input => (this.EmailInput = input)}
                                            Placeholder='Email'
                                            ErrorMessage={Email_error}
                                        />
                                    </View>


                                    <View style={Styles().LoginInputView}>
                                        <GlobalInput
                                            RightIcon={
                                                <Icon
                                                    underlayColor='transparent'
                                                    type={!securePass ? "simple-line-icon" : 'material-community'}
                                                    name={!securePass ? "eye" : 'eye-off-outline'}
                                                    color="grey"
                                                    size={height / 35}
                                                    onPress={() => this.setState({ securePass: !securePass })}
                                                />}
                                            SecureTextEntry={securePass}
                                            AutoCapitalize="none"
                                            InputStyle={Styles().input_style, Styles().loginInputstyle}
                                            OnChangeText={value => this.setState({ Password: value, Password_error: '' })}
                                            Value={Password}
                                            KeyboardType='default'
                                            Label={'Password'}
                                            ReturnKeyType='done'
                                            Ref={input => (this.PasswordInput = input)}
                                            Placeholder='Password'
                                            ErrorMessage={Password_error}
                                        />
                                    </View>
                                </View>


                                <View style={{ alignItems: 'center' }}>
                                    <GlobalButton
                                        disabled={email && Password ? false : true}
                                        ButtonTitle="LOG IN"
                                        ButtonType='solid'
                                        ButtonWidth={width - (Config.margin * 2)}
                                        Bottoncolor={Colors.Orange5}
                                        onButtonPress={() => this.validateLoginFields()}
                                    />
                                </View>
                            </View>
                            {!loading ?
                                <View />
                                : <Loader />
                            }

                            <Snackbar
                                visible={visible}
                                onDismiss={this._onDismissSnackBar}
                                style={{ backgroundColor: Colors.overlay }}
                                action={{
                                    label: 'Dismiss',
                                    onPress: () => {
                                        this.FocusToFields();
                                        this._onDismissSnackBar
                                    },
                                }}
                            >
                                {ErrorMessage}

                            </Snackbar>

                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
        );
    }
}

export default Login

