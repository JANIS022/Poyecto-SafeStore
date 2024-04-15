import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity } from 'react-native';
import axios from 'axios';

const Detalles = () => {
  const [idMovimiento, setIdMovimiento] = useState('');
  const [movimiento, setMovimiento] = useState(null);

  const handleBuscarMovimiento = async () => {
    try {
      const response = await axios.get(`https://api-sensor.onrender.com/movimiento/${idMovimiento}`);
      setMovimiento(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Información del Sistema</Text>
      <Image
        source={require('../img/tienda2.png')}
        style={styles.image}
      />
      <TextInput
        placeholder="Ingrese el ID del movimiento"
        value={idMovimiento}
        onChangeText={setIdMovimiento}
        keyboardType="numeric"
        style={[styles.input, { color: '#FFF', marginBottom: 20 }]}
      />

      <TouchableOpacity
        style={styles.buttonSecondary}
        onPress={handleBuscarMovimiento}
      >
        <Text style={styles.buttonText}>Buscar Movimiento</Text>
      </TouchableOpacity>

      {movimiento && (
        <View>
          <View style={styles.card}>
            <Text style={styles.cardText}>ID: {movimiento.id_movimiento}</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardText}>Mensaje: {movimiento.mensaje}</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardText}>Fecha de Creación: {movimiento.fecha_creacion}</Text>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#031A44'
  },
  input: {
    borderWidth: 1,
    borderColor: '#FFF',
    borderRadius: 5,
    padding: 10,
    width: 300,
  },
  button: {
    width: 200,
    height: 40,
    backgroundColor: '#FFF',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10
  },
  buttonText: {
    fontSize: 16,
    color: '#07B0F2',
    fontWeight: 'bold'
  },

  buttonSecondary: {
    width: 200,
    height: 40,
    backgroundColor: '#FFF',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10
  },

  buttonTexts: {
    fontSize: 16,
    color: '#07B0F2',
    fontWeight: 'bold'
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
  card: {
    backgroundColor: '#07B0F2',
    padding: 10,
    borderRadius: 10,
    marginTop: 20
  },
  cardText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  }
});

export default Detalles;
