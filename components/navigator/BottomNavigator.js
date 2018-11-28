import React from 'react';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import { MaterialIcons } from '@expo/vector-icons';
import MarketScreen from '../pages/MarketScreen';
import CategorySreen from '../pages/CategoryScreen';
import BasketScreen from '../pages/BasketScreen';
import AddItemScreen from '../pages/AddItemScreen';
import ProfileScreen from '../pages/ProfileScreen';
import AboutScreen from '../pages/AboutScreen';
import ProductScreen from '../pages/ProductScreen';


const MarketStack = createStackNavigator({
    Market: { screen: MarketScreen },
    Category: {screen: CategorySreen},
    Product: {screen: ProductScreen},
});

const AddItemStack = createStackNavigator({
    AddItem: { screen: AddItemScreen},
});

const ProfileStack = createStackNavigator({
    Profile: { screen: ProfileScreen},
});


export default createBottomTabNavigator(
    {
        Market: {screen: MarketStack},
        Basket: {screen: BasketScreen},
        AddItem: {screen: AddItemStack},
        Profile: {screen: ProfileStack},
        About: {screen: AboutScreen},

    },

    {
        navigationOptions: ({ navigation }) => ({
    
          tabBarIcon: ({ focused, tintColor }) => {
    
            const { routeName } = navigation.state;
            var iconName;
    
            if (routeName === 'Market') {
              iconName = 'store';
            }else if (routeName === 'Basket') {
              iconName = 'shopping-basket';
            } else if (routeName === 'AddItem') {
                iconName = 'add-circle-outline';
            } else if (routeName === 'Profile'){
                iconName = 'face';
            } else if (routeName === 'About'){
                iconName = 'info-outline';
            }
            return <MaterialIcons name={iconName} size={25} color={tintColor} />;
          },
        }),
        tabBarOptions: {
          activeTintColor: '#2B8144',
          inactiveTintColor: 'gray',
        },
      }

);