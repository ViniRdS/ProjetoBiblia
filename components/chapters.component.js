import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Button, StyleSheet } from 'react-native';
import { getChapters } from '../services/biblia.service';
import { useError } from '../contexts/ErrorContext';

const Chapters = ({ bookAbbrev, onSelectChapter, onBack }) => {
  const [chapters, setChapters] = useState([]);

  useEffect(() => {
    const fetchChapters = async () => {
      const data = await getChapters(bookAbbrev);
      setChapters(Array.from({ length: data }, (_, i) => i + 1));
    };
    fetchChapters();
  }, [bookAbbrev]);

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
    marginBottom: 10,
  },
  itemText: {
    fontSize: 18,
  },
  centeredList: {
    alignItems: 'center',
  },
});

export default Chapters;
