import React, { Component, Fragment } from 'react';
import { View, Text, Platform } from 'react-native';
import NativeAdView, { AdBadge, HeadlineView, TaglineView, NativeMediaView, StarRatingView, StoreView, CallToActionView  } from "react-native-admob-native-ads";



const TEST_NATIVE_AD_ID = Platform.OS === 'ios' ? 'YOUR IOS NATIVE ADVANCE ID' : 'ca-app-pub-9779394432278063/7147085712';

class AdvertisementComponent extends Component {
constructor(props) {
    super(props);

    this.state = {
        isShow: true,
        isLoaded: false
    }
    this.nativeAdViewRef = React.createRef();
}
    onAdFailedToLoad = (event) => {
        console.log('NativeBanner failed');

        console.log(event.nativeEvent.error.message);

        this.setState({
            isLoaded: false
        })
    };
    onAdLoaded = () => {
        console.log('Ad has loaded');
        
        this.setState({
            isLoaded: true
        })
    };
    componentWillUnmount() {
        
    }
    componentDidMount() {
        console.log(this.nativeAdViewRef);

        this.nativeAdViewRef.current.loadAd();
    }
    failedToLoad = (event) => {
        console.log("FailedToLoad", event);
    }
    adLoaded = (event) => {
        console.log("adLoaded", event);
    }
    render() {
        return (
            <View>
                <NativeAdView
                    onAdFailedToLoad={this.failedToLoad}
                    ref={this.nativeAdViewRef}
                    onAdLoaded={this.adLoaded}
                    style={{
                        width: "95%",
                        alignSelf: "center",
                        height: 425, // Height should be provided.
                    }}
                    adUnitID={"ca-app-pub-3940256099942544/2247696110"}
                    >
                    <View
                        style={{
                            height: "100%",
                            width: "100%",
                            padding: 10,
                            paddingTop: 35,
                            backgroundColor: "white",
                        }}
                    >
                        <View style={{ position: "absolute", right: 20, top: 15 }}>
                            <StarRatingView />
                            <StoreView
                                style={{
                                    fontWeight: "bold",
                                    fontSize: 10,
                                }}
                            />
                        </View>
                        <AdBadge
                            style={{
                                width: 15,
                                height: 15,
                                marginTop: 10,
                                marginLeft: 10,
                                borderWidth: 1,
                                borderRadius: 2,
                                borderColor: "green",
                            }}
                            textStyle={{
                                fontSize: 9,
                                color: "green",
                            }}
                        />
                        <HeadlineView
                            style={{
                                fontWeight: "bold",
                                fontSize: 13,
                            }}
                        />
                        <TaglineView
                            style={{
                                fontWeight: "bold",
                                fontSize: 12,
                            }}
                        />
                        <NativeMediaView
                            style={{
                                width: "100%",
                                height: 275,
                            }}
                        />
                        <CallToActionView
                            style={{
                                height: 45,
                                width: "100%",
                                paddingHorizontal: 12,
                                backgroundColor: "purple",
                                justifyContent: "center",
                                alignItems: "center",
                                borderRadius: 5,
                                elevation: 10,
                            }}
                            textStyle={{ color: "white", fontSize: 14 }}
                        />
                    </View>
                    </NativeAdView>
            </View>
        );
    }
}
export default AdvertisementComponent;
