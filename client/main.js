import React, { Component } from 'react';
import App from "./App.js";
import { store, persistor } from "./store/store.js";
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/lib/integration/react';
import Loading from "./loading.js";
import { GoogleSignin } from '@react-native-community/google-signin';
import * as Sentry from "@sentry/react-native";


GoogleSignin.configure({ iosClientId: '' });

class MainComponent extends Component {
constructor(props) {
	super(props);

}
	componentDidMount() {
		Sentry.init({
			dsn: "https://3bd0f2fdf3464716800ab7da6f5d2e9b@o939496.ingest.sentry.io/5889542",
		});
	}
	render() {
		return (
			<Provider store={store}>
				<PersistGate loading={<Loading />} persistor={persistor}>
						<App />
				</PersistGate>
			</Provider>
		);
	}
}
export default MainComponent;