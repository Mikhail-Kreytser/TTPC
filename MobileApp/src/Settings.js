import React,{ Component } from 'react';
import {View, Text, StyleSheet, TextInput, Button, Picker} from 'react-native';
import './global.js';

class SettingsScreen extends Component {
	constructor(props) {
		super(props);

		this.state = {
		check: true,
		switch: false,
		value: 40,
		Contact: global.ContactPoint,
		ContactMode: global.ContactMode,
		triggerWord: global.TriggerWord,
		language: global.Language,
		}
	}
	_navigateToScreen = () => {
		const { navigation } = this.props
		navigation.navigate('Home');
	}
	
	render(){
		return(
        <View style={addItemStyles.wrapper}>
            <View>
                <View style={{flexDirection:"row"}}>
                    <View style={{flex:1}}>
		            	<Text style={addItemStyles.inputLabels}>Trigger word:</Text>
		            </View>
                    <View style={addItemStyles.inputField}>
                        <TextInput 
                        placeholder={global.TriggerWord}
                        onChangeText={text => {global.TriggerWord = text}}
                        style={{justifyContent: 'center'}} />
                    </View>
                </View>
                <View style={{flexDirection:"row"}}>
                    <View style={{flex:1}}>
		            	<Text style={addItemStyles.inputLabels}>Contact Point:</Text>
		            </View>
		            <Picker
					  selectedValue={this.state.Contact}
					  style={{justifyContent: 'center', height: 70, width: 230}}
					  onValueChange={(itemValue, itemIndex) =>{
					    	this.setState({Contact: itemValue})
						    global.ContactPoint = itemValue
						}
					  }>
					  <Picker.Item label="Dispatch" value="Dispatch" />
					  <Picker.Item label="Frendlies" value="Frendlies" />
					  <Picker.Item label="Code RED" value="Code RED" />
					  <Picker.Item label="ESU" value="ESU" />
					  <Picker.Item label="Amber Alert" value="Amber Alert" />
					</Picker>
                </View>
                <View style={{flexDirection:"row"}}>
                    <View style={{flex:1}}>
		            	<Text style={addItemStyles.inputLabels}>Contact Mode:</Text>
		            </View>
		            <Picker
					  selectedValue={this.state.ContactMode}
					  style={{justifyContent: 'center', height: 70, width: 230}}
					  onValueChange={(itemValue, itemIndex) =>{
						    this.setState({ContactMode: itemValue});
						    global.ContactMode = itemValue
						}
					  }>
					  <Picker.Item label="Text" value="sms" />
					  <Picker.Item label="Email" value="email" />
					</Picker>
                </View>
                <View style={{flexDirection:"row"}}>
                    <View style={{flex:1}}>
		            	<Text style={addItemStyles.inputLabels}>Language:</Text>
		            </View>
		            <Picker
					  selectedValue={this.state.language}
					  style={{justifyContent: 'center', height: 70, width: 230}}
					  onValueChange={(itemValue, itemIndex) =>{
						    this.setState({language: itemValue})
						    global.Language = itemValue;
						}
					  }>
					  <Picker.Item label="English" value="en-US" />
					  <Picker.Item label="Russian" value="ru-RU" />
					  <Picker.Item label="Chinese" value="cmn-Hans-CN" />
					  <Picker.Item label="Japanese" value="ja-JP" />
					</Picker>
                    
                </View>
            </View>
	        <Button
	          title="Save"
	          onPress={() => {
	            this.props.navigation.navigate('Home');
	          }}
	        />
        </View>
		)
	}
}

// <View style={addItemStyles.inputField}>
//                         <TextInput 
//                         placeholder={global.TriggerWord}
//                         onChangeText={text => {global.TriggerWord = text}}
//                         style={{justifyContent: 'flex-start',}} />
//                     </View>

const addItemStyles = StyleSheet.create({
    wrapper: {
        padding: 10,
        backgroundColor: '#FFFFFF'
    },
    inputLabels: {
        fontSize: 20,
        color: '#000000',
        padding: 19,
        flex:1,
    },
    inputField: {
        padding: 10,
        borderWidth: 1,
        color: '#505050',
        height: 60,
        flex:1
    },
    inputWrapper: {
        paddingBottom: 20,
    },
    saveBtn: {
        backgroundColor: '#003E7D',
        alignItems: 'center',
        padding: 12,
    },
    saveBtnText: {
        color: '#FFFFFF',
        fontSize: 18,
    }


});


export default SettingsScreen