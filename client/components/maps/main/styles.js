import { StyleSheet, Dimensions } from "react-native";


const { width, height } = Dimensions.get("window");


export default StyleSheet.create({
    outterContainer: {
        height: "100%",
        width
    },
    map: {
        width,
        height: "100%"
    },
    headerIcon: {
        maxWidth: 35,
        maxHeight: 35
    },
    searchBar: {
        width: width * 0.85,
        height: 50
    },
    hideTouchOutter: {
        width: width * 0.15
    },
    row: {
        flexDirection: "row",
        height: 55
    },
    headerIconTwo: {
        maxWidth: 35,
        maxHeight: 35,
        position: "absolute",
        right: 15
    },
    hideTouch: {
        maxWidth: 50,
        maxHeight: 50
    },
    slide: {
        width: "100%",
        height: 225,
        backgroundColor: "#ffffff"
    },
    containerCustom: {
        position: "absolute",
        bottom: 75,
        right: 25,
        left: 25
    },
      /******** card **************/
    card:{
        shadowColor: '#00000021',
        shadowOffset: {
            width: 2
        },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        marginVertical: 8,
        backgroundColor:"white",
        flexBasis: '47%',
        marginHorizontal: 5,
    },
    cardHeader: {
        paddingVertical: 17,
        paddingHorizontal: 16,
        borderTopLeftRadius: 1,
        borderTopRightRadius: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    cardContent: {
        paddingVertical: 12.5,
        paddingHorizontal: 16,
    },
    cardFooter:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 12.5,
        paddingBottom: 25,
        paddingHorizontal: 16,
        borderBottomLeftRadius: 1,
        borderBottomRightRadius: 1,
    },
    cardImage:{
        flex: 1,
        resizeMode: "cover",
        height: 175,
        width: null,
    },    
    /******** card components **************/
    title:{
        fontSize:18,
        flex:1,
    },
    price:{
        fontSize:16,
        color: "#0057ff",
        marginTop: 5
    },
    buyNow:{
        color: "purple",
    },
    icon: {
        width:25,
        height:25,
    },
    /******** social bar ******************/
    socialBarContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        flex: 1
    },
    socialBarSection: {
        justifyContent: 'center',
        flexDirection: 'row',
        flex: 1,
    },
    socialBarlabel: {
        marginLeft: 8,
        alignSelf: 'flex-end',
        justifyContent: 'center',
    },
    socialBarButton:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    }
}); 