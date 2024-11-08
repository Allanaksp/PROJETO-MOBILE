import React, { useState, useEffect } from 'react';
import { View, Text, Button, ScrollView } from 'react-native';

const HomeScreen = ({ navigation }) => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    // Chamando a API do backend para listar os livros
    fetch('http://localhost:3000/api/books')
      .then((response) => response.json())
      .then((data) => setBooks(data))
      .catch((error) => console.log('Erro ao buscar livros:', error));
  }, []);

  const handleDelete = (id) => {
    fetch(`http://localhost:3000/api/books/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        const updatedBooks = books.filter((book) => book.id !== id);
        setBooks(updatedBooks);
      })
      .catch((error) => console.log('Erro ao excluir livro:', error));
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <ScrollView>
        {books.map((book) => (
          <View
            key={book.id}
            style={{
              marginBottom: 15,
              padding: 10,
              borderWidth: 1,
              borderColor: '#ddd',
              borderRadius: 5,
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{book.title}</Text>
            <Text>{book.author}</Text>
            <Button title="Editar" onPress={() => navigation.navigate('EditBook', { id: book.id })} />
            <Button title="Deletar" onPress={() => handleDelete(book.id)} color="red" />
          </View>
        ))}
      </ScrollView>
      <Button title="Adicionar Livro" onPress={() => navigation.navigate('AddBook')} />
    </View>
  );
};

export default HomeScreen;
