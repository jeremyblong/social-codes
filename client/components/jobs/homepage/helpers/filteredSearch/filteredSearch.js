import React, { PureComponent, Fragment } from 'react';
import { View, Text, Image, TouchableOpacity, Dimensions, ScrollView, FlatList } from 'react-native';
import axios from 'axios';
import Config from 'react-native-config';
import SearchBar from 'react-native-search-bar';
import styles from './styles.js';
import RBSheet from "react-native-raw-bottom-sheet";
import { Header, Left, Body, Right, Button, Icon, Title, Text as NativeText, Subtitle } from 'native-base';
import RNPickerSelect from 'react-native-picker-select';
import CheckBox from 'react-native-check-box';
import AwesomeButtonBlue from 'react-native-really-awesome-button/src/themes/blue';
import JobHelperSubComponent from "../job.js";

const { height, width } = Dimensions.get("window");


class SearchJobsWithFilterHelper extends PureComponent {
constructor(props) {
    super(props);

    this.state = {
        alreadyPooled: [],
        activeJobs: [],
        ready: false,
        sort: null,
        experienceLevel: [],
        allTags: [],
        jobType: [],
        numberOfProposals: [],
        clientPayment: [],
        budget: [],
        projectLengthOfTime: [],
        hoursPerWeek: [],
        scrolling: false,
        onEndReached: false,
        page: 0
    }
}
    scrolling = () => {
        if (this.state.scrolling === false) {
            this.setState({
                scrolling: true
            })
        }
    }
    componentDidMount() {
        
    }
    handleValueSearch = () => {
        const { searchValue } = this.state;

        console.log("handleSearch", searchValue.toLowerCase());

        this.setState({
            activeJobs: this.state.activeJobs.filter((item) => {
                if (item.title.toLowerCase().includes(searchValue.toLowerCase())) {
                    return item;
                }
            })
        })
    }
    removeItem = (passed) => {
        const index = this.state.allTags.indexOf(passed);

        this.state.allTags.splice(index, 1);

        return this.state.allTags;
    }
    handleFilteredSearch = () => {
        const { experienceLevel, jobType, numberOfProposals, clientPayment, budget, projectLengthOfTime, hoursPerWeek } = this.state;

        axios.get(`${Config.ngrok_url}/filter/search/jobs/query`, {
            params: {
                experienceLevel,
                jobType,
                numberOfProposals,
                clientPayment,
                budget,
                projectLengthOfTime, 
                hoursPerWeek
            }
        }).then((res) => {
            if (res.data.message === "Successfully located queried jobs!") {
                console.log("search filtered results res.data: ", res.data);

                const { result } = res.data;

                this.setState({
                    activeJobs: result
                }, () => {
                    this.RBSheet.close();
                })
            } else {
                console.log("err", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    fetchMore = () => {
        console.log("fetch more... clicked.");

        this.setState({
            scrolling: false,
            onEndReached: false
        })

        // axios.post(`${Config.ngrok_url}/gather/jobs`, {
        //     alreadyPooled: this.state.alreadyPooled
        // }).then((res) => {
        //     if (res.data.message === "Successfully located jobs!") {
        //         console.log(res.data);

        //         const { jobs } = res.data;

        //         if (typeof jobs !== "undefined" && jobs.length > 0) {
        //             this.setState({
        //                 activeJobs: [...this.state.activeJobs, jobs[0]],
        //                 loadingMore: false
        //             }, () => {
        //                 for (let index = 0; index < jobs.length; index++) {
        //                     const job = jobs[index];
                            
        //                     this.setState({
        //                         alreadyPooled: [...this.state.alreadyPooled, job.unique_id],
        //                         scrolling: false,
        //                         onEndReached: false
        //                     })
        //                 }
        //             })
        //         } else {
                    // this.setState({
                    //     loadingMore: false,
                    //     scrolling: false,
                    //     onEndReached: false
                    // })
        //         }
        //     } else {
        //         console.log("err", res.data);

        //         this.setState({
        //             loadingMore: false,
        //             scrolling: false,
        //             onEndReached: false
        //         })
        //     }
        // }).catch((err) => {
        //     console.log(err);
        // })
    }
    _handleLoadMore = (data) => {
        console.log("loaded...", data);

        this.setState(
          (prevState, nextProps) => ({
            page: prevState.page + 1,
            loadingMore: true
          }),
          () => {
            this.fetchMore();
          }
        );
    };
    handleTypingSearch = () => {
        const { searchValue } = this.state;

        axios.post(`${Config.ngrok_url}/search/jobs/for/term`, {
            searchValue
        }).then((res) => {
            if (res.data.message === "Narrowed search!") {
                console.log(res.data);

                const { results } = res.data;

                this.setState({
                    activeJobs: results
                })
            } else {
                console.log("err", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    render() {
        console.log("filteredSearch", this.state);

        const { allTags, activeJobs } = this.state;
        return (
            <Fragment>
                <View style={[styles.row, { paddingBottom: 15 }]}>
                    <View style={styles.largeColumn}>
                        <SearchBar 
                            textColor={"#303030"}
                            ref="searchBar"
                            placeholder="Search"
                            onChangeText={(searchValue) => {
                                this.setState({
                                    searchValue
                                }, () => {
                                    this.handleTypingSearch();
                                })
                            }}
                            onSearchButtonPress={this.handleValueSearch}
                            onCancelButtonPress={() => {
                                this.setState({
                                    searchValue: ""
                                })
                            }}
                        />
                    </View>
                    <View style={styles.smallColumn}>
                        <TouchableOpacity onPress={() => {
                            this.RBSheet.open();
                        }} style={styles.searchContainer}>
                            <Image source={require("../../../../../assets/icons/filter.png")} style={[styles.searchIcon, { tintColor: "#fdd530" }]} />
                        </TouchableOpacity>
                    </View>
                </View>
                <FlatList
                    onScroll={this.scrolling}
                    data={activeJobs}
                    renderItem={({ item, index }) => {
                        return (
                            <JobHelperSubComponent manage={false} props={this.props.props} item={item} />
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
                <RBSheet
                    ref={ref => {
                        this.RBSheet = ref;
                    }}
                    height={height * 0.95}
                    closeOnDragDown={false}
                    openDuration={250}
                    customStyles={{
                        container: {
                            borderTopRightRadius: 40,
                            borderTopLeftRadius: 40
                        },
                        draggableIcon: {

                        }
                    }}
                >
                    <Header style={styles.headerGrey}>
                        <Left>
                            <Button onPress={() => {
                                this.RBSheet.close();
                            }} transparent>
                                <Icon style={{ color: "#ffd530" }} name='arrow-back' />
                                {Platform.OS === "ios" ? <NativeText style={{ color: "black" }}>Back</NativeText> : null}
                            </Button>
                        </Left>
                        <Body>
                            <Title style={styles.goldText}>Search</Title>
                            <Subtitle style={styles.goldText}>Search Settings & more...</Subtitle>
                        </Body>
                        <Right>
                            
                        </Right>
                    </Header>
                    <ScrollView contentContainerStyle={{ paddingBottom: 50 }} style={styles.container}>
                        <View style={[styles.margin, { flexDirection: "row", flexWrap: 'wrap' }]}>
                            {typeof allTags !== 'undefined' && allTags.length > 0 ? allTags.map((tag, index) => {
                                return (
                                    <Fragment>
                                        <View style={styles.tagTop}>
                                            <Text style={{ color: "white", fontWeight: "bold" }}>{tag}</Text>
                                        </View>
                                    </Fragment>
                                );
                            }) : null}
                        </View>
                        <View style={styles.margin}>
                            <Text style={styles.label}>Sort</Text>
                            <RNPickerSelect
                                style={styles}
                                onValueChange={(value) => {
                                    this.setState({
                                        sort: value
                                    })
                                }}
                                items={[
                                    { label: 'Relevance', value: 'relevance' },
                                    { label: 'Newest', value: 'newest' },
                                    { label: 'Client Spending', value: 'client spending' },
                                    { label: 'Client Rating', value: 'client rating' }
                                ]}
                                placeholder={{ label: "Sort by...", value: null }}
                            />

                            <View style={{ marginTop: 25 }} />
                            <Text style={styles.label}>Narrow by</Text>
                            <RNPickerSelect
                                style={styles}
                                onValueChange={(value) => {
                                    this.setState({
                                        sort: value
                                    })
                                }}
                                items={[
                                    { label: 'Relevance', value: 'relevance' },
                                    { label: 'Newest', value: 'newest' },
                                    { label: 'Client Spending', value: 'client spending' },
                                    { label: 'Client Rating', value: 'client rating' }
                                ]}
                                placeholder={{ label: "Select Category", value: null }}
                            />
                            <View style={{ marginTop: 10 }} />
                            <Text style={styles.label}>Experience Level</Text>
                            <View style={{ marginTop: 10 }} />
                            <CheckBox
                                style={{ flex: 1, padding: 10 }}
                                onClick={() => {
                                    if (this.state.experienceLevel.includes("entry-level")) {
                                        this.setState({
                                            experienceLevel: this.state.experienceLevel.filter((item) => {
                                                if (item !== "entry-level") {
                                                    return item;
                                                }
                                            }),
                                            allTags: this.removeItem("Entry Level")
                                        })
                                    } else {
                                        this.setState({
                                            experienceLevel: [...this.state.experienceLevel, "entry-level"],
                                            allTags: [...this.state.allTags, "Entry Level"]
                                        })
                                    }
                                }}
                                checkBoxColor={"blue"}
                                rightText={"Entry Level"}
                                uncheckedCheckBoxColor={"black"}
                                isChecked={this.state.experienceLevel.includes("entry-level") ? true : false}
                            />
                            <View style={{ marginTop: 4 }} />
                            <CheckBox
                                style={{ flex: 1, padding: 10 }}
                                onClick={() => {
                                    if (this.state.experienceLevel.includes("intermediate")) {
                                        this.setState({
                                            experienceLevel: this.state.experienceLevel.filter((item) => {
                                                if (item !== "intermediate") {
                                                    return item;
                                                }
                                            }),
                                            allTags: this.removeItem("Intermediate Level")
                                        })
                                    } else {
                                        this.setState({
                                            experienceLevel: [...this.state.experienceLevel, "intermediate"],
                                            allTags: [...this.state.allTags, "Intermediate Level"]
                                        })
                                    }
                                }}
                                checkBoxColor={"blue"}
                                rightText={"Intermediate Level"}
                                uncheckedCheckBoxColor={"black"}
                                isChecked={this.state.experienceLevel.includes("intermediate") ? true : false}
                            />
                            <View style={{ marginTop: 4 }} />
                            <CheckBox
                                style={{ flex: 1, padding: 10 }}
                                onClick={() => {
                                    if (this.state.experienceLevel.includes("expert")) {
                                        this.setState({
                                            experienceLevel: this.state.experienceLevel.filter((item) => {
                                                if (item !== "expert") {
                                                    return item;
                                                }
                                            }),
                                            allTags: this.removeItem("Expert Level")
                                        })
                                    } else {
                                        this.setState({
                                            experienceLevel: [...this.state.experienceLevel, "expert"],
                                            allTags: [...this.state.allTags, "Expert Level"]
                                        })
                                    }
                                }}
                                checkBoxColor={"blue"}
                                rightText={"Expert Level"}
                                uncheckedCheckBoxColor={"black"}
                                isChecked={this.state.experienceLevel.includes("expert") ? true : false}
                            />
                            <View style={{ marginTop: 10 }} />
                            <Text style={styles.label}>Job Type</Text>
                            <View style={{ marginTop: 10 }} />
                            <CheckBox
                                style={{ flex: 1, padding: 10 }}
                                onClick={() => {
                                    if (this.state.jobType.includes("hourly")) {
                                        this.setState({
                                            jobType: this.state.jobType.filter((item) => {
                                                if (item !== "hourly") {
                                                    return item;
                                                }
                                            }),
                                            allTags: this.removeItem("Hourly")
                                        })
                                    } else {
                                        this.setState({
                                            jobType: [...this.state.jobType, "hourly"],
                                            allTags: [...this.state.allTags, "Hourly"]
                                        })
                                    }
                                }}
                                checkBoxColor={"blue"}
                                rightText={"Hourly"}
                                uncheckedCheckBoxColor={"black"}
                                isChecked={this.state.jobType.includes("hourly") ? true : false}
                            />
                            <View style={{ marginTop: 4 }} />
                            <CheckBox
                                style={{ flex: 1, padding: 10 }}
                                onClick={() => {
                                    if (this.state.jobType.includes("fixed-rate")) {
                                        this.setState({
                                            jobType: this.state.jobType.filter((item) => {
                                                if (item !== "fixed-rate") {
                                                    return item;
                                                }
                                            }),
                                            allTags: this.removeItem("Fixed Price")
                                        })
                                    } else {
                                        this.setState({
                                            jobType: [...this.state.jobType, "fixed-rate"],
                                            allTags: [...this.state.allTags, "Fixed Price"]
                                        })
                                    }
                                }}
                                checkBoxColor={"blue"}
                                rightText={"Fixed Price"}
                                uncheckedCheckBoxColor={"black"}
                                isChecked={this.state.jobType.includes("fixed-rate") ? true : false}
                            />
                            <View style={{ marginTop: 10 }} />
                            <Text style={styles.label}>Number of proposals</Text>
                            <View style={{ marginTop: 10 }} />
                            <CheckBox
                                style={{ flex: 1, padding: 10 }}
                                onClick={() => {
                                    if (this.state.numberOfProposals.includes("less-than-5")) {
                                        this.setState({
                                            numberOfProposals: this.state.numberOfProposals.filter((item) => {
                                                if (item !== "less-than-5") {
                                                    return item;
                                                }
                                            }),
                                            allTags: this.removeItem("Less Than 5 Proposals")
                                        })
                                    } else {
                                        this.setState({
                                            numberOfProposals: [...this.state.numberOfProposals, "less-than-5"],
                                            allTags: [...this.state.allTags, "Less Than 5 Proposals"]
                                        })
                                    }
                                }}
                                checkBoxColor={"blue"}
                                rightText={"Less Than 5 Proposals"}
                                uncheckedCheckBoxColor={"black"}
                                isChecked={this.state.numberOfProposals.includes("less-than-5") ? true : false}
                            />
                            <View style={{ marginTop: 4 }} />
                            <CheckBox
                                style={{ flex: 1, padding: 10 }}
                                onClick={() => {
                                    if (this.state.numberOfProposals.includes("5-10")) {
                                        this.setState({
                                            numberOfProposals: this.state.numberOfProposals.filter((item) => {
                                                if (item !== "5-10") {
                                                    return item;
                                                }
                                            }),
                                            allTags: this.removeItem("5 to 10 Proposals")
                                        })
                                    } else {
                                        this.setState({
                                            numberOfProposals: [...this.state.numberOfProposals, "5-10"],
                                            allTags: [...this.state.allTags, "5 to 10 Proposals"]
                                        })
                                    }
                                }}
                                checkBoxColor={"blue"}
                                rightText={"5 to 10 Proposals"}
                                uncheckedCheckBoxColor={"black"}
                                isChecked={this.state.numberOfProposals.includes("5-10") ? true : false}
                            />
                            <View style={{ marginTop: 4 }} />
                            <CheckBox
                                style={{ flex: 1, padding: 10 }}
                                onClick={() => {
                                    if (this.state.numberOfProposals.includes("10-15")) {
                                        this.setState({
                                            numberOfProposals: this.state.numberOfProposals.filter((item) => {
                                                if (item !== "10-15") {
                                                    return item;
                                                }
                                            }),
                                            allTags: this.removeItem("10 to 15 Proposals")
                                        })
                                    } else {
                                        this.setState({
                                            numberOfProposals: [...this.state.numberOfProposals, "10-15"],
                                            allTags: [...this.state.allTags, "10 to 15 Proposals"]
                                        })
                                    }
                                }}
                                checkBoxColor={"blue"}
                                rightText={"10 to 15 Proposals"}
                                uncheckedCheckBoxColor={"black"}
                                isChecked={this.state.numberOfProposals.includes("10-15") ? true : false}
                            />
                            <View style={{ marginTop: 4 }} /> 
                            <CheckBox
                                style={{ flex: 1, padding: 10 }}
                                onClick={() => {
                                    if (this.state.numberOfProposals.includes("15-20")) {
                                        this.setState({
                                            numberOfProposals: this.state.numberOfProposals.filter((item) => {
                                                if (item !== "15-20") {
                                                    return item;
                                                }
                                            }),
                                            allTags: this.removeItem("15 to 20 Proposals")
                                        })
                                    } else {
                                        this.setState({
                                            numberOfProposals: [...this.state.numberOfProposals, "15-20"],
                                            allTags: [...this.state.allTags, "15 to 20 Proposals"]
                                        })
                                    }
                                }}
                                checkBoxColor={"blue"}
                                rightText={"15 to 20 Proposals"}
                                uncheckedCheckBoxColor={"black"}
                                isChecked={this.state.numberOfProposals.includes("15-20") ? true : false}
                            />
                            <View style={{ marginTop: 4 }} />
                            <CheckBox
                                style={{ flex: 1, padding: 10 }}
                                onClick={() => {
                                    if (this.state.numberOfProposals.includes("20-50")) {
                                        this.setState({
                                            numberOfProposals: this.state.numberOfProposals.filter((item) => {
                                                if (item !== "20-50") {
                                                    return item;
                                                }
                                            }),
                                            allTags: this.removeItem("20 to 50 Proposals")
                                        })
                                    } else {
                                        this.setState({
                                            numberOfProposals: [...this.state.numberOfProposals, "20-50"],
                                            allTags: [...this.state.allTags, "20 to 50 Proposals"]
                                        })
                                    }
                                }}
                                checkBoxColor={"blue"}
                                rightText={"20 to 50 Proposals"}
                                uncheckedCheckBoxColor={"black"}
                                isChecked={this.state.numberOfProposals.includes("20-50") ? true : false}
                            />
                            <View style={{ marginTop: 10 }} />
                            <Text style={styles.label}>Client info</Text>
                            <View style={{ marginTop: 10 }} />
                            <CheckBox
                                style={{ flex: 1, padding: 10 }}
                                onClick={() => {
                                    if (this.state.clientPayment.includes("un-verified-payment")) {
                                        this.setState({
                                            clientPayment: this.state.clientPayment.filter((item) => {
                                                if (item !== "un-verified-payment") {
                                                    return item;
                                                }
                                            }),
                                            allTags: this.removeItem("Un-Verified Payment")
                                        })
                                    } else {
                                        this.setState({
                                            clientPayment: [...this.state.clientPayment, "un-verified-payment"],
                                            allTags: [...this.state.allTags, "Un-Verified Payment"]
                                        })
                                    }
                                }}
                                checkBoxColor={"blue"}
                                rightText={"Un-Verified Payment"}
                                uncheckedCheckBoxColor={"black"}
                                isChecked={this.state.clientPayment.includes("un-verified-payment") ? true : false}
                            />
                            <CheckBox
                                style={{ flex: 1, padding: 10 }}
                                onClick={() => {
                                    if (this.state.clientPayment.includes("verified-payment")) {
                                        this.setState({
                                            clientPayment: this.state.clientPayment.filter((item) => {
                                                if (item !== "verified-payment") {
                                                    return item;
                                                }
                                            }),
                                            allTags: this.removeItem("Verified Payment")
                                        })
                                    } else {
                                        this.setState({
                                            clientPayment: [...this.state.clientPayment, "verified-payment"],
                                            allTags: [...this.state.allTags, "Verified Payment"]
                                        })
                                    }
                                }}
                                checkBoxColor={"blue"}
                                rightText={"Verified Payment"}
                                uncheckedCheckBoxColor={"black"}
                                isChecked={this.state.clientPayment.includes("verified-payment") ? true : false}
                            />
                            <View style={{ marginTop: 10 }} />
                            <Text style={styles.label}>Budget</Text>
                            <View style={{ marginTop: 10 }} />
                            <CheckBox
                                style={{ flex: 1, padding: 10 }}
                                onClick={() => {
                                    if (this.state.budget.includes("less-than-$100")) {
                                        this.setState({
                                            budget: this.state.budget.filter((item) => {
                                                if (item !== "less-than-$100") {
                                                    return item;
                                                }
                                            }),
                                            allTags: this.removeItem("Less than $100")
                                        })
                                    } else {
                                        this.setState({
                                            budget: [...this.state.budget, "less-than-$100"],
                                            allTags: [...this.state.allTags, "Less than $100"]
                                        })
                                    }
                                }}
                                checkBoxColor={"blue"}
                                rightText={"Less than $100"}
                                uncheckedCheckBoxColor={"black"}
                                isChecked={this.state.budget.includes("less-than-$100") ? true : false}
                            />
                            <View style={{ marginTop: 4 }} />
                            <CheckBox
                                style={{ flex: 1, padding: 10 }}
                                onClick={() => {
                                    if (this.state.budget.includes("$100-500")) {
                                        this.setState({
                                            budget: this.state.budget.filter((item) => {
                                                if (item !== "$100-500") {
                                                    return item;
                                                }
                                            }),
                                            allTags: this.removeItem("$100 - $500")
                                        })
                                    } else {
                                        this.setState({
                                            budget: [...this.state.budget, "$100-500"],
                                            allTags: [...this.state.allTags, "$100 - $500"]
                                        })
                                    }
                                }}
                                checkBoxColor={"blue"}
                                rightText={"$100 - $500"}
                                uncheckedCheckBoxColor={"black"}
                                isChecked={this.state.budget.includes("$100-500") ? true : false}
                            />
                            <View style={{ marginTop: 4 }} />
                            <CheckBox
                                style={{ flex: 1, padding: 10 }}
                                onClick={() => {
                                    if (this.state.budget.includes("$500-1000")) {
                                        this.setState({
                                            budget: this.state.budget.filter((item) => {
                                                if (item !== "$500-1000") {
                                                    return item;
                                                }
                                            }),
                                            allTags: this.removeItem("$500 - $1,000")
                                        })
                                    } else {
                                        this.setState({
                                            budget: [...this.state.budget, "$500-1000"],
                                            allTags: [...this.state.allTags, "$500 - $1,000"]
                                        })
                                    }
                                }}
                                checkBoxColor={"blue"}
                                rightText={"$500 - $1,000"}
                                uncheckedCheckBoxColor={"black"}
                                isChecked={this.state.budget.includes("$500-1000") ? true : false}
                            />
                            <View style={{ marginTop: 4 }} />
                            <CheckBox
                                style={{ flex: 1, padding: 10 }}
                                onClick={() => {
                                    if (this.state.budget.includes("$1000-5000")) {
                                        this.setState({
                                            budget: this.state.budget.filter((item) => {
                                                if (item !== "$1000-5000") {
                                                    return item;
                                                }
                                            }),
                                            allTags: this.removeItem("$1,000 - $5,000")
                                        })
                                    } else {
                                        this.setState({
                                            budget: [...this.state.budget, "$1000-5000"],
                                            allTags: [...this.state.allTags, "$1,000 - $5,000"]
                                        })
                                    }
                                }}
                                checkBoxColor={"blue"}
                                rightText={"$1,000 - $5,000"}
                                uncheckedCheckBoxColor={"black"}
                                isChecked={this.state.budget.includes("$1000-5000") ? true : false}
                            />
                            <View style={{ marginTop: 4 }} />
                            <CheckBox
                                style={{ flex: 1, padding: 10 }}
                                onClick={() => {
                                    if (this.state.budget.includes("$5000+")) {
                                        this.setState({
                                            budget: this.state.budget.filter((item) => {
                                                if (item !== "$5000+") {
                                                    return item;
                                                }
                                            }),
                                            allTags: this.removeItem("$1,000 - $5,000")
                                        })
                                    } else {
                                        this.setState({
                                            budget: [...this.state.budget, "$5000+"],
                                            allTags: [...this.state.allTags, "$1,000 - $5,000"]
                                        })
                                    }
                                }}
                                checkBoxColor={"blue"}
                                rightText={"$1,000 - $5,000"}
                                uncheckedCheckBoxColor={"black"}
                                isChecked={this.state.budget.includes("$5000+") ? true : false}
                            />
                            <View style={{ marginTop: 4 }} />
                            <CheckBox
                                style={{ flex: 1, padding: 10 }}
                                onClick={() => {
                                    if (this.state.budget.includes("$10k+")) {
                                        this.setState({
                                            budget: this.state.budget.filter((item) => {
                                                if (item !== "$10k+") {
                                                    return item;
                                                }
                                            }),
                                            allTags: this.removeItem("$10,000+")
                                        })
                                    } else {
                                        this.setState({
                                            budget: [...this.state.budget, "$10k+"],
                                            allTags: [...this.state.allTags, "$10,000+"]
                                        })
                                    }
                                }}
                                checkBoxColor={"blue"}
                                rightText={"$10,000+"}
                                uncheckedCheckBoxColor={"black"}
                                isChecked={this.state.budget.includes("$10k+") ? true : false}
                            />
                            <View style={{ marginTop: 10 }} />
                            <Text style={styles.label}>Project Length</Text>
                            <View style={{ marginTop: 10 }} />
                            <CheckBox
                                style={{ flex: 1, padding: 10 }}
                                onClick={() => {
                                    if (this.state.projectLengthOfTime.includes("less-than-1-month")) {
                                        this.setState({
                                            projectLengthOfTime: this.state.projectLengthOfTime.filter((item) => {
                                                if (item !== "less-than-1-month") {
                                                    return item;
                                                }
                                            }),
                                            allTags: this.removeItem("Less Than 1 Month")
                                        })
                                    } else {
                                        this.setState({
                                            projectLengthOfTime: [...this.state.projectLengthOfTime, "less-than-1-month"],
                                            allTags: [...this.state.allTags, "Less Than 1 Month"]
                                        })
                                    }
                                }}
                                checkBoxColor={"blue"}
                                rightText={"Less Than 1 Month"}
                                uncheckedCheckBoxColor={"black"}
                                isChecked={this.state.projectLengthOfTime.includes("less-than-1-month") ? true : false}
                            />
                            <View style={{ marginTop: 4 }} />
                            <CheckBox
                                style={{ flex: 1, padding: 10 }}
                                onClick={() => {
                                    if (this.state.projectLengthOfTime.includes("1-3-months")) {
                                        this.setState({
                                            projectLengthOfTime: this.state.projectLengthOfTime.filter((item) => {
                                                if (item !== "1-3-months") {
                                                    return item;
                                                }
                                            }),
                                            allTags: this.removeItem("1 to 3 Months")
                                        })
                                    } else {
                                        this.setState({
                                            projectLengthOfTime: [...this.state.projectLengthOfTime, "1-3-months"],
                                            allTags: [...this.state.allTags, "1 to 3 Months"]
                                        })
                                    }
                                }}
                                checkBoxColor={"blue"}
                                rightText={"1 to 3 Months"}
                                uncheckedCheckBoxColor={"black"}
                                isChecked={this.state.projectLengthOfTime.includes("1-3-months") ? true : false}
                            />
                            <View style={{ marginTop: 4 }} />
                            <CheckBox
                                style={{ flex: 1, padding: 10 }}
                                onClick={() => {
                                    if (this.state.projectLengthOfTime.includes("3-6-months")) {
                                        this.setState({
                                            projectLengthOfTime: this.state.projectLengthOfTime.filter((item) => {
                                                if (item !== "3-6-months") {
                                                    return item;
                                                }
                                            }),
                                            allTags: this.removeItem("3 to 6 Months")
                                        })
                                    } else {
                                        this.setState({
                                            projectLengthOfTime: [...this.state.projectLengthOfTime, "3-6-months"],
                                            allTags: [...this.state.allTags, "3 to 6 Months"]
                                        })
                                    }
                                }}
                                checkBoxColor={"blue"}
                                rightText={"3 to 6 Months"}
                                uncheckedCheckBoxColor={"black"}
                                isChecked={this.state.projectLengthOfTime.includes("3-6-months") ? true : false}
                            />
                            <View style={{ marginTop: 4 }} />
                            <CheckBox
                                style={{ flex: 1, padding: 10 }}
                                onClick={() => {
                                    if (this.state.projectLengthOfTime.includes("more-than-6-months")) {
                                        this.setState({
                                            projectLengthOfTime: this.state.projectLengthOfTime.filter((item) => {
                                                if (item !== "more-than-6-months") {
                                                    return item;
                                                }
                                            }),
                                            allTags: this.removeItem("More than 6 Months")
                                        })
                                    } else {
                                        this.setState({
                                            projectLengthOfTime: [...this.state.projectLengthOfTime, "more-than-6-months"],
                                            allTags: [...this.state.allTags, "More than 6 Months"]
                                        })
                                    }
                                }}
                                checkBoxColor={"blue"}
                                rightText={"More than 6 Months"}
                                uncheckedCheckBoxColor={"black"}
                                isChecked={this.state.projectLengthOfTime.includes("more-than-6-months") ? true : false}
                            />
                            <View style={{ marginTop: 10 }} />
                            <Text style={styles.label}>Hours Per Week (logged)</Text>
                            <View style={{ marginTop: 10 }} />
                            <CheckBox
                                style={{ flex: 1, padding: 10 }}
                                onClick={() => {
                                    if (this.state.hoursPerWeek.includes("less-than-30-hours/week")) {
                                        this.setState({
                                            hoursPerWeek: this.state.hoursPerWeek.filter((item) => {
                                                if (item !== "less-than-30-hours/week") {
                                                    return item;
                                                }
                                            }),
                                            allTags: this.removeItem("Less Than 30 Hours/Week")
                                        })
                                    } else {
                                        this.setState({
                                            hoursPerWeek: [...this.state.hoursPerWeek, "less-than-30-hours/week"],
                                            allTags: [...this.state.allTags, "Less Than 30 Hours/Week"]
                                        })
                                    }
                                }}
                                checkBoxColor={"blue"}
                                rightText={"Less Than 30 Hours/Week"}
                                uncheckedCheckBoxColor={"black"}
                                isChecked={this.state.hoursPerWeek.includes("less-than-30-hours/week") ? true : false}
                            />
                            <View style={{ marginTop: 4 }} />
                            <CheckBox
                                style={{ flex: 1, padding: 10 }}
                                onClick={() => {
                                    if (this.state.hoursPerWeek.includes("more-than-30-hours/week")) {
                                        this.setState({
                                            hoursPerWeek: this.state.hoursPerWeek.filter((item) => {
                                                if (item !== "more-than-30-hours/week") {
                                                    return item;
                                                }
                                            }),
                                            allTags: this.removeItem("More Than 30 Hours/Week")
                                        })
                                    } else {
                                        this.setState({
                                            hoursPerWeek: [...this.state.hoursPerWeek, "more-than-30-hours/week"],
                                            allTags: [...this.state.allTags, "More Than 30 Hours/Week"]
                                        })
                                    }
                                }}
                                checkBoxColor={"blue"}
                                rightText={"More Than 30 Hours/Week"}
                                uncheckedCheckBoxColor={"black"}
                                isChecked={this.state.hoursPerWeek.includes("more-than-30-hours/week") ? true : false}
                            />
                            <View style={{ marginTop: 25 }} />
                            <AwesomeButtonBlue type={"secondary"} backgroundColor={"blue"} textColor={"white"} onPress={this.handleFilteredSearch} stretch={true}>Submit & Search Jobs</AwesomeButtonBlue>
                        </View>
                    </ScrollView>
                </RBSheet>
            </Fragment>
        )
    }
}
export default SearchJobsWithFilterHelper;