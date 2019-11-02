import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator } from "react-navigation-drawer";
import { createAppContainer } from "react-navigation";
import Drawer from "./Drawer"

const AppNavigator = createStackNavigator(
	{
		Drawer: Drawer,
	},
	{
		// initialRouteName: "Settings",
		headerMode:'none'
	});

export default createAppContainer(AppNavigator);