import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import axios from 'axios';

export default function RegisterScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');  // Para mostrar mensajes de éxito o error

  const handleRegister = () => {
    // Resetear el mensaje al intentar registrar
    setMessage('');

    // Verificar que todos los campos estén llenos
    if (username && email && password && phone) {
      axios.post('http://localhost/malan-proyecto/register.php', {
        username,
        email,
        password,
        phone
      })
      .then(response => {
        if (response.data.success) {
          setMessage('Registro exitoso');  // Mostrar mensaje de éxito
          
          // Limpiar los campos del formulario
          setUsername('');
          setEmail('');
          setPassword('');
          setPhone('');
        } else {
          setMessage(response.data.error || 'Registrado Correctamente');  // Mostrar mensaje de error
        }
      })
      .catch(error => {
        setMessage('Error: ' + error.message);  // Mostrar error
      });
    } else {
      setMessage('Por favor, completa todos los campos');  // Mostrar mensaje si los campos no están completos
    }
  };

  return (
    <View style={styles.container}>
      <TextInput 
        style={styles.input} 
        placeholder="Nombre de usuario" 
        value={username} 
        onChangeText={setUsername} 
      />
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
      <TextInput 
        style={styles.input} 
        placeholder="Teléfono" 
        value={phone} 
        onChangeText={setPhone} 
      />
      <Button title="Registrar" onPress={handleRegister} />
      {/* Mostrar el mensaje debajo del formulario */}
      {message ? <Text style={styles.message}>{message}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8
  },
  message: {
    marginTop: 12,
    color: 'red',
    textAlign: 'center',
  }
});
