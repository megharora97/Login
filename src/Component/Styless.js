import { StyleSheet, Dimensions } from 'react-native';
import Fonts from '../Utils/CustomFonts';
import Config from '../Utils/Config';
import Colors from '../Utils/Colorss';
const { height, width } = Dimensions.get('window');

export default StyleSheet.create(props => ({
    container: { flex: 1, backgroundColor: Colors.White, alignItems: 'center' },
    container1:{ flex: 1, backgroundColor: Colors.Grey1, alignItems: 'center' },
    LoginInputView: { flexDirection: 'row', marginHorizontal: Config.margin, marginBottom: Config.margin },
    input_style: { height: (height / 15) - (Config.TitleSmallFontSize) - (Config.margin), paddingBottom: -10, paddingTop: -10, color: Colors.Black, fontFamily: Fonts.GeometricRegular, fontSize: Config.TitleSemiBigFontSize, minHeight: 0 },
    loginInputstyle: { height: '100%', paddingBottom: -10, paddingTop: -10 },
    LoginInputView: { flexDirection: 'row', marginHorizontal: Config.margin, marginBottom: Config.margin },
    ProductCategoryPickerText: { fontWeight:'bold', color: Colors.Black, },
    measureWindow2: { overflow: 'hidden', height: height / 20, width: '90%', },
    PickerChildContainer: { width: '100%', height: '100%', alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', },
    SolidButtonText: {  fontFamily: Fonts.product },
    ButtonStyle: { borderWidth: 1, borderRadius: Config.borderradius, marginBottom: Config.margin },
    LabelStyle: { color: Colors.Pinkk },
    DefaultErrorStyle: { height: 0, margin: 0 },
    IPIconDefaultContainerStyle: { height: 'auto', marginVertical: 0, paddingHorizontal: Config.margin },

    //-------------------- GlobalCheckbox -------------------------------------
    GlobalCheckboxTextStyle: {  fontFamily: Fonts.GeometricRegular, fontWeight: 'normal', flex: 1, flexWrap: 'wrap', height: '100%', textAlignVertical: 'center', marginLeft: Config.margin, marginRight: 0 },
    CheckBoxContainerStyle: { margin: 0, marginLeft: 0, marginRight: 0, padding: Config.margin, borderWidth: 0, backgroundColor: Colors.White },
    available: { backgroundColor: Colors.Grey89, borderColor: Colors.Grey, borderRadius: 1, padding: Config.borderradius },
    AvailableText: { fontSize: height/50, color: Colors.Grey, fontFamily: Fonts.GeometricSemiBold },


    // -------------------Loader -------------------
    loadingAvatar: { paddingBottom: height / 10, justifyContent: 'center', alignItems: 'center', position: 'absolute', height: height, width: '100%', },
    ImageMy: { width: height / 15, height: height / 15, backgroundColor: Colors.trans, },
    Loader: { backgroundColor: Colors.trans, justifyContent: 'center', alignItems: 'center', width: height / 8, height: height / 8, borderRadius: height / 10, }
}));