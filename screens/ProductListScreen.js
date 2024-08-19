// ProductListScreen.js
import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, SafeAreaView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProductListScreen({ navigation }) {
  const [products, setProducts] = React.useState([
    { id: 1, name: 'Maiz gratinada ', price: 10, imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9B5tiZiaEtHx7-LMaEH2kKOm9Gx2ffdyEUA&s' },
    { id: 2, name: 'Brocoli', price: 20, imageUrl: 'https://st.depositphotos.com/5171149/54723/i/450/depositphotos_547237936-stock-photo-fresh-broccoli-isolated-white-background.jpg' },
    { id: 3, name: 'Ensalada', price: 45, imageUrl: 'https://origen100x100.com/wp-content/uploads/2022/02/menestra-con-verduras-bio-origen100x100-min-300x300.png' },
    { id: 4, name: 'Ensalada cesar', price: 30, imageUrl: 'https://origen100x100.com/wp-content/uploads/2021/05/plantilla-web-origen100x10x0-300x300.jpg' },
    { id: 5, name: 'Vegetales', price: 15, imageUrl: 'https://origen100x100.com/wp-content/uploads/2022/02/patata-con-menestra-de-verduras-origen100x100-min-300x300.png' },
    { id: 6, name: 'Ensalada fria', price: 20, imageUrl: 'https://origen100x100.com/wp-content/uploads/2022/02/patata-con-judia-verde-bio-origen100x100-min-300x300.png' },
  ]);

  const addToCart = async (product) => {
    try {
      // Obtener carrito actual
      const existingCart = await AsyncStorage.getItem('cart');
      const cart = existingCart ? JSON.parse(existingCart) : [];

      // Agregar producto al carrito
      cart.push(product);

      // Guardar carrito actualizado
      await AsyncStorage.setItem('cart', JSON.stringify(cart));

      Alert.alert('Éxito', 'Producto agregado al carrito');
    } catch (error) {
      Alert.alert('Error', 'No se pudo agregar el producto al carrito');
    }
  };

  const renderProductItem = ({ item }) => (
    <View style={styles.productItem}>
      <Image source={{ uri: item.imageUrl }} style={styles.productImage} />
      <View style={styles.productDetails}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productPrice}>${item.price}</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={() => addToCart(item)}>
        <Text style={styles.buttonText}>Agregar al carrito</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Escoge tu producto</Text>
        <TouchableOpacity style={styles.cartButton} onPress={() => navigation.navigate('Cart')}>
          <Text style={styles.buttonText}>Ver Carrito</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderProductItem}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    elevation: 2, // sombra en Android
    shadowColor: '#000', // sombra en iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  productItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginBottom: 10,
    borderRadius: 8,
    backgroundColor: '#fff',
    elevation: 2, // para sombra en Android
    shadowColor: '#000', // sombra en iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 16
  },
  productDetails: {
    flex: 1
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4
  },
  productPrice: {
    fontSize: 16,
    color: '#888'
  },
  button: {
    backgroundColor: '#007BFF',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginLeft: 16
  },
  buttonText: {
    color: '#fff',
    fontSize: 16
  },
  cartButton: {
    backgroundColor: '#28a745',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
  }
});
