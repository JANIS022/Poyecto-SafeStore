import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Inicio from './Components/Inicio';
import Perfil from './Components/Perfil';
import Detalles from './Components/Detalles';
import Estadisticas from './Components/Estadisticas';
import Login from './Components/Login';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Inicio" component={Inicio} options={{ title: 'Inicio' }} />
        <Stack.Screen name="Perfil" component={Perfil} options={{ title: 'Perfil' }} />
        <Stack.Screen name="Detalles" component={Detalles} options={{ title: 'Detalles' }} />
       <Stack.Screen name="Estadisticas" component={Estadisticas} options={{ title: 'Estadísticas' }} />
       <Stack.Screen name="Login" component={Login} options={{ title: 'Login' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;