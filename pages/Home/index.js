import React, {useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import {SafeAreaView, View, FlatList, StyleSheet, Text } from 'react-native';

//async storage
import AsyncStorage from '@react-native-async-storage/async-storage';
import ItemEvento from '../../components';

const Home = () => {

    const [token, setToken] = useState('');
    const [eventos, setEventos] = useState([])

    // const getToken = async () => {
    //     setToken(await AsyncStorage.getItem('@jwt'))
    // }

    useEffect(()=>{
        // getToken();
        listar();
    }, [])

    const styles = StyleSheet.create({
        container: {
          flex: 1,
          marginTop: StatusBar.currentHeight || 0,
        },
        item: {
          backgroundColor: '#f9c2ff',
          padding: 20,
          marginVertical: 8,
          marginHorizontal: 16,
        },
        title: {
          fontSize: 32,
        },
      });

    const listar = () => {
        fetch( 'http://192.168.0.17:5000/api/eventos',{
            method : 'GET'
        })
        .then(response => response.json())
        .then(data => {
            setEventos(data.data)
        })
        .catch(err => console.log(err));
    }

    const renderItem = (evento) => {
      return (
          <ItemEvento 
              nome={evento.item.nome} 
              imagem={evento.item.urlImagem}
              link={evento.item.link} />
      )
  }   

    return(
        <SafeAreaView style={styles.container}>
        <FlatList
            data={eventos}
            renderItem={renderItem}
            keyExtractor={item => item.id}
        />
        </SafeAreaView>
    )
}

export default Home;