import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from 'react-native';

import {Modal} from 'react-native-paper';

import WheelOfFortune from 'react-native-wheel-of-fortune';
import {questions} from './questions';

const App = () => {
  const categories = [
    'DROOP',
    'ALIADOS GOO',
    'REEXPEDICIONES',
    'SERVICIOS',
    // 'Terminales',
  ];

  const colors = ['#094d96', '#b7b7b7', '#3e81c4', '#5c747c'];

  const [winnerValue, setWinnerValue] = useState(null);
  const [winnerIndex, setWinnerIndex] = useState(null);
  const childRef = useRef(null);

  const [visibleModal, setVisibleModal] = useState(false);

  const [questionShow, setQuestionShow] = useState(null);

  const [viewImage, setViewImage] = useState(0);

  const wheelOptions = {
    rewards: categories,
    knobSize: 18,
    borderWidth: 3,
    borderColor: '#7a828e',
    innerRadius: 18,
    duration: 3500,
    backgroundColor: '#fff',
    textAngle: 'horizontal',
    knobSource: require('./images/knob.png'),
    onRef: ref => (childRef.current = ref),
    colors: colors,
  };

  const selectedQuestion = value => {
    const data = questions[value].questions;

    setQuestionShow(data[Math.floor(Math.random() * data.length)]);
  };

  const verifyResponse = index => {
    if (index == questionShow.correct) setViewImage(1);
    else setViewImage(2);
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safearea} />

      <StatusBar backgroundColor={'#1063AB'} barStyle={'light-content'} />

      <Text
        style={{
          position: 'absolute',
          top: 25,
          fontSize: 34,
          fontWeight: '500',
          color: '#fff',
        }}>
        RED DE ALIADOS
      </Text>

      <WheelOfFortune
        options={wheelOptions}
        getWinner={(value, index) => {
          setWinnerValue(value);
          setWinnerIndex(index);

          selectedQuestion(value);

          setTimeout(() => {
            setVisibleModal(true);
          }, 200);
        }}
      />

      <TouchableOpacity
        style={styles.questionView}
        onPress={() => {
          setWinnerIndex(null);
          childRef.current._tryAgain();
        }}>
        <View>
          <Text style={styles.tryAgainText}>Girar la ruleta!!!</Text>
        </View>
      </TouchableOpacity>

      <Modal
        visible={visibleModal}
        onDismiss={() => {
          setVisibleModal(false);
          setViewImage(0);
        }}
        contentContainerStyle={styles.modal}>
        <View
          style={{
            flexDirection: 'row',
          }}>
          <Text
            style={{
              flex: 1,
              fontSize: 22,
              fontWeight: '500',
              color: '#1063AB',
            }}>
            {categories[winnerIndex]}
          </Text>

          {viewImage == 1 && (
            <Image
              source={require('./images/1.png')}
              style={{width: 40, height: 40, alignSelf: 'center'}}
            />
          )}

          {viewImage == 2 && (
            <Image
              source={require('./images/2.png')}
              style={{width: 40, height: 40, alignSelf: 'center'}}
            />
          )}
        </View>

        <Text
          style={{
            fontSize: 15,
            fontWeight: '500',
            marginVertical: 7,
            color: '#000',
          }}>
          {questionShow?.question}
        </Text>

        {questionShow?.options.map((item, index) => (
          <TouchableOpacity
            style={{
              paddingVertical: 5,
            }}
            onPress={() => verifyResponse(index)}
            key={'QUESTION' + index}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: '500',
                color: '#455f75',
              }}>
              {index + 1}.- {item}
            </Text>
          </TouchableOpacity>
        ))}

        <TouchableOpacity
          style={styles.btnCloseModal}
          onPress={() => {
            setVisibleModal(false);
            setViewImage(0);
          }}>
          <Text style={{fontSize: 16, color: '#fff', fontWeight: '600'}}>
            Cerrar
          </Text>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1063AB',
    paddingBottom: 50,
  },

  tryAgainText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1063AB',
  },

  safearea: {backgroundColor: '#1063AB'},

  questionView: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    position: 'absolute',
    bottom: 50,
  },

  modal: {backgroundColor: 'white', padding: 20, marginHorizontal: 20},

  btnCloseModal: {
    backgroundColor: '#c94848',
    paddingVertical: 7,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 15,
    alignSelf: 'center',
  },
});

export default App;
