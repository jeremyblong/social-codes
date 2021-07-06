import React, { Component, Fragment } from 'react';
import { View, Text, Image, Dimensions } from 'react-native';
import SideMenu from "react-native-side-menu";
import Side from "../../navigation/sidemenu/index.js";
import { Subtitle, Header, Left, Body, Right, Button, Icon, Title } from 'native-base';
import styles from './styles.js';
import axios from "axios";
import Config from "react-native-config";
import { connect } from "react-redux";

const { width, height } = Dimensions.get("window");

class IndividualGigManageHelper extends Component {
constructor(props) {
    super(props);

    this.state = {
        menuOpen: false
    }
}
    componentDidMount() {

        const gigData = this.props.props.route.params.item;

        axios.get(`${Config.ngrok_url}/gather/agreement/details/and/job`, {
            params: {
                id: this.props.unique_id,
                gigData
            }
        }).then((res) => {
            if (res.data.message === "") {
                console.log(res.data);
            } else {
                console.log("Err", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    render() {
        const menu = <Side props={this.props} />;
        const item = this.props.props.route.params.item;

        console.log("this.props.props", this.props.props);
        return (
           <Fragment>
                <SideMenu openMenuOffset={width * 0.80} menuPosition={"right"} isOpen={this.state.menuOpen} menu={menu}>
                    <Header>
                            <Left>
                                <Button onPress={() => {
                                    this.props.props.navigation.goBack();
                                }} transparent>
                                    <Icon style={{ color: "black" }} name='arrow-back' />
                                </Button>
                            </Left>
                            <Body>
                                <Title>Individual Gig</Title>
                                <Subtitle>Manage your gig & more...</Subtitle>
                            </Body>
                            <Right>
                                <Button onPress={() => {
                                    this.setState({
                                        menuOpen: !this.state.menuOpen
                                    })
                                }} transparent>
                                    <Icon style={{ color: "black" }} name='menu' />
                                </Button>
                            </Right>
                        </Header>
                        <View style={styles.container}>
                            <View style={styles.margin}>
                                <Text style={styles.headerText}>Job is <Text style={{ textDecorationLine: "underline" }}>active</Text> with {item.otherUserFirstName} {item.otherUserLastName} {"\n"}{"\n"}Username: {item.otherUserUsername}</Text>
                                <View style={styles.hr} />
                            </View>
                        </View>
                </SideMenu>
           </Fragment>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        unique_id: state.signupData.authData.unique_id
    }
}
export default connect(mapStateToProps, {  })(IndividualGigManageHelper);