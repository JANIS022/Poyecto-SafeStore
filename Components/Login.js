import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Image, TouchableOpacity } from 'react-native';

const Login = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api-registros.onrender.com/registros', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setData(data);
        } else {
          throw new Error('Error al obtener los datos');
        }
      } catch (error) {
        setError('Error de conexión');
      }
    };

    fetchData();
  }, []);

  const checkCredentials = () => {
    const trimmedCorreo = correo.trim();
    const trimmedContraseña = contraseña.trim();
    const user = data.find(item => {
      const itemCorreo = item.Correo.trim();
      const itemContraseña = item.Contraseña.trim();
      return itemCorreo.toLowerCase() === trimmedCorreo.toLowerCase() && itemContraseña === trimmedContraseña;
    });
    if (user) {
      setIsLoggedIn(true);
    } else {
      setError('Usuario no encontrado');
    }
  }

  if (isLoggedIn) {
    navigation.navigate('Inicio');
  }

  return (
    <View style={styles.container}>
      <Image
        source={require('../img/logos.png')}
        style={[styles.menuButton, { marginBottom: 20 }]}
      />
      <Text style={[styles.title, { color: '#FFF', marginBottom: 20 }]}>Iniciar Sesion</Text>
      <Image
        source={require('../img/tienda.png')}
        style={[styles.image, { marginBottom: 20 }]}
      />
      {error ? (
        <Text style={[styles.error, { color: '#FFF', marginBottom: 20 }]}>{error}</Text>
      ) : (
        <>
        <Text style={styles.buttonText}>Correo:</Text>
          <TextInput
            style={[styles.input, { color: '#FFF', marginBottom: 20 }]}
            placeholder="Correo"
            onChangeText={setCorreo}
            value={correo}
          />
          <Text style={styles.buttonText}>Contraseña:</Text>
          <TextInput
            style={[styles.input, { color: '#FFF', marginBottom: 20 }]}
            placeholder="Contraseña"
            onChangeText={setContraseña}
            value={contraseña}
            secureTextEntry={true}
          />

          <TouchableOpacity
            style={styles.buttonSecondary}
            onPress={checkCredentials}
          >
            <Text style={[styles.buttonTexts, { color: '#07B0F2' }]}>Ingresar</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#031A44',
  },
  input: {
    borderWidth: 1,
    borderColor: '#FFF',
    borderRadius: 5,
    padding: 10,
    width: 300,
  },
  inputWrapper: {
    marginBottom: 20,
  },
  error: {
    color: 'red',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  menuButton: {
    width: 80,
    height: 80,
    top: 0,
    left: 140,
    zIndex: 0,
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
    fontWeight: 'bold'
  },
  buttonText: {
    fontSize: 16,
    color: '#FFF',
    fontWeight: 'bold',
    right: 130,
  },
});

export default Login;
