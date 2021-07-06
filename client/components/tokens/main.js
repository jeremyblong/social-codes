import React, { Component, Fragment } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { Header, Left, Body, Right, Button, Icon, Title, Subtitle } from 'native-base';
import styles from './styles.js';
import RBSheet from "react-native-raw-bottom-sheet";
import * as RNIap from 'react-native-iap';
import AwesomeButtonBlue from 'react-native-really-awesome-button/src/themes/blue';
import axios from 'axios';
import Config from "react-native-config";
import { connect } from 'react-redux';
import Toast from 'react-native-toast-message';


const itemSkus = Platform.select({
    ios: [
     '213924859284573', // 10 tokens
     '29334059834958', // 25 tokens
     '239487294587293485', // 50 tokens
     '23049823929999928287', // 75 tokens
     '102992892899992', // 100 tokens
     '1118882282828239299999', // 125 tokens,
     '00029292827847374', // 150 tokens
     '19828474747777747467', // 200 tokens
     '187127272672222', // 250 tokens
    ],
    android: []
});

const itemsPurchasable = [{
    sku: "213924859284573",
    amount: 10
}, {
    sku: "29334059834958",
    amount: 25
}, {
    sku: "239487294587293485",
    amount: 50
}, {
    sku: "23049823929999928287",
    amount: 75
}, {
    sku: "102992892899992",
    amount: 100
}, {
    sku: "1118882282828239299999",
    amount: 125
}, {
    sku: "00029292827847374",
    amount: 150
}, {
    sku: "19828474747777747467",
    amount: 200
}, {
    sku: "187127272672222",
    amount: 250
}];

