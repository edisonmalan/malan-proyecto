import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import axios from 'axios';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');  // Para mostrar mensajes de error

  const handleLogin = () => {
    // Resetear el mensaje al intentar iniciar sesión
    setMessage('');

    axios.post('http://localhost/malan-proyecto/login.php', {
      email,
      password
    })
    .then(response => {
      if (response.data.success) {
        // Redirigir a la lista de productos si el login es exitoso
        navigation.navigate('ProductList');
      } else {
        // Mostrar mensaje de credenciales incorrectas
        setMessage('El correo electrónico o la contraseña son incorrectos.');
      }
    })
    .catch(error => {
      setMessage('Error: ' + error.message);  // Mostrar error en caso de fallo en la solicitud
    });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <View style={styles.buttonContainer}>
        <Button title="Iniciar Sesión" onPress={handleLogin} />
        <View style={styles.buttonSpacing} />
        <Button
          title="Registrar"
          onPress={() => navigation.navigate('Register')}
        />
      </View>
      {/* Mostrar el mensaje debajo del formulario */}
      {message ? <Text style={styles.message}>{message}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  buttonContainer: {
    marginVertical: 10,
  },
  buttonSpacing: {
    marginVertical: 8,  // Espacio entre los dos botones
  },
  message: {
    marginTop: 12,
    color: 'red',
    textAlign: 'center',
  },
});
