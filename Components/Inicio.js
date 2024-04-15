import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

const Inicio = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('Perfil')}>
        <Image
          source={require('../img/logos.png')}
          style={[ styles.menuButton]}
        />
      </TouchableOpacity>
      <Text style={styles.title}>Safe Store</Text>
      <View style={styles.buttonContainer}>
        <Image 
          source={require('../img/tienda.png')} 
          style={styles.image} 
        />

        <TouchableOpacity 
          style={styles.buttonPrimary} 
          onPress={() => navigation.navigate('Perfil')}
        >
          <Text style={styles.buttonText}>Perfil</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.buttonSecondary} 
          onPress={() => navigation.navigate('Detalles')}
        >
          <Text style={styles.buttonTexts}>Detalles</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({

  menuButton: {
    width: 80,
    height: 80,
    top: 1,
    left: 200,
    zIndex: 0,
  }, 
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#031A44'
  },
  title: {
    fontSize: 24,
    color: '#FFF'
  },
  buttonContainer: {
    marginTop: 20
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
  buttonSecondary: {
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
    color: '#FFF',
    fontWeight: 'bold'
  },
  buttonTexts: {
    fontSize: 16,
    color: '#07B0F2',
    fontWeight: 'bold'
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain'
  },
  imag: {
    width: 200,
    height: 200,

  }
});

export default Inicio;
