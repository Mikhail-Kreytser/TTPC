import React,{ Component } from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';

class SettingsScreen extends Component {
	state = {
		check: true,
		switch: false,
		value: 40
	}
	_navigateToScreen = () => {
		const { navigation } = this.props
		navigation.navigate('Home');
	}

	render(){
		return(
		<View style={{flex: 1, flexDirection: 'column'}}>
	        <View style={{ height: 100, backgroundColor: 'powderblue'}}>
	        	<TextInput
			      style={{ width: 100, borderColor: 'gray', borderWidth: 1 }}
			      // onChangeText={text => onChangeText(text)}
			      // value={value}
			      > </TextInput>
	        		<Text> Wake word: </Text>

	        </View>
	        <View style={{ height: 50, backgroundColor: 'skyblue'}} />
	        <View style={{ height: 50, backgroundColor: 'steelblue'}} />
	      </View>
		)
	}
}

export default SettingsScreen