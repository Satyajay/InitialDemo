import React, { Component } from 'react';
import {
  StyleSheet,         // CSS-like styles
  Text,               // Renders text
  TouchableOpacity,   // Pressable container
  View                // Container component
} from 'react-native';
import colors from '../common/colors'
export default class Tabs extends Component {

  // Initialize State
  state = {
    // First tab is active by default
    activeTab: 0
  }

  // Pull children out of props passed from App component
  render({ children } = this.props) {
    //alert(this.state.activeTab);
    return (
      <View style={styles.container}>
        {/* Tabs row */}
        <View style={styles.tabsContainer}>
          {/* Pull props out of children, and pull title out of props */}
          {children.map(({ props: { title } }, index) =>
            <TouchableOpacity
              style={[
                // Default style for every tab
                styles.tabContainer,
                // Merge default style with styles.tabContainerActive for active tab
                index === this.state.activeTab ? styles.tabContainerActive : []
              ]}
              // Change active tab
              onPress={() => this.setState({ activeTab: index })}
              // Required key prop for components generated returned by map iterator
              key={index}
            >
              <Text style={[styles.tabText, { color: '#fff', fontWeight: this.state.activeTab ? 'bold' : '500' }]}>
                {title}
              </Text>
          <View style={{height:35, width:1, backgroundColor:'white', justifyContent:'flex-end'}}></View>

            </TouchableOpacity>
          )}
        </View>
        {/* Content */}
        <View style={styles.contentContainer}>
          {children[this.state.activeTab]}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  // Component container
  container: {
    flex: 1,
    backgroundColor: '#3B3A6F'                          // Take up all available space
  },
  // Tabs row container
  tabsContainer: {
    flexDirection: 'row',
    height: 35,
    backgroundColor: '#848484',
    alignItems: 'center'            // Arrange tabs in a row
    //paddingTop: 30,                     // Top padding
  },
  // Individual tab container
  tabContainer: {
    flex: 1,    
    flexDirection:'row', 
    alignItems:'center',   
    borderRightColor:'white',
    justifyContent:'center',                   // Take up equal amount of space for each tab
    borderBottomColor: 'transparent',   // Transparent border for inactive tabs
  },
  // Active tab container
  tabContainerActive: {
    backgroundColor: colors.buttonBg,
    height: 35,
    borderBottomColor: colors.buttonBg,       // White bottom border for active tabs
  },
  // Tab text
  tabText: {
    flex:1,
    fontSize: 14,
    fontWeight: '400',
    textAlign: 'center',
  },
  // Content container
  contentContainer: {
    flex: 1,
    backgroundColor:'blue'                        // Take up all available space
  }
});