import React, { Component } from 'react';
import { Dimensions, FlatList, ScrollView, SafeAreaView, View, KeyboardAvoidingView, } from 'react-native';
import { Button, Image, Text, Icon, Input } from 'react-native-elements';
import Colors from '../../Utils/Colorss';
import Fonts from '../../Utils/CustomFonts';
import axios from 'axios';
import Config from '../../Utils/Config';
import Styles from '../../Component/Styless';
import TextJson from '../../Component/TextJson';
import GlobalInput from '../../Component/GlobalInput';
import GlobalButton from '../../Component/GlobalButtom';
import Snackbar from 'react-native-paper/lib/module/components/Snackbar';
import AsyncStorage from '@react-native-community/async-storage';
import Loader from '../../Component/Loader';
import { getLanguageApi, getServiceApi, getLanguages } from '../../Services/Api';
import GlobalDropdown from '../../Component/GlobalDropdown'
import NetInfo from "@react-native-community/netinfo";
import GlobalCheckbox from '../../Component/GlobalCheckbox';
import { ActivityIndicator } from 'react-native-paper';


const { height, width } = Dimensions.get('window');

class Home extends React.Component {
    NetInfoSubscription = null;
    constructor(props) {
        super(props);
        this.state = {
            isLoggedin: false,
            User1: '',
            LanguageJson: [],
            ServiceJson: [],
            Selected_Lang: '',
            loading: true,
            Selected_Service: '',
            connection_status: false,
            connection_type: null,
            connection_net_reachable: false,
            connection_wifi_enabled: false,
            connection_details: null,
        }
    }


    componentDidMount() {
        this.NetInfoSubscription = NetInfo.addEventListener(
            this._handleConnectivityChange,
        );
    }

    componentWillUnmount() {
        this.NetInfoSubscription && this.NetInfoSubscription();
    }

    _handleConnectivityChange = (state) => {
        this.setState({
            connection_status: state.isConnected,
            connection_type: state.type,
            connection_net_reachable: state.isInternetReachable,
            connection_wifi_enabled: state.isWifiEnabled,
            connection_details: state.details,
        })
    }

    async UNSAFE_componentWillMount() {
        const User1 = JSON.parse(await AsyncStorage.getItem('userInfo1'))
        console.log("User1 profile", User1);
        if (User1) { this.setState({ User1: User1 }) }


        const Lang = JSON.parse(await AsyncStorage.getItem('LanguageJson'))
        console.log('Language', Lang);


        if (this.state.connection_status) {
            this.setState({ loading: true })
            this.LanguageApi()

        }
        else {
            if (Lang && Lang != '') { this.setState({ LanguageJson: Lang, loading: false }) }
        }

    }

    async LanguageApi() {
        this.setState({ loading: true })
        await getLanguageApi()
            .then(async (res) => {
                this.setState({ loading: false })
                console.log('getBannersApi res :- ', res);
                let LanguageData = res
                console.log("LanguageData", LanguageData);
                let LanguageJson = []
                if (LanguageData && LanguageData != '') {
                    LanguageData.map((item, index) => {
                        LanguageJson.push({
                            langid: item.lang_id,
                            value: item.lang_name,
                            flagicon: item.flag,
                            jsonfile: item.file,
                            Checked: false
                        })
                    })
                    console.log("LanguageJson", LanguageJson);
                }
                this.setState({ LanguageJson: LanguageJson })
                await AsyncStorage.setItem('LanguageJson', JSON.stringify(LanguageJson))
            })
            .catch((error) => {
                this.setState({ loading: false })
                alert(error)
            })
    }

    CheckLanguage(ind) {
        const { LanguageJson } = this.state
        console.log('LanguageJson', LanguageJson);
        LanguageJson.map((item, index) => {
            if (index === ind) {
                console.log('index', index, ind);
                item.Checked = true
            }
            else {
                item.Checked = false
            }
        })
        this.setState({ LanguageJson: LanguageJson })
    }

