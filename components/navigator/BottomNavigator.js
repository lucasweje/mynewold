import React from 'react';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import { MaterialIcons } from '@expo/vector-icons';
import MarketScreen from '../pages/MarketScreen';
import CategorySreen from '../pages/CategoryScreen';
import BasketScreen from '../pages/BasketScreen';
import AddItemScreen from '../pages/AddItemScreen';
import ProfileScreen from '../pages/ProfileScreen';
import UpdateProfileScreen from '../pages/UpdateProfileScreen';
import AboutScreen from '../pages/AboutScreen';
import ProductScreen from '../pages/ProductScreen';

// Laver 3 Stacks, selvom AddItem egentlig ikke behøvede at være en stack, da den kun indeholder en Screen
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
    UpdateProfile: { screen: UpdateProfileScreen}
});

// Laver 5 forskellige tabs i bunden af appen som bruges til at navigere 
export default createBottomTabNavigator(
    {
        Market: {screen: MarketStack},
        Basket: {screen: BasketScreen},
        AddItem: {screen: AddItemStack},
        Profile: {screen: ProfileStack},
        About: {screen: AboutScreen},

    },

    // Hver tab får deres eget ikon, og en aktiv og inaktiv farve for bedre brugervenlighed
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