import React, { Component, Fragment } from 'react'
import { View, Text, Image, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import styles from './styles.js';
import SearchBar from 'react-native-search-bar';
import axios from "axios";
import Config from "react-native-config";
import moment from 'moment';


class HoempageAllPostsHelper extends Component {
constructor(props) {
    super(props);

    this.state = {
        searchValue: "",
        count: 5,
        tags: ["python", "machine-learning", "supervised-learning", "networking", "processing", "fitmata", "react-native"],
        data: [],
        scrolling: false,
        onEndReached: false
    }
}
    handleSearchFilter = () => {
        console.log("handleSearchFilter clicked.");
    }
    cancelSearch = () => {
        console.log("cancelSearch clicked.");
    }
    scrolling = () => {
        console.log("scrolling.......................");
    }
    componentDidMount() {

        axios.get(`${Config.ngrok_url}/gather/forums/posts`).then((res) => {
            if (res.data.message === "Gathered forum posts!") {

                const { posts } = res.data

                this.setState({
                    data: posts
                })
                console.log(res.data);
            } else {
                console.log("err", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    
    render() {
        const { tags, data } = this.state;
        return (
            <View style={{ flex: 1 }}>
                <FlatList
                    onScroll={this.scrolling}
                    data={data}
                    style={{ flex: 1, marginBottom: 110 }}
                    ListHeaderComponent={() => {
                        return (
                            <View style={{ flex: 1 }}>
                                <SearchBar
                                    ref={(ref) => this.searchBar = ref}
                                    placeholder="Search"
                                    onChangeText={(searchValue) => {
                                        this.setState({
                                            searchValue
                                        })
                                    }}
                                    onSearchButtonPress={this.handleSearchFilter}
                                    onCancelButtonPress={this.cancelSearch}
                                />
                                <View style={styles.margin}>
                                    <Text style={styles.headerText}>Filter/Sort by</Text>
                                </View>
                                <View style={styles.hr} />
                                    <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} style={styles.scrollRow}> 
                                        <View style={styles.outter}>
                                            <TouchableOpacity onPress={() => {}} style={styles.block}>
                                                <Text style={styles.innerTagText}>Newest</Text>
                                            </TouchableOpacity>
                                        </View>
                                        <View style={styles.outter}>
                                            <TouchableOpacity onPress={() => {}} style={styles.block}>
                                                <Text style={styles.innerTagText}>Oldest</Text>
                                            </TouchableOpacity>
                                        </View>
                                        <View style={styles.outter}>
                                            <TouchableOpacity onPress={() => {}} style={styles.block}>
                                                <Text style={styles.innerTagText}>Tags</Text>
                                            </TouchableOpacity>
                                        </View>
                                        <View style={styles.outter}>
                                            <TouchableOpacity onPress={() => {}} style={styles.block}>
                                                <Text style={styles.innerTagText}>Highest Ranked</Text>
                                            </TouchableOpacity>
                                        </View>
                                        <View style={styles.outter}>
                                            <TouchableOpacity onPress={() => {}} style={styles.block}>
                                                <Text style={styles.innerTagText}>Most Viewed</Text>
                                            </TouchableOpacity>
                                        </View>
                                </ScrollView>
                            </View>
                        );
                    }}
                    renderItem={({ item, index }) => {
                        return (
                            <TouchableOpacity key={index} onPress={() => {
                                this.props.props.navigation.navigate("individual-forum-post-visit", { item });
                            }} style={styles.questionBox}>
                                <View style={styles.smallColumn}>
                                    <View style={styles.innerRow}>
                                        <View style={styles.normalColumn}>
                                            <Text style={styles.countText}><Text style={{ color: "green" }}>+{item.likes.toString()}</Text></Text>
                                            <Text style={styles.countText}><Text style={{ color: "red" }}>-{item.dislikes.toString()}</Text></Text>
                                        </View>
                                        <Image source={require("../../../../../assets/icons/upvote.png")} style={styles.upDownImage} />
                                    </View>
                                    <View style={styles.innerRow}>
                                        <View style={styles.normalColumn}>
                                            <Text style={styles.countText}>{item.responses.length}</Text>
                                        </View>
                                        <Image source={require("../../../../../assets/icons/comment-small.png")} style={styles.upDownImage} />
                                    </View>
                                </View>
                                <View style={styles.largeColumn}>
                                    <View style={styles.largeRow}>
                                        <Text style={styles.mainText}>{item.title}</Text>
                                    </View>
                                    <View style={styles.largeRowTwo}>
                                        {typeof item.tags !== "undefined" && item.tags.length > 0 ? item.tags.slice(0, 4).map((tag, index) => {
                                            return (
                                                <View key={index} style={styles.tag}>
                                                    <Text>{tag}</Text>
                                                </View>
                                            );
                                        }) : null}
                                    </View>
                                    <View style={styles.largeRow}>
                                        <Text style={{ color: "grey", fontSize: 13 }}>{moment(item.systemDate).fromNow()} by <Text style={{ fontWeight: "bold", color: "#0057ff" }}>{item.firstName} {item.lastName}</Text></Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        );
                    }}
                    onEndReachedThreshold={0.3}
                    keyExtractor={(item) => item.unique_id}
                    onEndReached={({ distanceFromEnd }) => {
                        if (this.state.scrolling === true) {
                            if (distanceFromEnd >= 0) {
                                this.setState({
                                    onEndReached: true
                                }, () => {
                                    this._handleLoadMore();
                                })
                            }
                        }
                    }}
                    onEndReachedThreshold={0.2}
                />
            </View>
        )
    }
}
export default HoempageAllPostsHelper;