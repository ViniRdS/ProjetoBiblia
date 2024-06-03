import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Books from './components/books.component';
import Chapters from './components/chapters.component';
import Verses from './components/verses.component';

const App = () => {
  const [selectedBook, setSelectedBook] = useState(null);
  const [selectedChapter, setSelectedChapter] = useState(null);

  const handleSelectBook = (bookAbbrev) => {
    setSelectedBook(bookAbbrev);
    setSelectedChapter(null);
  };

  const handleSelectChapter = (chapter) => {
    setSelectedChapter(chapter);
  };

  const handleBackToBooks = () => {
    setSelectedBook(null);
  };

  const handleBackToChapters = () => {
    setSelectedChapter(null);
  };

  return (
    <View style={styles.container}>
      {!selectedBook && <Books onSelectBook={handleSelectBook} />}
      {selectedBook && !selectedChapter && (
        <Chapters bookAbbrev={selectedBook} onSelectChapter={handleSelectChapter} onBack={handleBackToBooks} />
      )}
      {selectedBook && selectedChapter && (
        <Verses version="nvi" bookAbbrev={selectedBook} chapter={selectedChapter} onBack={handleBackToChapters} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});

export default App;
