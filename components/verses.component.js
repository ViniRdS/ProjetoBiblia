import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import { getVerses } from '../services/biblia.service';
import { useError } from '../contexts/ErrorContext';

const Verses = ({ version, bookAbbrev, chapter, lastChapter, onBack, onPreviousChapter, onNextChapter }) => {
  const [verses, setVerses] = useState([]);

  useEffect(() => {
    const fetchVerses = async () => {
      const data = await getVerses(version, bookAbbrev, chapter, lastChapter);
      setVerses(data);
    };
    fetchVerses();
  }, [version, bookAbbrev, chapter, lastChapter]);

  return (
    <View style={styles.container}>
      <FlatList
        data={verses}
        keyExtractor={(item) => item.number.toString()}
        renderItem={({ item }) => (
          <Text style={styles.item}>{item.number}. {item.text}</Text>
        )}
      />
      <View style={[styles.navigationButtons, {justifyContent: chapter > 1 && chapter < lastChapter ? 'space-between' : 'center'}]}>
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
    marginBottom: 10, // Adiciona um pouco de espaço antes do botão "Voltar"
  },
});

export default Verses;
