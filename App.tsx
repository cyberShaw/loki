import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

// Screens
import { SplashScreen } from './src/screens/SplashScreen';

// Libraries
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { HomeScreen } from './src/screens/HomeScreen';

const switchNavigator = createSwitchNavigator({
  landingStack: {
    screen: createStackNavigator({
      Landing: SplashScreen,
    }, {
      defaultNavigationOptions: {
        headerShown: false
      }
    })
  },
  homeStack: createBottomTabNavigator({
    home: {
      screen: createStackNavigator({
        HomePage: HomeScreen
      }),
      navigationOptions: {
        tabBarIcon: ({ focused, tintColor }) => {
          let icon = focused == true ? require('./assets/home_icon.png'): require('./assets/home_n_icon.png')
          return <Image source={icon} style={styles.tabIcon}></Image>
        }
      }
    },
    offer: {
      screen: createStackNavigator({
        HomePage: HomeScreen
      }),
      navigationOptions: {
        tabBarIcon: ({ focused, tintColor }) => {
          let icon = focused == true ? require('./assets/offer_icon.png'): require('./assets/offer_n_icon.png')
          return <Image source={icon} style={styles.tabIcon}></Image>
        }
      }
    },
    cart: {
      screen: createStackNavigator({
        HomePage: HomeScreen
      }),
      navigationOptions: {
        tabBarIcon: ({ focused, tintColor }) => {
          let icon = focused == true ? require('./assets/cart_icon.png'): require('./assets/cart_n_icon.png')
          return <Image source={icon} style={styles.tabIcon}></Image>
        }
      }
    },
    account: {
      screen: createStackNavigator({
        HomePage: HomeScreen
      }),
      navigationOptions: {
        tabBarIcon: ({ focused, tintColor }) => {
          let icon = focused == true ? require('./assets/account_icon.png'): require('./assets/account_n_icon.png')
          return <Image source={icon} style={styles.tabIcon}></Image>
        }
      }
    },
  })
})

const AppNavigation = createAppContainer(switchNavigator);

export default function App() {

  return (
      <AppNavigation />
  );
}

const styles = StyleSheet.create({
  tabIcon: {
    width: 30,
    height: 30
  }
});
