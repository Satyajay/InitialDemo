//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,Dimensions,Image,ScrollView } from 'react-native';


const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;


let { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
let LATITUDE = 28.669;
let LONGITUDE = 77.380311;
const LATITUDE_DELTA = 0.25;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const marker=null;
import Constants from "../../../constants";

const colors1=require('../../../assets/images/customer/Vehicle_icons/Top/b0.png')
const colors2=require('../../../assets/images/customer/Vehicle_icons/Top/c0.png')
import MapView, { Marker ,Circle} from 'react-native-maps';   

colors=[];
colors.push(colors1);
colors.push(colors2);

// create a component
class CustomerMapReviewReplica extends Component<{}> {


  


    constructor(props) {
        super(props);

       

        this.state = {data: [], 
            title:'ssss',
            user:null,
            accessToken:null,
            SliderValue:0,
            markers:this.genrateRandomMarker(),
            region: {
               latitude: LATITUDE,
                longitude: LONGITUDE,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
              },
              newRegion:[],
              enableIndicator:false,
              selected: (new Map(): Map<string, boolean>)
              
        };


      //  this.genrateRandomMarker();   

       
    }


    componentDidMount(){

        navigator.geolocation.watchPosition(
            (position) => {
                let LATITUDE = 28.669;
                let LONGITUDE = 77.380311;
                LATITUDE=position.coords.latitude;
                LONGITUDE=position.coords.longitude;
              
                    this.setState({region:{latitude:position.coords.latitude,
                        longitude:position.coords.longitude,
                        latitudeDelta: LATITUDE_DELTA,
                        longitudeDelta: LONGITUDE_DELTA}})
                   
                  this.genrateRandomMarker();
                  },
                  (error) => alert(error),
                  {distanceFilter:50}
                 
        )

    }

    


    genrateRandomMarker=()=>{


       




        var marker=[];

for(var i=0;i<5;i++)
{
  
    marker.push(
        {
            coordinates:{latitude: LATITUDE+Math.random()/20,
                longitude: LONGITUDE+Math.random()/20},
                title:"Driver "+ i*i*Math.random().toFixed(4)*10000  ,
                key:i,
                pinColor:'blue'    
            
           
        }

    )


    marker.push(
        {
            coordinates:{latitude: LATITUDE+Math.random()/20,
                longitude: LONGITUDE-Math.random()/20},
                title:"Driver "+ i*i*Math.random().toFixed(4)*10000  ,
                key:i,
                pinColor:'blue'  
            
           
        }

    )



    marker.push(
        {
            coordinates:{latitude: LATITUDE-Math.random()/20,
                longitude: LONGITUDE+Math.random()/20},
                title:"Driver "+ i*i*Math.random().toFixed(4)*10000  ,
                key:i,
                pinColor:'blue'  
            
           
        }

    )

    marker.push(

        { 


            coordinates:{latitude: LATITUDE-Math.random()/20,
                longitude: LONGITUDE-Math.random()/20},
                title:"Driver "+ i*Math.random().toFixed(4)*10000 ,
                key:i,
                pinColor:'blue'
            
           
        }

    )



}
//this.setState({Marker:marker})

return marker;

    }
    




    render() {
        return (
            <ScrollView style={styles.container}>
                


<MapView 
showsUserLocation={true}
showsMyLocationButton={true} 
zoomEnabled = {true}
initialRegion={this.state.region}
onRegionChange={this.onRegionChange}
>
{this.state.markers.map(marker => (
        <Marker 
        coordinate={marker.coordinates} 
         title={marker.title}
        key={marker.key}
       // pinColor={marker.pinColor}
       // onPress={(e) => {e.stopPropagation(); this.onMarkerPress(e,marker.key)}}
      >
<View style={{height:40,width:40}}>

<Image
          style={{width: 40, height: 40}}   
          source={colors[marker.key%2]} 
           
           
        />              
    </View>

      </Marker>
    ))}

<Circle
center={{latitude:this.state.region.latitude,longitude:this.state.region.longitude}}
 radius={10*1000}
fillColor="#80808090"
strokeColor="red"

/>

</MapView>





            </ScrollView>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    
    container: {
        flex: 1
      },
      bgImage: {
        flex: 1,
        top: 0,
        left: 0,
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        justifyContent: 'center',
        alignItems: 'center'
      },
      
      container: {
        flex: 1,
        paddingTop: 22,
        backgroundColor: 'white',
    },
    item: {
        padding: 10,
        fontSize: 18,
       // height: 44,
        width:SCREEN_WIDTH,
        color:'black'
    },
    mapcontainer: {
        flex: 1,
         width: width,
        height: height,
       },
    
       box1: {
        position: 'absolute',
        top: 0,
        left: 0,
       // width: '100%',
        bottom:0,
        right:0,
        //flex:1,
        //backgroundColor:'pink'
       
      },
      navIcons:{
       height:20, 
       width:20
      },
      sectionHeaders:{
        flexDirection:'row',
        justifyContent:'space-between',
        padding:Constants.BaseStyle.PADDING * .5,
        alignItems:'center'
      },
     


});

//make this component available to the app

export default connect(state => ({state: state.CustomerReducer}))(CustomerMapReviewReplica);
