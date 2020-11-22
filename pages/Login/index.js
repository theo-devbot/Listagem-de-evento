import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';

//async storage
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ( {navigation} ) => {

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const salvar = async (value) => {
    try {
      await AsyncStorage.setItem('@jwt', value)
    } catch (e) {
      // saving error
    }
  }

  const Logar = () => {

    const corpo = {
        email: email,
        senha : senha
    }
      
    fetch('http://192.168.0.17:5000/api/Account/login', {
        method: 'POST',
        headers :{
            'Content-type' : 'application/json'
        },
        body : JSON.stringify(corpo)
    })
    .then(response => response.json())
    .then(data => {

      if(data.status !== 404){
        alert('seja bem vindo');
        console.log(data.token);
        salvar(data.token);
        navigation.push('Autenticado');
      }else{
        alert('email ou senha invalidos!')
      }
    })
  }
    return(
        <View style={styles.container} >
            <TextInput
                style={styles.imput}
                onChangeText={text => setEmail(text)}
                value={email}
                placeholder="Digite seu email"
            />

            <TextInput
                style={styles.imput}
                onChangeText={text => setSenha(text)}
                value={senha}
                placeholder="Digite sua senha"
                secureTextEntry={true}
            />

            <TouchableOpacity
                style={styles.button}
                onPress={Logar}
            >
                <Text style={styles.textButton}>Entrar</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    imput : {
        width: '90%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginTop: 20,
        padding: 5,
        borderRadius: 6,
    },
    button : {
        backgroundColor : 'gray',
        width: '90%',
        padding : 10,
        borderRadius : 6,
        marginTop : 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textButton : {
      color : 'white',
    }
  });

export default Login;