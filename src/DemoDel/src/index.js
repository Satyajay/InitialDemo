import React, { Component } from "react";
import { Alert, NetInfo } from "react-native";
import { Provider } from 'react-redux'
//import Permissions from 'react-native-permissions';
import configureStore from "./config/configureStore";
import Root from './Root';
//import configureClient, { destroySocketClient } from "./utilities/SocketClient";
import { pushNotificationInit , pushNotificationRemove }from "./utilities/PushNotification";
import { checkPermissions }from "./utilities/Locations";



let socketClient = null;

Uniquedatataa=0;

currentPage = null, currentRoom=null;

/* *
 * @function: Configuring redux store
 * */
export const store = configureStore();

/**
* Subscribe to store changes.
*/

// store.subscribe(()=>{
//     if(store.getState().user.userDetails){
//     	/* *
// 		 * @function: Configuring socket client
// 		 * */
// 		 if(!socketClient)
// 			socketClient = configureClient(store);
//     }else{
//     	destroySocketClient();
//     	socketClient = null;
//     }
// });

/*
 * Main component
 * */
class Main extends Component{

	constructor(props) {
		super(props);
		/* *
		 * @function: Initiliazing location utility
		 * */
		checkPermissions(store);
	}

	componentWillMount() {
		/* *
		 * @function: Initiliazing push notification utility
		 * */
		pushNotificationInit(store);
		function handleFirstConnectivityChange(isConnected) {
	      NetInfo.isConnected.removeEventListener('connectionChange',handleFirstConnectivityChange);
	    }
	    NetInfo.isConnected.addEventListener('connectionChange',handleFirstConnectivityChange);
	    NetInfo.isConnected.fetch().then(isConnected => {

	    });
	}

	componentWillUnmount() {
		/* *
		 * @function: Stop listening push notification events
		 * */
		pushNotificationRemove();
	}

	/* *
	 * @function: Default render function
	 * */
	render(){

		return(
	      <Provider store={store}>
	        <Root/>
	      </Provider>
	    )
	}
}

export default Main