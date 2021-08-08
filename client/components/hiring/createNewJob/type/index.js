import React, { Component, Fragment } from 'react';
import { View, Text, Image, Dimensions, ScrollView } from 'react-native';
import styles from './styles.js';
import { Header, Left, Body, Right, Title, Subtitle, Button, List, ListItem, Icon } from 'native-base';
import * as Progress from 'react-native-progress';
import { connect } from 'react-redux';
import { addJobData } from "../../../../actions/jobs/data.js";

const { height, width } = Dimensions.get("window");

class CreateJobListingTypeHelper extends Component {
constructor (props) {
    super(props);

    this.state = {
        type: "",
        task: ""
    }
}   
    renderMainContent = () => {
        switch (this.props.category) {
            case "web-mobile-software-development":
                return (
                    <List>
                        <ListItem button={true} onPress={() => {
                            this.setState({
                                task: "AR/VR Development",
                                type: "web-mobile-software-development"
                            }, () => {
                                this.handleRedirectAndSelection();
                            })
                        }}>
                        <Left>
                            <Text style={styles.whiteText}>AR/VR Development</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "#0057ff" }} name="arrow-forward" />
                        </Right>
                        </ListItem>
                        <ListItem button={true} onPress={() => {
                            this.setState({
                                task: "Automation Testing",
                                type: "web-mobile-software-development"
                            }, () => {
                                this.handleRedirectAndSelection();
                            })
                        }}>
                        <Left>
                            <Text style={styles.whiteText}>Automation Testing</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "#0057ff" }} name="arrow-forward" />
                        </Right>
                        </ListItem>
                        <ListItem button={true} onPress={() => {
                            this.setState({
                                task: "Back-End Development",
                                type: "web-mobile-software-development"
                            }, () => {
                                this.handleRedirectAndSelection();
                            })
                        }}>
                        <Left>
                            <Text style={styles.whiteText}>Back-End Development</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "#0057ff" }} name="arrow-forward" />
                        </Right>
                        </ListItem>
                        <ListItem button={true} onPress={() => {
                            this.setState({
                                task: "CMS Development",
                                type: "web-mobile-software-development"
                            }, () => {
                                this.handleRedirectAndSelection();
                            })
                        }}>
                        <Left>
                            <Text style={styles.whiteText}>CMS Development</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "#0057ff" }} name="arrow-forward" />
                        </Right>
                        </ListItem>
                        <ListItem button={true} onPress={() => {
                            this.setState({
                                task: "Coding Tutoring",
                                type: "web-mobile-software-development"
                            }, () => {
                                this.handleRedirectAndSelection();
                            })
                        }}>
                        <Left>
                            <Text style={styles.whiteText}>Coding Tutoring</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "#0057ff" }} name="arrow-forward" />
                        </Right>
                        </ListItem>
                        <ListItem button={true} onPress={() => {
                            this.setState({
                                task: "Database Development",
                                type: "web-mobile-software-development"
                            }, () => {
                                this.handleRedirectAndSelection();
                            })
                        }}>
                        <Left>
                            <Text style={styles.whiteText}>Database Development</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "#0057ff" }} name="arrow-forward" />
                        </Right>
                        </ListItem>
                        <ListItem button={true} onPress={() => {
                            this.setState({
                                task: "Desktop Software Development",
                                type: "web-mobile-software-development"
                            }, () => {
                                this.handleRedirectAndSelection();
                            })
                        }}>
                        <Left>
                            <Text style={styles.whiteText}>Desktop Software Development</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "#0057ff" }} name="arrow-forward" />
                        </Right>
                        </ListItem>
                        <ListItem button={true} onPress={() => {
                            this.setState({
                                task: "Ecommerce Development",
                                type: "web-mobile-software-development"
                            }, () => {
                                this.handleRedirectAndSelection();
                            })
                        }}>
                        <Left>
                            <Text style={styles.whiteText}>Ecommerce Development</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "#0057ff" }} name="arrow-forward" />
                        </Right>
                        </ListItem>
                        <ListItem button={true} onPress={() => {
                            this.setState({
                                task: "Emerging Tech",
                                type: "web-mobile-software-development"
                            }, () => {
                                this.handleRedirectAndSelection();
                            })
                        }}>
                        <Left>
                            <Text style={styles.whiteText}>Emerging Tech</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "#0057ff" }} name="arrow-forward" />
                        </Right>
                        </ListItem>
                        <ListItem button={true} onPress={() => {
                            this.setState({
                                task: "Firmware Development",
                                type: "web-mobile-software-development"
                            }, () => {
                                this.handleRedirectAndSelection();
                            })
                        }}>
                        <Left>
                            <Text style={styles.whiteText}>Firmware Development</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "#0057ff" }} name="arrow-forward" />
                        </Right>
                        </ListItem>
                        <ListItem button={true} onPress={() => {
                            this.setState({
                                task: "Front-End Development",
                                type: "web-mobile-software-development"
                            }, () => {
                                this.handleRedirectAndSelection();
                            })
                        }}>
                        <Left>
                            <Text style={styles.whiteText}>Front-End Development</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "#0057ff" }} name="arrow-forward" />
                        </Right>
                        </ListItem>
                        <ListItem button={true} onPress={() => {
                            this.setState({
                                task: "Full-Stack Development",
                                type: "web-mobile-software-development"
                            }, () => {
                                this.handleRedirectAndSelection();
                            })
                        }}>
                        <Left>
                            <Text style={styles.whiteText}>Full-Stack Development</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "#0057ff" }} name="arrow-forward" />
                        </Right>
                        </ListItem>
                        <ListItem button={true} onPress={() => {
                            this.setState({
                                task: "Game Development",
                                type: "web-mobile-software-development"
                            }, () => {
                                this.handleRedirectAndSelection();
                            })
                        }}>
                        <Left>
                            <Text style={styles.whiteText}>Game Development</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "#0057ff" }} name="arrow-forward" />
                        </Right>
                        </ListItem>
                        <ListItem button={true} onPress={() => {
                            this.setState({
                                task: "Manual Testing",
                                type: "web-mobile-software-development"
                            }, () => {
                                this.handleRedirectAndSelection();
                            })
                        }}>
                        <Left>
                            <Text style={styles.whiteText}>Manual Testing</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "#0057ff" }} name="arrow-forward" />
                        </Right>
                        </ListItem>
                        <ListItem button={true} onPress={() => {
                            this.setState({
                                task: "Mobile App Development",
                                type: "web-mobile-software-development"
                            }, () => {
                                this.handleRedirectAndSelection();
                            })
                        }}>
                        <Left>
                            <Text style={styles.whiteText}>Mobile App Development</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "#0057ff" }} name="arrow-forward" />
                        </Right>
                        </ListItem>
                        <ListItem button={true} onPress={() => {
                            this.setState({
                                task: "Mobile Design",
                                type: "web-mobile-software-development"
                            }, () => {
                                this.handleRedirectAndSelection();
                            })
                        }}>
                        <Left>
                            <Text style={styles.whiteText}>Mobile Design</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "#0057ff" }} name="arrow-forward" />
                        </Right>
                        </ListItem>
                        <ListItem button={true} onPress={() => {
                            this.setState({
                                task: "Mobile Game Development",
                                type: "web-mobile-software-development"
                            }, () => {
                                this.handleRedirectAndSelection();
                            })
                        }}>
                        <Left>
                            <Text style={styles.whiteText}>Mobile Game Development</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "#0057ff" }} name="arrow-forward" />
                        </Right>
                        </ListItem>
                        <ListItem button={true} onPress={() => {
                            this.setState({
                                task: "Product Management",
                                type: "web-mobile-software-development"
                            }, () => {
                                this.handleRedirectAndSelection();
                            })
                        }}>
                        <Left>
                            <Text style={styles.whiteText}>Product Management</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "#0057ff" }} name="arrow-forward" />
                        </Right>
                        </ListItem>
                        <ListItem button={true} onPress={() => {
                            this.setState({
                                task: "Prototyping",
                                type: "web-mobile-software-development"
                            }, () => {
                                this.handleRedirectAndSelection();
                            })
                        }}>
                        <Left>
                            <Text style={styles.whiteText}>Prototyping</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "#0057ff" }} name="arrow-forward" />
                        </Right>
                        </ListItem>
                        <ListItem button={true} onPress={() => {
                            this.setState({
                                task: "Scripting & Automation",
                                type: "web-mobile-software-development"
                            }, () => {
                                this.handleRedirectAndSelection();
                            })
                        }}>
                        <Left>
                            <Text style={styles.whiteText}>Scripting & Automation</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "#0057ff" }} name="arrow-forward" />
                        </Right>
                        </ListItem>
                        <ListItem button={true} onPress={() => {
                            this.setState({
                                task: "Scrum Master",
                                type: "web-mobile-software-development"
                            }, () => {
                                this.handleRedirectAndSelection();
                            })
                        }}>
                        <Left>
                            <Text style={styles.whiteText}>Scrum Master</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "#0057ff" }} name="arrow-forward" />
                        </Right>
                        </ListItem>
                        <ListItem button={true} onPress={() => {
                            this.setState({
                                task: "User Research",
                                type: "web-mobile-software-development"
                            }, () => {
                                this.handleRedirectAndSelection();
                            })
                        }}>
                        <Left>
                            <Text style={styles.whiteText}>User Research</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "#0057ff" }} name="arrow-forward" />
                        </Right>
                        </ListItem>
                        <ListItem button={true} onPress={() => {
                            this.setState({
                                task: "Web Design",
                                type: "web-mobile-software-development"
                            }, () => {
                                this.handleRedirectAndSelection();
                            })
                        }}>
                        <Left>
                            <Text style={styles.whiteText}>Web Design</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "#0057ff" }} name="arrow-forward" />
                        </Right>
                        </ListItem>
                        <ListItem button={true} onPress={() => {
                            this.setState({
                                task: "UI/UX Design",
                                type: "web-mobile-software-development"
                            }, () => {
                                this.handleRedirectAndSelection();
                            })
                        }}>
                        <Left>
                            <Text style={styles.whiteText}>UI/UX Design</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "#0057ff" }} name="arrow-forward" />
                        </Right>
                        </ListItem>
                    </List>
                );
                break;
            case "mobile-app-development": //
                return (
                    <List>
                        <ListItem button={true} onPress={() => {
                            this.setState({
                                task: "iPhone/iPad App (iOS ONLY)",
                                type: "mobile-app-development"
                            }, () => {
                                this.handleRedirectAndSelection();
                            })
                        }}>
                        <Left>
                            <Text style={styles.whiteText}>iPhone/iPad App (iOS ONLY)</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "#0057ff" }} name="arrow-forward" />
                        </Right>
                        </ListItem>
                        <ListItem button={true} onPress={() => {
                            this.setState({
                                task: "Android App",
                                type: "mobile-app-development"
                            }, () => {
                                this.handleRedirectAndSelection();
                            })
                        }}>
                        <Left>
                            <Text style={styles.whiteText}>Android App</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "#0057ff" }} name="arrow-forward" />
                        </Right>
                        </ListItem>
                        <ListItem button={true} onPress={() => {
                            this.setState({
                                task: "Responsive Website (Mobile & Desktop)",
                                type: "mobile-app-development"
                            }, () => {
                                this.handleRedirectAndSelection();
                            })
                        }}>
                        <Left>
                            <Text style={styles.whiteText}>Responsive Website (Mobile & Desktop)</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "#0057ff" }} name="arrow-forward" />
                        </Right>
                        </ListItem>
                        <ListItem button={true} onPress={() => {
                            this.setState({
                                task: "Mobile Website (Mobile only)",
                                type: "mobile-app-development"
                            }, () => {
                                this.handleRedirectAndSelection();
                            })
                        }}>
                        <Left>
                            <Text style={styles.whiteText}>Mobile Website (Mobile only)</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "#0057ff" }} name="arrow-forward" />
                        </Right>
                        </ListItem>
                        <ListItem button={true} onPress={() => {
                            this.setState({
                                task: "React Native (iOS & Android simultaniously)",
                                type: "mobile-app-development"
                            }, () => {
                                this.handleRedirectAndSelection();
                            })
                        }}>
                        <Left>
                            <Text style={styles.whiteText}>React Native (iOS & Android simultaniously)</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "#0057ff" }} name="arrow-forward" />
                        </Right>
                        </ListItem>
                        <ListItem button={true} onPress={() => {
                            this.setState({
                                task: "I need an existing mobile app FIXED",
                                type: "mobile-app-development"
                            }, () => {
                                this.handleRedirectAndSelection();
                            })
                        }}>
                        <Left>
                            <Text style={styles.whiteText}>I need an existing mobile app FIXED</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "#0057ff" }} name="arrow-forward" />
                        </Right>
                        </ListItem>
                        <ListItem button={true} onPress={() => {
                            this.setState({
                                task: "I need an existing mobile app RE-DONE",
                                type: "mobile-app-development"
                            }, () => {
                                this.handleRedirectAndSelection();
                            })
                        }}>
                        <Left>
                            <Text style={styles.whiteText}>I need an existing mobile app RE-DONE</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "#0057ff" }} name="arrow-forward" />
                        </Right>
                        </ListItem>
                    </List>
                );
                break;
            case "writing":
                return (
                    <List>
                        <ListItem button={true} onPress={() => {
                            this.setState({
                                task: "Write some articles/blogs",
                                type: "writing"    
                            }, () => {
                                this.handleRedirectAndSelection();
                            })
                        }}>
                        <Left>
                            <Text style={styles.whiteText}>Write some articles/blogs</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "#0057ff" }} name="arrow-forward" />
                        </Right>
                        </ListItem>
                        <ListItem button={true} onPress={() => {
                            this.setState({
                                task: "Research writing",
                                type: "writing"    
                            }, () => {
                                this.handleRedirectAndSelection();
                            })
                        }}>
                        <Left>
                            <Text style={styles.whiteText}>Research writing</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "#0057ff" }} name="arrow-forward" />
                        </Right>
                        </ListItem>
                        <ListItem button={true} onPress={() => {
                            this.setState({
                                task: "Content writing",
                                type: "writing"    
                            }, () => {
                                this.handleRedirectAndSelection();
                            })
                        }}> 
                        <Left>
                            <Text style={styles.whiteText}>Content writing</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "#0057ff" }} name="arrow-forward" />
                        </Right>
                        </ListItem>
                        <ListItem button={true} onPress={() => {
                            this.setState({
                                task: "Translate something",
                                type: "writing"    
                            }, () => {
                                this.handleRedirectAndSelection();
                            })
                        }}>
                        <Left>
                            <Text style={styles.whiteText}>Translate something</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "#0057ff" }} name="arrow-forward" />
                        </Right>
                        </ListItem>
                        <ListItem button={true} onPress={() => {
                            this.setState({
                                task: "Write a report",
                                type: "writing"    
                            }, () => {
                                this.handleRedirectAndSelection();
                            })
                        }}>
                        <Left>
                            <Text style={styles.whiteText}>Write a report</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "#0057ff" }} name="arrow-forward" />
                        </Right>
                        </ListItem>
                        <ListItem button={true} onPress={() => {
                            this.setState({
                                task: "Copywriting",
                                type: "writing"    
                            }, () => {
                                this.handleRedirectAndSelection();
                            })
                        }}>
                        <Left>
                            <Text style={styles.whiteText}>Copywriting</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "#0057ff" }} name="arrow-forward" />
                        </Right>
                        </ListItem>
                        <ListItem button={true} onPress={() => {
                            this.setState({
                                task: "Career Coaching",
                                type: "writing"    
                            }, () => {
                                this.handleRedirectAndSelection();
                            })
                        }}>
                        <Left>
                            <Text style={styles.whiteText}>Career Coaching</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "#0057ff" }} name="arrow-forward" />
                        </Right>
                        </ListItem>
                        <ListItem button={true} onPress={() => {
                            this.setState({
                                task: "Writing Tutoring",
                                type: "writing"    
                            }, () => {
                                this.handleRedirectAndSelection();
                            })
                        }}>
                        <Left>
                            <Text style={styles.whiteText}>Writing Tutoring</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "#0057ff" }} name="arrow-forward" />
                        </Right>
                        </ListItem>
                        <ListItem button={true} onPress={() => {
                            this.setState({
                                task: "Editing & Proofreading",
                                type: "writing"    
                            }, () => {
                                this.handleRedirectAndSelection();
                            })
                        }}>
                        <Left>
                            <Text style={styles.whiteText}>Editing & Proofreading</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "#0057ff" }} name="arrow-forward" />
                        </Right>
                        </ListItem>
                        <ListItem button={true} onPress={() => {
                            this.setState({
                                task: "Creative Writing",
                                type: "writing"    
                            }, () => {
                                this.handleRedirectAndSelection();
                            })
                        }}>
                        <Left>
                            <Text style={styles.whiteText}>Creative Writing</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "#0057ff" }} name="arrow-forward" />
                        </Right>
                        </ListItem>
                        <ListItem button={true} onPress={() => {
                            this.setState({
                                task: "Business Writing",
                                type: "writing"    
                            }, () => {
                                this.handleRedirectAndSelection();
                            })
                        }}>
                        <Left>
                            <Text style={styles.whiteText}>Business Writing</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "#0057ff" }} name="arrow-forward" />
                        </Right>
                        </ListItem>
                        <ListItem button={true} onPress={() => {
                            this.setState({
                                task: "Other or not sure",
                                type: "writing"    
                            }, () => {
                                this.handleRedirectAndSelection();
                            })
                        }}>
                        <Left>
                            <Text style={styles.whiteText}>Other or not sure</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "#0057ff" }} name="arrow-forward" />
                        </Right>
                        </ListItem>
                    </List>
                );
                break;
            case "artifical-intelligence-machine-learning":
                return (
                    <List>
                        <ListItem button={true} onPress={() => {
                            this.setState({
                                task: "Reactive Machines",
                                type: "artifical-intelligence-machine-learning"    
                            }, () => {
                                this.handleRedirectAndSelection();
                            })
                        }}>
                        <Left>
                            <Text style={styles.whiteText}>Reactive Machines</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "#0057ff" }} name="arrow-forward" />
                        </Right>
                        </ListItem>
                        <ListItem button={true} onPress={() => {
                            this.setState({
                                task: "Limited Memory",
                                type: "artifical-intelligence-machine-learning"    
                            }, () => {
                                this.handleRedirectAndSelection();
                            })
                        }}>
                        <Left>
                            <Text style={styles.whiteText}>Limited Memory</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "#0057ff" }} name="arrow-forward" />
                        </Right>
                        </ListItem>
                        <ListItem button={true} onPress={() => {
                            this.setState({
                                task: "Theory of Mind",
                                type: "artifical-intelligence-machine-learning"    
                            }, () => {
                                this.handleRedirectAndSelection();
                            })
                        }}> 
                        <Left>
                            <Text style={styles.whiteText}>Theory of Mind</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "#0057ff" }} name="arrow-forward" />
                        </Right>
                        </ListItem>
                        <ListItem button={true} onPress={() => {
                            this.setState({
                                task: "Image Classification",
                                type: "artifical-intelligence-machine-learning"    
                            }, () => {
                                this.handleRedirectAndSelection();
                            })
                        }}> 
                        <Left>
                            <Text style={styles.whiteText}>Image Classification</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "#0057ff" }} name="arrow-forward" />
                        </Right>
                        </ListItem>
                        <ListItem button={true} onPress={() => {
                            this.setState({
                                task: "Theory of Mind",
                                type: "artifical-intelligence-machine-learning"    
                            }, () => {
                                this.handleRedirectAndSelection();
                            })
                        }}> 
                        <Left>
                            <Text style={styles.whiteText}>Theory of Mind</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "#0057ff" }} name="arrow-forward" />
                        </Right>
                        </ListItem>
                        <ListItem button={true} onPress={() => {
                            this.setState({
                                task: "Self-aware",
                                type: "artifical-intelligence-machine-learning"    
                            }, () => {
                                this.handleRedirectAndSelection();
                            })
                        }}>
                        <Left>
                            <Text style={styles.whiteText}>Self-aware</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "#0057ff" }} name="arrow-forward" />
                        </Right>
                        </ListItem>
                        <ListItem button={true} onPress={() => {
                            this.setState({
                                task: "Artificial Narrow Intelligence (ANI)",
                                type: "artifical-intelligence-machine-learning"    
                            }, () => {
                                this.handleRedirectAndSelection();
                            })
                        }}>
                        <Left>
                            <Text style={styles.whiteText}>Artificial Narrow Intelligence (ANI)</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "#0057ff" }} name="arrow-forward" />
                        </Right>
                        </ListItem>
                        <ListItem button={true} onPress={() => {
                            this.setState({
                                task: "Artificial General Intelligence (AGI)",
                                type: "artifical-intelligence-machine-learning"    
                            }, () => {
                                this.handleRedirectAndSelection();
                            })
                        }}>
                        <Left>
                            <Text style={styles.whiteText}>Artificial General Intelligence (AGI)</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "#0057ff" }} name="arrow-forward" />
                        </Right>
                        </ListItem>
                        <ListItem button={true} onPress={() => {
                            this.setState({
                                task: "Artificial Superintelligence (ASI)",
                                type: "artifical-intelligence-machine-learning"    
                            }, () => {
                                this.handleRedirectAndSelection();
                            })
                        }}>
                        <Left>
                            <Text style={styles.whiteText}>Artificial Superintelligence (ASI)</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "#0057ff" }} name="arrow-forward" />
                        </Right>
                        </ListItem>
                    </List>
                );
                break;
            case "graphic-design":
                return (
                    <List>
                        <ListItem button={true} onPress={() => {
                            this.setState({
                                task: "Design a video AD",
                                type: "graphic-design"
                            }, () => {
                                this.handleRedirectAndSelection();
                            })
                        }}>
                        <Left>
                            <Text style={styles.whiteText}>Design a video AD</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "#0057ff" }} name="arrow-forward" />
                        </Right>
                        </ListItem>
                        <ListItem button={true} onPress={() => {
                            this.setState({
                                task: "Design a logo",
                                type: "graphic-design"    
                            }, () => {
                                this.handleRedirectAndSelection();
                            })
                        }}>
                        <Left>
                            <Text style={styles.whiteText}>Design a logo</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "#0057ff" }} name="arrow-forward" />
                        </Right>
                        </ListItem>
                        <ListItem button={true} onPress={() => {
                            this.setState({
                                task: "3D Animations",
                                type: "graphic-design"    
                            }, () => {
                                this.handleRedirectAndSelection();
                            })
                        }}> 
                        <Left>
                            <Text style={styles.whiteText}>3D Animations</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "#0057ff" }} name="arrow-forward" />
                        </Right>
                        </ListItem>
                        <ListItem button={true} onPress={() => {
                            this.setState({
                                task: "Animated GIF's",
                                type: "graphic-design"    
                            }, () => {
                                this.handleRedirectAndSelection();
                            })
                        }}>
                        <Left>
                            <Text style={styles.whiteText}>Animated GIF's</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "#0057ff" }} name="arrow-forward" />
                        </Right>
                        </ListItem>
                        <ListItem button={true} onPress={() => {
                            this.setState({
                                task: "Product Photography",
                                type: "graphic-design"    
                            }, () => {
                                this.handleRedirectAndSelection();
                            })
                        }}>
                        <Left>
                            <Text style={styles.whiteText}>Product Photography</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "#0057ff" }} name="arrow-forward" />
                        </Right>
                        </ListItem>
                        <ListItem button={true} onPress={() => {
                            this.setState({
                                task: "Short Video Ad's",
                                type: "graphic-design"    
                            }, () => {
                                this.handleRedirectAndSelection();
                            })
                        }}>
                        <Left>
                            <Text style={styles.whiteText}>Short Video Ad's</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "#0057ff" }} name="arrow-forward" />
                        </Right>
                        </ListItem>
                        <ListItem button={true} onPress={() => {
                            this.setState({
                                task: "Logo Animations",
                                type: "graphic-design"    
                            }, () => {
                                this.handleRedirectAndSelection();
                            })
                        }}>
                        <Left>
                            <Text style={styles.whiteText}>Logo Animations</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "#0057ff" }} name="arrow-forward" />
                        </Right>
                        </ListItem>
                        <ListItem button={true} onPress={() => {
                            this.setState({
                                task: "Charector Animation",
                                type: "graphic-design"    
                            }, () => {
                                this.handleRedirectAndSelection();
                            })
                        }}>
                        <Left>
                            <Text style={styles.whiteText}>Charector Animation</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "#0057ff" }} name="arrow-forward" />
                        </Right>
                        </ListItem>
                    </List>
                );
                break;
            case "game-development":
                return (
                    <List>
                        <ListItem button={true} onPress={() => {
                            this.setState({
                                task: "Hire a multi-media artist/animator",
                                type: "game-development"    
                            }, () => {
                                this.handleRedirectAndSelection();
                            })
                        }}>
                        <Left>
                            <Text style={styles.whiteText}>Hire a multi-media artist/animator</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "#0057ff" }} name="arrow-forward" />
                        </Right>
                        </ListItem>
                        <ListItem button={true} onPress={() => {
                            this.setState({
                                task: "Hire a video game tester",
                                type: "game-development"    
                            }, () => {
                                this.handleRedirectAndSelection();
                            })
                        }}>
                        <Left>
                            <Text style={styles.whiteText}>Hire a video game tester</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "#0057ff" }} name="arrow-forward" />
                        </Right>
                        </ListItem>
                        <ListItem button={true} onPress={() => {
                            this.setState({
                                task: "Hire a game developer (coder)",
                                type: "game-development"    
                            }, () => {
                                this.handleRedirectAndSelection();
                            })
                        }}> 
                        <Left>
                            <Text style={styles.whiteText}>Hire a game developer (coder)</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "#0057ff" }} name="arrow-forward" />
                        </Right>
                        </ListItem>
                        <ListItem button={true} onPress={() => {
                            this.setState({
                                task: "Hire First-party developers",
                                type: "game-development"    
                            }, () => {
                                this.handleRedirectAndSelection();
                            })
                        }}>
                        <Left>
                            <Text style={styles.whiteText}>Hire First-party developers</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "#0057ff" }} name="arrow-forward" />
                        </Right>
                        </ListItem>
                        <ListItem button={true} onPress={() => {
                            this.setState({
                                task: "Second-party developers",
                                type: "game-development"    
                            }, () => {
                                this.handleRedirectAndSelection();
                            })
                        }}>
                        <Left>
                            <Text style={styles.whiteText}>Second-party developers</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "#0057ff" }} name="arrow-forward" />
                        </Right>
                        </ListItem>
                        <ListItem button={true} onPress={() => {
                            this.setState({
                                task: "Third-party developers",
                                type: "game-development"    
                            }, () => {
                                this.handleRedirectAndSelection();
                            })
                        }}>
                        <Left>
                            <Text style={styles.whiteText}>Third-party developers</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "#0057ff" }} name="arrow-forward" />
                        </Right>
                        </ListItem>
                        <ListItem button={true} onPress={() => {
                            this.setState({
                                task: "Indie game developers",
                                type: "game-development"    
                            }, () => {
                                this.handleRedirectAndSelection();
                            })
                        }}>
                        <Left>
                            <Text style={styles.whiteText}>Indie game developers</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "#0057ff" }} name="arrow-forward" />
                        </Right>
                        </ListItem>
                    </List>
                );
                break;
            case "it-networking":
                return (
                    <List>
                        <ListItem button={true} onPress={() => {
                            this.setState({
                                task: "Business Applications Development",
                                type: "it-networking"    
                            }, () => {
                                this.handleRedirectAndSelection();
                            })
                        }}>
                        <Left>
                            <Text style={styles.whiteText}>Business Applications Development</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "#0057ff" }} name="arrow-forward" />
                        </Right>
                        </ListItem>
                        <ListItem button={true} onPress={() => {
                            this.setState({
                                task: "Cloud Engineering",
                                type: "it-networking"    
                            }, () => {
                                this.handleRedirectAndSelection();
                            })
                        }}>
                        <Left>
                            <Text style={styles.whiteText}>Cloud Engineering</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "#0057ff" }} name="arrow-forward" />
                        </Right>
                        </ListItem>
                        <ListItem button={true} onPress={() => {
                            this.setState({
                                task: "Dev-Ops Engineering",
                                type: "it-networking"    
                            }, () => {
                                this.handleRedirectAndSelection();
                            })
                        }}> 
                        <Left>
                            <Text style={styles.whiteText}>Dev-Ops Engineering</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "#0057ff" }} name="arrow-forward" />
                        </Right>
                        </ListItem>
                        <ListItem button={true} onPress={() => {
                            this.setState({
                                task: "Information Security",
                                type: "it-networking"    
                            }, () => {
                                this.handleRedirectAndSelection();
                            })
                        }}>
                        <Left>
                            <Text style={styles.whiteText}>Information Security</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "#0057ff" }} name="arrow-forward" />
                        </Right>
                        </ListItem>
                        <ListItem button={true} onPress={() => {
                            this.setState({
                                task: "IT Compliance",
                                type: "it-networking"    
                            }, () => {
                                this.handleRedirectAndSelection();
                            })
                        }}>
                        <Left>
                            <Text style={styles.whiteText}>IT Compliance</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "#0057ff" }} name="arrow-forward" />
                        </Right>
                        </ListItem>
                        <ListItem button={true} onPress={() => {
                            this.setState({
                                task: "IT Support",
                                type: "it-networking"    
                            }, () => {
                                this.handleRedirectAndSelection();
                            })
                        }}>
                        <Left>
                            <Text style={styles.whiteText}>IT Support</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "#0057ff" }} name="arrow-forward" />
                        </Right>
                        </ListItem>
                        <ListItem button={true} onPress={() => {
                            this.setState({
                                task: "Network Administration",
                                type: "it-networking"    
                            }, () => {
                                this.handleRedirectAndSelection();
                            })
                        }}>
                        <Left>
                            <Text style={styles.whiteText}>Network Administration</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "#0057ff" }} name="arrow-forward" />
                        </Right>
                        </ListItem>
                        <ListItem button={true} onPress={() => {
                            this.setState({
                                task: "Network Security",
                                type: "it-networking"    
                            }, () => {
                                this.handleRedirectAndSelection();
                            })
                        }}>
                        <Left>
                            <Text style={styles.whiteText}>Network Security</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "#0057ff" }} name="arrow-forward" />
                        </Right>
                        </ListItem>
                        <ListItem button={true} onPress={() => {
                            this.setState({
                                task: "Solutions Achitecture",
                                type: "it-networking"    
                            }, () => {
                                this.handleRedirectAndSelection();
                            })
                        }}>
                        <Left>
                            <Text style={styles.whiteText}>Solutions Achitecture</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "#0057ff" }} name="arrow-forward" />
                        </Right>
                        </ListItem>
                        <ListItem button={true} onPress={() => {
                            this.setState({
                                task: "Systems Administration",
                                type: "it-networking"    
                            }, () => {
                                this.handleRedirectAndSelection();
                            })
                        }}>
                        <Left>
                            <Text style={styles.whiteText}>Systems Administration</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "#0057ff" }} name="arrow-forward" />
                        </Right>
                        </ListItem>
                        <ListItem button={true} onPress={() => {
                            this.setState({
                                task: "System Engineering",
                                type: "it-networking"    
                            }, () => {
                                this.handleRedirectAndSelection();
                            })
                        }}>
                        <Left>
                            <Text style={styles.whiteText}>System Engineering</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "#0057ff" }} name="arrow-forward" />
                        </Right>
                        </ListItem>
                    </List>
                );
                break;
            case "translation":
                return (
                    <List>
                        <ListItem button={true} onPress={() => {
                            this.setState({
                                task: "Language Localization",
                                type: "translation"    
                            }, () => {
                                this.handleRedirectAndSelection();
                            })
                        }}>
                        <Left>
                            <Text style={styles.whiteText}>Language Localization</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "#0057ff" }} name="arrow-forward" />
                        </Right>
                        </ListItem>
                        <ListItem button={true} onPress={() => {
                            this.setState({
                                task: "Language Tutoring",
                                type: "translation"    
                            }, () => {
                                this.handleRedirectAndSelection();
                            })
                        }}>
                        <Left>
                            <Text style={styles.whiteText}>Language Tutoring</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "#0057ff" }} name="arrow-forward" />
                        </Right>
                        </ListItem>
                        <ListItem button={true} onPress={() => {
                            this.setState({
                                task: "Legal Translation",
                                type: "translation"    
                            }, () => {
                                this.handleRedirectAndSelection();
                            })
                        }}> 
                        <Left>
                            <Text style={styles.whiteText}>Legal Translation</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "#0057ff" }} name="arrow-forward" />
                        </Right>
                        </ListItem>
                        <ListItem button={true} onPress={() => {
                            this.setState({
                                task: "Medical Transportation",
                                type: "translation"    
                            }, () => {
                                this.handleRedirectAndSelection();
                            })
                        }}>
                        <Left>
                            <Text style={styles.whiteText}>Medical Transportation</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "#0057ff" }} name="arrow-forward" />
                        </Right>
                        </ListItem>
                        <ListItem button={true} onPress={() => {
                            this.setState({
                                task: "Technical Translation",
                                type: "translation"    
                            }, () => {
                                this.handleRedirectAndSelection();
                            })
                        }}>
                        <Left>
                            <Text style={styles.whiteText}>Technical Translation</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "#0057ff" }} name="arrow-forward" />
                        </Right>
                        </ListItem>
                        <ListItem button={true} onPress={() => {
                            this.setState({
                                task: "Translation",
                                type: "translation"    
                            }, () => {
                                this.handleRedirectAndSelection();
                            })
                        }}>
                        <Left>
                            <Text style={styles.whiteText}>Translation</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "#0057ff" }} name="arrow-forward" />
                        </Right>
                        </ListItem>
                        
                    </List>
                );
                break;
            case "sales-marketing":
                return (
                    <List>
                        <ListItem button={true} onPress={() => {
                            this.setState({
                                task: "Brand Strategy",
                                type: "sales-marketing"    
                            }, () => {
                                this.handleRedirectAndSelection();
                            })
                        }}>
                        <Left>
                            <Text style={styles.whiteText}>Brand Strategy</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "#0057ff" }} name="arrow-forward" />
                        </Right>
                        </ListItem>
                        <ListItem button={true} onPress={() => {
                            this.setState({
                                task: "Campaign Management",
                                type: "sales-marketing"    
                            }, () => {
                                this.handleRedirectAndSelection();
                            })
                        }}>
                        <Left>
                            <Text style={styles.whiteText}>Campaign Management</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "#0057ff" }} name="arrow-forward" />
                        </Right>
                        </ListItem>
                        <ListItem button={true} onPress={() => {
                            this.setState({
                                task: "Community Management",
                                type: "sales-marketing"    
                            }, () => {
                                this.handleRedirectAndSelection();
                            })
                        }}> 
                        <Left>
                            <Text style={styles.whiteText}>Community Management</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "#0057ff" }} name="arrow-forward" />
                        </Right>
                        </ListItem>
                        <ListItem button={true} onPress={() => {
                            this.setState({
                                task: "Content Strategy",
                                type: "sales-marketing"    
                            }, () => {
                                this.handleRedirectAndSelection();
                            })
                        }}>
                        <Left>
                            <Text style={styles.whiteText}>Content Strategy</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "#0057ff" }} name="arrow-forward" />
                        </Right>
                        </ListItem>
                        <ListItem button={true} onPress={() => {
                            this.setState({
                                task: "Digital Marketing",
                                type: "sales-marketing"    
                            }, () => {
                                this.handleRedirectAndSelection();
                            })
                        }}>
                        <Left>
                            <Text style={styles.whiteText}>Digital Marketing</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "#0057ff" }} name="arrow-forward" />
                        </Right>
                        </ListItem>
                        <ListItem button={true} onPress={() => {
                            this.setState({
                                task: "Email Marketing",
                                type: "sales-marketing"    
                            }, () => {
                                this.handleRedirectAndSelection();
                            })
                        }}>
                        <Left>
                            <Text style={styles.whiteText}>Email Marketing</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "#0057ff" }} name="arrow-forward" />
                        </Right>
                        </ListItem>
                       
                        <ListItem button={true} onPress={() => {
                            this.setState({
                                task: "Lead Generation",
                                type: "sales-marketing"    
                            }, () => {
                                this.handleRedirectAndSelection();
                            })
                        }}>
                        <Left>
                            <Text style={styles.whiteText}>Lead Generation</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "#0057ff" }} name="arrow-forward" />
                        </Right>
                        </ListItem>
                        <ListItem button={true} onPress={() => {
                            this.setState({
                                task: "Market Research",
                                type: "sales-marketing"    
                            }, () => {
                                this.handleRedirectAndSelection();
                            })
                        }}>
                        <Left>
                            <Text style={styles.whiteText}>Market Research</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "#0057ff" }} name="arrow-forward" />
                        </Right>
                        </ListItem>
                        <ListItem button={true} onPress={() => {
                            this.setState({
                                task: "Marketing Automation",
                                type: "sales-marketing"    
                            }, () => {
                                this.handleRedirectAndSelection();
                            })
                        }}> 
                        <Left>
                            <Text style={styles.whiteText}>Marketing Automation</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "#0057ff" }} name="arrow-forward" />
                        </Right>
                        </ListItem>
                        <ListItem button={true} onPress={() => {
                            this.setState({
                                task: "Marketing Strategy",
                                type: "sales-marketing"    
                            }, () => {
                                this.handleRedirectAndSelection();
                            })
                        }}>
                        <Left>
                            <Text style={styles.whiteText}>Marketing Strategy</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "#0057ff" }} name="arrow-forward" />
                        </Right>
                        </ListItem>
                        <ListItem button={true} onPress={() => {
                            this.setState({
                                task: "Public Relations",
                                type: "sales-marketing"    
                            }, () => {
                                this.handleRedirectAndSelection();
                            })
                        }}>
                        <Left>
                            <Text style={styles.whiteText}>Public Relations</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "#0057ff" }} name="arrow-forward" />
                        </Right>
                        </ListItem>
                        <ListItem button={true} onPress={() => {
                            this.setState({
                                task: "Sales & Business Development",
                                type: "sales-marketing"    
                            }, () => {
                                this.handleRedirectAndSelection();
                            })
                        }}>
                        <Left>
                            <Text style={styles.whiteText}>Sales & Business Development</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "#0057ff" }} name="arrow-forward" />
                        </Right>
                        </ListItem>
                        <ListItem button={true} onPress={() => {
                            this.setState({
                                task: "Search Engine Marketing",
                                type: "sales-marketing"    
                            }, () => {
                                this.handleRedirectAndSelection();
                            })
                        }}>
                        <Left>
                            <Text style={styles.whiteText}>Search Engine Marketing</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "#0057ff" }} name="arrow-forward" />
                        </Right>
                        </ListItem>
                        <ListItem button={true} onPress={() => {
                            this.setState({
                                task: "Search Engine Optimization",
                                type: "sales-marketing"    
                            }, () => {
                                this.handleRedirectAndSelection();
                            })
                        }}>
                        <Left>
                            <Text style={styles.whiteText}>Search Engine Optimization</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "#0057ff" }} name="arrow-forward" />
                        </Right>
                        </ListItem>
                        <ListItem button={true} onPress={() => {
                            this.setState({
                                task: "Social Media Marketing",
                                type: "sales-marketing"    
                            }, () => {
                                this.handleRedirectAndSelection();
                            })
                        }}>
                        <Left>
                            <Text style={styles.whiteText}>Social Media Marketing</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "#0057ff" }} name="arrow-forward" />
                        </Right>
                        </ListItem>
                        <ListItem button={true} onPress={() => {
                            this.setState({
                                task: "Social Media Strategy",
                                type: "sales-marketing"    
                            }, () => {
                                this.handleRedirectAndSelection();
                            })
                        }}>
                        <Left>
                            <Text style={styles.whiteText}>Social Media Strategy</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "#0057ff" }} name="arrow-forward" />
                        </Right>
                        </ListItem>
                        <ListItem button={true} onPress={() => {
                            this.setState({
                                task: "Telemarketing",
                                type: "sales-marketing"    
                            }, () => {
                                this.handleRedirectAndSelection();
                            })
                        }}>
                        <Left>
                            <Text style={styles.whiteText}>Telemarketing</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "#0057ff" }} name="arrow-forward" />
                        </Right>
                        </ListItem>
                    </List>
                );
                break;
            case "legal":
                return (
                    <List>
                        <ListItem button={true} onPress={() => {
                            this.setState({
                                task: "Business & Corperate Law",
                                type: "legal"    
                            }, () => {
                                this.handleRedirectAndSelection();
                            })
                        }}>
                        <Left>
                            <Text style={styles.whiteText}>Business & Corperate Law</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "#0057ff" }} name="arrow-forward" />
                        </Right>
                        </ListItem>
                        <ListItem button={true} onPress={() => {
                            this.setState({
                                task: "General Counsel",
                                type: "legal"    
                            }, () => {
                                this.handleRedirectAndSelection();
                            })
                        }}>
                        <Left>
                            <Text style={styles.whiteText}>General Counsel</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "#0057ff" }} name="arrow-forward" />
                        </Right>
                        </ListItem>
                        <ListItem button={true} onPress={() => {
                            this.setState({
                                task: "Immigration Law",
                                type: "legal"    
                            }, () => {
                                this.handleRedirectAndSelection();
                            })
                        }}> 
                        <Left>
                            <Text style={styles.whiteText}>Immigration Law</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "#0057ff" }} name="arrow-forward" />
                        </Right>
                        </ListItem>
                        <ListItem button={true} onPress={() => {
                            this.setState({
                                task: "Intellectual Property Law",
                                type: "legal"    
                            }, () => {
                                this.handleRedirectAndSelection();
                            })
                        }}>
                        <Left>
                            <Text style={styles.whiteText}>Intellectual Property Law</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "#0057ff" }} name="arrow-forward" />
                        </Right>
                        </ListItem>
                        <ListItem button={true} onPress={() => {
                            this.setState({
                                task: "International Law",
                                type: "legal"    
                            }, () => {
                                this.handleRedirectAndSelection();
                            })
                        }}>
                        <Left>
                            <Text style={styles.whiteText}>International Law</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "#0057ff" }} name="arrow-forward" />
                        </Right>
                        </ListItem>
                        <ListItem button={true} onPress={() => {
                            this.setState({
                                task: "Labor & Employment Law",
                                type: "legal"    
                            }, () => {
                                this.handleRedirectAndSelection();
                            })
                        }}>
                        <Left>
                            <Text style={styles.whiteText}>Labor & Employment Law</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "#0057ff" }} name="arrow-forward" />
                        </Right>
                        </ListItem>
                        <ListItem button={true} onPress={() => {
                            this.setState({
                                task: "Paralegal",
                                type: "legal"    
                            }, () => {
                                this.handleRedirectAndSelection();
                            })
                        }}>
                        <Left>
                            <Text style={styles.whiteText}>Paralegal</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "#0057ff" }} name="arrow-forward" />
                        </Right>
                        </ListItem>
                        <ListItem button={true} onPress={() => {
                            this.setState({
                                task: "Regulatory Law",
                                type: "legal"    
                            }, () => {
                                this.handleRedirectAndSelection();
                            })
                        }}>
                        <Left>
                            <Text style={styles.whiteText}>Regulatory Law</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "#0057ff" }} name="arrow-forward" />
                        </Right>
                        </ListItem>
                        <ListItem button={true} onPress={() => {
                            this.setState({
                                task: "Securities & Finance Law",
                                type: "legal"    
                            }, () => {
                                this.handleRedirectAndSelection();
                            })
                        }}>
                        <Left>
                            <Text style={styles.whiteText}>Securities & Finance Law</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "#0057ff" }} name="arrow-forward" />
                        </Right>
                        </ListItem>
                        <ListItem button={true} onPress={() => {
                            this.setState({
                                task: "Taw Law",
                                type: "legal"    
                            }, () => {
                                this.handleRedirectAndSelection();
                            })
                        }}>
                        <Left>
                            <Text style={styles.whiteText}>Taw Law</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "#0057ff" }} name="arrow-forward" />
                        </Right>
                        </ListItem>
                        
                    </List>
                );
                break;
            case "social-media-and-marketing": 
                return (
                    <List>
                        <ListItem button={true} onPress={() => {
                            this.setState({
                                task: "Social Media Marketing",
                                type: "social-media-and-marketing"    
                            }, () => {
                                this.handleRedirectAndSelection();
                            })
                        }}>
                        <Left>
                            <Text style={styles.whiteText}>Social Media Marketing</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "#0057ff" }} name="arrow-forward" />
                        </Right>
                        </ListItem>
                        <ListItem button={true} onPress={() => {
                            this.setState({
                                task: "Social Media Advertising",
                                type: "social-media-and-marketing"    
                            }, () => {
                                this.handleRedirectAndSelection();
                            })
                        }}>
                        <Left>
                            <Text style={styles.whiteText}>Social Media Advertising</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "#0057ff" }} name="arrow-forward" />
                        </Right>
                        </ListItem>
                        <ListItem button={true} onPress={() => {
                            this.setState({
                                task: "SEO",
                                type: "social-media-and-marketing"    
                            }, () => {
                                this.handleRedirectAndSelection();
                            })
                        }}> 
                        <Left>
                            <Text style={styles.whiteText}>SEO</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "#0057ff" }} name="arrow-forward" />
                        </Right>
                        </ListItem>
                        <ListItem button={true} onPress={() => {
                            this.setState({
                                task: "Ecommerce Marketing",
                                type: "social-media-and-marketing"    
                            }, () => {
                                this.handleRedirectAndSelection();
                            })
                        }}>
                        <Left>
                            <Text style={styles.whiteText}>Ecommerce Marketing</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "#0057ff" }} name="arrow-forward" />
                        </Right>
                        </ListItem>
                        <ListItem button={true} onPress={() => {
                            this.setState({
                                task: "Display Advertising",
                                type: "social-media-and-marketing"    
                            }, () => {
                                this.handleRedirectAndSelection();
                            })
                        }}>
                        <Left>
                            <Text style={styles.whiteText}>Display Advertising</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "#0057ff" }} name="arrow-forward" />
                        </Right>
                        </ListItem>
                        <ListItem button={true} onPress={() => {
                            this.setState({
                                task: "Public Relations",
                                type: "social-media-and-marketing"    
                            }, () => {
                                this.handleRedirectAndSelection();
                            })
                        }}>
                        <Left>
                            <Text style={styles.whiteText}>Public Relations</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "#0057ff" }} name="arrow-forward" />
                        </Right>
                        </ListItem>
                        <ListItem button={true} onPress={() => {
                            this.setState({
                                task: "Crowdfunding",
                                type: "social-media-and-marketing"    
                            }, () => {
                                this.handleRedirectAndSelection();
                            })
                        }}>
                        <Left>
                            <Text style={styles.whiteText}>Crowdfunding</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "#0057ff" }} name="arrow-forward" />
                        </Right>
                        </ListItem>
                        <ListItem button={true} onPress={() => {
                            this.setState({
                                task: "Web Analytics",
                                type: "social-media-and-marketing"    
                            }, () => {
                                this.handleRedirectAndSelection();
                            })
                        }}>
                        <Left>
                            <Text style={styles.whiteText}>Web Analytics</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "#0057ff" }} name="arrow-forward" />
                        </Right>
                        </ListItem>
                        <ListItem button={true} onPress={() => {
                            this.setState({
                                task: "Influencer Marketing",
                                type: "social-media-and-marketing"    
                            }, () => {
                                this.handleRedirectAndSelection();
                            })
                        }}>
                        <Left>
                            <Text style={styles.whiteText}>Influencer Marketing</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "#0057ff" }} name="arrow-forward" />
                        </Right>
                        </ListItem>
                        <ListItem button={true} onPress={() => {
                            this.setState({
                                task: "Text Message Marketing",
                                type: "social-media-and-marketing"    
                            }, () => {
                                this.handleRedirectAndSelection();
                            })
                        }}>
                        <Left>
                            <Text style={styles.whiteText}>Text Message Marketing</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "#0057ff" }} name="arrow-forward" />
                        </Right>
                        </ListItem>
                        <ListItem button={true} onPress={() => {
                            this.setState({
                                task: "SEM",
                                type: "social-media-and-marketing"    
                            }, () => {
                                this.handleRedirectAndSelection();
                            })
                        }}>
                        <Left>
                            <Text style={styles.whiteText}>SEM</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "#0057ff" }} name="arrow-forward" />
                        </Right>
                        </ListItem>
                        <ListItem button={true} onPress={() => {
                            this.setState({
                                task: "Mobile App Marketing",
                                type: "social-media-and-marketing"    
                            }, () => {
                                this.handleRedirectAndSelection();
                            })
                        }}>
                        <Left>
                            <Text style={styles.whiteText}>Mobile App Marketing</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "#0057ff" }} name="arrow-forward" />
                        </Right>
                        </ListItem>
                        <ListItem button={true} onPress={() => {
                            this.setState({
                                task: "Affiliate Marketing",
                                type: "social-media-and-marketing"    
                            }, () => {
                                this.handleRedirectAndSelection();
                            })
                        }}> 
                        <Left>
                            <Text style={styles.whiteText}>Affiliate Marketing</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "#0057ff" }} name="arrow-forward" />
                        </Right>
                        </ListItem>
                        <ListItem button={true} onPress={() => {
                            this.setState({
                                task: "Domain Research",
                                type: "social-media-and-marketing"    
                            }, () => {
                                this.handleRedirectAndSelection();
                            })
                        }}>
                        <Left>
                            <Text style={styles.whiteText}>Domain Research</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "#0057ff" }} name="arrow-forward" />
                        </Right>
                        </ListItem>
                        <ListItem button={true} onPress={() => {
                            this.setState({
                                task: "Music Promotion",
                                type: "social-media-and-marketing"    
                            }, () => {
                                this.handleRedirectAndSelection();
                            })
                        }}>
                        <Left>
                            <Text style={styles.whiteText}>Music Promotion</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "#0057ff" }} name="arrow-forward" />
                        </Right>
                        </ListItem>
                        <ListItem button={true} onPress={() => {
                            this.setState({
                                task: "Book & Ebook Marketing",
                                type: "social-media-and-marketing"    
                            }, () => {
                                this.handleRedirectAndSelection();
                            })
                        }}>
                        <Left>
                            <Text style={styles.whiteText}>Book & Ebook Marketing</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "#0057ff" }} name="arrow-forward" />
                        </Right>
                        </ListItem>
                        <ListItem button={true} onPress={() => {
                            this.setState({
                                task: "Podcast Marketing",
                                type: "social-media-and-marketing"    
                            }, () => {
                                this.handleRedirectAndSelection();
                            })
                        }}>
                        <Left>
                            <Text style={styles.whiteText}>Podcast Marketing</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "#0057ff" }} name="arrow-forward" />
                        </Right>
                        </ListItem>
                        <ListItem button={true} onPress={() => {
                            this.setState({
                                task: "Surveys",
                                type: "social-media-and-marketing"    
                            }, () => {
                                this.handleRedirectAndSelection();
                            })
                        }}>
                        <Left>
                            <Text style={styles.whiteText}>Surveys</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "#0057ff" }} name="arrow-forward" />
                        </Right>
                        </ListItem>
                        <ListItem button={true} onPress={() => {
                            this.setState({
                                task: "Local SEO",
                                type: "social-media-and-marketing"    
                            }, () => {
                                this.handleRedirectAndSelection();
                            })
                        }}>
                        <Left>
                            <Text style={styles.whiteText}>Local SEO</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "#0057ff" }} name="arrow-forward" />
                        </Right>
                        </ListItem>
                    </List>
                );
                break;
            case "engineering-and-architecture": 
                return (
                    <List>
                        <ListItem button={true} onPress={() => {
                            this.setState({
                                task: "3-D Modeling & Rendering",
                                type: "engineering-and-architecture"    
                            }, () => {
                                this.handleRedirectAndSelection();
                            })
                        }}>
                        <Left>
                            <Text style={styles.whiteText}>3-D Modeling & Rendering</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "#0057ff" }} name="arrow-forward" />
                        </Right>
                        </ListItem>
                        <ListItem button={true} onPress={() => {
                            this.setState({
                                task: "Architecture",
                                type: "engineering-and-architecture"    
                            }, () => {
                                this.handleRedirectAndSelection();
                            })
                        }}>
                        <Left>
                            <Text style={styles.whiteText}>Architecture</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "#0057ff" }} name="arrow-forward" />
                        </Right>
                        </ListItem>
                        <ListItem button={true} onPress={() => {
                            this.setState({
                                task: "Biology",
                                type: "engineering-and-architecture"    
                            }, () => {
                                this.handleRedirectAndSelection();
                            })
                        }}> 
                        <Left>
                            <Text style={styles.whiteText}>Biology</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "#0057ff" }} name="arrow-forward" />
                        </Right>
                        </ListItem>
                        <ListItem button={true} onPress={() => {
                            this.setState({
                                task: "Building Information Modeling",
                                type: "engineering-and-architecture"    
                            }, () => {
                                this.handleRedirectAndSelection();
                            })
                        }}>
                        <Left>
                            <Text style={styles.whiteText}>Building Information Modeling</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "#0057ff" }} name="arrow-forward" />
                        </Right>
                        </ListItem>
                        <ListItem button={true} onPress={() => {
                            this.setState({
                                task: "CAD",
                                type: "engineering-and-architecture"    
                            }, () => {
                                this.handleRedirectAndSelection();
                            })
                        }}>
                        <Left>
                            <Text style={styles.whiteText}>CAD</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "#0057ff" }} name="arrow-forward" />
                        </Right>
                        </ListItem>
                        <ListItem button={true} onPress={() => {
                            this.setState({
                                task: "Chemical & Process Engineering",
                                type: "engineering-and-architecture"    
                            }, () => {
                                this.handleRedirectAndSelection();
                            })
                        }}>
                        <Left>
                            <Text style={styles.whiteText}>Chemical & Process Engineering</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "#0057ff" }} name="arrow-forward" />
                        </Right>
                        </ListItem>
                        <ListItem button={true} onPress={() => {
                            this.setState({
                                task: "Chemistry",
                                type: "engineering-and-architecture"    
                            }, () => {
                                this.handleRedirectAndSelection();
                            })
                        }}>
                        <Left>
                            <Text style={styles.whiteText}>Chemistry</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "#0057ff" }} name="arrow-forward" />
                        </Right>
                        </ListItem>
                        <ListItem button={true} onPress={() => {
                            this.setState({
                                task: "Civil Engineering",
                                type: "engineering-and-architecture"    
                            }, () => {
                                this.handleRedirectAndSelection();
                            })
                        }}>
                        <Left>
                            <Text style={styles.whiteText}>Civil Engineering</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "#0057ff" }} name="arrow-forward" />
                        </Right>
                        </ListItem>
                        <ListItem button={true} onPress={() => {
                            this.setState({
                                task: "Electrical Engineering",
                                type: "engineering-and-architecture"    
                            }, () => {
                                this.handleRedirectAndSelection();
                            })
                        }}>
                        <Left>
                            <Text style={styles.whiteText}>Electrical Engineering</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "#0057ff" }} name="arrow-forward" />
                        </Right>
                        </ListItem>
                        <ListItem button={true} onPress={() => {
                            this.setState({
                                task: "Electronic Engineering",
                                type: "engineering-and-architecture"    
                            }, () => {
                                this.handleRedirectAndSelection();
                            })
                        }}>
                        <Left>
                            <Text style={styles.whiteText}>Electronic Engineering</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "#0057ff" }} name="arrow-forward" />
                        </Right>
                        </ListItem>
                        <ListItem button={true} onPress={() => {
                            this.setState({
                                task: "Energy Engineering",
                                type: "engineering-and-architecture"    
                            }, () => {
                                this.handleRedirectAndSelection();
                            })
                        }}>
                        <Left>
                            <Text style={styles.whiteText}>Energy Engineering</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "#0057ff" }} name="arrow-forward" />
                        </Right>
                        </ListItem>
                        <ListItem button={true} onPress={() => {
                            this.setState({
                                task: "Interior Design",
                                type: "engineering-and-architecture"    
                            }, () => {
                                this.handleRedirectAndSelection();
                            })
                        }}>
                        <Left>
                            <Text style={styles.whiteText}>Interior Design</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "#0057ff" }} name="arrow-forward" />
                        </Right>
                        </ListItem>
                        <ListItem button={true} onPress={() => {
                            this.setState({
                                task: "Landscape Architecture",
                                type: "engineering-and-architecture"    
                            }, () => {
                                this.handleRedirectAndSelection();
                            })
                        }}> 
                        <Left>
                            <Text style={styles.whiteText}>Landscape Architecture</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "#0057ff" }} name="arrow-forward" />
                        </Right>
                        </ListItem>
                        <ListItem button={true} onPress={() => {
                            this.setState({
                                task: "Logistics & Supply Chain Management",
                                type: "engineering-and-architecture"    
                            }, () => {
                                this.handleRedirectAndSelection();
                            })
                        }}>
                        <Left>
                            <Text style={styles.whiteText}>Logistics & Supply Chain Management</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "#0057ff" }} name="arrow-forward" />
                        </Right>
                        </ListItem>
                        <ListItem button={true} onPress={() => {
                            this.setState({
                                task: "Mathematics",
                                type: "engineering-and-architecture"    
                            }, () => {
                                this.handleRedirectAndSelection();
                            })
                        }}>
                        <Left>
                            <Text style={styles.whiteText}>Mathematics</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "#0057ff" }} name="arrow-forward" />
                        </Right>
                        </ListItem>
                        <ListItem button={true} onPress={() => {
                            this.setState({
                                task: "Mechanical Engineering",
                                type: "engineering-and-architecture"    
                            }, () => {
                                this.handleRedirectAndSelection();
                            })
                        }}>
                        <Left>
                            <Text style={styles.whiteText}>Mechanical Engineering</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "#0057ff" }} name="arrow-forward" />
                        </Right>
                        </ListItem>
                        <ListItem button={true} onPress={() => {
                            this.setState({
                                task: "Physics",
                                type: "engineering-and-architecture"    
                            }, () => {
                                this.handleRedirectAndSelection();
                            })
                        }}>
                        <Left>
                            <Text style={styles.whiteText}>Physics</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "#0057ff" }} name="arrow-forward" />
                        </Right>
                        </ListItem>
                        <ListItem button={true} onPress={() => {
                            this.setState({
                                task: "Sourcing & Procurment",
                                type: "engineering-and-architecture"    
                            }, () => {
                                this.handleRedirectAndSelection();
                            })
                        }}>
                        <Left>
                            <Text style={styles.whiteText}>Sourcing & Procurment</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "#0057ff" }} name="arrow-forward" />
                        </Right>
                        </ListItem>
                        <ListItem button={true} onPress={() => {
                            this.setState({
                                task: "STEM Tutoring",
                                type: "engineering-and-architecture"    
                            }, () => {
                                this.handleRedirectAndSelection();
                            })
                        }}>
                        <Left>
                            <Text style={styles.whiteText}>STEM Tutoring</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "#0057ff" }} name="arrow-forward" />
                        </Right>
                        </ListItem>
                        <ListItem button={true} onPress={() => {
                            this.setState({
                                task: "Structural Engineering",
                                type: "engineering-and-architecture"    
                            }, () => {
                                this.handleRedirectAndSelection();
                            })
                        }}>
                        <Left>
                            <Text style={styles.whiteText}>Structural Engineering</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "#0057ff" }} name="arrow-forward" />
                        </Right>
                        </ListItem>
                        <ListItem button={true} onPress={() => {
                            this.setState({
                                task: "Trade Show Design",
                                type: "engineering-and-architecture"    
                            }, () => {
                                this.handleRedirectAndSelection();
                            })
                        }}>
                        <Left>
                            <Text style={styles.whiteText}>Trade Show Design</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "#0057ff" }} name="arrow-forward" />
                        </Right>
                        </ListItem>
                    </List>
                );
                break;
            default:
                break;
        }
    }
    handleRedirectAndSelection = () => {
        console.log("handleRedirectAndSelection clicked");

        const { task } = this.state;

        this.props.addJobData({
            ...this.props.data,
            task,
            page: 3
        });

        setTimeout(() => {
            this.props.props.navigation.replace("type-of-project-screening");
        }, 750)
    }
    restart = () => {
        console.log("restart");

        this.props.addJobData({
            page: 1
        })

        setTimeout(() => {
            this.props.props.navigation.replace("start-a-project-hiring");
        }, 750)
    }
    render() {
        return (
            <Fragment>
                <Header style={{ backgroundColor: "#303030" }}>
                    <Left>
                        <Button onPress={() => {
                            this.props.props.navigation.goBack();
                        }} transparent>
                            <Image source={require("../../../../assets/icons/go-back.png")} style={[styles.headerIcon, { tintColor: "#ffffff" }]} />
                        </Button>
                    </Left>
                <Body>
                    <Title style={styles.goldText}>Post Job</Title>
                    <Subtitle style={styles.goldText}>Select your category</Subtitle>
                </Body>
                    <Right>
                        <Button transparent onPress={this.restart}>
                            <Text style={styles.whiteText}>Restart Process</Text>
                        </Button>
                    </Right>
                </Header>
                <Progress.Bar color={"#0057ff"} unfilledColor={"#ffffff"} progress={0.30} width={width} />
                <ScrollView contentContainerStyle={{ paddingBottom: 100 }} style={styles.container}>
                    <Text style={styles.headerText}>Select which category best matches your interests</Text>
                    {this.renderMainContent()}
                </ScrollView>
            </Fragment>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        category: state.jobData.data.category,
        data: state.jobData.data
    };
}
export default connect(mapStateToProps, { addJobData })(CreateJobListingTypeHelper);