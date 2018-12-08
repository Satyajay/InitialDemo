/* *
 * @file: location.js
 * @description: Location reducer to handle user current location and selected location.
 * @date: 20.12.2017
 * @author: Ankush Rishi
 * */
'use strict';
// Actions
const SET_DETAILS = "SET_DETAILS";
const SELECTED_DETAILS = "SELECTED_DETAILS";
const LOCATION_ERROR    = "LOCATION_ERROR";
const NEXT_PICKUP="NEXT_PICKUP";
let currentUser='';




import RestClient from '../../utilities/RestClient';

// Action Creators
export const setDetails = (data) => ({ type: SET_DETAILS, data });
export const selectLocation = (data) => ({ type: SELECTED_DETAILS, data });
export const locationError = (data) => ({ type: LOCATION_ERROR, data });
export const nextPickUpdata=(data)=>({type:NEXT_PICKUP,data});
export const setCurrentUser=(data)=>{currentUser=data._id;


}
// Reducer

const initialState = {
    currentLocation     : null,
    selectedLocation    : null,
    isError             : false,
    nextPickUpLocation  :  null,
};



export const updateUserLocationAPI = (data) => {

    return;

if(!currentUser)
return;


  //  console.log(data);
	let	requestObject = {
      //  driver_id : data.driver_id,
       // lat:data.lat,
       // lng:data.lng,
       // distance:890,

       driverid :currentUser,
       lat:data.coords.latitude,
       lng:data.coords.longitude,
       distance:890,
    }

		RestClient.post_Synch("drivers/savedriverlatlng",requestObject).then((result) => {
            if(result.status==1){
  				console.log(result.message);				
	  	}else{
	  	}
		}).catch(error => {
	  		console.log("error=> ", error)
	  	
		});
	
};
 
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case SET_DETAILS:
       // updateUserLocationAPI(action.data);
            return { ...state, currentLocation : action.data};

        case SELECTED_DETAILS:
      
        	return { ...state, selectedLocation : action.data};

        case LOCATION_ERROR:
            return {...state, isError : action.data};

        case NEXT_PICKUP:
            return {...state, nextPickUpLocation : action.data};


        default:
            return state;
    }
}
