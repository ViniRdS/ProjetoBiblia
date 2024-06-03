import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import { getVerses } from '../services/biblia.service';

const Verses = ({ version, bookAbbrev, chapter, onBack }) => {
  const [verses, setVerses] = useState([]);

  useEffect(() => {
    const fetchVerses = async () => {
      const data = await getVerses(version, bookAbbrev, chapter);
      setVerses(data);
    };
    fetchVerses();
  }, [version, bookAbbrev, chapter]);

  return (
    <View style={styles.container}>
      <Button title="Voltar" onPress={onBack} />
      <FlatList
        data={verses}
        keyExtractor={(item) => item.number.toString()}
        renderItem={({ item }) => (
          <Text style={styles.item}>{item.number}. {item.text}</Text>
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
  },
});

export default Verses;
