import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { getBooks } from '../services/biblia.service';

const Books = ({ onSelectBook }) => {
  const [books, setBooks] = useState([]);
  const [selectedTestament, setSelectedTestament] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      const data = await getBooks();
      setBooks(data);
    };
    fetchBooks();
  }, []);

  const filterBooksByTestament = (testament) => {
    return books.filter(book => book.testament === testament);
  };

  const handleTestamentSelect = (testament) => {
    setSelectedTestament(testament);
  };

  const renderBookItem = ({ item }) => (
    <TouchableOpacity onPress={() => onSelectBook(item.abbrev.pt)} style={styles.item}>
      <Text style={styles.itemText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button title="Antigo Testamento" onPress={() => handleTestamentSelect('VT')} />
        <View style={styles.buttonSpacer} /> 
        <Button title="Novo Testamento" onPress={() => handleTestamentSelect('NT')} />
      </View>
      {selectedTestament && (
        <FlatList
          data={filterBooksByTestament(selectedTestament)}
          keyExtractor={(item) => item.abbrev.pt}
          renderItem={renderBookItem}
          contentContainerStyle={styles.instructionsContainer}
        />
      )}
      {!selectedTestament && (
        <View style={styles.instructionsContainer}>
          <Text style={styles.instructionsText}>Selecione um livro para começar a leitura.</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  buttonSpacer: {
    width: 10,
  },
  item: {
    alignItems: 'center',
    marginBottom: 10,
  },
  itemText: {
    fontSize: 18,
  },
  instructionsContainer: {
    backgroundColor: '#e3e3e3',
    padding: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  instructionsText: {
    fontSize: 16,
  },
});

export default Books;