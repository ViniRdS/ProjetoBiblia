import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { getBooks } from '../services/biblia.service';

const Books = ({ onSelectBook }) => {
  const [books, setBooks] = useState([]);
  const [selectedTestament, setSelectedTestament] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getBooks();
        setBooks(data);
      } catch (error) {
        setError('Falha ao buscar livros. Tente novamente mais tarde.');
      } finally {
        setLoading(false);
      }
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

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button title="Antigo Testamento" onPress={() => handleTestamentSelect('VT')} />
        <View style={styles.buttonSpacer} />
        <Button title="Novo Testamento" onPress={() => handleTestamentSelect('NT')} />
      </View>
      {selectedTestament ? (
        <FlatList
          data={filterBooksByTestament(selectedTestament)}
          keyExtractor={(item) => item.abbrev.pt}
          renderItem={renderBookItem}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <View style={styles.instructionsContainer}>
          <Text style={styles.instructionsText}>Selecione um testamento para começar a leitura.</Text>
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
    padding: 10,
    backgroundColor: '#f9f9f9',
    marginBottom: 10,
    borderRadius: 5,
  },
  itemText: {
    fontSize: 18,
    color: '#333',
  },
  listContainer: {
    paddingBottom: 20,
  },
  instructionsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e3e3e3',
    padding: 10,
    borderRadius: 5,
  },
  instructionsText: {
    fontSize: 16,
    color: '#666',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  errorText: {
    fontSize: 16,
    color: 'red',
  },
});

export default Books;
