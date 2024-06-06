import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet, ActivityIndicator } from 'react-native';
import { getVerses } from '../services/biblia.service';

const Verses = ({ version, bookName, bookAbbrev, chapter, lastChapter, onBack, onPreviousChapter, onNextChapter }) => {
  const [verses, setVerses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVerses = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getVerses(version, bookAbbrev, chapter);
        setVerses(data);
      } catch (error) {
        setError('Falha ao buscar versículos. A API atingiu o seu limite. Tente novamente mais tarde.');
      } finally {
        setLoading(false);
      }
    };
    fetchVerses();
  }, [version, bookAbbrev, chapter]);

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
      <Text style={styles.title}>{bookName} - Capítulo {chapter}</Text>
      <FlatList
        data={verses}
        keyExtractor={(item) => item.number.toString()}
        renderItem={({ item }) => (
          <Text style={styles.item}>{item.number}. {item.text}</Text>
        )}
      />
      <View style={[styles.navigationButtons, { justifyContent: chapter > 1 && chapter < lastChapter ? 'space-between' : 'center' }]}>
        {chapter > 1 && <Button title="Anterior" onPress={onPreviousChapter} />}
        {chapter < lastChapter && <Button title="Próximo" onPress={onNextChapter} />}
      </View>
      <Button title="Voltar" onPress={onBack} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  item: {
    padding: 10,
    fontSize: 18,
  },
  navigationButtons: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
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
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
});

export default Verses;
