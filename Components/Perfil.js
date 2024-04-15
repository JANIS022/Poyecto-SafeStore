import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native';
import axios from 'axios'; 

const Perfil = ({ navigation }) => {
  const [nombreTienda, setNombreTienda] = useState('');
  const [tienda, setTienda] = useState(null); // Estado para almacenar los datos de la tienda

  const buscarTienda = () => {
    // Realizar solicitud a la API para verificar si la tienda existe
    axios.get(`https://safe-store.onrender.com/tienda/${nombreTienda}`)
      .then(response => {
        // Si la tienda existe, actualizar el estado con los datos de la tienda
        setTienda(response.data);
      })
      .catch(error => {
        console.error('Error al buscar la tienda:', error);
        // Manejar el error apropiadamente, por ejemplo, mostrar un mensaje al usuario
      });
  };

  return (
    <View style={styles.container}>
        <Image
          source={require('../img/logos.png')}
          style={[ styles.menuButton]}
        />
      <Text style={styles.title}>Información de la Tienda</Text>


      <View style={styles.inputWrapper}>
        <TextInput
          style={[styles.input, { color: '#FFF' }]}
          placeholder="Nombre de la tienda"
          value={nombreTienda}
          onChangeText={setNombreTienda}
        />
      </View>

      <TouchableOpacity
        style={styles.buttonPrimary}
        onPress={buscarTienda}
      >
        <Text style={styles.buttonText}>Buscar Tienda</Text>
      </TouchableOpacity>
      
      {tienda && (
        <>
          <Image
            source={require('../img/tienda2.png')}
            style={styles.image}
          />
          <Text style={styles.text}>Nombre de la Tienda: {tienda.nombre}</Text>
          <Text style={styles.text}>Calle: {tienda.calle}</Text>
          <Text style={styles.text}>Municipio: {tienda.municipio}</Text>
          <Text style={styles.text}>Colonia: {tienda.colonia}</Text>
        </>
      )}
      <TouchableOpacity
        style={styles.buttonPrimary}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.buttonText}>Regresar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  inputWrapper: {
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain'
  },
  input: {
    borderWidth: 1,
    borderColor: '#FFF',
    borderRadius: 5,
    padding: 10,
    width: 300,
  },
  buttonPrimary: {
    width: 200,
    height: 40,
    backgroundColor: '#07B0F2',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10
  },
  buttonText: {
    fontSize: 16,
    color: '#FFF',
    fontWeight: 'bold'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#031A44' 
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#FFF' 
  },
  text: {
    color: '#FFF'
  },
  menuButton: {
    width: 80,
    height: 80,
    top: 0,
    left: 140,
    zIndex: 0,
  }, 
});

export default Perfil;
