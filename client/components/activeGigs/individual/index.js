import React, { Component, Fragment } from 'react';
import { View, Text, Image, Dimensions } from 'react-native';
import SideMenu from "react-native-side-menu";
import Side from "../../navigation/sidemenu/index.js";
import { Subtitle, Header, Left, Body, Right, Button, Icon, Title } from 'native-base';
import styles from './styles.js';
import axios from "axios";
import Config from "react-native-config";
import { connect } from "react-redux";
import IndividualActiveJobHelper from "../active/individual/index.js";

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

        console.log("gigData", gigData);

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
 
        const gigData = this.props.props.route.params.item;
        console.log("this.props.props item.jobID", this.props.props);
        return (
           <Fragment>
                <SideMenu openMenuOffset={width * 0.80} menuPosition={"right"} isOpen={this.state.menuOpen} menu={menu}>
                        <Header style={{ backgroundColor: "#303030" }}>
                            <Left>
                                <Button onPress={() => {
                                    this.props.props.navigation.goBack();
                                }} transparent>
                                    <Image source={require("../../../assets/icons/go-back.png")} style={[styles.headerIcon, { tintColor: "#fdd530" }]} />
                                </Button>
                            </Left>
                            <Body>
                                <Title style={styles.goldText}>Pending Jobs</Title>
                                <Subtitle style={styles.goldText}>Live Active Jobs</Subtitle>
                            </Body>
                            <Right>
                                <Button onPress={() => {
                                    this.setState({
                                        menuOpen: !this.state.menuOpen
                                    })
                                }} transparent>
                                    <Icon style={{ color: "#ffd530" }} name='menu' />
                                </Button>
                            </Right>
                        </Header>
                        <IndividualActiveJobHelper item={{
                            jobID: gigData.jobID
                        }} props={this.props.props} />
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