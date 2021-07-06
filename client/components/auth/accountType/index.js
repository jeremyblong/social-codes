import React, { Component, Fragment } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from './styles.js';
import { Header, Left, Body, Right, Title, Subtitle, Button } from 'native-base';
import AwesomeButtonBlue from 'react-native-really-awesome-button/src/themes/blue';
import { addSignupData } from "../../../actions/auth/signup.js";
import { connect } from "react-redux";


class AccountTypeChooseHelper extends Component {
constructor (props) {
    super(props);
    
    this.state = {
        selected: ""
    }
}
    calculateReadiness = () => {
        const { selected } = this.state;

        if (typeof selected !== 'undefined' && selected.length > 0) {
            return false;
        } else {
            return true;
        }
    }
    handleContinuation = () => {
        const { selected } = this.state;

        this.props.addSignupData({
            ...this.props.signupData,
            accountType: selected
        })

        setTimeout(() => {
            this.props.props.navigation.navigate("personal-details");
        }, 1000)
    }
    render() {
        return (
           <Fragment>
               <Header>
                    <Left>
                        <Button onPress={() => {
                            this.props.props.navigation.goBack();
                        }} transparent>
                            <Image source={require("../../../assets/icons/go-back.png")} style={styles.headerIcon} />
                        </Button>
                    </Left>
                <Body>
                    <Title>Account Type</Title>
                    <Subtitle>Choose your account type</Subtitle>
                </Body>
                    <Right />
                </Header>
                <View style={styles.container}>
                    <View style={styles.margin}>
                        <Text style={styles.header}>Select account type</Text>
                        <View style={{ marginTop: 10 }} />
                        <Text style={styles.greyText}>You may change this at any time afterwards</Text>
                        <View style={{ marginTop: 10 }} />
                        <TouchableOpacity onPress={() => {
                            this.setState({
                                selected: "work"
                            })
                        }} style={this.state.selected === "work" ? styles.selectedRow : styles.row}>
                            <View style={styles.smallColumn}>
                                <Image source={require("../../../assets/icons/laptop.png")} style={styles.image} />
                            </View>
                            <View style={styles.largeColumn}>
                                <Text style={styles.blueText}>I want to work</Text>
                                <Text style={styles.innerText}>Browse and bid on jobs that suit your skills and needs</Text>
                            </View>
                        </TouchableOpacity>
                        <View style={{ marginTop: 20 }} />
                        <TouchableOpacity onPress={() => {
                            this.setState({
                                selected: "hire"
                            })
                        }} style={this.state.selected === "hire" ? styles.selectedRow : styles.row}>
                            <View style={styles.smallColumn}>
                                <Image source={require("../../../assets/icons/hire.png")} style={styles.image} />
                            </View>
                            <View style={styles.largeColumn}>
                                <Text style={styles.blueText}>I want to hire</Text>
                                <Text style={styles.innerText}>Find your perfect freelancer by posting a job or browsing our talent media platform</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.bottomContainer}>
                    <View style={{ margin: 10 }}>
                        <Text style={styles.greyTextTwo}>By signing up, I agree to "The Fair Market".com's {"\n"} <Text style={{ textDecorationLine: "underline" }}>Terms & Conditions</Text> & <Text style={{ textDecorationLine: "underline" }}>Privacy Policy</Text></Text>
                        {this.calculateReadiness() ? <AwesomeButtonBlue type={"disabled"} stretch={true}>Next</AwesomeButtonBlue> : <AwesomeButtonBlue type={"secondary"} onPress={this.handleContinuation} stretch={true}>Next</AwesomeButtonBlue>}
                    </View>
                </View>
           </Fragment>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        signupData: state.signupData.data
    }
}
export default connect(mapStateToProps, { addSignupData })(AccountTypeChooseHelper);