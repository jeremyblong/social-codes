import React, { Component, Fragment } from 'react'
import { View, Text, Image, ScrollView } from 'react-native';
import { Header, Left, Body, Right, Button, Title, Subtitle } from 'native-base';
import styles from './styles.js';
import StarRating from 'react-native-star-rating';
import AwesomeButtonBlue from 'react-native-really-awesome-button/src/themes/blue';
import { connect } from "react-redux";
import axios from "axios";
import Config from "react-native-config";

class MainLeaveAReviewHelper extends Component {
constructor(props) {
    super(props);

    this.state = {
        starCount: 0,
        // client
        freelancerSkillStar: 0,
        overallReviewStar: 0,
        expectationSkillStar: 0,
        completedProjectSuccessfullyStar: 0,
        languageSkillStar: 0,
        hireAgainSkillStar: 0,
        colleagueRecommendStarSkill: 0,
        adequateSkillRating: 0,
        receptiveSkillsRating: 0,
        // freelancer
        overallExperienceAsFreelancer: 0,
        communicationFromEmployerRating: 0,
        meetOrExceedEmployerRating: 0,
        knowledgableFreelancerRating: 0,
        clearLanguageFreelancerRating: 0,
        wouldFreelanceAgainRating: 0,
        colleagueRecommendFreelancerStarSkill: 0,
        adequateFreelancerSkillRating: 0,
        receptiveFreelancerSkillsRating: 0
    }
}
    onStarRatingPress = (rating) => {
        this.setState({
            starCount: rating
        });
    }
    renderContent = () => {
        // this is the client review account
        if (this.props.accountType === "work") {
            return (
                <Fragment>
                    <Text style={styles.starText}>How would you rate your overall experience with the hiring client on this project?</Text>
                    <View style={styles.starContainer}>
                        <StarRating
                            disabled={false}
                            maxStars={5}
                            starSize={50}
                            halfStarEnabled={true}
                            halfStarColor={"#ffffff"}
                            rating={this.state.overallExperienceAsFreelancer}
                            selectedStar={(rating) => {
                                this.setState({
                                    overallExperienceAsFreelancer: rating
                                })
                            }}
                            fullStarColor={'#f5cd05'}
                        />
                    </View>
                    <Text style={styles.starText}>How would you rate the communication of your hirer/employer?</Text>
                    <View style={styles.starContainer}>
                        <StarRating
                            disabled={false}
                            maxStars={5}
                            starSize={50}
                            halfStarEnabled={true}
                            halfStarColor={"#ffffff"}
                            rating={this.state.communicationFromEmployerRating}
                            selectedStar={(rating) => {
                                this.setState({
                                    communicationFromEmployerRating: rating
                                })
                            }}
                            fullStarColor={'#f5cd05'}
                        />
                    </View>
                    <Text style={styles.starText}>Did the client/employer meet or exceed your expectation?</Text>
                    <View style={styles.starContainer}>
                        <StarRating
                            disabled={false}
                            maxStars={5}
                            starSize={50}
                            halfStarEnabled={true}
                            halfStarColor={"#ffffff"}
                            rating={this.state.meetOrExceedEmployerRating}
                            selectedStar={(rating) => {
                                this.setState({
                                    meetOrExceedEmployerRating: rating
                                })
                            }}
                            fullStarColor={'#f5cd05'}
                        />
                    </View>
                    <Text style={styles.starText}>The client was knowledgeable and informative about what needed to be done on the project?</Text>
                    <View style={styles.starContainer}>
                        <StarRating
                            disabled={false}
                            maxStars={5}
                            starSize={50}
                            halfStarEnabled={true}
                            halfStarColor={"#ffffff"}
                            rating={this.state.knowledgableFreelancerRating}
                            selectedStar={(rating) => {
                                this.setState({
                                    knowledgableFreelancerRating: rating
                                })
                            }}
                            fullStarColor={'#f5cd05'}
                        />
                    </View>
                    <Text style={styles.starText}>The client/employer spoke proper language fluently and clearly throughout the project?</Text>
                    <View style={styles.starContainer}>
                        <StarRating
                            disabled={false}
                            maxStars={5}
                            starSize={50}
                            halfStarEnabled={true}
                            halfStarColor={"#ffffff"}
                            rating={this.state.clearLanguageFreelancerRating}
                            selectedStar={(rating) => {
                                this.setState({
                                    clearLanguageFreelancerRating: rating
                                })
                            }}
                            fullStarColor={'#f5cd05'}
                        />
                    </View>
                    <Text style={styles.starText}>Overall, you would say your pleased and happy with the interaction with this client and you would work with them again?</Text>
                    <View style={styles.starContainer}>
                        <StarRating
                            disabled={false}
                            maxStars={5}
                            starSize={50}
                            halfStarEnabled={true}
                            halfStarColor={"#ffffff"}
                            rating={this.state.wouldFreelanceAgainRating}
                            selectedStar={(rating) => {
                                this.setState({
                                    wouldFreelanceAgainRating: rating
                                })
                            }}
                            fullStarColor={'#f5cd05'}
                        />
                    </View>
                    {/*  */}
                    <Text style={styles.starText}>How likely are you to recommend this user to a friend or colleague?</Text>
                    <View style={styles.starContainer}>
                        <StarRating
                            disabled={false}
                            maxStars={5}
                            starSize={50}
                            halfStarEnabled={true}
                            halfStarColor={"#ffffff"}
                            rating={this.state.colleagueRecommendFreelancerStarSkill}
                            selectedStar={(rating) => {
                                this.setState({
                                    colleagueRecommendFreelancerStarSkill: rating
                                })
                            }}
                            fullStarColor={'#f5cd05'}
                        />
                    </View>
                    <Text style={styles.starText}>Your client spent adequate time and adhered to the set schedule as agreed?</Text>
                    <View style={styles.starContainer}>
                        <StarRating
                            disabled={false}
                            maxStars={5}
                            starSize={50}
                            halfStarEnabled={true}
                            halfStarColor={"#ffffff"}
                            rating={this.state.adequateFreelancerSkillRating}
                            selectedStar={(rating) => {
                                this.setState({
                                    adequateFreelancerSkillRating: rating
                                })
                            }}
                            fullStarColor={'#f5cd05'}
                        />
                    </View>
                    <Text style={styles.starText}>The client was cooperative and willing to listen and was receptive to suggestions?</Text>
                    <View style={styles.starContainer}>
                        <StarRating
                            disabled={false}
                            maxStars={5}
                            starSize={50}
                            halfStarEnabled={true}
                            halfStarColor={"#ffffff"}
                            rating={this.state.receptiveFreelancerSkillsRating}
                            selectedStar={(rating) => {
                                this.setState({
                                    receptiveFreelancerSkillsRating: rating
                                })
                            }}
                            fullStarColor={'#f5cd05'}
                        />
                    </View>
                </Fragment>
            );
        // this is the hiring review account
        } else {
            return (
                <Fragment>
                    <Text style={styles.starText}>How would you rate your overall experience with the other user on this project?</Text>
                    <View style={styles.starContainer}>
                        <StarRating
                            disabled={false}
                            maxStars={5}
                            starSize={50}
                            halfStarEnabled={true}
                            halfStarColor={"#ffffff"}
                            rating={this.state.overallReviewStar}
                            selectedStar={(rating) => {
                                this.setState({
                                    overallReviewStar: rating
                                })
                            }}
                            fullStarColor={'#f5cd05'}
                        />
                    </View>
                    <Text style={styles.starText}>How would you rate the skills of your freelancer?</Text>
                    <View style={styles.starContainer}>
                        <StarRating
                            disabled={false}
                            maxStars={5}
                            starSize={50}
                            halfStarEnabled={true}
                            halfStarColor={"#ffffff"}
                            rating={this.state.freelancerSkillStar}
                            selectedStar={(rating) => {
                                this.setState({
                                    freelancerSkillStar: rating
                                })
                            }}
                            fullStarColor={'#f5cd05'}
                        />
                    </View>
                    <Text style={styles.starText}>Did the freelancer meet and exceed your expectations or goals?</Text>
                    <View style={styles.starContainer}>
                        <StarRating
                            disabled={false}
                            maxStars={5}
                            starSize={50}
                            halfStarEnabled={true}
                            halfStarColor={"#ffffff"}
                            rating={this.state.expectationSkillStar}
                            selectedStar={(rating) => {
                                this.setState({
                                    expectationSkillStar: rating
                                })
                            }}
                            fullStarColor={'#f5cd05'}
                        />
                    </View>
                    <Text style={styles.starText}>The freelancer was knowledgeable about the project and was able to properly fullfil the desired project requirements and complete successfully?</Text>
                    <View style={styles.starContainer}>
                        <StarRating
                            disabled={false}
                            maxStars={5}
                            starSize={50}
                            halfStarEnabled={true}
                            halfStarColor={"#ffffff"}
                            rating={this.state.completedProjectSuccessfullyStar}
                            selectedStar={(rating) => {
                                this.setState({
                                    completedProjectSuccessfullyStar: rating
                                })
                            }}
                            fullStarColor={'#f5cd05'}
                        />
                    </View>
                    <Text style={styles.starText}>The freelancer spoke proper language fluently and clearly throughout the project?</Text>
                    <View style={styles.starContainer}>
                        <StarRating
                            disabled={false}
                            maxStars={5}
                            starSize={50}
                            halfStarEnabled={true}
                            halfStarColor={"#ffffff"}
                            rating={this.state.languageSkillStar}
                            selectedStar={(rating) => {
                                this.setState({
                                    languageSkillStar: rating
                                })
                            }}
                            fullStarColor={'#f5cd05'}
                        />
                    </View>
                    <Text style={styles.starText}>Overall, you would say your pleased and happy with the results and would hire this user again?</Text>
                    <View style={styles.starContainer}>
                        <StarRating
                            disabled={false}
                            maxStars={5}
                            starSize={50}
                            halfStarEnabled={true}
                            halfStarColor={"#ffffff"}
                            rating={this.state.hireAgainSkillStar}
                            selectedStar={(rating) => {
                                this.setState({
                                    hireAgainSkillStar: rating
                                })
                            }}
                            fullStarColor={'#f5cd05'}
                        />
                    </View>
                    <Text style={styles.starText}>How likely are you to recommend this user to a friend or colleague?</Text>
                    <View style={styles.starContainer}>
                        <StarRating
                            disabled={false}
                            maxStars={5}
                            starSize={50}
                            halfStarEnabled={true}
                            halfStarColor={"#ffffff"}
                            rating={this.state.colleagueRecommendStarSkill}
                            selectedStar={(rating) => {
                                this.setState({
                                    colleagueRecommendStarSkill: rating
                                })
                            }}
                            fullStarColor={'#f5cd05'}
                        />
                    </View>
                    <Text style={styles.starText}>Your freelancer spent adequate time and adhered to the set schedule as agreed?</Text>
                    <View style={styles.starContainer}>
                        <StarRating
                            disabled={false}
                            maxStars={5}
                            starSize={50}
                            halfStarEnabled={true}
                            halfStarColor={"#ffffff"}
                            rating={this.state.adequateSkillRating}
                            selectedStar={(rating) => {
                                this.setState({
                                    adequateSkillRating: rating
                                })
                            }}
                            fullStarColor={'#f5cd05'}
                        />
                    </View>
                    <Text style={styles.starText}>The freelancer was cooperative and willing to listen to project guidelines and was receptive to suggestions?</Text>
                    <View style={styles.starContainer}>
                        <StarRating
                            disabled={false}
                            maxStars={5}
                            starSize={50}
                            halfStarEnabled={true}
                            halfStarColor={"#ffffff"}
                            rating={this.state.receptiveSkillsRating}
                            selectedStar={(rating) => {
                                this.setState({
                                    receptiveSkillsRating: rating
                                })
                            }}
                            fullStarColor={'#f5cd05'}
                        />
                    </View>
                </Fragment>
            );
        }
    }
    leaveReviewAsWorker = () => {
        console.log("leaveReviewAsWorker clicked...");

        const gig = this.props.props.route.params.gig;

        const { 
            overallExperienceAsFreelancer,
            communicationFromEmployerRating,
            meetOrExceedEmployerRating,
            knowledgableFreelancerRating,
            clearLanguageFreelancerRating,
            wouldFreelanceAgainRating,
            colleagueRecommendFreelancerStarSkill,
            adequateFreelancerSkillRating,
            receptiveFreelancerSkillsRating 
        } = this.state;


        axios.post(`${Config.ngrok_url}/post/review/as/worker`, {
            overallExperienceAsFreelancer,
            communicationFromEmployerRating,
            meetOrExceedEmployerRating,
            knowledgableFreelancerRating,
            clearLanguageFreelancerRating,
            wouldFreelanceAgainRating,
            colleagueRecommendFreelancerStarSkill,
            adequateFreelancerSkillRating,
            receptiveFreelancerSkillsRating,
            id: this.props.unique_id,
            otherUser: gig.with,
            fullName: this.props.fullName,
            gig
        }).then((res) => {
            if (res.data.message === "Left review!") {
                console.log(res.data);
                
                this.props.props.navigation.replace("completed-gigs-list-homepage");
            } else {
                console.log("Err", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    leaveReviewHirer = () => {
        console.log("leaveReviewHirer clicked...");

        const gig = this.props.props.route.params.gig;

        const { 
            freelancerSkillStar,
            overallReviewStar,
            expectationSkillStar,
            completedProjectSuccessfullyStar,
            languageSkillStar,
            hireAgainSkillStar,
            colleagueRecommendStarSkill,
            adequateSkillRating,
            receptiveSkillsRating,
        } = this.state;

        axios.post(`${Config.ngrok_url}/post/review/as/employer`, {
            id: this.props.unique_id,
            otherUser: gig.with,
            freelancerSkillStar,
            overallReviewStar,
            expectationSkillStar,
            completedProjectSuccessfullyStar,
            languageSkillStar,
            hireAgainSkillStar,
            colleagueRecommendStarSkill,
            adequateSkillRating,
            receptiveSkillsRating,
            fullName: this.props.fullName,
            gig
        }).then((res) => {
            if (res.data.message === "Left review!") {
                console.log(res.data);

                this.props.props.navigation.replace("completed-gigs-list-homepage");
            } else {
                console.log("Err", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    renderConditional = () => {
        const { 
            // client
            freelancerSkillStar,
            overallReviewStar,
            expectationSkillStar,
            completedProjectSuccessfullyStar,
            languageSkillStar,
            hireAgainSkillStar,
            colleagueRecommendStarSkill,
            adequateSkillRating,
            receptiveSkillsRating,
            // freelancer
            overallExperienceAsFreelancer,
            communicationFromEmployerRating,
            meetOrExceedEmployerRating,
            knowledgableFreelancerRating,
            clearLanguageFreelancerRating,
            wouldFreelanceAgainRating,
            colleagueRecommendFreelancerStarSkill,
            adequateFreelancerSkillRating,
            receptiveFreelancerSkillsRating 
        } = this.state;


        if (this.props.accountType === "hire") {
            if ((typeof freelancerSkillStar !== "undefined" && freelancerSkillStar !== 0) && (typeof overallReviewStar !== "undefined" && overallReviewStar !== 0) && (typeof expectationSkillStar !== "undefined" && expectationSkillStar !== 0) && (typeof completedProjectSuccessfullyStar !== "undefined" && completedProjectSuccessfullyStar !== 0) && (typeof languageSkillStar !== "undefined" && languageSkillStar !== 0) && (typeof hireAgainSkillStar !== "undefined" && hireAgainSkillStar !== 0) && (typeof colleagueRecommendStarSkill !== "undefined" && colleagueRecommendStarSkill !== 0) && (typeof adequateSkillRating !== "undefined" && adequateSkillRating !== 0) && (typeof receptiveSkillsRating !== "undefined" && receptiveSkillsRating !== 0)) {
                return true;
            } else {
                return false;
            }
        } else {
            if ((typeof overallExperienceAsFreelancer !== "undefined" && overallExperienceAsFreelancer !== 0) && (typeof communicationFromEmployerRating !== "undefined" && communicationFromEmployerRating !== 0) && (typeof meetOrExceedEmployerRating !== "undefined" && meetOrExceedEmployerRating !== 0) && (typeof knowledgableFreelancerRating !== "undefined" && knowledgableFreelancerRating !== 0) && (typeof clearLanguageFreelancerRating !== "undefined" && clearLanguageFreelancerRating !== 0) && (typeof wouldFreelanceAgainRating !== "undefined" && wouldFreelanceAgainRating !== 0) && (typeof colleagueRecommendFreelancerStarSkill !== "undefined" && colleagueRecommendFreelancerStarSkill !== 0) && (typeof adequateFreelancerSkillRating !== "undefined" && adequateFreelancerSkillRating !== 0) && (typeof receptiveFreelancerSkillsRating !== "undefined" && receptiveFreelancerSkillsRating !== 0)) {
                return true;
            } else {
                return false;
            }
        }
    }
    render() {
        console.log(this.props.props.route.params.gig);

        const passedData = this.props.props.route.params.gig;
        return (
            <Fragment>
                <Header style={styles.headerMain}>
                    <Left>
                        <Button onPress={() => {
                            this.props.props.navigation.goBack();
                        }} transparent>
                            <Image source={require("../../../assets/icons/go-back.png")} style={styles.headerIcon} />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Leave a review</Title>
                        <Subtitle>Review your interaction</Subtitle>
                    </Body>
                    <Right />
                </Header>
                <ScrollView contentContainerStyle={{ paddingBottom: 50 }} style={styles.container}>
                    <View style={styles.margin}>
                        <Text style={styles.headerText}>Leave a review for {passedData.otherUserFirstName} {passedData.otherUserLastName} and let us know how your interaction went...</Text>
                        <View style={styles.whiteHr} />
                        {this.renderContent()}
                        {this.renderConditional() ? <AwesomeButtonBlue borderColor={"#cccccc"} borderWidth={2} style={{ marginTop: 20 }} type={"anchor"} backgroundColor={"#ffffff"} backgroundPlaceholder={"black"} textColor={"black"} shadowColor={"grey"} onPress={() => {
                            if (this.props.accountType === "work") {
                                this.leaveReviewAsWorker();
                            } else {
                                this.leaveReviewHirer();
                            }
                        }} stretch={true}>Submit Review</AwesomeButtonBlue> : <AwesomeButtonBlue borderColor={"#cccccc"} borderWidth={2} style={{ marginTop: 20 }} type={"disabled"} stretch={true}>Submit Review</AwesomeButtonBlue>}
                    </View>
                </ScrollView>
            </Fragment>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        accountType: state.signupData.authData.accountType,
        unique_id: state.signupData.authData.unique_id,
        fullName: `${state.signupData.authData.firstName} ${state.signupData.authData.lastName}`
    }
}
export default connect(mapStateToProps, {  })(MainLeaveAReviewHelper)
