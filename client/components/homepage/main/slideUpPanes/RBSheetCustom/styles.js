import { StyleSheet, Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");

export default StyleSheet.create({
    topRow: {
        minHeight: 45,
        marginTop: 20,
        borderBottomColor: "lightgrey",
        borderBottomWidth: 2,
        paddingBottom: 10
    },
    rightLikeIcon: {
        position: "absolute",
        right: 10,
        top: -7.5
    },
    peopleText: {
        marginTop: 5,
        fontWeight: "bold",
        marginLeft: 10
    },
    underlay: {
        flexDirection: "row", 
        justifyContent: "center", 
        alignItems: "center", 
        marginTop: 10
    },
    comment: {
        marginTop: 10
    },
    avatar: {
        minWidth: 50,
        maxWidth: 50,
        maxHeight: 50,
        minHeight: 50,
        borderRadius: 40
    },
    addFriendBtn: {
        minWidth: 100, 
        justifyContent: "center", 
        alignContent: "center", 
        alignItems: "center"
    },
    lottiContainer: {
        justifyContent: "center",
        alignItems: "center", 
        alignContent: "center",
        maxHeight: 70,
        maxWidth: 55
    },
    popoverTwo: {
        width: width * 0.95,
        height: 70,
        borderRadius: 20,
        flexDirection: "row"
    },
    replyName: {
        fontWeight: "bold", 
        marginTop: 5, 
        marginLeft: 10
    },
    likeTouch: {
        marginLeft: 15
    }
})