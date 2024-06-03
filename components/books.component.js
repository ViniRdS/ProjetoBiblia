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
    <TouchableOpacity onPress={() => onSelectBook(item.abbrev.pt)}>
      <Text style={styles.item}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button title="Antigo Testamento" onPress={() => handleTestamentSelect('VT')} />
        <Button title="Novo Testamento" onPress={() => handleTestamentSelect('NT')} />
      </View>
      {selectedTestament && (
        <FlatList
          data={filterBooksByTestament(selectedTestament)}
          keyExtractor={(item) => item.abbrev.pt}
          renderItem={renderBookItem}
        />
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
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});

export default Books;
