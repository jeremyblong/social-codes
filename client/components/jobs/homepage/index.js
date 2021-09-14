import React, { Component, Fragment } from 'react';
import { View, Text, Image, ScrollView, Dimensions, TouchableOpacity, FlatList, Animated, Platform } from 'react-native';
import styles from './styles.js';
import { Button, Icon, Footer, FooterTab, Badge } from 'native-base';
import LottieView from 'lottie-react-native';
import SideMenu from "react-native-side-menu";
import Side from "../../navigation/sidemenu/index.js";
import axios from "axios";
import Config from "react-native-config";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import JobHelperSubComponent from "./helpers/job.js";
import { TabBar, TabView, SceneMap } from 'react-native-tab-view';
import PromoHelper from "./helpers/promos/index.js";
import SearchJobsWithFilterHelper from "./helpers/filteredSearch/filteredSearch.js";

const { height, width } = Dimensions.get("window");


class JobsHomepageDisplayHelper extends Component {
constructor(props) {
    super(props);

    this.state = {
        menuOpen: false,
        activeJobs: [],
        alreadyPooled: [],
        index: 0,
        scrolling: false,
        onEndReached: false,
        page: 0, 
        routes: [
            { key: 'first', title: 'General Jobs' },
            { key: 'second', title: 'Filter Jobs' },
        ],
        loadingMore: false,
        ready: false
    }
}
    componentDidMount() {
        axios.post(`${Config.ngrok_url}/gather/jobs`, {
            alreadyPooled: this.state.alreadyPooled
        }).then((res) => {
            if (res.data.message === "Successfully located jobs!") {
                console.log(res.data);

                const { jobs } = res.data;

                for (let index = 0; index < jobs.length; index++) {
                    const job = jobs[index];
                    
                    this.setState({
                        alreadyPooled: [...this.state.alreadyPooled, job.unique_id],
                        activeJobs: jobs,
                        ready: true
                    })
                }
            } else {
                console.log("err", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    fetchMore = () => {
        axios.post(`${Config.ngrok_url}/gather/jobs`, {
            alreadyPooled: this.state.alreadyPooled
        }).then((res) => {
            if (res.data.message === "Successfully located jobs!") {
                console.log(res.data);

                const { jobs } = res.data;

                if (typeof jobs !== "undefined" && jobs.length > 0) {
                    const promiseeee = new Promise((resolve, reject) => {
                        const arr = [];

                        this.setState({
                            activeJobs: [...this.state.activeJobs, ...jobs],
                            loadingMore: false
                        }, () => {
                            for (let index = 0; index < jobs.length; index++) {
                                const job = jobs[index];
                                arr.push(job.unique_id);

                                if ((jobs.length - 1) === index) {
                                    resolve(arr);
                                }
                            }
                        })
                    })

                    promiseeee.then((passedValues) => {
                        this.setState({
                            alreadyPooled: [...this.state.alreadyPooled, ...passedValues],
                            scrolling: false,
                            onEndReached: false
                        })
                    })
                } else {
                    this.setState({
                        loadingMore: false,
                        scrolling: false,
                        onEndReached: false
                    })
                }
            } else {
                console.log("err", res.data);

                this.setState({
                    loadingMore: false,
                    scrolling: false,
                    onEndReached: false
                })
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    changeTabs = (tab) => {
        console.log("tab", tab);
    }
    _renderTabBar = (props) => {    
        return (
          <View style={styles.tabBar}>
            {props.navigationState.routes.map((route, i) => {
    
                if (route.key === this.state.routes[this.state.index].key) {
                    return (
                    <TouchableOpacity
                        style={[styles.tabItem, { backgroundColor: "black" }]}
                        onPress={() => {
                            this.setState({ 
                                index: i 
                            })
                        }}>
                        <Animated.Text style={{ opacity: 1, fontWeight: "bold", fontSize: 15, color: "white" }}>{route.title}</Animated.Text>
                        </TouchableOpacity>
                    );
                } else {
                    return (
                    <TouchableOpacity
                        style={[styles.tabItem, { backgroundColor: "#E9EBEE" }]}
                        onPress={() => {
                            this.setState({ 
                                index: i 
                            })
                        }}>
                        <Animated.Text style={{ opacity: 1, fontWeight: "bold", fontSize: 15, color: "black" }}>{route.title}</Animated.Text>
                        </TouchableOpacity>
                    );
                }
            })}
          </View>
        );
    };
    renderScene = ({ route, jumpTo }) => {
        const { activeJobs } = this.state;
        switch (route.key) {
          case 'first':
            return (
                <View style={{ }}>
                     <FlatList
                        containerCustomStyle={{
                            flexGrow: 0
                        }}
                        containerStyle={{ paddingVertical: 0 }}
                        contentContainerStyle={{ paddingVertical: 0, paddingBottom: 0 }}
                        onScroll={this.scrolling}
                        ListHeaderComponent={() => {
                            return (
                                <PromoHelper activeJobs={this.state.activeJobs} props={this.props} loaded={this.state.ready} />
                            );
                        }}
                        data={activeJobs}
                        renderItem={({ item, index }) => {
                            if (this.state.routes[this.state.index].key === "first") {
                                return (
                                    <JobHelperSubComponent manage={false} props={this.props} item={item} />
                                );
                            }
                        }}
                        onEndReached={({ distanceFromEnd }) => {
                            if (distanceFromEnd >= 0 && this.state.scrolling === true) {
                                this.fetchMore();
                            }
                        }}
                        keyExtractor={(item) => item.unique_id}
                        onEndReachedThreshold={0.5}
                    />
                </View>
            );
          case 'second':
            return (
                <Fragment>
                    <SearchJobsWithFilterHelper props={this.props} />
                </Fragment>
            )
        }
    };
    scrolling = () => {
        if (this.state.scrolling === false && this.state.routes[this.state.index].key === "first") {
            this.setState({
                scrolling: true
            })
        }
    }
    render() {
        const { activeJobs } = this.state;

        console.log("this.state. jobs homepage", this.state);

        const menu = <Side props={this.props} />;
        return (
            <Fragment>
            <SideMenu onChange={(value) => {
                if (value === false) {
                    this.setState({
                        menuOpen: false
                    })
                }
            }} openMenuOffset={width * 0.80} menuPosition={"right"} isOpen={this.state.menuOpen} menu={menu}>
                <View style={styles.container}>
                <TouchableOpacity onPress={() => {
                    this.setState({
                        menuOpen: !this.state.menuOpen
                    })
                }} style={styles.bottomRightCorner}>
                    <Image source={require("../../../assets/icons/circle-menu.png")} style={styles.circleMenu} />
                </TouchableOpacity>
                <Footer style={Platform.OS === "ios" ? { borderColor: "transparent", backgroundColor: "black", marginTop: -7.5 } : { borderColor: "transparent" }}>
                    <FooterTab>
                        <Button style={styles.goldButton} button={true} onPress={() => {
                            this.props.props.navigation.push("homepage");
                        }}>
                            <Image source={require("../../../assets/icons/home.png")} style={styles.maxedIconSmall} />
                        </Button>
                        <Button style={styles.goldButton} active button={true} onPress={() => {
                            this.props.props.navigation.push("jobs-homepage");
                        }}>
                            <Image source={require("../../../assets/icons/seeker.png")} style={styles.maxedIconSmall} />
                        </Button>
                        <Button style={styles.goldButton} button={true} onPress={() => {
                            this.props.props.navigation.push("people-list-all");
                        }}>
                            <Image source={require("../../../assets/icons/people.png")} style={styles.maxedIconSmall} />
                        </Button>
                        <Button style={[styles.goldButton, { paddingBottom: 20 }]} button={true} onPress={() => {
                            this.props.props.navigation.push("notifications");
                        }}>
                            <Badge style={styles.absoluteBadge}><Text style={{ color: "white", fontSize: 10 }}>51</Text></Badge>
                            <Image source={require("../../../assets/icons/bell.png")} style={styles.maxedIconSmall} />
                            
                        </Button>
                        <Button style={styles.goldButton} onPress={() => {
                            this.props.props.navigation.push("navigation-menu-main");
                        }}>
                            <Image source={require("../../../assets/icons/squared-menu.png")} style={styles.maxedIconSmall} />
                        </Button>
                    </FooterTab>
                </Footer>
                
                {typeof activeJobs !== "undefined" && activeJobs.length > 0 ? null : <View style={{ margin: 15 }}><SkeletonPlaceholder>
                            <View style={{ flexDirection: "row" }}>
                                <View style={{ flexDirection: "column", width: width * 0.40, minHeight: 240, marginTop: 5 }}></View>
                                <View style={{ flexDirection: "column" }}>
                                    <View style={{ flexDirection: "row", width: width * 0.50, height: 56.25, marginLeft: 10, marginTop: 5 }} />
                                    <View style={{ flexDirection: "row", width: width * 0.50, height: 56.25, marginLeft: 10, marginTop: 5 }} />
                                    <View style={{ flexDirection: "row", width: width * 0.50, height: 56.25, marginLeft: 10, marginTop: 5 }} />
                                    <View style={{ flexDirection: "row", width: width * 0.50, height: 56.25, marginLeft: 10, marginTop: 5 }} />
                                </View>
                            </View>
                    </SkeletonPlaceholder>
                    <View style={{ marginTop: 20 }} />
                    <SkeletonPlaceholder>
                            <View style={{ flexDirection: "row" }}>
                                <View style={{ flexDirection: "column", width: width * 0.40, minHeight: 240, marginTop: 5 }}></View>
                                <View style={{ flexDirection: "column" }}>
                                    <View style={{ flexDirection: "row", width: width * 0.50, height: 56.25, marginLeft: 10, marginTop: 5 }} />
                                    <View style={{ flexDirection: "row", width: width * 0.50, height: 56.25, marginLeft: 10, marginTop: 5 }} />
                                    <View style={{ flexDirection: "row", width: width * 0.50, height: 56.25, marginLeft: 10, marginTop: 5 }} />
                                    <View style={{ flexDirection: "row", width: width * 0.50, height: 56.25, marginLeft: 10, marginTop: 5 }} />
                                </View>
                            </View>
                    </SkeletonPlaceholder>
                    <View style={{ marginTop: 20 }} />
                    <SkeletonPlaceholder>
                            <View style={{ flexDirection: "row" }}>
                                <View style={{ flexDirection: "column", width: width * 0.40, minHeight: 240, marginTop: 5 }}></View>
                                <View style={{ flexDirection: "column" }}>
                                    <View style={{ flexDirection: "row", width: width * 0.50, height: 56.25, marginLeft: 10, marginTop: 5 }} />
                                    <View style={{ flexDirection: "row", width: width * 0.50, height: 56.25, marginLeft: 10, marginTop: 5 }} />
                                    <View style={{ flexDirection: "row", width: width * 0.50, height: 56.25, marginLeft: 10, marginTop: 5 }} />
                                    <View style={{ flexDirection: "row", width: width * 0.50, height: 56.25, marginLeft: 10, marginTop: 5 }} />
                                </View>
                            </View>
                    </SkeletonPlaceholder>
                    <View style={{ marginTop: 20 }} />
                    <SkeletonPlaceholder>
                            <View style={{ flexDirection: "row" }}>
                                <View style={{ flexDirection: "column", width: width * 0.40, minHeight: 240, marginTop: 5 }}></View>
                                <View style={{ flexDirection: "column" }}>
                                    <View style={{ flexDirection: "row", width: width * 0.50, height: 56.25, marginLeft: 10, marginTop: 5 }} />
                                    <View style={{ flexDirection: "row", width: width * 0.50, height: 56.25, marginLeft: 10, marginTop: 5 }} />
                                    <View style={{ flexDirection: "row", width: width * 0.50, height: 56.25, marginLeft: 10, marginTop: 5 }} />
                                    <View style={{ flexDirection: "row", width: width * 0.50, height: 56.25, marginLeft: 10, marginTop: 5 }} />
                                </View>
                            </View>
                    </SkeletonPlaceholder></View>}
                    <TabView 
                        swipeEnabled={false}
                        navigationState={this.state}
                        renderTabBar={ this._renderTabBar}
                        onIndexChange={index => this.setState({ index })}
                        renderScene={this.renderScene} 
                    />
                </View>
                
            </SideMenu>
            </Fragment>
        )
    }
}
export default JobsHomepageDisplayHelper;