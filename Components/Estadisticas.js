import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { BarChart, XAxis } from 'react-native-svg-charts';
import { Text } from 'react-native-svg';

const Estadisticas = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simular una solicitud a la API (reemplazar con tu lógica de solicitud real)
    const fetchData = async () => {
      try {
        // Aquí realizarías tu solicitud real a la API y actualizarías los datos de estado con los resultados
        // Supongamos que la API devuelve los datos en el siguiente formato:
        const response = await fetch('http://localhost:3001/movimiento/${idMovimiento}');
        const apiData = await response.json();
        setData(apiData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const horasDelDia = Array.from({ length: 24 }, (_, i) => i); // Array de horas del día (0-23)

  // Obtener la hora más repetitiva
  const horaMasRepetitiva = horasDelDia.reduce((maxIndex, currIndex) => (data[currIndex] > data[maxIndex] ? currIndex : maxIndex), 0);

  // Función para formatear la hora en HH:mm
  const formatHour = (hour) => {
    const paddedHour = hour.toString().padStart(2, '0');
    return `${paddedHour}:00`;
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <>
          <Text style={styles.title}>Hora más repetitiva: {formatHour(horaMasRepetitiva)}</Text>
          <View style={styles.chartContainer}>
            <BarChart
              style={{ flex: 1 }}
              data={data}
              svg={{ fill: 'rgba(0, 0, 255, 0.7)' }}
              contentInset={{ top: 10, bottom: 10 }}
              gridMin={0}
            />
            <XAxis
              style={{ marginHorizontal: -10 }}
              data={horasDelDia}
              formatLabel={(value, index) => formatHour(value)}
              contentInset={{ left: 10, right: 10 }}
              svg={{ fontSize: 10, fill: 'black' }}
            />
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  chartContainer: {
    flexDirection: 'row',
    height: 200,
    width: '100%',
  },
});

export default Estadisticas;
