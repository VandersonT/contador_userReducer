import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useReducer, useState } from 'react';

type reducerState = {
  count: number;
  name: string;
}

type reducerAction = {
  type: string,
  name?: any
}

const initialState: reducerState = { count: 0, name: 'Contador UR' }
const reducer = (state: reducerState, action: reducerAction) => {
  
  switch(action.type){
    case 'ADD':
      return {...state, count: state.count + 1};
      break;
    case 'DELETE':
      if(state.count > 0)
        return {...state, count: state.count - 1};
      break;
    case 'RESET':
      return initialState
      break;
    case 'NAME':
      return {...state, name: action.name};
      break;
  }
  
  return state;
}

export default function App() {

  const [ name, setName ] = useState('');

  const [ state, dispatch ] = useReducer(reducer, initialState);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{state.name}</Text>
      
      <Text style={styles.contador}>{state.count}</Text>

      <View style={styles.buttomBox}>

        <TouchableOpacity style={styles.button} onPress={() => dispatch({type:'DELETE'})}>
          <Text style={styles.buttonText}>Diminuir</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => dispatch({type:'ADD'})}>
          <Text style={styles.buttonText}>Aumentar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => dispatch({type:'RESET'})}>
          <Text style={styles.buttonText}>Resetar</Text>
        </TouchableOpacity>

        <View style={styles.newNameBox}>
          <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Digite um novo nome" />

          <TouchableOpacity style={styles.button} onPress={() => dispatch({type:'NAME', name: name})}>
            <Text style={styles.buttonText}>Mudar Nome</Text>
          </TouchableOpacity>
        </View>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 40,
    borderBottomWidth: 1,
    marginBottom: 30,
    paddingBottom: 10,
    borderBottomColor: '#333333',
    color: '#2196F3'
  },
  contador: {
    fontSize: 40,
    color: '#333333'
  },
  buttomBox: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginTop: 20
  },
  button: {
    backgroundColor: '#2196F3',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#2196F3',
    padding: 10,
    margin: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  newNameBox: {
    marginTop: 40
  },
  input: {
    width: 300,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 5,
    textAlign: 'center'
  },
});
