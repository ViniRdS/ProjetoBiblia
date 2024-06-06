import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Button, StyleSheet, ActivityIndicator } from 'react-native';
import { getChapters } from '../services/biblia.service';

const Chapters = ({ bookAbbrev, onSelectChapter, onBack }) => {
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChapters = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getChapters(bookAbbrev);
        setChapters(Array.from({ length: data }, (_, i) => i + 1));
      } catch (error) {
        setError('Falha ao buscar capítulos. Tente novamente mais tarde.');
      } finally {
        setLoading(false);
      }
    };
    fetchChapters();
  }, [bookAbbrev]);

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
        <Button title="Voltar" onPress={onBack} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Button title="Voltar" onPress={onBack} />
      <FlatList
        data={chapters}
        keyExtractor={(item) => item.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => onSelectChapter(item)} style={styles.item}>
            <Text style={styles.itemText}>Capítulo {item}</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.centeredList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
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
  centeredList: {
    paddingBottom: 20,
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

export default Chapters;
