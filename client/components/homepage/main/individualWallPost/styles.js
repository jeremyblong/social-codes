import { StyleSheet, Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");

export default StyleSheet.create({
    profilePicHeader: {
        minWidth: 45, 
        minHeight: 45, 
        maxWidth: 45, 
        maxHeight: 45, 
        borderRadius: 35
    },
    inputBox: {
        flexDirection: "row", 
        width: "100%",
        borderWidth: 1, 
        borderColor: "#cecece", 
        padding: 5
    },
    maxedAnimationBoxHeader: {
        minWidth: 45, 
        minHeight: 45, 
        maxWidth: 45, 
        backgroundColor: "#ffffff",
        borderRadius: 20,
        maxHeight: 45
    },
    mapCustom: {
        width: width * 1.05,
        marginTop: 25,
        height: 225,
        marginLeft: -20,
        borderWidth: 3,
        borderColor: "black"
    },
    postVideoStyles: {
        height: 325,
        minWidth: width * 1.05,
        minHeight: 325,
        width: width * 1.05,
        marginLeft: -20,
        marginTop: 25
    },
    selectedImage: {
        maxWidth: 75,
        minWidth: 75,
        minHeight: 75,
        maxHeight: 75
    },
    touchable: {
        position: "absolute",
        top: -20, 
        left: -15
    },
    touchImage: {
        maxWidth: 35,
        left: -3,
        top: 5,
        position: "absolute",
        maxHeight: 30
    },
    pictureTouch: {
        width: "10%",
        padding: 5,
        height: 25
    },
    pictureTouchTwo: {
        width: "12%",
        height: 40,
        padding: 5
    },
    input: {
        padding: 10,
        width: "75%",
        top: -30
    },
    sendImage: {
        maxWidth: 30, 
        maxHeight: 30,
        tintColor: "#0057ff"
    },
    lottiContainer: {
        justifyContent: "center",
        alignItems: "center", 
        alignContent: "center",
        maxHeight: 70,
        maxWidth: 47.5
    },
    likeCount: {
        marginTop: 5,
        marginLeft: 10,
        fontWeight: "bold"
    },
    popover: {
        width: width * 0.95,
        height: "100%",
        padding: 10,
        backgroundColor: "white"
    },
    popoverTwo: {
        width: width * 0.95,
        height: 70,
        borderRadius: 20,
        flexDirection: "row"
    },
    animationContainerHeader: {
        marginRight: 15
    },
    container: {
        minHeight: height,
        backgroundColor: "white"
    },
    header: {
        backgroundColor: "#303030"
    },
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
    bodyBody: {
        backgroundColor: "#ededed", 
        padding: 10,
        flex: 1,
        borderRadius: 25
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
    commentImage: {
        maxWidth: 125,
        marginTop: 12.5,
        maxHeight: 150,
        minWidth: 125,
        minHeight: 150
    },
    thumbnailImage: {
        minWidth: 45, 
        minHeight: 45,
        maxWidth: 45,
        maxHeight: 45,
        borderRadius: 25
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