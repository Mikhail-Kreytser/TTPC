import React from 'react';
import { Image, Button, StyleSheet, Text, View, TouchableHighlight, TextInput } from 'react-native';
import axios from 'axios';
import Voice from 'react-native-voice';
import Tts from 'react-native-tts';
import delay from 'delay'
import Hamburger from '../assets/Hamburger.png'
import { withNavigation } from 'react-navigation'
const _backendEndpoint = 'http://192.168.43.157:3000'
const _keyWord = "Jarvis";

class Home extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			keyWordActivated: false,
			text: '',
			status: '',
			userPayload: '',
			userSession: ''
		}
		Voice.onSpeechStart = this.onSpeechStartHandler.bind(this);
		Voice.onSpeechEnd = this.onSpeechEndHandler.bind(this);
		Voice.onSpeechResults = this.onSpeechResultsHandler.bind(this);
		Voice.onSpeechError = this.onSpeechErrorHandler.bind(this);
		Voice.onSpeechPartialResults = this.onSpeechPartialResultsHandler.bind(this);

		Tts.setDefaultLanguage('en-US');

	}


	componentDidMount() {
		this.getSession();
		console.log(this.props.navigation)

	}

	/**
	 * Get Watson session
	 */
	 getSession = async () => {
	 	const response = await axios.get(`${_backendEndpoint}/api/session`, this.state.userPayload) 
	 	this.init(response.data.result);
	 }

	/**
	 * Greeting when assistant is ready
	 */
	 init = async session => {
	 	try {
	 		const initialPayload = {
	 			input: {
	 				message_type: "text",
	 				text: ""
	 			}
	 		}
	 		let response = await axios.post(`${_backendEndpoint}/api/message`, { ...initialPayload, ...session })

	 		Tts.speak(response.data.result.output.generic[0].text);
	 		(async() => {
	 			await delay(2000);
	 			Voice.start();
	 		})();
	 		this.setState({ userSession: session });
	 		this.setState({ text: response.data.result.output.generic[0].text });
	 		this.setState({ userPayload: response.data });
	 	}
	 	catch (err) { console.log('Failed to retrive data from Watson API', err) }
	 }


	 onSpeechResultsHandler = result => {
	 	if(this.state.keyWordActivated == true){
	 		this.setState({ text: result.value[0], keyWordActivated: false });
	    	this.sendMessage(result.value[0]);
	} else{
		if(result.value[0].includes(_keyWord)){
			this.setState({ keyWordActivated: true , text: "" })
			Tts.speak("Yes boss.");
			Voice.cancel();
			(async() => {
				await delay(800);
				Voice.start();
			})();
		}else {
			Voice.start();
		}
	}
}

onSpeechPartialResultsHandler = result => {
	if(this.state.keyWordActivated == false){
		if(result.value[0].includes(_keyWord)){
			Voice.cancel();
			this.setState({ keyWordActivated: true, text: ""});
	      // Tts.speak("Yes boss.");
	      // (async() => {
	      //   await delay(800);
	      //   Voice.start();
	      // })();
	  }
	}else {
		this.setState({ text:result.value[0]});
	}
	console.log(result.value[0])
}

onSpeechErrorHandler = error => {
	if(error.error.message == "5/Client side error"){
		console.log(error.error.message)
		Voice.cancel()
	    // Voice.stop();
	    Voice.start()
	} else if(error.error.message == "6/No speech input"){
		console.log(error.error.message)
		Voice.cancel()
	    // Voice.stop();
	    Voice.start()
	} else if(error.error.message == "7/No match"){
		console.log(error.error.message)
		Voice.cancel()
	    // Voice.stop();
	    Voice.start()
	} else {
		console.error("8/RecognitionService busy")
	}

	console.log(error.error.message)
}

	// Listening to start
	onSpeechStartHandler = () => {
		this.setState({ status: 'Listening...' });
	}

	// Listening to end
	onSpeechEndHandler = () => {
		this.setState({ status: 'Voice Processed' });
	}

	// Listening to press button to speak
	onStartButtonPress = e => {
		Voice.start('en-US');
		Tts.stop();
	}

	// Listening to release button to speak
	onStopButtonPress = e => {
	  // Voice.stop();
	  this.setState({ status: '' });
	  Voice.cancel()
	  Tts.stop();
	}

	/**
	 * send message to Watson
	 */
	 sendMessage = async payload => {
	 	try {
	 		let { userSession } = this.state;
	 		let inputPayload = {
	 			input: {
	 				message_type: "text",
	 				text: payload
	 			}
	 		}

	 		let responseData = { ...inputPayload, ...userSession }
	 		let response = await axios.post(`${_backendEndpoint}/api/message`, responseData)

	 		console.log(response.data.result.output)

	 		this.setState({ text: response.data.result.output.generic[0].text });
	 		console.log(response.data.result.output)
	 		Tts.speak(response.data.result.output.generic[0].text);
	 		(async() => {
	 			await delay(800);
	 			Voice.start();
	 		})();
	 	}
	 	catch (err) { console.log('Failed to send data to Watson API', err) }
	 }
	 render() {
	 	return (
	 		<View style={styles.container}>
	 			<View style={[{ width: "50%", margin: 10}]}>
			 		<Button
			 		title="Settings"
			 		onPress={() => this.props.navigation.navigate('Settings')}/>
		 		</View>
	 			<Text style={styles.welcome}>Welcome to First Responder!</Text>


		 		<View style={[{ width: "50%", margin: 10}]}>
			 		<Button
			 		title="Talk"
			 		onPress={e => this.onStartButtonPress(e)}/>
		 		</View>
		 		<View style={[{ width: "50%", margin: 10}]}>
			 		<Button
			 		title="Stop"
			 		onPress={e => this.onStopButtonPress(e)}/>	
		 		</View>

		 		<Text style={{ fontSize: 20, color: 'blue' }}>{this.state.status}</Text>

		 		<TextInput
			 		multiline={true}
			 		style={{ fontWeight: 'bold', width: 300, height: 200, borderColor: 'gray', borderWidth: 2 }}
			 		value={this.state.text}
			 		onChangeText={text => {this.setState({text:text})}}/>
		 		<View style={[{ width: "50%", margin: 10}]}>
			 		<Button
			 		color="red"
			 		title="Manual Submit"
			 		onPress={() => this.sendMessage(this.state.text)}/>	
		 		</View>
	 		</View>
	 		)}
	}// violations 
	// what they see for fire
	// i need additional inots 
	// status report 

	      // <Text style={{ fontSize: 20, color: 'red' }}>{this.state.text}</Text>


	      const styles = StyleSheet.create({
	      	container: {
	      		flex: 1,
	      		justifyContent: 'flex-start',
	      		alignItems: 'center',
	      		backgroundColor: '#F5FCFF',
	      		padding: 20
	      	},
	      	welcome: {
	      		fontSize: 20,
	      		textAlign: 'center',
	      		margin: 10
	      	}
	      })

	      export default withNavigation(Home);