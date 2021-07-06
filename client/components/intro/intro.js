import React, { Component, Fragment } from 'react';
import AppIntroSlider from 'react-native-app-intro-slider';
import { View, Text, ImageBackground, Image } from "react-native";
import styles from "./styles.js";
import { connect } from "react-redux";
import { introCompleted } from "../../actions/intro/intro.js";
import AwesomeButtonBlue from 'react-native-really-awesome-button/src/themes/blue';
import _ from 'lodash';
import { request, PERMISSIONS, requestNotifications } from 'react-native-permissions';


const slides = [
  {
    key: 1,
    title: 'Top tech developers & innovators.',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam ut dolor consequat, commodo massa a, faucibus quam. Aenean commodo a justo vitae viverra.',
    image: require('../../assets/images/1.jpg'),
    backgroundColor: '#59b2ab',
    innerBackground: require('../../assets/images/1.jpg'),
    icon: require('../../assets/images/web-1.png'),
    permissionText: "Allow Location Services"
  },
  {
    key: 2,
    title: 'Match with english speaking candiates...',
    text: 'Etiam volutpat dui vel mollis ultricies. Aliquam tempor accumsan tempor. Praesent porta justo felis. Proin nec mollis orci, sed tincidunt ipsum.',
    image: require('../../assets/images/2.jpg'),
    backgroundColor: '#febe29',
    innerBackground: require('../../assets/images/2.jpg'),
    icon: require('../../assets/images/web-1.png'),
    permissionText: "Allow Camera/Video Permissions"
  },
  {
    key: 3,
    title: 'US & UK based tech talent ONLY.',
    text: 'Duis porta mauris nibh, sit amet tincidunt velit ultrices ac. Curabitur tincidunt risus felis, vel mattis dui fermentum ac. Pellentesqu',
    image: require('../../assets/images/3.jpg'),
    backgroundColor: '#22bcb5',
    innerBackground: require('../../assets/images/3.jpg'),
    icon: require('../../assets/images/web-1.png'),
    permissionText: "Allow 'Push Notifications' Permissions"
  }
];
 
class IntroSlider extends Component {
constructor(props) {
    super(props);
    
    this.state = {
        showRealApp: false
    }
}
  grantCameraPermissions = () => {
    request(PERMISSIONS.IOS.CAMERA).then((result) => {
      console.log("result camera - :", result);

      if (result === "granted") {
        this.slider.goToSlide(2)
      }
    });
  }
  grantLocationServices = () => {
    request(PERMISSIONS.IOS.LOCATION_ALWAYS).then((result) => {
      console.log("result location always - :", result);

      if (result === "granted" || result === "unavailable") {
        this.slider.goToSlide(1)
      }
    });
  }
  grantPushNotificationPermissions = () => {
    requestNotifications(['alert', 'sound']).then(({status, settings}) => {
      console.log("status", status);
      console.log("settings", settings);

      if (status === "granted") {
        this._onDone();
      }
    });
  }
  _renderItem = ({ item, index }) => {
    if (index === 2) {
      return (
        <ImageBackground resizeMode={"cover"} source={item.image} style={styles.slide}>
            <View style={styles.container}>
              <Text style={styles.title}>{item.title}</Text>
              {_.has(item, "permissionText") ? <AwesomeButtonBlue onPress={() => {
                switch (index) {
                  case 0:
                    this.grantLocationServices();
                    break;
                  case 1:
                    this.grantCameraPermissions();
                    break;
                  case 2:
                    this.grantPushNotificationPermissions();
                    break;
                    default: 
                      break;
                }
              }} style={styles.absoluteBtn} type={"secondary"} width={300} backgroundColor={"blue"} textColor={"white"}>{item.permissionText}</AwesomeButtonBlue> : null}
              <View style={styles.hr} />
              <View style={styles.hr} />
              <Image source={item.icon}  style={styles.iconTwo} />
              <View style={styles.hr} />
              <Text style={styles.text}>{item.text}</Text>
              
            </View>
        </ImageBackground>
      );
    } else {
      return (
        <ImageBackground resizeMode={"cover"} source={item.image} style={styles.slide}>
            <View style={styles.container}>
              <Text style={styles.title}>{item.title}</Text>
              {_.has(item, "permissionText") ? <AwesomeButtonBlue onPress={() => {
                switch (index) {
                  case 0:
                    this.grantLocationServices();
                    break;
                  case 1:
                    this.grantCameraPermissions();
                    break;
                  case 2:
                    this.grantPushNotificationPermissions();
                    break;
                    default: 
                      break;
                }
              }} style={styles.absoluteBtn} type={"secondary"} width={300} backgroundColor={"blue"} textColor={"white"}>{item.permissionText}</AwesomeButtonBlue> : null}
              <View style={styles.hr} />
              <View style={styles.hr} />
              <Image source={item.icon}  style={styles.icon} />
              <View style={styles.hr} />
              <Text style={styles.text}>{item.text}</Text>
              
            </View>
        </ImageBackground>
      );
    }
  }
  _onDone = () => {

    this.props.introCompleted(true);

    setTimeout(() => {
      this.props.navigation.navigate("homepage-main");
    }, 500);
  }
  render() {
      return (
        <Fragment>
          <AppIntroSlider ref={(slider) => this.slider = slider} bottomButton={true} renderItem={this._renderItem} data={slides} onDone={this._onDone}/>
        </Fragment>
      );
    }
}
export default connect(null, { introCompleted })(IntroSlider);