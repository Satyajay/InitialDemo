module.exports = [
  {
    _id: Math.round(Math.random() * 1000000),
    text: 'Hi',
    createdAt: new Date(Date.UTC(2016, 7, 30, 17, 20, 0)),
    user: {
      _id: 1,
      name: 'Developer',
       avatar: require("../images/reciever.png"),
    },
    sent: true,
    received: true,
    // location: {
    //   latitude: 48.864601,
    //   longitude: 2.398704
    // },
  },
  {
    _id: Math.round(Math.random() * 1000000),
    text: 'Hi Steve, Welcome back!',
    createdAt: new Date(Date.UTC(2016, 7, 30, 17, 20, 0)),
    user: {
      _id: 2,
      name: 'React Native',
       avatar: require("../images/reciever.png"),
    },
  },

  {
    _id: Math.round(Math.random() * 1000000),
    text: 'Add a new lead to acme Inc',
    createdAt: new Date(Date.UTC(2016, 7, 30, 17, 20, 0)),
    user: {
      _id: 1,
      name: 'Developer',
       avatar: require("../images/reciever.png"),
    },
    sent: true,
    received: true,
    // location: {
    //   latitude: 48.864601,
    //   longitude: 2.398704
    // },
  },
  {
    _id: Math.round(Math.random() * 1000000),
    text: 'How can i help you today?',
    createdAt: new Date(Date.UTC(2016, 7, 30, 17, 20, 0)),
    user: {
      _id: 2,
      name: 'React Native',
       avatar: require("../images/reciever.png"),
    },
  }
  
  
  // ,
  // {
  //   _id: Math.round(Math.random() * 1000000),
  //   text: "You are officially rocking GiftedChat.",
  //   createdAt: new Date(Date.UTC(2016, 7, 30, 17, 20, 0)),
  //   system: true,
  // },
];
