import React from 'react';
import * as S from './style';

interface SearchBarProps {
  filterText: string;
  setFilterText: (text: string) => void;
}

function SearchBar({ filterText, setFilterText }: SearchBarProps) {
  return <S.Search placeholder="키워드를 입력해주세요." onChangeText={setFilterText} value={filterText} />;
}

export default SearchBar;