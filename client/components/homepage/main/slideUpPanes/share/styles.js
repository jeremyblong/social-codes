import { StyleSheet, Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");

export default StyleSheet.create({
    customRow: {
        flexDirection: "row"
    },
    margin: {
        margin: 15,
        flex: 1
    },
    mediumColumn: {
        width: width * 0.50
    },
    underbody: {
        marginTop: 25
    },
    suggestionsRowContainer: {
        flexDirection: 'row',
    },
    userAvatarBox: {
        width: 35,
        paddingTop: 2
    },
    userIconBox: {
        height: 45,
        width: 45,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#54c19c'
    },
    usernameInitials: {
        color: '#fff',
        fontWeight: '800',
        fontSize: 14
    },
    userDetailsBox: {
        flex: 1,
        justifyContent: 'center',
        paddingLeft: 10,
        paddingRight: 15
    },
    displayNameText: {
        fontSize: 13,
        fontWeight: '500'
    },
    usernameText: {
        fontSize: 12,
        color: 'rgba(0,0,0,0.6)'
    },
    textareabox: {
        borderWidth: 2, 
        borderColor: "grey", 
        borderRadius: 30,
        paddingLeft: 10,
        paddingTop: 15
    },
    loadingProfileOutter: {
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center"
    },
    loadingProfilePic: { 
        borderRadius: 40,
        padding: 10,
        backgroundColor: "lightgrey",
        minHeight: 50,
        minWidth: 50,
        maxWidth: 50
    },
    myProfileBtn: {
        flexDirection: "row",
        padding: 5,
        borderWidth: 2,
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        borderColor: "grey",
        width: "85%",
        minWidth: 100,
        minHeight: 30
    },
    nameText: {
        fontWeight: "bold",
        fontSize: 18
    },
    expandSmall: {
        maxWidth: 20,
        maxHeight: 20
    }
})