'use strict';
import React, { Component } from "react";
import { Alert, InteractionManager} from "react-native";
import Permissions from 'react-native-permissions';
import * as LocationActions from '../redux/modules/location';
import {startLoading, stopLoading} from '../redux/modules/app';
import Constants from '../constants';
import Geocoder from 'react-native-geocoder';


import { PermissionsAndroid } from 'react-native';




Geocoder.fallbackToGoogle(Constants.GoogleAPIKey);




async function requestCameraPermission(store,type) {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        'title': 'Cool Photo App Camera Permission',
        'message': 'Cool Photo App needs access to your camera ' +
                   'so you can take awesome pictures.'
      }
    )
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {

      try{

        navigator.geolocation.getCurrentPosition(function(e){
          store.dispatch(LocationActions.setDetails(e));
        }, function(e){
        });
     
        navigator.geolocation.watchPosition(
        (success)=>{
         store.dispatch(LocationActions.setDetails(success));
        
        },
        (error)=>{
          // alert('stopLoading errior'+error);
           store.dispatch(stopLoading())
          store.dispatch(LocationActions.setDetails(null));
          store.dispatch(LocationActions.locationError(true));
        },
        {
          enableHighAccuracy: true, timeout: 20000, maximumAge: 0, distanceFilter: 50
        }
      );
    }
    catch(Ex)
    {
    //  alert(Ex);
    }

   
    } else {
    }
  } catch (err) {
    console.warn(err)
  }
}


export function checkPermissions(store, type) {
  
  requestCameraPermission(store,type);
 
  
 


}


export function checkPermissions1(store, type) {
  Permissions.getPermissionStatus('location', 'whenInUse').then(response => {
      if(response==="authorized"){
        InteractionManager.runAfterInteractions(() => {
          navigator.geolocation.watchPosition(
            (success)=>{
              console.log('inside watchPosition',store.getState());
              
              Geocoder.geocodePosition({
                lat:success.coords.latitude,
                lng:success.coords.longitude
              }).then(res => {
                  store.dispatch(stopLoading())
                  store.dispatch(LocationActions.locationError(false));
                  store.dispatch(LocationActions.setDetails(res[0]));
              }).catch(err => {
                console.log('inside watchPosition',store.getState());
                  store.dispatch(stopLoading())

                  // store.dispatch(LocationActions.setDetails(null));
                  // store.dispatch(LocationActions.locationError(true));
              });
            },
            (error)=>{
              console.log('stopLoading errior',error);
               store.dispatch(stopLoading())
              store.dispatch(LocationActions.setDetails(null));
              store.dispatch(LocationActions.locationError(true));
            },
            {
              enableHighAccuracy: false, 
              timeout: 1000*60*1,
              maximumAge: 2000,
              distanceFilter:100
            }
          );
        });
      }else{
        requestPermissions(store, type);
      }
    });
}

export function requestPermissions(store, type){
  Permissions.requestPermission('location', 'whenInUse').then(response => {
        if(response!=="authorized"){
          store.dispatch(LocationActions.setDetails(null));
          store.dispatch(LocationActions.locationError(true));
          setTimeout(()=>{
            Alert.alert(
              type ? Constants.i18n.permissionsSignup.LocationPermissionHeader: Constants.i18n.permissions.LocationPermissionHeader, 
              type ? Constants.i18n.permissionsSignup.LocationPermissionText: Constants.i18n.permissions.LocationPermissionText, 
              [{
                text: "Enable",
                onPress:()=>{Permissions.openSettings()}
              },{
                text: "Cancel",
                onPress:()=>{console.log("cancelable")}
              }],
              {cancelable: false}
            );
          },700);
        }else{
          checkPermissions(store);
        }
  });
}


