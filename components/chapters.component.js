import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Button, StyleSheet } from 'react-native';
import { getChapters } from '../services/biblia.service';

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
          <TouchableOpacity onPress={() => onSelectChapter(item)}>
            <Text style={styles.item}>Capítulo {item}</Text>
          </TouchableOpacity>
        )}
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
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});

export default Chapters;
