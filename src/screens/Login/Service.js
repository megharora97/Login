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
import { StackActions } from '@react-navigation/native';
import { ActivityIndicator } from 'react-native-paper';


const { height, width } = Dimensions.get('window');

class Service extends React.Component {
    NetInfoSubscription = null;
    constructor(props) {
        super(props);
        this.state = {
            isLoggedin: false,
            User1: '',
            Languages: [],
            ServiceJson: [],
            Selected_Lang: '',
            Selected_Service: '',
            connection_status: false,
            connection_type: null,
            connection_net_reachable: false,
            connection_wifi_enabled: false,
            connection_details: null,
            lang: {},
            lan: [],
            loading: true
        }
    }


    componentDidMount() {
        const { route } = this.props;
        console.log('route', route);

        let lan1 = route && route.params && route.params.Lang
        console.log('lan', lan1);
        this.setState({ lan: lan1 })

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

        const Serve = JSON.parse(await AsyncStorage.getItem('ServiceJson'))
        console.log('Serve', Serve);

        if (this.state.connection_status) {
            this.ServiceApi()
        }
        else {
            if (Serve && Serve != '') { this.setState({ ServiceJson: Serve }) }
        }

    }

    logout = async () => {
        AsyncStorage.clear()
        this.props.navigation.dispatch(
            StackActions.replace('Login', {
                user: 'megha',
            }))
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


    renderlang = ({ item, index }) => {
        console.log('renderlang', item);
        return (
            <View style={{ borderBottomColor: Colors.Grey94, borderBottomWidth: 0.19, paddingVertical: Config.margin }}>
                <Text style={{ textAlign: 'center', fontSize: height / 50 }}>{item}</Text>
            </View>
        )
    }



    renderService = ({ item, index }) => {

        return (

            <View style={{ flexDirection: 'row', marginBottom: Config.margin, borderBottomColor: Colors.Grey94, borderBottomWidth: 0.19, maxHeight: height / 3, }}>
                <View style={{ marginHorizontal: Config.margin, justifyContent: 'center' }}>
                    <Image
                        source={{ uri: item.Icon }}
                        style={{ width: height / 40, height: height / 40, }}
                        placeholderStyle={{ backgroundColor: Colors.trans }}
                        resizeMode='contain'
                        resizeMethod='resize'
                    />
                </View>
                <View style={{ paddingVertical: Config.margin / 1.2 }}>
                    <Text style={{ textAlign: 'center', fontSize: height / 50 }}>{item.value}</Text>
                </View>
            </View>
        )
    }


    render() {
        const { ServiceJson, User1, Languages, lan, loading } = this.state;
        console.log("ServiceJsonrender", ServiceJson, Languages, 'lanrender', lan);
        let Data1 = Object.values(lan)
        console.log('Data1', Data1);


        return (
            <SafeAreaView style={Styles().container1}>
                {loading ? <ActivityIndicator size={"large"} color={Colors.Pinkk} /> :

                    <KeyboardAvoidingView style={{ flex: 1, width: '100%' }} >
                        <View style={{}}>
                            <Text style={[Styles().ProductCategoryPickerText, { fontSize: height / 40, textAlign: 'center', margin: Config.margin }]} >{TextJson.Details}</Text>
                        </View>

                        <View style={{ alignSelf: 'center', backgroundColor: Colors.White, width: width, marginBottom: Config.margin, flex: 0.4 }}>
                            <Text style={[Styles().ProductCategoryPickerText, { margin: Config.margin }]} >{TextJson.Cid} {User1.cid}</Text>
                            <Text style={[Styles().ProductCategoryPickerText, { margin: Config.margin }]} >{TextJson.CUSTOMERID} {User1.customer_id}</Text>
                            <Text style={[Styles().ProductCategoryPickerText, { margin: Config.margin }]} >{TextJson.TOKEN}{User1.token}</Text>
                        </View>

                        <ScrollView style={{ flex: 0.37, width: '100%', marginBottom: Config.margin }} keyboardShouldPersistTaps='handled' showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
                            <View style={{ alignSelf: 'center', backgroundColor: Colors.White, width: width }}>
                                {ServiceJson && ServiceJson != '' ?
                                    <FlatList
                                        showsVerticalScrollIndicator={false}
                                        showsHorizontalScrollIndicator={false}
                                        data={ServiceJson}
                                        keyExtractor={(item, index) => index.toString()}
                                        renderItem={ServiceJson ? this.renderService : null}
                                    />
                                    : null}
                            </View>
                        </ScrollView>


                        <ScrollView style={{ flex: 0.33, width: '100%', marginBottom: Config.margin / 1.5 }} keyboardShouldPersistTaps='handled' showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
                            <View style={{ alignSelf: 'center', backgroundColor: Colors.White, width: width }}>
                                {Data1 && Data1 != '' ?
                                    <FlatList
                                        showsVerticalScrollIndicator={false}
                                        showsHorizontalScrollIndicator={false}
                                        data={Data1}
                                        keyExtractor={(item, index) => index.toString()}
                                        renderItem={Data1 ? this.renderlang : null}
                                    />
                                    : null}
                            </View>
                        </ScrollView>


                        <View style={{ alignSelf: 'center', flex: 0.15 }}>
                            <GlobalButton
                                ButtonTitle="LOG OUT"
                                ButtonType='solid'
                                ButtonWidth={width - (Config.margin * 2)}
                                Bottoncolor={Colors.Orange5}
                                onButtonPress={() => this.logout()}
                            />
                        </View>
                    </KeyboardAvoidingView>
                }
            </SafeAreaView>
        );
    }
}

export default Service