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
import { getLanguageApi, getServiceApi } from '../../Services/Api';
import GlobalDropdown from '../../Component/GlobalDropdown'
import NetInfo from "@react-native-community/netinfo";


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
        // const User1 = JSON.parse(await AsyncStorage.getItem('userInfo1'))
        // console.log("User1 profile", User1);
        // if (User1) {  this.setState({ User1: User1 }) }


        const Lang = JSON.parse(await AsyncStorage.getItem('LanguageJson'))
        console.log('Lang', Lang);
        const Serve = JSON.parse(await AsyncStorage.getItem('ServiceJson'))
        console.log('Serve', Serve);

        if (this.state.connection_status) {
            this.LanguageApi()
            this.ServiceApi()
        }
        else {
            if (Lang && Lang != '') { this.setState({LanguageJson:Lang}) }
            if (Serve && Serve != '') { this.setState({ServiceJson:Serve}) }
        }

    }

    logout = async () => {
        AsyncStorage.clear()
        this.props.navigation.navigate("Login");
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
                            jsonfile: item.file
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


    ServiceApi() {
        this.setState({ loading: true })
        getServiceApi()
            .then(async (res) => {
                this.setState({ loading: false })
                console.log('ServiceApi Success res1 :- ', res);
                let Response = res
                if (Response && Response != '') {
                    let ServiceData = Response
                    console.log("ServiceApi Response", Response);

                    let ServiceJson = []
                    if (ServiceData && ServiceData != '') {
                        ServiceData.map((item, index) => {
                            ServiceJson.push({
                                Id: item.id,
                                Icon: item.icon,
                                value: item.service
                            })
                        })
                        console.log("ServiceJson", ServiceJson);
                    }
                    this.setState({ ServiceJson: ServiceJson })
                    await AsyncStorage.setItem('ServiceJson', JSON.stringify(ServiceJson))
                }
            })
            .catch((error) => {
                this.setState({ loading: false })
                console.log('error in ServiceApi', error);
                alert(error)
            })
    }

    async StoreselectedLang(dataa, index) {
        console.log("indexStoreselectedLang", index,);
        console.log("item==Selected_Lang=====>", dataa)
        const { LanguageJson } = this.state;
        console.log('LanguageJson', LanguageJson);
        let Flag = LanguageJson[index].flagicon
        this.setState({ Selected_Lang: dataa, Flag: Flag })
    }

    async StoreSelected_Service(dataa1, index) {
        console.log("indexStoreSelected_Service", index,);
        console.log("item==StoreSelected_Service=====>", dataa1)
        const { ServiceJson } = this.state;
        console.log('ServiceJson', ServiceJson);
        let Icon1 = ServiceJson[index].Icon
        this.setState({ Selected_Service: dataa1, Icon1: Icon1 })
    }


    render() {
        const { LanguageJson, ServiceJson, Selected_Service, data, Selected_Lang, Icon1, Flag } = this.state;
        console.log("Selected_Service", Selected_Service, "ServiceJson", ServiceJson);


        return (
            <SafeAreaView style={Styles().container}>
                <KeyboardAvoidingView style={{ flex: 1, width: '100%' }} >
                    <ScrollView style={{ flex: 1, width: '100%' }} keyboardShouldPersistTaps='handled' showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
                        <View >
                            <Text style={[Styles().ProductCategoryPickerText, { fontSize: height / 40, textAlign: 'center', margin: Config.margin }]} >{TextJson.SelectLanguage}</Text>
                        </View>

                        < View style={[Styles().measureWindow2, { paddingHorizontal: Config.margin / 2, marginLeft: Config.margin, borderBottomWidth: Selected_Lang ? 1.5 : 0, borderBottomColor: Selected_Lang ? Colors.Pinkk : Colors.Grey74, }]}>
                            {LanguageJson && LanguageJson.length > 0 ?
                                <GlobalDropdown
                                    SelectedValue={Selected_Lang ? Selected_Lang : LanguageJson[0].value}
                                    Data={LanguageJson}
                                    Viewstyle={{ width: '90%' }}
                                    ItemonPress={(dataa, index) => this.StoreselectedLang(dataa, index)}
                                    IconColor={Colors.Black}
                                    FontFamily={Fonts.GeometricSemiBold}
                                    IconNeeded={true}
                                    containerstylewidth={'100%'}
                                    heightstyle={(height - (Config.margin)) / 25}
                                    ImageAvailable={true}
                                    ImageUrl={Flag ? Flag : LanguageJson[0].flagicon}
                                />
                                : null
                            }
                        </ View>

                        < View style={[Styles().measureWindow2, { flexDirection: 'row', paddingHorizontal: Config.margin / 2, marginLeft: Config.margin, borderBottomWidth: Selected_Service ? 1.5 : 0, borderBottomColor: Selected_Service ? Colors.Pinkk : Colors.Grey74, }]}>
                            {Selected_Lang  && ServiceJson && ServiceJson.length > 0 ?
                                <GlobalDropdown
                                    SelectedValue={Selected_Service ? Selected_Service : ServiceJson[0].value}
                                    Data={ServiceJson}
                                    Viewstyle={{ width: '90%', }}
                                    ItemonPress={(dataa1, index) => this.StoreSelected_Service(dataa1, index)}
                                    IconColor={Colors.Black}
                                    FontFamily={Fonts.GeometricSemiBold}
                                    IconNeeded={true}
                                    containerstylewidth={'100%'}
                                    heightstyle={(height - (Config.margin)) / 40}
                                    ImageAvailable={true}
                                    ImageUrl={Icon1 ? Icon1 : ServiceJson[0].Icon}
                                />
                                : null
                            }
                        </ View>
                    </ScrollView>
                    <View >
                        <Text style={[Styles().ProductCategoryPickerText, { position: 'absolute', bottom: 0, fontSize: height / 40, textAlign: 'center', margin: Config.margin }]} >{this.state.connection_status ? '' : 'Disconnected'}</Text>
                    </View>
                    <View style={{ alignItems: 'center' }}>
                        <GlobalButton
                            ButtonTitle="LOG OUT"
                            ButtonType='solid'
                            ButtonWidth={width - (Config.margin * 2)}
                            Bottoncolor={Colors.Orange5}
                            onButtonPress={() => this.logout()}
                        />
                    </View>
                </KeyboardAvoidingView>

            </SafeAreaView>
        );
    }
}

export default Home