    async LanguagesApi(url, Data) {
        const { connection_status } = this.state;
        let Lan = ''
        let getdata = ''

        if (Data && Data.value) {
            Lan = Data.value
        }
        if (Lan) {
            const myData = await AsyncStorage.getItem(Lan, '')

            console.log('myData', myData);
            if (myData) { getdata = JSON.parse(myData) }
        }

        if (getdata && !connection_status) {
            this.props.navigation.navigate('Service', { Lang: getdata })
        }
        else {
            this.setState({ loading: true })
            await getLanguages(url)
                .then(async (res) => {
                    this.setState({ loading: false })
                    console.log('get LanguagesApi res :- ', url, res);
                    try {
                        AsyncStorage.setItem(Lan, JSON.stringify(res))
                        this.props.navigation.navigate('Service', { Lang: res })
                    } catch (error) {
                        console.log('SaveServiceDataerror', error);
                    }

                })
                .catch((error) => {
                    this.setState({ loading: false })
                    alert(error)
                })
        }

    }


    Continue() {
        let Data = ''
        let urll = ''
        const { LanguageJson } = this.state;
        LanguageJson.map((item, index) => {
            if (item.Checked) {
                Data = item
                urll = item.jsonfile
            }
        })
        console.log("Data", Data);
        if (urll) {
            this.LanguagesApi(urll, Data)
        }
        else {
            alert('Please Select Language')
        }
    }



    renderLanguage = ({ item, index }) => {
        const { LanguageJson } = this.state;
        console.log("LanguageJson123", LanguageJson);

        return (

            <View key={index} style={{ flexDirection: 'row', }}>
                <GlobalCheckbox
                    WrapperAlignment={{ alignItems: 'center' }}
                    Title={<View style={{ flexDirection: 'row' }}>
                        <View style={[
                            Styles().available, { alignSelf: 'flex-start' }]}>
                            <Text style={
                                Styles().AvailableText}>{item.value ? item.value : ''}</Text>
                        </View>
                    </View>}
                    CheckedIcon='md-radio-button-on'
                    UnCheckedIcon='md-radio-button-off'
                    IconType='ionicon'
                    CheckedColor={Colors.Pinkk}
                    ViewStyle={{ paddingVertical: 15 }}
                    Checked={LanguageJson.length > 0 ? LanguageJson[index].Checked : false}
                    OnPress={() => this.CheckLanguage(index)}
                />
            </View>
        )
    }


    render() {
        const { LanguageJson, ServiceJson, loading } = this.state;
        console.log("LanguageJsonrender", LanguageJson, "ServiceJsonrender", ServiceJson);


        return (
            <SafeAreaView style={Styles().container}>
                <KeyboardAvoidingView style={{ flex: 1, width: '100%' }} >
                    <ScrollView style={{ flex: 1, width: '100%' }} keyboardShouldPersistTaps='handled' showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
                        <View >
                            <Text style={[Styles().ProductCategoryPickerText, { fontSize: height / 40, textAlign: 'center', margin: Config.margin }]} >{TextJson.SelectLanguage}</Text>
                        </View>

                        {loading ? <ActivityIndicator size={"large"} color={Colors.Pinkk} /> :

                        <View style={{ marginBottom: Config.margin }} >
                            {LanguageJson && LanguageJson != '' ?
                                <FlatList
                                    showsVerticalScrollIndicator={false}
                                    showsHorizontalScrollIndicator={false}
                                    data={LanguageJson}
                                    extraData={this.state}
                                    keyExtractor={(item, index) => index.toString()}
                                    renderItem={LanguageJson ? this.renderLanguage : null}
                                />
                                : null}
                        </View>
                        } 

                    </ScrollView>
                    <View >
                        <Text style={[Styles().ProductCategoryPickerText, { position: 'absolute', bottom: 0, fontSize: height / 40, textAlign: 'center', margin: Config.margin }]} >{this.state.connection_status ? '' : 'Disconnected'}</Text>
                    </View>
                    <View style={{ alignItems: 'center' }}>
                        <GlobalButton
                            ButtonTitle="CONTINUE"
                            ButtonType='solid'
                            ButtonWidth={width - (Config.margin * 2)}
                            Bottoncolor={Colors.Orange5}
                            onButtonPress={() => this.Continue()}
                        />
                    </View>
                </KeyboardAvoidingView>

            </SafeAreaView >
        );
    }
}

export default Home