class TokensMainHelper extends Component {
constructor (props) {
    super(props);

    this.state = {
        selected: 0,
        productList: [],
        receipt: "",
        sku: "",
        availableItemsMessage: ""
    }
}
    async componentDidMount() {
        let purchaseUpdateSubscription;
        try {
            const result = await RNIap.initConnection();
            console.log('connection is => ', result);
            await RNIap.flushFailedPurchasesCachedAsPendingAndroid();
        } catch (err) {
            console.log('error in cdm => ', err);
        }
        purchaseUpdateSubscription = RNIap.purchaseUpdatedListener(async(purchase) => {
            console.log('purchaseUpdatedListener', purchase);
            if (purchase.purchaseStateAndroid === 1 && !purchase.isAcknowledgedAndroid) {
                    try {
                        const ackResult = await RNIap.acknowledgePurchaseAndroid(
                            purchase.purchaseToken,
                        );
                        console.log('ackResult', ackResult);
                    } catch (ackErr) {
                        console.warn('ackErr', ackErr);
                    }
                }
                this.setState({
                    receipt: purchase.transactionReceipt
                });
                    purchaseErrorSubscription = RNIap.purchaseErrorListener(
                    (error) => {
                        console.log('purchaseErrorListener', error);
                        // alert('purchase error', JSON.stringify(error));
                    },
                );
            },
        );
    }
    requestPurchase = async (sku) => {
        try {
          await RNIap.requestPurchase(sku).then((result) => {
            console.log("result:", result);

            if (result) {
                this.purchaseConfirmed(result.productId);
            }
          });
        } catch (err) {
          console.log('requestPurchase error => ', err);
        }
    };  
    purchaseConfirmed = (productId) => {
        // you can code here for what changes you want to do in db on purchase successfull
        console.log(":productId: ", productId);
        for (let index = 0; index < itemsPurchasable.length; index++) {
            const item = itemsPurchasable[index];
            
            if (item.sku === productId) {
                axios.post(`${Config.ngrok_url}/puchased/tokens/iap`, {
                    id: this.props.unique_id,
                    tokens: item.amount
                }).then((res) => {
                    if (res.data.message === "Updated db!") {
                        console.log(res.data);

                        Toast.show({
                            text1: "Successfully purchased tokens!",
                            text2: "Successfully purchased more tokens and your account was properly credited!",
                            type: "success",
                            position: "top",
                            visibilityTime: 4000
                        })
                    } else {
                        console.log("err", res.data);
                    }
                }).catch((err) => {
                    console.log(err);
                })
            }
        }
    };
    getItems = async () => {
        try {

            const products = await RNIap.getProducts(itemSkus);

            console.log('Products[0]', products);

            this.setState({
                productList: products
            }, () => {
                for (let index = 0; index < products.length; index++) {
                    const product = products[index];
                    
                    if (product.productId === this.state.sku) {
                        this.requestPurchase(products[index].productId);
                    }
                }
            })

        } catch (err) {
          console.log('getItems || purchase error => ', err);
        }
    };
    render() {
        const { selected } = this.state;

        console.log("This.state.tokens main.js:", this.state);
        return (
            <Fragment>
                <Header style={{ backgroundColor: "#303030" }}>
                    <Left>
                        <Button onPress={() => {
                            this.props.props.navigation.goBack();
                        }} transparent>
                            <Image source={require("../../assets/icons/go-back.png")} style={[styles.headerIcon, { tintColor: "#fdd530" }]} />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={{ color: "#fdd530" }}>Tokens/Credits</Title>
                        <Subtitle style={{ color: "#fdd530" }}>Purchase tokens</Subtitle>
                    </Body>
                    <Right />
                </Header> 
                <Toast ref={(ref) => Toast.setRef(ref)} />
                <ScrollView contentContainerStyle={{ paddingBottom: 50 }} style={styles.container}>
                    <View style={styles.margin}>
                        <Text style={styles.headerText}>Select an amount of tokens to purchase</Text>
                        <View style={styles.hr} />
                        <Text style={{ marginBottom: 20 }}>Tokens can be used to apply for jobs, boost your profile, submit "super" apps and much more...</Text>
                        <TouchableOpacity onPress={() => {
                            this.setState({
                                selected: 10,
                                sku: "213924859284573"
                            }, () => {
                                this.RBSheet.open();
                            })
                        }} style={selected === 10 ? styles.selected : styles.boxed}>
                            <View style={styles.row}>
                                <Image source={require("../../assets/icons/token.png")} style={{ maxWidth: 55, maxHeight: 55 }} />
                                <Text style={styles.boxedText}>Purchase <Text style={{ fontWeight: "bold", color: "#fdd530", fontSize: 26 }}>10</Text> Tokens</Text>
                                
                            </View>
                        </TouchableOpacity>
                        <View style={{ marginTop: 20 }} />
                        <TouchableOpacity onPress={() => {
                            this.setState({
                                selected: 25,
                                sku: "29334059834958"
                            }, () => {
                                this.RBSheet.open();
                            })
                        }} style={selected === 25 ? styles.selected : styles.boxed}>
                            <View style={styles.row}>
                                <Image source={require("../../assets/icons/token.png")} style={{ maxWidth: 55, maxHeight: 55 }} />
                                <Text style={styles.boxedText}>Purchase <Text style={{ fontWeight: "bold", color: "#fdd530", fontSize: 26 }}>25</Text> Tokens</Text>
                            </View>
                            <Text style={{ fontWeight: "bold" }}>Save <Text style={{ color: "#fdd530" }}>5%</Text> when buying this quanitity</Text>
                        </TouchableOpacity>
                        <View style={{ marginTop: 20 }} />
                        <TouchableOpacity onPress={() => {
                            this.setState({
                                selected: 50,
                                sku: "239487294587293485"
                            }, () => {
                                this.RBSheet.open();
                            })
                        }} style={selected === 50 ? styles.selected : styles.boxed}>
                            <View style={styles.row}>
                                <Image source={require("../../assets/icons/token.png")} style={{ maxWidth: 55, maxHeight: 55 }} />
                                <Text style={styles.boxedText}>Purchase <Text style={{ fontWeight: "bold", color: "#fdd530", fontSize: 26 }}>50</Text> Tokens</Text>
                            </View>
                            <Text style={{ fontWeight: "bold" }}>Save <Text style={{ color: "#fdd530" }}>7.5%</Text> when buying this quanitity</Text>
                        </TouchableOpacity>
                        <View style={{ marginTop: 20 }} />
                        <TouchableOpacity onPress={() => {
                            this.setState({
                                selected: 75,
                                sku: "23049823929999928287"
                            }, () => {
                                this.RBSheet.open();
                            })
                        }} style={selected === 75 ? styles.selected : styles.boxed}>
                            <View style={styles.row}>
                                <Image source={require("../../assets/icons/token.png")} style={{ maxWidth: 55, maxHeight: 55 }} />
                                <Text style={styles.boxedText}>Purchase <Text style={{ fontWeight: "bold", color: "#fdd530", fontSize: 26 }}>75</Text> Tokens</Text>
                            </View>
                            <Text style={{ fontWeight: "bold" }}>Save <Text style={{ color: "#fdd530" }}>10%</Text> when buying this quanitity</Text>
                        </TouchableOpacity>
                        <View style={{ marginTop: 20 }} />
                        <TouchableOpacity onPress={() => {
                            this.setState({
                                selected: 100,
                                sku: "102992892899992"
                            }, () => {
                                this.RBSheet.open();
                            })
                        }} style={selected === 100 ? styles.selected : styles.boxed}>
                            <View style={styles.row}>
                                <Image source={require("../../assets/icons/token.png")} style={{ maxWidth: 55, maxHeight: 55 }} />
                                <Text style={styles.boxedText}>Purchase <Text style={{ fontWeight: "bold", color: "#fdd530", fontSize: 26 }}>100</Text> Tokens</Text>
                            </View>
                            <Text style={{ fontWeight: "bold" }}>Save <Text style={{ color: "#fdd530" }}>12.5%</Text> when buying this quanitity</Text>
                        </TouchableOpacity>
                        <View style={{ marginTop: 20 }} />
                        <TouchableOpacity onPress={() => {
                            this.setState({
                                selected: 125,
                                sku: "1118882282828239299999"
                            }, () => {
                                this.RBSheet.open();
                            })
                        }} style={selected === 125 ? styles.selected : styles.boxed}>
                            <View style={styles.row}>
                                <Image source={require("../../assets/icons/token.png")} style={{ maxWidth: 55, maxHeight: 55 }} />
                                <Text style={styles.boxedText}>Purchase <Text style={{ fontWeight: "bold", color: "#fdd530", fontSize: 26 }}>125</Text> Tokens</Text>
                            </View>
                            <Text style={{ fontWeight: "bold" }}>Save <Text style={{ color: "#fdd530" }}>15%</Text> when buying this quanitity</Text>
                        </TouchableOpacity>
                        <View style={{ marginTop: 20 }} />
                        <TouchableOpacity onPress={() => {
                            this.setState({
                                selected: 150,
                                sku: "00029292827847374"
                            }, () => {
                                this.RBSheet.open();
                            })
                        }} style={selected === 150 ? styles.selected : styles.boxed}>
                            <View style={styles.row}>
                                <Image source={require("../../assets/icons/token.png")} style={{ maxWidth: 55, maxHeight: 55 }} />
                                <Text style={styles.boxedText}>Purchase <Text style={{ fontWeight: "bold", color: "#fdd530", fontSize: 26 }}>150</Text> Tokens</Text>
                            </View>
                            <Text style={{ fontWeight: "bold" }}>Save <Text style={{ color: "#fdd530" }}>20%</Text> when buying this quanitity</Text>
                        </TouchableOpacity>
                        <View style={{ marginTop: 20 }} />
                        <TouchableOpacity onPress={() => {
                            this.setState({
                                selected: 200,
                                sku: "19828474747777747467"
                            }, () => {
                                this.RBSheet.open();
                            })
                        }} style={selected === 200 ? styles.selected : styles.boxed}>
                            <View style={styles.row}>
                                <Image source={require("../../assets/icons/token.png")} style={{ maxWidth: 55, maxHeight: 55 }} />
                                <Text style={styles.boxedText}>Purchase <Text style={{ fontWeight: "bold", color: "#fdd530", fontSize: 26 }}>200</Text> Tokens</Text>
                            </View>
                            <Text style={{ fontWeight: "bold" }}>Save <Text style={{ color: "#fdd530" }}>25%</Text> when buying this quanitity</Text>
                        </TouchableOpacity>
                        <View style={{ marginTop: 20 }} />
                        <TouchableOpacity onPress={() => {
                            this.setState({
                                selected: 250,
                                sku: "187127272672222"
                            }, () => {
                                this.RBSheet.open();
                            })
                        }} style={selected === 250 ? styles.selected : styles.boxed}>
                            <View style={styles.row}>
                                <Image source={require("../../assets/icons/token.png")} style={{ maxWidth: 55, maxHeight: 55 }} />
                                <Text style={styles.boxedText}>Purchase <Text style={{ fontWeight: "bold", color: "#fdd530", fontSize: 26 }}>250</Text> Tokens</Text>
                            </View>
                            <Text style={{ fontWeight: "bold" }}>Save <Text style={{ color: "#fdd530" }}>30%</Text> when buying this quanitity</Text>
                        </TouchableOpacity>
                        <View style={{ marginTop: 20 }} />
                    </View>
                </ScrollView>
                <RBSheet
                    ref={ref => {
                        this.RBSheet = ref;
                    }}
                    height={90}
                    openDuration={250}
                    customStyles={{
                        container: {
                            
                        }
                    }}
                >
                    <View style={styles.viewer}>
                        <AwesomeButtonBlue type={"secondary"} onPress={() => {
                            this.RBSheet.close();

                            setTimeout(() => {
                                this.getItems();
                            }, 1500)
                        }} stretch={true}>Purchase Tokens</AwesomeButtonBlue>
                    </View>
                </RBSheet>
            </Fragment>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        unique_id: state.signupData.authData.unique_id
    }
}
export default connect(mapStateToProps, { })(TokensMainHelper);