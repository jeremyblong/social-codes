import React, { Component, Fragment } from 'react';
import { View, Text, Image, FlatList } from "react-native";
import { Header, Left, Body, Right, Title, Subtitle, Button, Text as NativeText, Card, CardItem, Thumbnail, Icon } from 'native-base';
import styles from './styles.js';
import axios from "axios";
import Config from "react-native-config";
import { connect } from "react-redux";
import moment from 'moment';
import Video from 'react-native-video';


class ActiveJobsMainPageHelper extends Component {
constructor(props) {
    super(props);

    this.state = {
        jobs: []
    };
}
    componentDidMount() {
        axios.get(`${Config.ngrok_url}/gather/active/live/jobs`, {
            params: {
                id: this.props.unique_id
            }
        }).then((res) => {
            if (res.data.message === "Gathered active jobs!") {
                console.log(res.data);

                const { activeHiredApplicants } = res.data;


                this.setState({
                    jobs: activeHiredApplicants
                })
            } else {
                console.log("Err", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    render() {
        return (
            <Fragment>
                <Header style={{ backgroundColor: "#303030" }}>
                    <Left>
                        <Button onPress={() => {
                            this.props.props.navigation.goBack();
                        }} transparent>
                            <Image source={require("../../../../assets/icons/go-back.png")} style={styles.headerIcon} />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={styles.goldText}>Pending Jobs</Title>
                        <Subtitle style={styles.goldText}>Live Active Jobs</Subtitle>
                    </Body>
                    <Right />
                </Header>
                <View style={styles.container}>
                    <FlatList
                        data={this.state.jobs}
                        renderItem={({ item }) => {
                            console.log("iTeM: ", item);
                            return (
                                <Fragment>
                                    <Card>  
                                        <CardItem>
                                        <Left>
                                            {item.type === "video" ? <Video source={{uri: item.photo }}   // Can be a URL or a local file.
                                                ref={(ref) => {
                                                    this.player = ref
                                                }}
                                                style={styles.thumbnailVideo} /> : <Thumbnail style={styles.thumbnailVideo} source={{uri: item.photo }} />}
                                            <Body>
                                                <Text>Active with {item.otherUserFirstName} {item.otherUserLastName}</Text>
                                                <Text note>{item.otherUserUsername}</Text>
                                            </Body>
                                        </Left>
                                        </CardItem>
                                        <CardItem>
                                      
                                        <Body>
                                            <Button onPress={() => {
                                                this.props.props.navigation.push("active-job-individual-full-listing", { item })
                                            }} style={styles.greyButton} info>
                                                <Text style={{ color: "#ffd530" }}>Visit Job</Text>
                                            </Button>
                                        </Body>
                                        <Right>
                                            <Text>Initiated {moment(item.systemDate).fromNow()}</Text>
                                        </Right>
                                        </CardItem>
                                    </Card>
                                </Fragment>
                            );
                        }}
                    />    
                </View>
            </Fragment>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        unique_id: state.signupData.authData.unique_id
    }
}
export default connect(mapStateToProps, { })(ActiveJobsMainPageHelper)
