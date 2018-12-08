//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

// create a component
class MyClass extends Component {

constructor(suer)
{

  this.state={
    test:0,
  }
}
  componentDidMount(){

    setTimeout(() => {
      
      this.setState({test:++this.state.test})
    }, 1000);

}

  render() {
    return (
      <View style={styles.container}>
        <Text>{this.state.test}</Text>
      </View>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
  },
});

//make this component available to the app
export default MyClass;
