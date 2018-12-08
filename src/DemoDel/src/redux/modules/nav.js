'use strict';
import Idx from "../../utilities/Idx";
import { NavigationActions } from "react-navigation";
import { AppNavigator } from "../../config/navigator";
import { REHYDRATE } from "redux-persist/constants";
import { USER_LOGIN, LOG_OUT, NAVIGATE_TO_DRIVER_FORM, DRIVER_FORM_NAV } from './user';

//Actions
const GOBACK = "GOBACK";
const ResetNavigator = "ResetNavigator";
const GOTO = "GOTO";

// Action Creators
export const goBack = () => ({ type: GOBACK });
export const reset = (data) => {
    return ({ type: ResetNavigator, data })
};
export const goTo = (data) => ({ type: GOTO, data });


const initialState = AppNavigator.router.getStateForAction(NavigationActions.reset({
    index: 0,
    actions: [
        NavigationActions.navigate({
            routeName: 'Loader',

        }),
    ],
}));

export default function reducer(state = initialState, action) {
    console.log('action *********', JSON.stringify(action.payload));
    console.log('action *********', JSON.stringify(action));
    let firstState = "SplashScreen";
    //    let firstState = "DriverForm";



    if (action.payload && action.payload.user && action.payload.user.driverData && action.payload.user.driverData.data) {
        if (action.payload.user.driverData.data.multiRole[0].status) {
            firstState = "profile"//"profile"
        }
        else {
            firstState = "SplashScreen"//"customerprofile"//
        }
    }
    else if ((action.payload && action.payload.user && action.payload.user.userData && action.payload.user.userData.data && action.payload.user.userData.data.driverStatus == 'rejected')) {
        firstState = "DriverForm"
    }
    else if ((action.payload && action.payload.user && action.payload.user.driverData && action.payload.user.driverData.data && action.payload.user.driverData.data.driverStatus == 'rejected')) {
        firstState = "DriverForm"
    }
    else if (action == undefined) {
        firstState = "Login";
    }
    else if (action.payload && action.payload.user && action.payload.user.userData && action.payload.user.userData.data && action.payload.user.userData.data.driverStatus == 'pending') {
        firstState = "profile"
    }
    else if (action.payload && action.payload.user && action.payload.user.driverData && action.payload.user.driverData.data && action.payload.user.driverData.data.driverStatus == 'pending') {
        firstState = "profile"
    }
    else if (action.payload && action.payload.user && action.payload.user.userData && action.payload.user.userData.data && action.payload.user.userData.data.driverStatus == 'approved') {
        firstState = "profile"
    }
    else if (action.payload && action.payload.user && action.payload.user.driverData && action.payload.user.driverData.data && action.payload.user.driverData.data.driverStatus == 'approved') {
        firstState = "profile"//"profile"
    }
    else {
        firstState = "SplashScreen";
    }

    // Will remove this DAta 
    firstState = "SplashScreen";


    switch (action.type) {
        case USER_LOGIN:


            return AppNavigator.router.getStateForAction(
                NavigationActions.reset({
                    index: 0,
                    actions: [NavigationActions.navigate({ routeName: "MainScreen" })],
                }),
                state
            );

        case NAVIGATE_TO_DRIVER_FORM:
            return AppNavigator.router.getStateForAction(
                NavigationActions.reset({
                    index: 0,
                    actions: [NavigationActions.navigate({ routeName: "DriverForm" })],
                }),
                state
            );

        case DRIVER_FORM_NAV:

            return AppNavigator.router.getStateForAction(


                NavigationActions.reset({
                    index: 0,
                    actions: [NavigationActions.navigate({ routeName: "DriverForm" })],
                }),
                state
            );

        case ResetNavigator:
            // console.log("test test")
            return AppNavigator.router.getStateForAction(
                NavigationActions.reset({
                    index: 0,
                    actions: [NavigationActions.navigate({ routeName: "Login" })],
                }),
                state
            );



        // return this.props.navigation.navigate("Home")

        case GOBACK:
            return AppNavigator.router.getStateForAction(
                NavigationActions.back(),
                state
            );

        case GOTO:
            console.log('route name ******* ', action.data)
            return AppNavigator.router.getStateForAction(
                NavigationActions.navigate({
                    routeName: action.data.route,
                    params: action.data.params || {},
                }),
                state
            );

        case LOG_OUT:
            return AppNavigator.router.getStateForAction(
                NavigationActions.reset({
                    index: 0,
                    key: null,
                    actions: [NavigationActions.navigate({ routeName: "Login" })],
                }),
                state
            );


        case REHYDRATE:
            return AppNavigator.router.getStateForAction(
                NavigationActions.reset({
                    index: 0,
                    actions: [NavigationActions.navigate({ routeName: firstState })],
                }),
                state
            );

        default:
            //console.log(JSON.stringify(state)    +   new Date().getTime());

            return AppNavigator.router.getStateForAction(action, state);
    }
}
