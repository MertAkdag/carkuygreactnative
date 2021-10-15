import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Button,
  TouchableOpacity,
} from 'react-native';

import WheelOfFortune from 'react-native-wheel-of-fortune';

const participants = [
  
  '145',
  '135',
  '124',
  '543',
  '12',
];
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      winnerValue: null,
      winnerIndex: null,
      started: false,
    };
    this.child = null;
  }
  buttonPress = () => {
    this.setState({
      started: true,
    });
    this.child._onPress();
  };

  render() {
    const wheelOptions = {
      rewards: participants,
      knobSize: 30,
      fontSize: 24,
      fontWeight: 'bold',
      borderWidth: 10,
      borderColor: '#ffe836',
      innerRadius: -1,
      duration: 6000,
      backgroundColor: '#f6940d',
      textAngle: 'horizontal',
      knobSource: require('./ucnokta.png'),
      onRef: ref => (this.child = ref),
    };
    return (
      <View style={styles.container}>
        <StatusBar barStyle={'light-content'} />
        <WheelOfFortune
          options={wheelOptions}
          getWinner={(value, index) => {
            this.setState({winnerValue: value, winnerIndex: index});
          }}
        />
        {!this.state.started && (


          <View style={styles.startButtonView}>
            <TouchableOpacity
              onPress={() => this.buttonPress()}
              style={styles.startButton}>
              <Text style={styles.startButtonText}>ÇARKI ÇEVİR</Text>
            </TouchableOpacity>
          </View>
          
        )}

        
        {this.state.winnerIndex != null && (
          <View style={styles.winnerView}>
            <Text style={styles.winnerText}>
            {participants[this.state.winnerIndex]} PUAN KAZANDIN !
            </Text>
            <TouchableOpacity
              onPress={() => {
                this.setState({winnerIndex: null});
                this.child._tryAgain();
              }}
              style={styles.tryAgainButton}>
              <Text style={styles.tryAgainText}>TEKRAR DENE</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  }
}
export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 35,
    backgroundColor: '#000'
  },
  startButtonView: {
    position: 'absolute',
  },
  startButton: {
    backgroundColor: 'rgba(0,0,0,.5)',
    marginTop: 50,
    borderRadius:10,
    padding: 5,
  },
  startButtonText: {
    fontSize: 35,
    color: '#fff',
    fontWeight: 'bold',
    
  },
  winnerView: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tryAgainButton: {
    padding: 10,
  },
  winnerText: {
    fontSize: 25,
  },
  tryAgainButton: {
    backgroundColor: 'rgba(0,0,0,.5)',
    marginTop: 50,
    borderRadius:10,
    padding: 5,
  },
  tryAgainText: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#fff',
  },
});
