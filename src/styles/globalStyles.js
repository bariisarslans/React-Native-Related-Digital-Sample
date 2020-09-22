import { StyleSheet, Platform, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

export const color = {
    primary: "#369",
    background: "#fff",
    text: "#333",
    buttonText: "#fff",
    white: "#fff",
    success: "#1CE85C"
};

export default StyleSheet.create({
    container: {
        flex: 1
    },
    containerCenter: {
        flex: 1, justifyContent: 'center'
    },
    containerItemCenter: {
        flex: 1, justifyContent: 'center', alignItems: 'center'
    },
    droidSafeArea: {
        paddingTop: Platform.OS === 'android' ? 25 : 0
    },
    center: {
        justifyContent: 'center', alignItems: 'center'
    },
    blackBg: {
        backgroundColor: '#000'
    },
    grayBg: {
        backgroundColor: '#999'
    },
    whiteBg: {
        backgroundColor: '#FFF'
    },
    transparentBg: {
        backgroundColor: 'rgba(0,0,0,0)'
    },
    row: {
        flexDirection: 'row'
    },
    title: {
        fontSize: 20,
        color: '#333',
        textAlign: 'center',
        margin: 10,
    },
    subtitle: {
        fontSize: 15,
        color: '#000',
        textAlign: 'center',
        margin: 10,
    },
    header: {
        color: '#000',
        fontSize: 25,
        margin: 5,
    },
    whitehHeader: {
        color: '#fff',
        fontSize: 25,
        margin: 5,
    },
    RD: {
        fontSize: 30,
        fontWeight: "bold",
        color: color.primary
    },
    hr: {
        width: "100%",
        height: 1,
        borderColor: "gray",
        borderWidth: .5
    },
    vr: {
        height: 35,
        width: 0,
        borderWidth: 1,
        borderRadius: 1,
        borderColor: "gray",
    },
    input: {
        borderColor: color.primary,
        borderWidth: 1,
        width: '90%',
        height: 40,
        padding: 5,
        paddingLeft: 20,
        borderRadius: 20,
        backgroundColor: '#fff',
        // marginBottom:10,
    },
    button: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
        padding: 10,
        backgroundColor: color.primary,
        borderRadius: 30,
        marginBottom: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    horPadding: {
        paddingHorizontal: 15
    },
    ScrollView: {
        marginHorizontal: 10,
        marginTop: 10,
        flex: 1,
        flexDirection: "column",
        // height: '100%',
        borderRadius: 7
    },
    menuItem: {
        flex: 1,
        textAlign: 'center',
    },
    red: {
        color: 'red',
    },
    white: {
        color: "#fff"
    },
    searchButton: {
        padding: 5,
        borderRadius: 15,
        backgroundColor: color.primary,
    },
    buttonText: {
        color: color.buttonText,
        fontSize: 13
    },
    productText: {
        color: 'black',
        fontSize: 20,
        width: '100%',
        fontWeight: '400',
        justifyContent: 'center',
        textAlign: 'center',
        margin: 5
    },
    slideItem: {
        height: 200,
        width: "100%",
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    addToCartBtn: {
        width,
        height: height * .1,
        backgroundColor: '#1fc8db',
        position: 'absolute',
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center'
    },
    linkButton: {
        position: "absolute",
        bottom: 15,
        width: width,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: 10,
    },
    linkButtonText: {
        fontSize: 15,
        textDecorationLine: 'underline',
        color: color.primary,
    },
    logoXL: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
    },
    customClearButton: {
        position: "absolute",
        fontWeight: "bold",
        right: 10,
        color: 'gray',
    },
    inputRowContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
})
