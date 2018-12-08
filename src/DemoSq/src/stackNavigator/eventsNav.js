import React from 'react';
import { StackNavigator } from 'react-navigation';
import Events from '../components/events';
import Invites from '../components/invites';
import EventDetail from '../components/eventDetail';
import CreateTeam from '../components/createTeam';
import SendInvites from '../components/sendInvites';
import CreateFinalTeam from '../components/createFinalTeam';


const EventsStack = StackNavigator({
  Events: {
    screen: Events,
  },
  CreateTeam: {
    screen: CreateTeam,
  },
  CreateFinalTeam: {
    screen: CreateFinalTeam,
  },

  Invites: {
    screen: Invites,
  },
  EventDetail:{
    screen:EventDetail
  },
  SendInvites:{
    screen:SendInvites
  }
},
  {
    gestureEnabled: false,
    initialRouteName: 'Events'
  }

);

export default EventsStack;