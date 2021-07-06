import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './styles.js';
import { Left, Body, Card, CardItem } from 'native-base';
import moment from 'moment';
import ReadMore from 'react-native-read-more-text';

const JobHelperSubComponent = (props) => {
    const item = props.item;
    const renderCategory = (category) => {
        switch (category) {
            case "web-mobile-software-development":
                return "Web/Mobile Software Dev"                
                break;
            case "mobile-app-development":
                return "Mobile App Dev";
            case "writing":
                return "Writing";
            case "artifical-intelligence-machine-learning":
                return "Artificial Intelligence & Machine Learning";
            case "graphic-design":
                return "Graphic Design";
            case "game-development":
                return "Game Development";
            case "it-networking":
                return "IT-Networking";
            case "translation": 
                return "translation";
            case "sales-marketing":
                return "Sales Marketing";
            case "legal":
                return "legal";
            case "social-media-and-marketing":
                return "Social Media & Marketing";
            case "engineering-and-architecture":
                return "Engineering & Architecture";
            default:
                break;
        }
    }
    const renderTimeRequirement = (time) => {
        switch (time) {
            case "more-than-30-hours-week":
                return "More Than 30 Hours/Week";
            case "less-than-30-hours-week":
                return "Less Than 30 Hours/Week";
            case "unknown":
                return "None Specified";
            default: 
                return;
        }
    }
    const renderDuration = (length) => {
        switch (length) {
            case "1-3-months":
                return "1-3 Months";
            case "3-6-months":
                return "3-6 Months";
            case "more-than-6-months":
                return "More Than 6 Months";
            case "less-than-1-month":
                return "Less than 1 Month";
            default: 
                return;
        }
    }
    const _renderTruncatedFooter = (handlePress) => {
        return (
          <Text style={{color: "blue", fontSize: 15, fontWeight: "bold", marginTop: 5}} onPress={handlePress}>
            Read more
          </Text>
        );
    }
     
    const _renderRevealedFooter = (handlePress) => {
        return (
          <Text style={{color: "blue", fontSize: 15, fontWeight: "bold", marginTop: 5}} onPress={handlePress}>
            Show less
          </Text>
        );
    }
    return (
        <TouchableOpacity style={{ flexGrow: 0 }} onPress={() => {
            if (props.manage === true) {
                props.props.props.navigation.push("view-applicants-per-job", { item });
            } else {
                props.props.props.navigation.push("view-job-individual", { item });
            }
        }}>
            <Card style={styles.cardie}>
                <CardItem>
                <Left>
                    <Body>
                    <Text style={{ fontWeight: "bold", marginBottom: 5 }}>{item.title}</Text>
                    {item.pricing.fixedOrHourly === "hourly" ? <Text style={{ fontWeight: "bold" }} note>Hourly: <Text style={{ color: "blue" }}>${item.pricing.minHourly} - ${item.pricing.maxHourly}</Text> - {moment(item.system_date).fromNow()}</Text> : <Text style={{ fontWeight: "bold" }} note>Fixed-Price - {moment(item.system_date).fromNow()}</Text>}
                    <View style={styles.hr} />
                    {item.pricing.fixedOrHourly === "hourly" ? null : <Text style={{ color: "blue", fontWeight: "bold" }}>${item.pricing.fixedBudgetPrice} - entire project</Text>}
                    </Body>
                </Left>
                </CardItem>
                <CardItem>
                <Body>
                    <View style={styles.row}>
                        <View style={styles.column}>
                            <Text style={styles.topText}>{renderTimeRequirement(item.pricing.timeRequirement)}</Text>
                            <Text style={styles.normalText}>Hours Needed</Text>
                            <View style={{ marginTop: 15 }} />
                            <Text style={styles.topText}>Expert</Text>
                            <Text style={styles.normalText}>Experience Level</Text>
                        </View>
                        <View style={styles.column}>
                            <Text style={styles.topText}>{renderDuration(item.pricing.lengthOfProject)}</Text>
                            <Text style={styles.normalText}>Duration</Text>
                            <View style={{ marginTop: 15 }} />
                            <Text style={styles.topText}>{item.multipleOrSingularFreelancersRequired === "multiple-freelancers" ? `Multiple Freelancers(${item.numberOfFreelancersRequired})` : "One Freelancer"}</Text>
                            <Text style={styles.normalText}># Of Freelancers Required</Text>
                        </View>
                    </View>
                    <View style={styles.row}>
                        <View style={styles.column}>
                            <Text style={styles.topText}>{item.task}</Text>
                            <Text style={styles.normalText}>Sub Category</Text>
                            <View style={{ marginTop: 15 }} />
                            <Text style={styles.topText}>{item.multipleOrSingularFreelancersRequired === "multiple-freelancers" ? "Multiple Freelancers" : "One Freelancer"}</Text>
                            <Text style={styles.normalText}>Freelancers Required</Text>
                        </View>
                        <View style={styles.column}>
                            <Text style={styles.topText}>{renderCategory(item.category)}</Text>
                            <Text style={styles.normalText}>Type Of Applicant</Text>
                            <View style={{ marginTop: 15 }} />
                            <Text style={styles.topText}>{item.typeOfProject === "complex-project" ? "Complex Project" : item.typeOfProject === "ongoing-project" ? "ongoing Project" : item.typeOfProject === "one-time-project" ? "One-Time Project" : ""}</Text>
                            <Text style={styles.normalText}>Duration</Text>
                        </View>
                    </View>
                </Body>
                </CardItem>
                <View style={styles.hr} />
                <CardItem>
                <Body>
                <Text style={styles.headerTextSub}>Description</Text>
                <ReadMore
                    numberOfLines={3}
                    renderTruncatedFooter={_renderTruncatedFooter}
                    renderRevealedFooter={_renderRevealedFooter}
                >
                    <Text style={styles.cardText}>
                        {item.description}
                    </Text>
                </ReadMore>
                </Body>
                </CardItem>
            </Card>
        </TouchableOpacity>
    );
}
export default JobHelperSubComponent;