import React from 'react';
import AppNavigator from './src/AppNavigator';
import { createAppContainer } from "react-navigation";
import Home from './src/Home'

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component{
  render() {
    return (
      <AppContainer />
      // <Home />
    );
  }
}
