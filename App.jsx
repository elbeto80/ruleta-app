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

const App = () => {
  const categories = [
    'Puntos DROOP',
    'Contralor GOO',
    'Reexpediciones',
    'Servicios',
    // 'Terminales',
  ];

  const questions = {
    'Puntos DROOP': {
      questions: [
        {
          question:
            '¿En qué momento se realiza la AUTORIZACIÓN DE LA CARGA DE TRABAJO (única respuesta)?',
          options: [
            'Al momento de realizar la recogida',
            'Desde el Check point Descargue ruta Nacional',
            'Al momento de FINALIZAR el checkpoint Asignación',
            'En la calle cuando estamos entregando',
          ],
          correct: 2,
        },
        {
          question:
            '¿Porque opción de la TIM realizarías efectivas estas recogidas? UXU?',
          options: [
            'Opción 7 Recogida efectiva',
            'Opción 10 Recogida AGW',
            'Opción 11 Recogida UXU',
            'Opción 5 Liquidar Guía]',
          ],
          correct: 2,
        },
        {
          question: '¿Que es una recogida FC?',
          options: [
            'Recogida a un corporativo con autorización para cargar a la cuenta',
            'Una recogida donde el remitente nos cancela el flete, en el momento que recoge',
            'Un dinero que el remitente nos debe de cancelar por concepto al valor del producto',
            'Todas las anteriores son correctas',
          ],
          correct: 0,
        },
      ],
    },
    'Contralor GOO': {
      questions: [
        {
          question: 'La EIE debemos colocarla Cuando?',
          options: [
            'Cuando Llegamos a la terminal',
            'Cuando Visitamos el destinatario y se presenta una novedad',
            'Cuando voy a entregar la unidad a NYS',
            'Ninguna de las anteriores',
          ],
          correct: 1,
        },
      ],
    },
    Reexpediciones: {
      questions: [
        {
          question: '¿Cuál de las siguientes opciones son tipos de rutas?',
          options: [
            'Cuenta corriente, mercancía, Flete pago',
            'Aprendizaje, mejoramiento, Diferenciadora',
            'Local, doméstica, nacional, reexpedición',
            'Ninguna de las anteriores',
          ],
          correct: 2,
        },
      ],
    },
    Servicios: {
      questions: [
        {
          question:
            'Las siglas que identifican los productos:¿Mercancía – ¿Radicación de documentos - ¿Firma de documentos – ¿Paquete, en su orden son?',
          options: [
            'CC – RD – CT – PAQ',
            'FCE – MCIA – CM – FD',
            'FD – PAQ – RD – MCIA',
            'FD – PAQ – RD – MCIA',
          ],
          correct: 2,
        },
        {
          question:
            '¿Es la Ruta que se realiza entre terminales Coordinadora, Origen – Destino? ¿Se realiza con vehículos de alta capacidad como tracto camiones(mulas)?',
          options: [
            'Ruta de reexpedición',
            'Ruta Nacional',
            'Población directa',
            'Ruta Domestica',
          ],
          correct: 1,
        },
        {
          question: '¿Cuáles son las funciones del empaque?',
          options: [
            'Proteger, contener',
            'Conservar y facilitar la distribución',
            'A Y B son correctas',
            'Ninguna de las anteriores',
          ],
          correct: 2,
        },
        {
          question: '¿Unidades que se mueven por fuera de las bandas?',
          options: [
            'Exhibidores, varillas, bultos',
            'Cajas y baúles',
            'Persianas, autopartes',
            'A y C son correctas',
          ],
          correct: 3,
        },
        {
          question:
            'Son algunas de las condiciones para realizar de forma correcta un arrume en un vehículo de ruta nacional:',
          options: [
            'Iniciar el arrume de piso a techo y de pared a pared',
            'Las unidades de empaque deben entrelazar como “ladrillos” para generar resistencia en el arrume y evitar su movimiento en el transporte.',
            'Los huacales, cuñetes y canecas por su peso y la resistencia del empaque son base de arrume',
            'Todas las anteriores',
          ],
          correct: 3,
        },
        {
          question: '¿Qué es un Rotulo? “Única respuesta”',
          options: [
            'Es la identificación de la unidad y lo realizan principalmente los clientes de FP y FCE. Contiene los datos básicos del envío',
            'Conservar y facilitar la distribución',
            'No es necesario en la logística',
            'Ninguna de las anteriores',
          ],
          correct: 0,
        },
        {
          question:
            '¿Los clientes corporativos y de contado tienen los siguientes fletes?',
          options: [
            'RD -FD',
            'FP - FCE – CC – AS',
            'RCE – CT',
            'Ninguna de las anteriores',
          ],
          correct: 3,
        },
        {
          question:
            '¿Es el proceso de lectura dentro del ciclo del servicio realizado a la etiqueta inteligente o a un código dummy asociado, para garantizar el control de ubicación de la unidad?',
          options: ['Toque', 'Clasificación', 'Control ', 'Checkpoint'],
          correct: 3,
        },
      ],
    },
    // Terminales: {},
  };

  const colors = ['#FF0000', '#FF7F00', '#4B0082', '#00a800', '#0000FF'];

  const [winnerValue, setWinnerValue] = useState(null);
  const [winnerIndex, setWinnerIndex] = useState(null);
  const childRef = useRef(null);

  const [visibleModal, setVisibleModal] = useState(false);

  const [questionShow, setQuestionShow] = useState(null);

  const [viewImage, setViewImage] = useState(0);

  const wheelOptions = {
    rewards: categories,
    knobSize: 18,
    borderWidth: 1,
    borderColor: 'transparent',
    innerRadius: 18,
    duration: 3500,
    backgroundColor: 'transparent',
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
          fontSize: 35,
          fontWeight: '500',
          color: '#fff',
        }}>
        {categories[winnerIndex]}
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
