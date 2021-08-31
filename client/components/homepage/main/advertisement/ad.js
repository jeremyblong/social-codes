import React, { Component, Fragment } from 'react';
import { View, Text, Platform } from 'react-native';
import NativeAdView, { AdBadge, HeadlineView, TaglineView, NativeMediaView } from "react-native-admob-native-ads";



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
            <Fragment>
                <NativeAdView
                    onAdFailedToLoad={this.failedToLoad}
                    ref={this.nativeAdViewRef}
                    onAdLoaded={this.adLoaded}
                    style={{
                        width: "95%",
                        alignSelf: "center",
                        height: 375, // Height should be provided.
                    }}
                    adUnitID={TEST_NATIVE_AD_ID}
                    >
                    <View
                        style={{
                        height: "100%", // could be '100%' too.
                        width: "100%",
                        backgroundColor: "white",
                        }}
                    >
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
                                height: 250,
                            }}
                        />
                    </View>
                    </NativeAdView>
            </Fragment>
        );
    }
}
export default AdvertisementComponent;
