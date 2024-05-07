import { Image, Text } from 'react-native';
import { CalendarData, DiaryData } from '../../../types/datatype';
import * as S from './style';

type ItemProps = {
  item: DiaryData | CalendarData;
  onPress: () => void;
};

export function DiaryCard({ item, onPress }: ItemProps) {
  const day: Date = new Date(item.createdAt);
  const month: number = day.getMonth() + 1;
  const date: number = day.getDate();

  return (
    <S.SingleDiaryContainer onPress={onPress}>
      <Image source={{ uri: item.imgUrl }} style={{ height: 200, width: '100%' }} />
      <S.SingleDiaryContent>
        <S.SingleDiaryDates>
          <S.SingleDiaryDate>{month}</S.SingleDiaryDate>
          <S.SingleDiaryDate>{date}</S.SingleDiaryDate>
        </S.SingleDiaryDates>
        <Text>{item.content}</Text>
      </S.SingleDiaryContent>
    </S.SingleDiaryContainer>
  );
}