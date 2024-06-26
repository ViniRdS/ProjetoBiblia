import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Books from './components/books.component';
import Chapters from './components/chapters.component';
import Verses from './components/verses.component';
import { getBookDetails } from './services/biblia.service';

export default function App() {
  const [selectedBook, setSelectedBook] = useState(null);
  const [selectedBookName, setSelectedBookName] = useState('');
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [chapterCount, setChapterCount] = useState(0);

  const handleSelectBook = async (bookAbbrev) => {
    setSelectedBook(bookAbbrev);

    const bookDetails = await getBookDetails(bookAbbrev);
    setChapterCount(bookDetails.chapters);
    setSelectedBookName(bookDetails.name);
  };

  const handleSelectChapter = (chapter) => {
    setSelectedChapter(chapter);
  };

  const handleBackToBooks = () => {
    setSelectedBook(null);
    setSelectedBookName('');
    setSelectedChapter(null);
  };

  const handleBackToChapters = () => {
    setSelectedChapter(null);
  };

  const handlePreviousChapter = () => {
    if (selectedChapter > 1) {
      setSelectedChapter(selectedChapter - 1);
    }
  };

  const handleNextChapter = () => {
    if (selectedChapter < chapterCount) {
      setSelectedChapter(selectedChapter + 1);
    }
  };

  return (
    <View style={styles.container}>
      
      {!selectedBook ? (
        <Books onSelectBook={handleSelectBook} />
      ) : !selectedChapter ? (
        <Chapters bookAbbrev={selectedBook} onSelectChapter={handleSelectChapter} onBack={handleBackToBooks} />
      ) : (
        <Verses
          version="nvi"
          bookName={selectedBookName}
          bookAbbrev={selectedBook}
          chapter={selectedChapter}
          lastChapter={chapterCount}
          onBack={handleBackToChapters}
          onPreviousChapter={handlePreviousChapter}
          onNextChapter={handleNextChapter}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});
