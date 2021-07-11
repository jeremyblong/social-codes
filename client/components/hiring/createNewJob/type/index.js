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
                            <Text>AR/VR Development</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "darkred" }} name="arrow-forward" />
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
                            <Text>Automation Testing</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "darkred" }} name="arrow-forward" />
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
                            <Text>Back-End Development</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "darkred" }} name="arrow-forward" />
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
                            <Text>CMS Development</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "darkred" }} name="arrow-forward" />
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
                            <Text>Coding Tutoring</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "darkred" }} name="arrow-forward" />
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
                            <Text>Database Development</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "darkred" }} name="arrow-forward" />
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
                            <Text>Desktop Software Development</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "darkred" }} name="arrow-forward" />
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
                            <Text>Ecommerce Development</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "darkred" }} name="arrow-forward" />
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
                            <Text>Emerging Tech</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "darkred" }} name="arrow-forward" />
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
                            <Text>Firmware Development</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "darkred" }} name="arrow-forward" />
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
                            <Text>Front-End Development</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "darkred" }} name="arrow-forward" />
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
                            <Text>Full-Stack Development</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "darkred" }} name="arrow-forward" />
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
                            <Text>Game Development</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "darkred" }} name="arrow-forward" />
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
                            <Text>Manual Testing</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "darkred" }} name="arrow-forward" />
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
                            <Text>Mobile App Development</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "darkred" }} name="arrow-forward" />
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
                            <Text>Mobile Design</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "darkred" }} name="arrow-forward" />
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
                            <Text>Mobile Game Development</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "darkred" }} name="arrow-forward" />
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
                            <Text>Product Management</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "darkred" }} name="arrow-forward" />
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
                            <Text>Prototyping</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "darkred" }} name="arrow-forward" />
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
                            <Text>Scripting & Automation</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "darkred" }} name="arrow-forward" />
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
                            <Text>Scrum Master</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "darkred" }} name="arrow-forward" />
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
                            <Text>User Research</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "darkred" }} name="arrow-forward" />
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
                            <Text>Web Design</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "darkred" }} name="arrow-forward" />
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
                            <Text>UI/UX Design</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "darkred" }} name="arrow-forward" />
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
                            <Text>iPhone/iPad App (iOS ONLY)</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "darkred" }} name="arrow-forward" />
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
                            <Text>Android App</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "darkred" }} name="arrow-forward" />
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
                            <Text>Responsive Website (Mobile & Desktop)</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "darkred" }} name="arrow-forward" />
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
                            <Text>Mobile Website (Mobile only)</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "darkred" }} name="arrow-forward" />
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
                            <Text>React Native (iOS & Android simultaniously)</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "darkred" }} name="arrow-forward" />
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
                            <Text>I need an existing mobile app FIXED</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "darkred" }} name="arrow-forward" />
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
                            <Text>I need an existing mobile app RE-DONE</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "darkred" }} name="arrow-forward" />
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
                            <Text>Write some articles/blogs</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "darkred" }} name="arrow-forward" />
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
                            <Text>Research writing</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "darkred" }} name="arrow-forward" />
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
                            <Text>Content writing</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "darkred" }} name="arrow-forward" />
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
                            <Text>Translate something</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "darkred" }} name="arrow-forward" />
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
                            <Text>Write a report</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "darkred" }} name="arrow-forward" />
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
                            <Text>Copywriting</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "darkred" }} name="arrow-forward" />
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
                            <Text>Career Coaching</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "darkred" }} name="arrow-forward" />
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
                            <Text>Writing Tutoring</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "darkred" }} name="arrow-forward" />
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
                            <Text>Editing & Proofreading</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "darkred" }} name="arrow-forward" />
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
                            <Text>Creative Writing</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "darkred" }} name="arrow-forward" />
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
                            <Text>Business Writing</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "darkred" }} name="arrow-forward" />
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
                            <Text>Other or not sure</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "darkred" }} name="arrow-forward" />
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
                            <Text>Reactive Machines</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "darkred" }} name="arrow-forward" />
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
                            <Text>Limited Memory</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "darkred" }} name="arrow-forward" />
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
                            <Text>Theory of Mind</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "darkred" }} name="arrow-forward" />
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
                            <Text>Image Classification</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "darkred" }} name="arrow-forward" />
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
                            <Text>Theory of Mind</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "darkred" }} name="arrow-forward" />
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
                            <Text>Self-aware</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "darkred" }} name="arrow-forward" />
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
                            <Text>Artificial Narrow Intelligence (ANI)</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "darkred" }} name="arrow-forward" />
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
                            <Text>Artificial General Intelligence (AGI)</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "darkred" }} name="arrow-forward" />
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
                            <Text>Artificial Superintelligence (ASI)</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "darkred" }} name="arrow-forward" />
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
                            <Text>Design a video AD</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "darkred" }} name="arrow-forward" />
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
                            <Text>Design a logo</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "darkred" }} name="arrow-forward" />
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
                            <Text>3D Animations</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "darkred" }} name="arrow-forward" />
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
                            <Text>Animated GIF's</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "darkred" }} name="arrow-forward" />
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
                            <Text>Product Photography</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "darkred" }} name="arrow-forward" />
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
                            <Text>Short Video Ad's</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "darkred" }} name="arrow-forward" />
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
                            <Text>Logo Animations</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "darkred" }} name="arrow-forward" />
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
                            <Text>Charector Animation</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "darkred" }} name="arrow-forward" />
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
                            <Text>Hire a multi-media artist/animator</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "darkred" }} name="arrow-forward" />
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
                            <Text>Hire a video game tester</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "darkred" }} name="arrow-forward" />
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
                            <Text>Hire a game developer (coder)</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "darkred" }} name="arrow-forward" />
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
                            <Text>Hire First-party developers</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "darkred" }} name="arrow-forward" />
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
                            <Text>Second-party developers</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "darkred" }} name="arrow-forward" />
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
                            <Text>Third-party developers</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "darkred" }} name="arrow-forward" />
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
                            <Text>Indie game developers</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "darkred" }} name="arrow-forward" />
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
                            <Text>Business Applications Development</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "darkred" }} name="arrow-forward" />
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
                            <Text>Cloud Engineering</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "darkred" }} name="arrow-forward" />
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
                            <Text>Dev-Ops Engineering</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "darkred" }} name="arrow-forward" />
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
                            <Text>Information Security</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "darkred" }} name="arrow-forward" />
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
                            <Text>IT Compliance</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "darkred" }} name="arrow-forward" />
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
                            <Text>IT Support</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "darkred" }} name="arrow-forward" />
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
                            <Text>Network Administration</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "darkred" }} name="arrow-forward" />
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
                            <Text>Network Security</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "darkred" }} name="arrow-forward" />
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
                            <Text>Solutions Achitecture</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "darkred" }} name="arrow-forward" />
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
                            <Text>Systems Administration</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "darkred" }} name="arrow-forward" />
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
                            <Text>System Engineering</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "darkred" }} name="arrow-forward" />
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
                            <Text>Language Localization</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "darkred" }} name="arrow-forward" />
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
                            <Text>Language Tutoring</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "darkred" }} name="arrow-forward" />
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
                            <Text>Legal Translation</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "darkred" }} name="arrow-forward" />
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
                            <Text>Medical Transportation</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "darkred" }} name="arrow-forward" />
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
                            <Text>Technical Translation</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "darkred" }} name="arrow-forward" />
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
                            <Text>Translation</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "darkred" }} name="arrow-forward" />
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
                            <Text>Brand Strategy</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "darkred" }} name="arrow-forward" />
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
                            <Text>Campaign Management</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "darkred" }} name="arrow-forward" />
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
                            <Text>Community Management</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "darkred" }} name="arrow-forward" />
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
                            <Text>Content Strategy</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "darkred" }} name="arrow-forward" />
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
                            <Text>Digital Marketing</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "darkred" }} name="arrow-forward" />
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
                            <Text>Email Marketing</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "darkred" }} name="arrow-forward" />
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
                            <Text>Lead Generation</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "darkred" }} name="arrow-forward" />
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
                            <Text>Market Research</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "darkred" }} name="arrow-forward" />
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
                            <Text>Marketing Automation</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "darkred" }} name="arrow-forward" />
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
                            <Text>Marketing Strategy</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "darkred" }} name="arrow-forward" />
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
                            <Text>Public Relations</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "darkred" }} name="arrow-forward" />
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
                            <Text>Sales & Business Development</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "darkred" }} name="arrow-forward" />
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
                            <Text>Search Engine Marketing</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "darkred" }} name="arrow-forward" />
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
                            <Text>Search Engine Optimization</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "darkred" }} name="arrow-forward" />
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
                            <Text>Social Media Marketing</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "darkred" }} name="arrow-forward" />
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
                            <Text>Social Media Strategy</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "darkred" }} name="arrow-forward" />
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
                            <Text>Telemarketing</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "darkred" }} name="arrow-forward" />
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
                            <Text>Business & Corperate Law</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "darkred" }} name="arrow-forward" />
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
                            <Text>General Counsel</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "darkred" }} name="arrow-forward" />
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
                            <Text>Immigration Law</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "darkred" }} name="arrow-forward" />
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
                            <Text>Intellectual Property Law</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "darkred" }} name="arrow-forward" />
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
                            <Text>International Law</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "darkred" }} name="arrow-forward" />
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
                            <Text>Labor & Employment Law</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "darkred" }} name="arrow-forward" />
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
                            <Text>Paralegal</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "darkred" }} name="arrow-forward" />
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
                            <Text>Regulatory Law</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "darkred" }} name="arrow-forward" />
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
                            <Text>Securities & Finance Law</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "darkred" }} name="arrow-forward" />
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
                            <Text>Taw Law</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "darkred" }} name="arrow-forward" />
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
                            <Text>Social Media Marketing</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "darkred" }} name="arrow-forward" />
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
                            <Text>Social Media Advertising</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "darkred" }} name="arrow-forward" />
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
                            <Text>SEO</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "darkred" }} name="arrow-forward" />
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
                            <Text>Ecommerce Marketing</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "darkred" }} name="arrow-forward" />
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
                            <Text>Display Advertising</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "darkred" }} name="arrow-forward" />
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
                            <Text>Public Relations</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "darkred" }} name="arrow-forward" />
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
                            <Text>Crowdfunding</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "darkred" }} name="arrow-forward" />
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
                            <Text>Web Analytics</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "darkred" }} name="arrow-forward" />
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
                            <Text>Influencer Marketing</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "darkred" }} name="arrow-forward" />
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
                            <Text>Text Message Marketing</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "darkred" }} name="arrow-forward" />
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
                            <Text>SEM</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "darkred" }} name="arrow-forward" />
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
                            <Text>Mobile App Marketing</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "darkred" }} name="arrow-forward" />
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
                            <Text>Affiliate Marketing</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "darkred" }} name="arrow-forward" />
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
                            <Text>Domain Research</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "darkred" }} name="arrow-forward" />
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
                            <Text>Music Promotion</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "darkred" }} name="arrow-forward" />
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
                            <Text>Book & Ebook Marketing</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "darkred" }} name="arrow-forward" />
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
                            <Text>Podcast Marketing</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "darkred" }} name="arrow-forward" />
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
                            <Text>Surveys</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "darkred" }} name="arrow-forward" />
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
                            <Text>Local SEO</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "darkred" }} name="arrow-forward" />
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
                            <Text>3-D Modeling & Rendering</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "darkred" }} name="arrow-forward" />
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
                            <Text>Architecture</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "darkred" }} name="arrow-forward" />
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
                            <Text>Biology</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "darkred" }} name="arrow-forward" />
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
                            <Text>Building Information Modeling</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "darkred" }} name="arrow-forward" />
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
                            <Text>CAD</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "darkred" }} name="arrow-forward" />
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
                            <Text>Chemical & Process Engineering</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "darkred" }} name="arrow-forward" />
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
                            <Text>Chemistry</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "darkred" }} name="arrow-forward" />
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
                            <Text>Civil Engineering</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "darkred" }} name="arrow-forward" />
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
                            <Text>Electrical Engineering</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "darkred" }} name="arrow-forward" />
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
                            <Text>Electronic Engineering</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "darkred" }} name="arrow-forward" />
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
                            <Text>Energy Engineering</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "darkred" }} name="arrow-forward" />
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
                            <Text>Interior Design</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "darkred" }} name="arrow-forward" />
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
                            <Text>Landscape Architecture</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "darkred" }} name="arrow-forward" />
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
                            <Text>Logistics & Supply Chain Management</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "darkred" }} name="arrow-forward" />
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
                            <Text>Mathematics</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "darkred" }} name="arrow-forward" />
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
                            <Text>Mechanical Engineering</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "darkred" }} name="arrow-forward" />
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
                            <Text>Physics</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "darkred" }} name="arrow-forward" />
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
                            <Text>Sourcing & Procurment</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "darkred" }} name="arrow-forward" />
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
                            <Text>STEM Tutoring</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "darkred" }} name="arrow-forward" />
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
                            <Text>Structural Engineering</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "darkred" }} name="arrow-forward" />
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
                            <Text>Trade Show Design</Text>
                        </Left>
                        <Right>
                            <Icon style={{ color: "darkred" }} name="arrow-forward" />
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
                            <Image source={require("../../../../assets/icons/go-back.png")} style={[styles.headerIcon, { tintColor: "#fdd530" }]} />
                        </Button>
                    </Left>
                <Body>
                    <Title style={styles.goldText}>Post Job</Title>
                    <Subtitle style={styles.goldText}>Select your category</Subtitle>
                </Body>
                    <Right>
                        <Button transparent onPress={this.restart}>
                            <Text style={styles.goldText}>Restart Process</Text>
                        </Button>
                    </Right>
                </Header>
                <Progress.Bar color={"#ffd530"} unfilledColor={"lightgrey"} progress={0.30} width={width} />
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