import React, { Component, Fragment } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Platform, Dimensions } from "react-native";
import { Header, Left, Body, Right, Button, Title, Text as NativeText, Subtitle } from 'native-base';
import styles from "./styles.js";
import { connect } from "react-redux";
import AwesomeButtonBlue from 'react-native-really-awesome-button/src/themes/blue';
import { TabView, TabBar } from 'react-native-tab-view';
import * as RNIap from 'react-native-iap';
import Toast from 'react-native-toast-message';
import axios from "axios";
import Config from "react-native-config";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import Dialog from "react-native-dialog";


const { height, width } = Dimensions.get("window");

const employerBoost = Platform.select({
    ios: [
        
    ],
    android: [
        "239487293874923658276",
        "23948729356364566666235437",
        "2384273472636263466255252"
    ]
});

const freelancerBoosts = Platform.select({
    ios: [
     
    ],
    android: [
        '203948092009029',
        '234987282',
        '2409583883888373'
    ]
});

const itemSkus = Platform.OS === "ios" ? [] : [
    "239487293874923658276",
    "23948729356364566666235437",
    "2384273472636263466255252"
];

class BoostHomepageHelper extends Component {
constructor(props) {
    super(props);
    
    this.state = {
        boostFreelancer: "",
        productList: [],
        boostEmployerAccount: "",
        receipt: "",
        routes: [
            { key: 'freelancer', title: 'Freelance Boost' },
            { key: 'employer', title: 'Job Listing Boost' }
        ],
        index: 0,
        availableItemsMessage: "",
        data: [],
        user: null,
        showExisting: false,
        showExistingTwo: false
    }
}
    async componentDidMount() {

        try {
          const result = await RNIap.initConnection().then(async () => {
            this.getItems();

            const result = await RNIap.flushFailedPurchasesCachedAsPendingAndroid();
            console.log("ran...", result);
          });
          console.log('connection is => ', result);
          
        } catch (err) {
          console.log('error in cdm => ', err);
        }

        axios.get(`${Config.ngrok_url}/gather/user`, {
            params: {
                id: this.props.unique_id
            }
        }).then((res) => {
            if (res.data.message === "Located the desired user!") {
                console.log("RES.data:", res.data);

                const { user } = res.data;

                this.setState({
                    user
                })
            } else {
                console.log("Err", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    useExistingBoost = () => {
        
    }
    purchaseConfirmed = () => {
        console.log("successfully purchased item!");
    };
    requestPurchase = async (sku) => {
        try {
          const purchase = RNIap.requestPurchase(sku);

          console.log("purchase", purchase);
        } catch (err) {
          console.log('requestPurchase error => ', err);
        }
    };
    getItems = async () => {
        try {
            const products = await RNIap.getProducts(itemSkus);

            console.log("products", products);

            this.setState({
                productList: products
            }); 
        } catch (err) {
            console.log('getItems || purchase error => ', err);
        }
    };
    renderScene = ({ route }) => {
        const { boostEmployerAccount, boostFreelancer, user } = this.state;

        switch (route.key) {
        case 'freelancer':
            if (user.accountType === "work") {
                return (
                    <View style={styles.containerView}>
                        <View style={{ margin: 20 }}>
                        <AwesomeButtonBlue style={{ marginTop: 25, marginBottom: 20 }} type={"secondary"} onPress={() => {
                           this.setState({
                               showExisting: true
                           })
                        }} stretch={true}>Use an existing boost</AwesomeButtonBlue>
                        </View>
                        <View style={styles.box}>
                                <View style={styles.margin}>
                                    <Text style={styles.mainText}>Be shown on the front page as a "Premier Freelancer"</Text>
                                    <View style={styles.hr} />
                                    <View style={styles.centered}>
                                        <Image source={require("../../../assets/icons/lightning.png")} style={styles.circle} />
                                    </View>
                                    <Text style={styles.middleText}>Skip the line</Text>
                                    <Text style={[styles.middleSmallerText, { marginTop: 10 }]}>Be a top profile in your area for 3 days to get more traction.</Text>
                                    <View style={styles.row}>
                                        <TouchableOpacity onPress={() => {
                                            this.setState({
                                                boostFreelancer: "1-boost"
                                            })
                                        }} style={boostFreelancer === "1-boost" ? [styles.column, { borderTopColor: "#ffffff", borderTopWidth: 10, borderBottomColor: "#ffffff", borderBottomWidth: 10 }] : [styles.column, { borderTopColor: "blue", borderTopWidth: 10, borderBottomColor: "blue", borderBottomWidth: 10 }]}>
                                            <Text style={styles.boostText}>1 {"\n"} Boost</Text>
                                            <View />
                                            <Text style={styles.priceText}>$14.99/ea</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => {
                                            this.setState({
                                                boostFreelancer: "3-boosts"
                                            })
                                        }} style={boostFreelancer === "3-boosts" ? [styles.column, { height: 200, marginTop: 0, borderTopColor: "#ffffff", borderTopWidth: 10, borderBottomColor: "#ffffff", borderBottomWidth: 10 }] : [styles.column, { height: 200, marginTop: 0, borderTopColor: "#8884FF", borderTopWidth: 10, borderBottomColor: "#8884FF", borderBottomWidth: 10 }]}>
                                            <Text style={styles.boostText}>3 {"\n"} Boosts</Text>
                                            <View />
                                            <Text style={styles.priceText}>$24.49/ea</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => {
                                            this.setState({
                                                boostFreelancer: "5-boosts"
                                            })
                                        }} style={boostFreelancer === "5-boosts" ? [styles.column, { borderTopColor: "#ffffff", borderTopWidth: 10, borderBottomColor: "#ffffff", borderBottomWidth: 10 }] : [styles.column, { borderTopColor: "blue", borderTopWidth: 10, borderBottomColor: "blue", borderBottomWidth: 10 }]}>
                                            <Text style={styles.boostText}>5 {"\n"} Boosts</Text>
                                            <View />
                                            <Text style={styles.priceText}>$49.99/ea</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                {typeof boostFreelancer !== "undefined" && boostFreelancer.length > 0 ? <Fragment><AwesomeButtonBlue style={{ marginTop: 25, marginBottom: 20 }} type={"secondary"} onPress={() => {
                                    switch (this.state.boostFreelancer) {
                                        case "1-boost":
                                            this.requestPurchase(freelancerBoosts[0]);
                                            break;
                                        case "3-boosts":
                                            this.requestPurchase(freelancerBoosts[1]);
                                            break;
                                        case "5-boosts":
                                            this.requestPurchase(freelancerBoosts[2]);
                                            break;
                                        default: 
                                            break;
                                    }
                                }} stretch={true}>Boost My Profile!</AwesomeButtonBlue>
                                <View style={[styles.hr, { marginBottom: -10 }]} /></Fragment> : null}
                            </View>
                    </View>
                );
            } else {
                return (
                    <View style={styles.margin}>
                        <Text style={styles.noAccessText}>You do not have permission to view this page. Only <Text style={{ fontStyle: "italic", color: "#0057ff" }}>freelancers</Text> have access to this page.</Text>
                    </View>
                );
            }
        case 'employer':
            if (user.accountType === "hire") {
                return (
                    <View style={styles.containerView}>
                        <View style={{ margin: 20 }}>
                            <AwesomeButtonBlue style={{ marginTop: 25, marginBottom: 20 }} type={"secondary"} onPress={() => {
                            this.setState({
                                showExistingTwo: true
                            })
                            }} stretch={true}>Use an existing boost</AwesomeButtonBlue>
                        </View>
                        <View style={styles.box}>
                                <View style={styles.margin}>
                                    <Text style={styles.mainText}>Be shown on the front page as a "Premier employer account"</Text>
                                    <View style={styles.hr} />
                                    
                                    <View style={styles.centered}>
                                        <Image source={require("../../../assets/icons/lightning.png")} style={styles.circle} />
                                    </View>
                                    <Text style={styles.middleText}>Skip the line</Text>
                                    <Text style={[styles.middleSmallerText, { marginTop: 10 }]}>Be a top profile in your area for 3 days to get more traction.</Text>
                                    <View style={styles.row}>
                                        <TouchableOpacity onPress={() => {
                                            this.setState({
                                                boostEmployerAccount: "1-boost"
                                            })
                                        }} style={boostEmployerAccount === "1-boost" ? [styles.column, { borderTopColor: "#ffffff", borderTopWidth: 10, borderBottomColor: "#ffffff", borderBottomWidth: 10 }] : [styles.column, { borderTopColor: "blue", borderTopWidth: 10, borderBottomColor: "blue", borderBottomWidth: 10 }]}>
                                            <Text style={styles.boostText}>1 {"\n"} Boost</Text>
                                            <View />
                                            <Text style={styles.priceText}>$14.99/ea</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => {
                                            this.setState({
                                                boostEmployerAccount: "2-boosts"
                                            })
                                        }} style={boostEmployerAccount === "2-boosts" ? [styles.column, { height: 200, marginTop: 0, borderTopColor: "#ffffff", borderTopWidth: 10, borderBottomColor: "#ffffff", borderBottomWidth: 10 }] : [styles.column, { height: 200, marginTop: 0, borderTopColor: "#8884FF", borderTopWidth: 10, borderBottomColor: "#8884FF", borderBottomWidth: 10 }]}>
                                            <Text style={styles.boostText}>2 {"\n"} Boosts</Text>
                                            <View />
                                            <Text style={styles.priceText}>$24.49/ea</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => {
                                            this.setState({
                                                boostEmployerAccount: "3-boosts"
                                            })
                                        }} style={boostEmployerAccount === "3-boosts" ? [styles.column, { borderTopColor: "#ffffff", borderTopWidth: 10, borderBottomColor: "#ffffff", borderBottomWidth: 10 }] : [styles.column, { borderTopColor: "blue", borderTopWidth: 10, borderBottomColor: "blue", borderBottomWidth: 10 }]}>
                                            <Text style={styles.boostText}>3 {"\n"} Boosts</Text>
                                            <View />
                                            <Text style={styles.priceText}>$49.99/ea</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                {typeof boostEmployerAccount !== "undefined" && boostEmployerAccount.length > 0 ? <Fragment><AwesomeButtonBlue style={{ marginTop: 25, marginBottom: 20 }} type={"secondary"} onPress={() => {
                                    switch (this.state.boostEmployerAccount) {
                                        case "1-boost":
                                            this.requestPurchase(employerBoost[0]);
                                            break;
                                        case "2-boosts":
                                            this.requestPurchase(employerBoost[1]);
                                            break;
                                        case "3-boosts":
                                            this.requestPurchase(employerBoost[2]);
                                            break;
                                        default: 
                                            break;
                                    }
                                }} stretch={true}>Boost My Profile!</AwesomeButtonBlue>
                                <View style={[styles.hr, { marginBottom: -10 }]} /></Fragment> : null}
                            </View>
                    </View>
                );
            } else {
                return (
                    <View style={styles.margin}>
                        <Text style={styles.noAccessText}>You do not have permission to view this page. Only <Text style={{ fontStyle: "italic", color: "#0057ff" }}>hiring employers</Text> have access to this section.</Text>
                    </View>
                );
            }
        default:
            return null;
        }
    };
    useExistingBoostHiring = () => {
        console.log("useExistingBoostHiring clicked");
    }
    renderTabBar(props) {
        return (
            <TabBar
                style={{ backgroundColor: '#FFFFFF', color: "black" }}
                labelStyle={{ color: 'black', fontSize: 16, fontWeight: 'bold' }}
                {...props}
                renderLabel={({ route, focused, color }) => (
                    <Text style={{ color: "black", margin: 8, fontWeight: "bold", textAlign: "center" }}>
                        {route.title}
                    </Text>
                )}
                indicatorStyle={{backgroundColor: 'blue', height: 2.5}}
            />
        );
    }
        
        
    render() {
        console.log("this.state. IAP - IN APP PURCHASE STATE", this.state);

        const { user } = this.state;
        return (
            <Fragment>
                <Header style={{ backgroundColor: "#303030" }}>
                    <Left style={{ flexDirection: "row" }}>
                        <Button onPress={() => {
                            this.props.props.navigation.goBack();
                        }} transparent>
                            <Image source={require("../../../assets/icons/go-back.png")} style={styles.headerIcon} />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={styles.whiteText}>Tokens</Title>
                        <Subtitle style={styles.whiteText}>Purchase Tokens</Subtitle>
                    </Body>
                    <Right>
                    
                    </Right>
                </Header>
                <Toast ref={(ref) => Toast.setRef(ref)} />
                <View>
                    <Dialog.Container visible={this.state.showExisting}>
                    <Dialog.Title>Are you sure you'd like to boost your account?</Dialog.Title>
                    <Dialog.Description>
                        Please confirm if you'd like to boost your account, You cannot undo this action.
                    </Dialog.Description>
                    <Dialog.Button onPress={() => {
                        this.setState({
                            showExisting: false
                        })
                    }} label="Cancel" />
                    <Dialog.Button onPress={() => {
                        this.useExistingBoost();
                    }} label="BOOST ME!" />
                    </Dialog.Container>
                </View>
                <View>
                    <Dialog.Container visible={this.state.showExistingTwo}>
                    <Dialog.Title>Are you sure you'd like to boost your account?</Dialog.Title>
                    <Dialog.Description>
                        Please confirm if you'd like to boost your account, You cannot undo this action.
                    </Dialog.Description>
                    <Dialog.Button onPress={() => {
                        this.setState({
                            showExistingTwo: false
                        })
                    }} label="Cancel" />
                    <Dialog.Button onPress={() => {
                        this.useExistingBoostHiring();
                    }} label="BOOST ME!" />
                    </Dialog.Container>
                </View>
                <ScrollView contentContainerStyle={{ paddingBottom: 50 }} style={styles.container}>
                    {user !== null ? <TabView 
                        renderTabBar={this.renderTabBar}
                        tabBarPosition={"top"}
                        navigationState={{ index: this.state.index, routes: this.state.routes }}
                        onIndexChange={(index) => {
                            this.setState({ 
                                index,
                                boostEmployerAccount: "",
                                boostFreelancer: ""
                            })
                        }}
                        renderScene={this.renderScene}
                    /> :  <Fragment>
                        <SkeletonPlaceholder>
                            <View style={styles.boxPlaceholder}>

                            </View>
                        </SkeletonPlaceholder>
                        <View style={{ marginTop: 10 }} />
                        <SkeletonPlaceholder>
                            <View style={{ flexDirection: "row", width }}>
                                <View style={styles.columnTwo}>

                                </View>
                                <View style={[styles.columnThree, { minHeight: 225 }]}>
                                    
                                </View>
                                <View style={styles.columnTwo}>
                                    
                                </View>
                            </View>
                        </SkeletonPlaceholder>
                        <View style={{ marginTop: 10 }} />
                        <SkeletonPlaceholder>
                            <View style={styles.boxPlaceholder}>

                            </View>
                        </SkeletonPlaceholder></Fragment>}
                </ScrollView>
            </Fragment>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        unique_id: state.signupData.authData.unique_id,
        accountType: state.signupData.authData.accountType
    }
}
export default connect(mapStateToProps, { })(BoostHomepageHelper);