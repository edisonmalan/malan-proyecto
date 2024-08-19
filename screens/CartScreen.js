import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CartScreen({ navigation }) {
  const [cartItems, setCartItems] = useState([]);
  const [purchaseConfirmed, setPurchaseConfirmed] = useState(false); // Nuevo estado para la confirmación de compra

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const existingCart = await AsyncStorage.getItem('cart');
        const cart = existingCart ? JSON.parse(existingCart) : [];
        setCartItems(cart);
      } catch (error) {
        Alert.alert('Error', 'No se pudo cargar el carrito');
      }
    };

    fetchCartItems();
  }, []);

  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  const confirmPurchase = async () => {
    try {
      // Lógica para confirmar la compra
      console.log('Compra confirmada');

      // Limpiar el carrito
      await AsyncStorage.removeItem('cart');
      setCartItems([]);

      // Mostrar mensaje de confirmación
      setPurchaseConfirmed(true);
    } catch (error) {
      Alert.alert('Error', 'No se pudo confirmar la compra');
    }
  };

  const renderCartItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Image source={{ uri: item.imageUrl }} style={styles.cartImage} />
      <View style={styles.cartDetails}>
        <Text style={styles.cartText}>{item.name} - ${item.price}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {!purchaseConfirmed ? (
        <>
          <FlatList
            data={cartItems}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderCartItem}
          />
          <Text style={styles.totalText}>Total: ${total.toFixed(2)}</Text>
          <TouchableOpacity style={styles.button} onPress={confirmPurchase}>
            <Text style={styles.buttonText}>Confirmar Compra</Text>
          </TouchableOpacity>
        </>
      ) : (
        <Text style={styles.confirmationText}>GRACIAS POR TU COMPRA</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff'
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
  },
  cartImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 16
  },
  cartDetails: {
    flex: 1
  },
  cartText: {
    fontSize: 16
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 16
  },
  button: {
    backgroundColor: '#007BFF',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16
  },
  buttonText: {
    color: '#fff',
    fontSize: 16
  },
  confirmationText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginTop: 20
  }
});
