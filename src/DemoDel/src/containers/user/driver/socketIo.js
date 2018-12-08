
import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import SocketIOClient from 'socket.io-client';


export default class Play extends React.Component {
	
	constructor(props) {



        super(props);
      
		//this.socket = SocketIOClient('http://13.127.98.44:6263/'); // replace 'environment.serverUrl' with your server url
        
        this.socket = SocketIOClient('http://13.127.98.44:6263',{query:'userid=5ba37028d525f1213ca1e145'}, {reconnect: true});
        
        this.socket.emit('channel1', 'Hi server'); // emits 'hi server' to your server
        
       
      
		// Listens to channel2 and display the data recieved
    this.socket.on('connection', (data) => {
      
      console.log("test");
        // console.log('Data recieved from server', data); //this will console 'channel 2'
      });
    }
	
	clicked = () => {
		
		const dataObj = {
			action: 'click'
		};
		
		this.socket.emit('channel2', dataObj);
	}

    render() {
        return(
            <View>
    				
            
					</View>
        );
    }
}