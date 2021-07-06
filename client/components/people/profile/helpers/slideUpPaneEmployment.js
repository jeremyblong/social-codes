import React, { Component, Fragment } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from './styles.js';
import ReadMore from 'react-native-read-more-text';
import MapView, { Marker } from 'react-native-maps';
import {
    BarIndicator
} from 'react-native-indicators';

class RenderSlideUpPane extends Component {
constructor(props) {
    super(props);

    this.state = {

    }
}
    _renderTruncatedFooter = (handlePress) => {
        return (
        <Text style={{color: "blue", marginTop: 10, fontWeight: "bold" }} onPress={handlePress}>
            Read more
        </Text>
        );
    }
    
    _renderRevealedFooter = (handlePress) => {
        return (
        <Text style={{color: "blue", marginTop: 10, fontWeight: "bold" }} onPress={handlePress}>
            Show less
        </Text>
        );
    }
    renderContent = () => {
        const { selected } = this.props;

        if (this.props.selected !== null) {
            // do logic
            return (
                <View style={{ marginTop: 35 }}>
                    <Text style={styles.mainTextHeader}>{selected.companyName}</Text>
                    <View style={styles.thickHr} />
                    
                    <View style={styles.centered}>
                        <View style={styles.margin}>
                            <Text style={styles.left}>Posted on <Text style={styles.bold}>{selected.date}</Text></Text>
                            <View style={{ marginTop: 15 }} />
                            <ReadMore
                                numberOfLines={3}
                                renderTruncatedFooter={this._renderTruncatedFooter}
                                renderRevealedFooter={this._renderRevealedFooter}
                                onReady={this._handleTextReady}>
                                <Text style={styles.left}>
                                    Description: <Text style={styles.bold}>{selected.description}</Text>
                                </Text>
                            </ReadMore>
                            <Text style={styles.employed}>Employed from <Text style={styles.bold}>{selected.employmentStartDate} - {selected.currentlyWorkingWithEmployer === "Yes" ? "Currently Employed" : selected.employmentEndDate}</Text></Text>
                            
                            <Text style={styles.title}>Job Title: <Text style={styles.bold}>{selected.jobTitle}</Text></Text>
                            
                            <Text style={{ marginTop: 20 }}>General location - <Text style={styles.bold}>{selected.fullLocation}</Text></Text> 
                            <MapView    
                                style={styles.map}
                                initialRegion={{
                                    latitude: selected.location.position.lat,
                                    longitude: selected.location.position.lon,
                                    latitudeDelta: 0.0922,
                                    longitudeDelta: 0.0421,
                                }} 
                                region={{
                                    latitude: selected.location.position.lat,
                                    longitude: selected.location.position.lon,
                                    latitudeDelta: 0.0922,
                                    longitudeDelta: 0.0421,
                                }}
                            >
                                <Marker
                                    coordinate={{
                                        latitude: selected.location.position.lat,
                                        longitude: selected.location.position.lon
                                    }}
                                    title={selected.jobTitle}
                                    description={"This is just the user's general approximate area - coordinates are slighly randomized"}
                                >
                                    <Image source={require("../../../../assets/icons/marker.png")} style={{height: 35, width: 35 }} />
                                </Marker>
                            </MapView>
                        </View>
                    </View>
                </View>
            );
        } else {
            // render loading indicator
            return (
                <View style={{ justifyContent: 'center', alignItems: "center", alignContent: "center" }}>
                    <View style={{ justifyContent: 'center', alignItems: "center", alignContent: "center" }}>
                        <BarIndicator count={14} color='blue' />
                    </View>
                </View>
            );
        }
    }
    render() {
        console.log("this.props.props", this.props);
        return (
            <Fragment>
                <View style={styles.container}>
                    {this.renderContent()}
                </View>
            </Fragment>
        )
    }
}
export default RenderSlideUpPane;