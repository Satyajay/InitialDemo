import React from 'react';
import { StackNavigator } from 'react-navigation';
import Search from '../components/search';
import SearchResult from '../components/searchResult';


const  SearchStack =  StackNavigator({
    
          Search: {
            screen: Search,
            navigationOptions: ({ navigation }) => ({
              title: "Search",
              headerTitleStyle: { color: "black",alignSelf:"center" },
              headerStyle: {
                backgroundColor: "white"
            },
            })
            
          },
        
          SearchResult: {
            screen: SearchResult,
            navigationOptions: ({ navigation }) => ({
              title: "Search",
              headerTitleStyle: { color: "black",alignSelf:"center" },
              headerStyle: {
                backgroundColor: "white"
            },
            })
          }
        },
        {
    
          gestureEnabled: false,
          initialRouteName: 'Search'
        }
      
      );

      export default SearchStack;