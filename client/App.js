import React, { Component, Fragment } from 'react';
global.Symbol = require('core-js/es6/symbol');
require('core-js/fn/symbol/iterator');
// collection fn polyfills
require('core-js/fn/map');
require('core-js/fn/set');
require('core-js/fn/array/find');
import { View, Dimensions, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { connect } from "react-redux";
import axios from "axios";
import { navigationRef } from "./RootNavigation.js";
import Config from "react-native-config";
import uuid from "react-native-uuid";
import IntroSlider from "./components/intro/intro.js";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import GetLocation from 'react-native-get-location';
import io from 'socket.io-client';
import PushNotification from "react-native-push-notification";
import messaging from '@react-native-firebase/messaging';
import Toast from 'react-native-toast-message';
import UserInactivity from 'react-native-user-inactivity';
import _ from "lodash";
import BackgroundGeolocation from "react-native-background-geolocation";
import { saveUsersLocation, gatherLocationOnLoad } from "./actions/location/location.js";
import MainHomepagePage from "./pages/homepage/main.js";
import AuthenticationPanelPage from "./pages/auth/main.js";
import { Root } from "native-base";
import ChooseUsernamePage from "./pages/auth/username/choose.js";
import AccountTypeChoosePage from "./pages/auth/accountType/index.js";
import EmailCreationPage from "./pages/auth/email/email.js";
import EmailConfirmationPage from "./pages/auth/confirmation/index.js";
import PersonalDetailsPage from "./pages/auth/personal/details.js";
import HomepageMainHelper from "./pages/homepage/main/mainHomepage.js";
import NavigationMainPage from "./pages/navigation/menu/mainMenu.js";
import ProfileMainSettingsPage from "./pages/profile/main/index.js";
import MoreInformationPage from "./pages/auth/google/details/moreInformation.js";
import PublicProfilePage from "./pages/profile/public/profile/index.js";
import StartPorfolioAddProjectPage from "./pages/portfolio/create/start/index.js";
import RecordProfilePictureVideoPage from "./pages/profile/mainProfileDisplay/uploadVideoDisplay/recordVideo.js";
import CategoryStartJobCreationPage from "./pages/hiring/createNewJob/category/index.js";
import BasicInfoStartJobListingPage from "./pages/hiring/createNewJob/basicInfo/index.js";
import CreateJobListingTypePage from "./pages/hiring/createNewJob/type/index.js";
import TypeOfProjectAndScreeningPage from "./pages/hiring/createNewJob/typeAndScreening/index.js";
import SkillsAndMoreInformationPage from "./pages/hiring/createNewJob/skillsAndMore/index.js";
import VisibilityAndQuantityPage from "./pages/hiring/createNewJob/visibilityAndQuantity/index.js";
import PaymentsAndMorePage from "./pages/hiring/createNewJob/paymentsAndMore/index.js";
import ReviewJobDetailsPage from "./pages/hiring/createNewJob/review/index.js";
import JobsHomepageDisplayPage from "./pages/jobs/homepage/index.js";
import ViewCoverPhotosPage from "./pages/profile/public/coverPhotos/index.js";
import MessagingHomeChannelsPage from "./pages/messaging/conversations/index.js";
import IndividualThreadMessagingPage from "./pages/messaging/individual/individualThread.js";
import { CometChat } from "@cometchat-pro/react-native-chat";
import PeopleBrowseListPage from "./pages/people/list/index.js";
import PublicProfileOtherUserPage from "./pages/people/profile/publicProfile.js";
import ViewProfilePicsPage from "./pages/profile/public/viewProfilePics/index.js";
import PaymentMainPage from "./pages/account/payments/index.js";
import EditPaymentMethodsPage from "./pages/account/payments/paymentMethods/index.js";
import PaymentCardAddNewPage from "./pages/account/payments/create/paymentCardCreate.js";
import AddCardPage from "./pages/account/payments/create/addCard.js";
import CreditsHomepagePage from "./pages/account/payments/credits/index.js";
import PayoutsHomepagePage from "./pages/account/payments/payouts/index.js";
import PayoutMethodAddNewPayoutPage from "./pages/account/payments/payouts/addNew/addNewPayoutMethod.js";
import PayoutsManageOptionsMainPage from "./pages/account/payments/payouts/options/main.js";
import BankTransferBeginPage from "./pages/account/payments/payouts/addNew/bankTransfer/index.js";
import BankAccountInfoPage from "./pages/account/payments/payouts/addNew/bankInfo/index.js";
import IndividualCreditDebitCardPage from "./pages/account/payments/paymentMethods/individual/index.js";
import VideoIntroductionPage from "./pages/profile/introduction/videoIntroduction.js";
import EmploymentHistoryCreatePage from "./pages/profile/public/employmentHistory/index.js";
import DisplayFormatPortfolioPage from "./pages/portfolio/create/format/index.js";
import JobIndividualPage from "./pages/jobs/individual/index.js";
import MoreInformationPortfolioPage from "./pages/portfolio/create/moreInfo/index.js";
import ReviewPortfolioPage from "./pages/portfolio/create/review/review.js";
import IndividualPortfolioPage from "./pages/portfolio/individual/index.js";
import BoostHomepagePage from "./pages/boost/main/index.js";
import TokensMainPage from "./pages/tokens/main.js";
import NotificationsMainPage from "./pages/notifications/index.js";
import FriendsListHomepageMenuPage from "./pages/friends/index.js";
import PendingFriendsListPage from "./pages/friends/pending/index.js";
import ViewAlreadyAcceptedFriendsPage from "./pages/friends/accepted/index.js";
import PreviousProposalsAppliedPage from "./pages/proposals/previous/index.js";
import ManageApplicantsPage from "./pages/applicants/manage/manageApplicants.js";
import IndividualJobManagement from "./components/applicants/manage/individual.js";
import ProposalsAndMoreMainPage from "./pages/proposalsAndMore/menu/index.js";
import AlreadySubmittedProposalsTwoPage from "./pages/proposalsAndMore/submittedProposals/index.js";
import InvitationsJobManagementPage from "./pages/proposalsAndMore/invitations/index.js";
import InterviewScheduleCallPage from "./pages/interviews/schedule/index.js";
import InterviewScheduleTimePage from "./pages/interviews/schedule/time/index.js";
import ConfirmationPagePage from "./pages/interviews/schedule/confirmation/index.js";
import VideoConferencingHomepagePage from "./pages/interviews/menu/index.js";
import ActivateVideoCallPage from "./pages/interviews/activate/index.js";
import LiveVideoPeerToPeerPage from "./pages/interviews/video/liveVideo.js";
import IndividualWallPostingPage from "./pages/homepage/main/individualWallPost/individual.js";
import CreateHoursMainPage from "./pages/profile/hours/create/createHoursMain.js";
import DisplayEducationListPage from "./pages/profile/hours/display/displayEducation.js";
import ForumLandingHomepageConditionalPage from "./pages/forums/main/landing/forumLanding.js";
import InitialAskQuestionPage from "./pages/forums/createPost/initial/index.js";
import ForumListingIndividualPage from "./pages/forums/individual/individualListing/forumListing.js";
import HomeActiveGigsDashboardHelper from "./pages/activeGigs/home/index.js";
import IndividualGigManagePage from "./pages/activeGigs/individual/index.js";
import ActiveJobsMainPageHelperPage from "./pages/activeGigs/active/listOfJobs/index.js";
import IndividualActiveJobPage from "./pages/activeGigs/active/individual/index.js";
import { Notifications } from 'react-native-notifications';
import StripeOnboardingRegisterPage from "./pages/auth/onboarding/stripeOnboarding.js";
import ViewJobActiveClientFreelancerHelper from "./pages/activeGigs/freelancer/individualGig/index.js";
import * as Sentry from "@sentry/react-native";
import CompletedGigsListPage from "./pages/completedGigs/main/index.js";
import SplashScreen from 'react-native-splash-screen';

const { width, height } = Dimensions.get("window");

const Stack = createStackNavigator();

const socket = io(Config.ngrok_url, {transports: ['websocket', 'polling', 'flashsocket']});

const isEmpty = (obj) => {
  for(var prop in obj) {
    if(obj.hasOwnProperty(prop)) {
      return false;
    }
  }

  return JSON.stringify(obj) === JSON.stringify({});
} 

class App extends Component {
constructor(props) {
  super(props);
  

  this.state = {
    data: null,
    count: 0
  }
}
  getStartingPage = () => {
    const { authData, introCompleted, authenticated } = this.props;
    
    if (authenticated === true) {
      if (introCompleted === true) {
        if (isEmpty(authData)) {
          return "homepage-main";
        } else {
          return "homepage";
        }
      } else {
        return "intro";
      }
    } else {
      return "homepage-main";
    }
  }
  handleWalkingUpdate = (location) => {
    console.log("walking", location);
  }
  handleDrivingLocationUpdate = (location) => {
    console.log("handleDrivingLocationUpdate", location);

    axios.post(`${Config.ngrok_url}/update/location/geo`, {
      id: this.props.unique_id,
      location
    }).then((res) => {
      if (res.data.message === "Successfully updated location") {
        console.log(res.data);

        this.setState({
          count: 0
        })
      } else {
        console.log("err", res.data);
        this.setState({
          count: 0
        })
      }
    }).catch((err) => {
      console.log(err);

      this.setState({
        count: 0
      })
    })

    if (this.state.count >= 10) {
      this.setState({
        count: 0
      })
    }
  }
  //  componentWillUnmount() {
  //     BackgroundGeolocation.removeListeners();
  // }
  onLocation = (location) => {
    console.log('[location] -', location);

    console.log(location.coords.speed);

    if (this.props.unique_id !== null) {
      this.setState((prevState, props) => ({
        count: prevState.count + 1
      }), () => {
        if (this.state.count >= 10) {
          this.setState({
            count: 0
          })
        } else {
          if (location.coords.speed < 4) {
            // run only every 12 cycles
            console.log("run only every 4 cycles")
            if (this.state.count === 4) {

              this.props.saveUsersLocation({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude
              })

              this.handleDrivingLocationUpdate(location);
            }
          } else if (4 <= location.coords.speed && location.coords.speed <= 9) {
            // run only every 9 cycles
              console.log("run only every 5 cycles")
            if (this.state.count === 5) {

              this.props.saveUsersLocation({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude
              })

              this.handleDrivingLocationUpdate(location);
            }
          } else if (10 <= location.coords.speed && location.coords.speed <= 15) {
            console.log("run only every 6 cycles")
            if (this.state.count === 6) {

              this.props.saveUsersLocation({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude
              })

              this.handleDrivingLocationUpdate(location);
            }
            // run only every 8 cycles
          } else if (16 <= location.coords.speed && location.coords.speed <= 25) {
            console.log("run only every 7 cycles")
            // run only every 6 cycles
            if (this.state.count === 7) {

              this.props.saveUsersLocation({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude
              })

              this.handleDrivingLocationUpdate(location);
            }
          } else {
            console.log("run only every 8 cycles", this.state.count);
    
            if (this.state.count === 8) {

              this.props.saveUsersLocation({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude
              })

              this.handleDrivingLocationUpdate(location);
            }
            // run only every 4 cycles
          }
        }
      });
    }
  }
  getFcmToken = async () => {
		const fcmToken = await messaging().getToken();
		if (fcmToken) {
			console.log(fcmToken);
			console.log("Your Firebase Token is:", fcmToken);
			
			axios.post(`${Config.ngrok_url}/save/firebase/token`, {
				token: fcmToken,
				unique_id: this.props.unique_id
			}).then((res) => {
				if (res.data.message === "Saved firebase token!") {
					console.log(res.data);
				} else {
					console.log("err", res.data);
				}
			}).catch((err) => {
				console.log(err);
			})
		} else {
		 console.log("Failed", "No token received");
		}
	}
  onError = (error) => {
    console.warn('[location] ERROR -', error);
  }
  onActivityChange = (event) => {
    console.log('[activitychange] -', event);  // eg: 'on_foot', 'still', 'in_vehicle'

    switch (event.activity) {
      case "still": 
        // do nothing
        this.setState({
          interval: 0
        })
        break;
      case "on_foot":
        this.setState({
          interval: 8
        })
        break;
      case "in_vehicle": 
        this.setState({
          interval: 4
        })
      default:
        break;
    }
  }
  onProviderChange = (provider) => {
    console.log('[providerchange] -', provider.enabled, provider.status);
  }
  onMotionChange = (event) => {
    console.log('[motionchange] -', event.isMoving, event.location);
  }
  async componentDidMount () {

    SplashScreen.hide();

    const appID = Config.cometchat_app_id;
    console.log(appID);
    const region = "US";
    const appSetting = new CometChat.AppSettingsBuilder().subscribePresenceForAllUsers().setRegion(region).build();
    
    CometChat.init(appID, appSetting).then(
      () => {
        console.log("Initialization completed successfully");
        // You can now call login function.
      },
      error => {
        console.log("Initialization failed with error:", error);
        // Check the reason for error and take appropriate action.
      }
    );

    // This handler fires whenever bgGeo receives a location update.
    BackgroundGeolocation.onLocation(this.onLocation, this.onError);

    // This handler fires when movement states changes (stationary->moving; moving->stationary)
    BackgroundGeolocation.onMotionChange(this.onMotionChange);

    // This event fires when a change in motion activity is detected
    BackgroundGeolocation.onActivityChange(this.onActivityChange);

    // This event fires when the user toggles location-services authorization
    BackgroundGeolocation.onProviderChange(this.onProviderChange);

    ////
    // 2.  Execute #ready method (required)
    //
    BackgroundGeolocation.ready({
      // Geolocation Config
      desiredAccuracy: BackgroundGeolocation.DESIRED_ACCURACY_HIGH,
      distanceFilter: 10,
      // Activity Recognition
      stopTimeout: 1,
      // Application config
      debug: true, // <-- enable this hear sounds for background-geolocation life-cycle.
      logLevel: BackgroundGeolocation.LOG_LEVEL_VERBOSE,
      stopOnTerminate: false,   // <-- Allow the background-service to continue tracking when user closes the app.
      startOnBoot: true,        // <-- Auto start tracking when device is powered-up.
      // HTTP / SQLite config
      url: 'https://socialcodes.ngrok.io',
      batchSync: false,       // <-- [Default: false] Set true to sync locations to server in a single HTTP request.
      autoSync: true,         // <-- [Default: true] Set true to sync each location to server as it arrives.
      headers: {              // <-- Optional HTTP headers
        "X-FOO": "bar"
      },
      params: {               // <-- Optional HTTP params
        "auth_token": "maybe_your_server_authenticates_via_token_YES?"
      }
    }, (state) => {
      
      console.log("- BackgroundGeolocation is configured and ready: ", state.enabled);

      if (state.enabled) {
        ////
        // 3. Start tracking!
        //
        BackgroundGeolocation.start(() => {
          console.log("- Start success");
        });
      }
    });
    
    this.getFcmToken();

    /* Success */
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log("Notification when app is on foreground", remoteMessage);

      Notifications.postLocalNotification({
        body: remoteMessage.notification.body,
        title: remoteMessage.notification.title,
        sound: "chime.aiff",
        alertAction: "Slide to open :)",
        silent: false,
        userInfo: {},
        fireDate: new Date()
    });

      Toast.show({
        text1: remoteMessage.notification.title,
        text2: remoteMessage.notification.body,
        visibilityTime: 6500,
        type: "success"
      });
    });
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);

      const generated = uuid.v4();

      PushNotification.createChannel(
        {
          channelId: generated, // (required)
          channelName: generated, // (required)
          soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
          importance: 4, // (optional) default: 4. Int value of the Android notification importance
          vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
        }, (created) => {
          console.log(`createChannel returned '${created}'`);

          PushNotification.localNotification({
            /* Android Only Properties */
            channelId: generated, // (required) channelId, if the channel doesn't exist, notification will not trigger.
            bigText: remoteMessage.notification.title, // (optional) default: "message" prop
            subText: remoteMessage.notification.body
          });
        }
      );
    });
    /* Success */
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log('Notification caused app to open from background state:', remoteMessage);

      // this.props.navigation.navigate(remoteMessage.data.dl);
      this.props.checkToNavigatePushNotification({
        redirect: true,
        route: remoteMessage.data.dl
      })
    });

    /* Success */
    messaging().getInitialNotification().then(remoteMessage => {
      if (remoteMessage) {
        console.log('Notification caused app to open from quit state:', remoteMessage);
      }
    });
    
    GetLocation.getCurrentPosition({
			enableHighAccuracy: true,
			timeout: 15000,
		})
		.then(location => {
			console.log("location :", location);

			this.props.gatherLocationOnLoad(location);
		})
		.catch(error => {
			const { code, message } = error;
			console.warn(code, message);
		})
  }
  render () {
    console.log("this.state APP.js", this.state);
    return (
      <>
        <View style={{ flex: 1 }}> 
        <UserInactivity
						timeForInactivity={360000}
						onAction={isActive => { 
							console.log("isActive", isActive); 

              if (isActive === false) {
                console.log("active === false");
              } 
						}}
            style={{ flex: 1 }}
					>
          <Root>
          <NavigationContainer ref={(ref) => this.navigationRef = ref}> 
            <Stack.Navigator screenOptions={{
                headerShown: false
              }} initialRouteName={this.getStartingPage()}>
              <Stack.Screen name="intro" component={IntroSlider} />
              <Stack.Screen name="homepage-main" component={MainHomepagePage} />
              <Stack.Screen name="homepage" component={HomepageMainHelper} />
              <Stack.Screen name="auth-main" component={AuthenticationPanelPage} />
              <Stack.Screen name="choose-username" component={ChooseUsernamePage} />
              <Stack.Screen name="account-type" component={AccountTypeChoosePage} />
              <Stack.Screen name="create-email-signup" component={EmailCreationPage} />
              <Stack.Screen name="email-confirmation" component={EmailConfirmationPage} />
              <Stack.Screen name="personal-details" component={PersonalDetailsPage} />
              <Stack.Screen name="navigation-menu-main" component={NavigationMainPage} />
              <Stack.Screen name="profile-settings-main" component={ProfileMainSettingsPage} />
              <Stack.Screen name="create-secondary-information-google-signin" component={MoreInformationPage} />
              <Stack.Screen name="public-profile-main" component={PublicProfilePage} />
              <Stack.Screen name="add-portfolio-project" component={StartPorfolioAddProjectPage} />
              <Stack.Screen name="record-profile-picture-video" component={RecordProfilePictureVideoPage} />
              <Stack.Screen name="start-a-project-hiring" component={CategoryStartJobCreationPage} />
              <Stack.Screen name="create-job-basic-info" component={BasicInfoStartJobListingPage} />
              <Stack.Screen name="list-a-job-type" component={CreateJobListingTypePage} />
              <Stack.Screen name="type-of-project-screening" component={TypeOfProjectAndScreeningPage} />
              <Stack.Screen name="skills-and-more-info" component={SkillsAndMoreInformationPage} />
              <Stack.Screen name="visibility-and-quanitity" component={VisibilityAndQuantityPage} />
              <Stack.Screen name="payments-and-more" component={PaymentsAndMorePage} />
              <Stack.Screen name="list-a-job-review" component={ReviewJobDetailsPage} />
              <Stack.Screen name="jobs-homepage" component={JobsHomepageDisplayPage} />
              <Stack.Screen name="cover-photos-view" component={ViewCoverPhotosPage} />
              <Stack.Screen name="messaging-conversations" component={MessagingHomeChannelsPage} />
              <Stack.Screen name="individual-message-thread" component={IndividualThreadMessagingPage} />
              <Stack.Screen name="people-list-all" component={PeopleBrowseListPage} />
              <Stack.Screen name="individual-profile-public" component={PublicProfileOtherUserPage} />
              <Stack.Screen name="view-all-profile-pictures" component={ViewProfilePicsPage} />
              <Stack.Screen name="payments-main" component={PaymentMainPage} />
              <Stack.Screen name="payments-cards" component={EditPaymentMethodsPage} /> 
              <Stack.Screen name="add-payment-card" component={PaymentCardAddNewPage} />
              <Stack.Screen name="create-payment" component={AddCardPage} /> 
              <Stack.Screen name="view-individual-card-info" component={IndividualCreditDebitCardPage} />
              <Stack.Screen name="credits-coupons" component={CreditsHomepagePage} />
              {/* <Stack.Screen name="payout-analytics-data" component={PaymentAnalyticsDashboardPage} /> */}
              <Stack.Screen name="payouts-main-homepage" component={PayoutsHomepagePage} />
              <Stack.Screen name="add-payout-method-new" component={PayoutMethodAddNewPayoutPage} />
              <Stack.Screen name="bank-account-start-verifcation" component={BankTransferBeginPage} />
              <Stack.Screen name="add-bank-account-payout-information" component={BankAccountInfoPage} />
              <Stack.Screen name="manage-payout-options-menu-main" component={PayoutsManageOptionsMainPage} />
              <Stack.Screen name="upload-video-introduction" component={VideoIntroductionPage} />
              <Stack.Screen name="employment-history-create" component={EmploymentHistoryCreatePage} />
              <Stack.Screen name="employment-create-display-format" component={DisplayFormatPortfolioPage} />
              <Stack.Screen name="view-job-individual" component={JobIndividualPage} />
              <Stack.Screen name="portfolio-project-more-info" component={MoreInformationPortfolioPage} />
              <Stack.Screen name="review-portfolio-project" component={ReviewPortfolioPage} />
              <Stack.Screen name="portfolio-item-individual" component={IndividualPortfolioPage} /> 
              <Stack.Screen name="purchase-boost" component={BoostHomepagePage} />
              <Stack.Screen name="purchase-tokens-homepage" component={TokensMainPage} />
              <Stack.Screen name="notifications" component={NotificationsMainPage} />
              <Stack.Screen name="friends-menu" component={FriendsListHomepageMenuPage} />
              <Stack.Screen name="friends-pending" component={PendingFriendsListPage} />
              <Stack.Screen name="accepted-friends" component={ViewAlreadyAcceptedFriendsPage} />
              <Stack.Screen name="previously-submitted-proposals" component={PreviousProposalsAppliedPage} />
              <Stack.Screen name="manage-applicants-jobs" component={ManageApplicantsPage} /> 
              <Stack.Screen name="view-applicants-per-job" component={IndividualJobManagement} />
              <Stack.Screen name="manage-all-active-proposal-related" component={ProposalsAndMoreMainPage} />
              <Stack.Screen name="already-submitted-proposals-menu" component={AlreadySubmittedProposalsTwoPage} />
              <Stack.Screen name="interview-start" component={InvitationsJobManagementPage} />
              <Stack.Screen name="start-video-call-page" component={InterviewScheduleCallPage} />
              <Stack.Screen name="setup-video-interview-time" component={InterviewScheduleTimePage} />
              <Stack.Screen name="confirmation-page-video-conference-scheduled" component={ConfirmationPagePage} />
              <Stack.Screen name="video-interview-calls-homepage" component={VideoConferencingHomepagePage} />
              <Stack.Screen name="activate-video-call-prescreen" component={ActivateVideoCallPage} />
              <Stack.Screen name="video-call-live-active-peer-to-peer-interview" component={LiveVideoPeerToPeerPage} />
              <Stack.Screen name="individual-wall-posting-view" component={IndividualWallPostingPage} />
              <Stack.Screen name="create-hours-profile-main" component={CreateHoursMainPage} />
              <Stack.Screen name="view-schooling-education-history-manage" component={DisplayEducationListPage} />
              <Stack.Screen name="forums-main" component={ForumLandingHomepageConditionalPage} />
              <Stack.Screen name="forums-create-post-initial-page" component={InitialAskQuestionPage} />
              <Stack.Screen name="individual-forum-post-visit" component={ForumListingIndividualPage} />
              <Stack.Screen name="active-live-gigs-in-progress" component={HomeActiveGigsDashboardHelper} />
              <Stack.Screen name="individual-active-gig-manage" component={IndividualGigManagePage} />
              <Stack.Screen name="active-live-jobs-main" component={ActiveJobsMainPageHelperPage} />
              <Stack.Screen name="active-job-individual-full-listing" component={IndividualActiveJobPage} />
              <Stack.Screen name="stripe-onboarding-authentication" component={StripeOnboardingRegisterPage} />
              <Stack.Screen name="client-freelancer-view-job-active" component={ViewJobActiveClientFreelancerHelper} />
              <Stack.Screen name="completed-gigs-list-homepage" component={CompletedGigsListPage} />
            </Stack.Navigator>
          </NavigationContainer>
          <Toast ref={(ref) => Toast.setRef(ref)} />
          </Root>
          </UserInactivity>
        </View> 
      </>
    );
 }
};
const styles = StyleSheet.create({

});
const mapStateToProps = (state) => {

  console.log("STATE!!!!:", state);

  if (state.signupData.authData) {
    if (isEmpty(state.signupData.authData)) {
      console.log("empty!");
      return {
        introCompleted: state.intro.completed,
        unique_id: null,
        authData: null
      }
    } else {
      console.log("Successfully ran props...!");
      return {
        introCompleted: state.intro.completed,
        authData: state.signupData.authData,
        authenticated: state.signupData.authenticated,
        unique_id: state.signupData.authData.unique_id
      }
    }
  } else {
    console.log("AuthData Doesn't exist...");
    return {
      introCompleted: state.intro.completed,
      authenticated: state.signupData.authenticated,
      unique_id: null
    };
  }
}
export default connect(mapStateToProps, { saveUsersLocation, gatherLocationOnLoad })(App);
