import { StyleSheet, Dimensions, Platform } from "react-native";

const { height, width } = Dimensions.get("window");

export default StyleSheet.create({
    container: {
        width,
        height,
        backgroundColor: "white",
        zIndex: -1
    },
    textarea: {
        padding: 5,
        shadowColor: "#000",
        backgroundColor: "white",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,
        elevation: 9
    },
    markdown: {

    },
    goldText: {
        color: "#ffd530"
    },      
    positionTouchable: {
        position: "relative",
        top: 5,
        alignSelf: 'flex-start',
        marginBottom: 125,
        maxHeight: 45,
        left: 0,
        zIndex: 9999999999999999999999999999999999999
    },
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 0.5,
        borderColor: 'purple',
        borderRadius: 8,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
    label: {
        fontSize: 18, //
        textAlign: "left",
        marginBottom: 10,
        marginTop: 10
    },
    customModal: {
        marginTop: (height / 2) - 250,
        maxHeight: "100%",
        margin: 20, 
        backgroundColor: "white", 
        padding: 15, 
        height: height * 0.50
    },
    inputStyle: {
        backgroundColor: "white", 
        borderWidth: 2, 
        borderColor: "black", 
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,
        elevation: 9
    },
    modal: {
        shadowColor: "black",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        elevation: 24
    },
    margin: {
        margin: 15
    },
    tagged: {
        backgroundColor: "#E9EBEE",
        padding: 7.5,
        borderWidth: 1,
        borderColor: "grey",
        margin: 5
    },
    section: {
        width: "12.5%",
        borderRightColor: "lightgrey",
        borderRightWidth: 1,
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        borderTopColor: "lightgrey",
        borderTopWidth: 1,
        backgroundColor: "white"
    },
    textInputIcon: {
        maxWidth: 25,
        maxHeight: 25
    },  
    questionText: {
        fontWeight: "bold",
        marginBottom: 5
    },
    bullet: {
        fontSize: 15,
        marginBottom: 10
    },
    specialLetter: {
        color: "blue",
        fontSize: 18
    },
    accordianTitleText: {
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
        paddingBottom: 10
    },
    accordianSubText: {
        paddingBottom: 10
    },
    rowCustom: {
        flexDirection: "row",
        maxHeight: 40
    },
    headerText: {
        fontWeight: "bold"
    },
        // The main container
    body: {},

    // Headings
    heading1: {
        flexDirection: 'row',
        fontSize: 32,
    },
    heading2: {
        flexDirection: 'row',
        fontSize: 24,
    },
    heading3: {
        flexDirection: 'row',
        fontSize: 18,
    },
    heading4: {
        flexDirection: 'row',
        fontSize: 16,
    },
    heading5: {
        flexDirection: 'row',
        fontSize: 13,
    },
    heading6: {
        flexDirection: 'row',
        fontSize: 11,
    },

    // Horizontal Rule
    hr: {
        backgroundColor: '#000000',
        height: 1,
    },

    // Emphasis
    strong: {
        fontWeight: 'bold',
    },
    em: {
        fontStyle: 'italic',
    },
    s: {
        textDecorationLine: 'line-through',
    },

    // Blockquotes
    blockquote: {
        backgroundColor: '#F5F5F5',
        borderColor: '#CCC',
        borderLeftWidth: 4,
        marginLeft: 5,
        paddingHorizontal: 5,
    },

    // Lists
    bullet_list: {},
    ordered_list: {},
    list_item: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    // @pseudo class, does not have a unique render rule
    bullet_list_icon: {
        marginLeft: 10,
        marginRight: 10,
    },
    // @pseudo class, does not have a unique render rule
    bullet_list_content: {
        flex: 1,
    },
    // @pseudo class, does not have a unique render rule
    ordered_list_icon: {
        marginLeft: 10,
        marginRight: 10,
    },
    // @pseudo class, does not have a unique render rule
    ordered_list_content: {
        flex: 1,
    },

    // Code
    code_inline: {
        borderWidth: 1,
        borderColor: '#CCCCCC',
        backgroundColor: '#f5f5f5',
        padding: 10,
        borderRadius: 4,
        ...Platform.select({
        ['ios']: {
            fontFamily: 'Courier',
        },
        ['android']: {
            fontFamily: 'monospace',
        },
        }),
    },
    code_block: {
        borderWidth: 1,
        borderColor: '#CCCCCC',
        backgroundColor: '#f5f5f5',
        padding: 10,
        borderRadius: 4,
        ...Platform.select({
        ['ios']: {
            fontFamily: 'Courier',
        },
        ['android']: {
            fontFamily: 'monospace',
        },
        }),
    },
    fence: {
        borderWidth: 1,
        borderColor: '#CCCCCC',
        backgroundColor: '#f5f5f5',
        padding: 10,
        borderRadius: 4,
        ...Platform.select({
        ['ios']: {
            fontFamily: 'Courier',
        },
        ['android']: {
            fontFamily: 'monospace',
        },
        }),
    },

    // Tables
    table: {
        borderWidth: 1,
        borderColor: '#000000',
        borderRadius: 3,
    },
    thead: {},
    tbody: {},
    th: {
        flex: 1,
        padding: 5,
    },
    tr: {
        borderBottomWidth: 1,
        borderColor: '#000000',
        flexDirection: 'row',
    },
    td: {
        flex: 1,
        padding: 5,
    },

    // Links
    link: {
        textDecorationLine: 'underline',
    },
    blocklink: {
        flex: 1,
        borderColor: '#000000',
        borderBottomWidth: 1,
    },

    // Images
    image: {
        flex: 1,
    },

    // Text Output
    text: {},
    textgroup: {},
    paragraph: {
        marginTop: 10,
        marginBottom: 10,
        flexWrap: 'wrap',
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        width: '100%',
    },
    hardbreak: {
        width: '100%',
        height: 1,
    },
    softbreak: {},

    // Believe these are never used but retained for completeness
    pre: {},
    inline: {},
    span: {},
})