import React from 'react';
import {Image} from 'react-native'
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator } from "react-navigation-drawer";
import { createAppContainer } from "react-navigation";
import HomeScreen from "./Home"
import Hamburger from '../assets/Hamburger.png'
import SettingsScreen from "./Settings"

const ProductStack = createStackNavigator(
	{
		Home: HomeScreen,
		Settings: SettingsScreen,
	},
	// {
	// 	// initialRouteName: "Settings",

	// }
	);

const DrawerContainer = createDrawerNavigator(
	{
		Home: ProductStack,
	},
	{
		initialRouteName: 'Home'
	})
export default DrawerContainer;