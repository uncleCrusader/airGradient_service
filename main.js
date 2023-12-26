const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

// Función para actualizar los datos
const actualizarDatos = async () => {
  try {
    // Realizar solicitud GET a la primera API
    const response = await axios.get('https://api.airgradient.com/public/api/v1/locations/measures/current?token=21df0699-d3b4-417b-8677-66e820fe0c98');

    // Verificar si hay datos en la respuesta
    if (!response.data || response.data.length === 0) {
      console.error('Error: No se encontraron datos en la respuesta de la primera API.');
      return;
    }

    // Extraer los datos necesarios y construir el payload
    const data = response.data[0];
    const payload = {
      locationId: data.locationId,
      locationName: data.locationName,
      pm01: data.pm01,
      pm02: data.pm02,
      pm10: data.pm10,
      pm003Count: data.pm003Count,
      atmp: data.atmp,
      rhum: data.rhum,
      rco2: data.rco2,
      tvoc: data.tvoc,
      wifi: data.wifi,
      timestamp: data.timestamp,
      ledMode: data.ledMode,
      ledCo2Threshold1: data.ledCo2Threshold1,
      ledCo2Threshold2: data.ledCo2Threshold2,
      ledCo2ThresholdEnd: data.ledCo2ThresholdEnd,
      serialno: data.serialno,
      firmwareVersion: data.firmwareVersion,
      tvocIndex: data.tvocIndex,
      noxIndex: data.noxIndex,
    };

    console.log('Payload:', payload);

    // Publicar el payload en la segunda API
    const responseSecondAPI = await axios.post('https://multiaire.smartaraucania.org/api/v1/Xk9AphxBraNrabpzEYY0/telemetry', payload);

    console.log('Datos actualizados correctamente en la segunda API:', responseSecondAPI.data);
  } catch (error) {
    console.error('Error al actualizar datos:', error.message);

    if (error.response) {
      console.error('Respuesta de la segunda API:', error.response.data);
    }
  }
};

// Ejecutar la tarea cada 5 segundos
setInterval(actualizarDatos, 30000);

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor Express en http://localhost:${port}`);
});
