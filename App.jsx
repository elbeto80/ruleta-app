import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';

import {Button, Menu, Divider, PaperProvider} from 'react-native-paper';

import WheelOfFortune from 'react-native-wheel-of-fortune';

const participants = [
  '%10',
  '%20',
  '%30',
  '%40',
  '%50',
  '%60',
  '%70',
  '%90',
  'FREE',
];

const App = () => {
  const [winnerValue, setWinnerValue] = useState(null);
  const [winnerIndex, setWinnerIndex] = useState(null);
  const [started, setStarted] = useState(false);
  const childRef = useRef(null);

  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  const buttonPress = () => {
    setStarted(true);
    childRef.current._onPress();
  };

  const wheelOptions = {
    rewards: participants,
    knobSize: 20,
    borderWidth: 1,
    borderColor: '#F05A28',
    innerRadius: 30,
    duration: 3500,
    backgroundColor: '#F05A28',
    textAngle: 'horizontal',
    knobSource: require('./images/knob.png'),
    onRef: ref => (childRef.current = ref),
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safearea} />

      <StatusBar backgroundColor={'#1063AB'} barStyle={'light-content'} />

      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={<Button onPress={openMenu}>Show menu</Button>}>
        <Menu.Item onPress={() => {}} title="Item 1" />
        <Menu.Item onPress={() => {}} title="Item 2" />
        <Divider />
        <Menu.Item onPress={() => {}} title="Item 3" />
      </Menu>

      <WheelOfFortune
        options={wheelOptions}
        getWinner={(value, index) => {
          setWinnerValue(value);
          setWinnerIndex(index);
        }}
      />
      {!started && (
        <View style={styles.startButtonView}>
          <TouchableOpacity onPress={buttonPress} style={styles.startButton}>
            <Text style={styles.startButtonText}>Spin to win!</Text>
          </TouchableOpacity>
        </View>
      )}
      {winnerIndex != null && (
        <View style={styles.winnerView}>
          <Text style={styles.winnerText}>
            You win {participants[winnerIndex]}
          </Text>
          <Text>{winnerValue}</Text>
        </View>
      )}

      {winnerIndex != null && (
        <TouchableOpacity
          onPress={() => {
            setWinnerIndex(null);
            childRef.current._tryAgain();
          }}
          style={styles.tryAgainButton}>
          <Text style={styles.tryAgainText}>TRY AGAIN</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1063AB',
  },
  startButtonView: {
    position: 'absolute',
  },
  startButton: {
    backgroundColor: 'rgba(0,0,0,.5)',
    marginTop: 50,
    padding: 5,
  },
  startButtonText: {
    fontSize: 50,
    color: '#fff',
    fontWeight: 'bold',
  },
  winnerView: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tryAgainButton: {
    padding: 5,
    backgroundColor: 'rgba(0,0,0,0.5)',

    position: 'absolute',
    bottom: 0,
  },
  winnerText: {
    fontSize: 30,
  },
  tryAgainText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },

  safearea: {backgroundColor: '#1063AB'},
});

export default App;
