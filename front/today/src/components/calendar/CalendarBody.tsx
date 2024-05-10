// CalendarBody.tsx
import { useEffect, useState } from 'react';
import { Calendars } from '../../apis/CalendarApi';
import { dayType } from '../../types/calendartype/calendar';
import { CalendarData } from '../../types/datatype';
import { DiaryDetailProp } from '../../types/navigatortype/stack';
import * as S from './style';

type CalendarBodyProp = {
  year: number;
  month: number;
  date: number;
  navigation: DiaryDetailProp;
};
const dayOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const CalendarBody = ({ month, year, date, navigation }: CalendarBodyProp) => {
  // 날짜별 이미지 URL 매핑 객체 생성
  const [imageUrlByDate, setImageUrlByDate] = useState<{ [key: string]: string }>({});
  const TodayDate = year + '-' + ('00' + month.toString()).slice(-2) + '-' + ('00' + date.toString()).slice(-2);
  const [diaryData, setDiaryData] = useState<CalendarData[]>();

  // 한 달 일기 데이터 불러오기
  useEffect(() => {
    Calendars.getCalendars(TodayDate)
      .then(response => {
        console.log('한달 일기 데이터 로드 성공', response.data);
        setDiaryData(response.data);
        const newImageUrlByDate: { [key: string]: string } = {};
        response.data?.forEach(diary => {
          if (diary.imgUrl && diary.createdAt) {
            const formattedDate = diary.createdAt.split('T')[0];
            newImageUrlByDate[formattedDate] = diary.imgUrl;
          }
        });
        setImageUrlByDate(newImageUrlByDate);
      })
      .catch(error => {
        console.log('한달 일기 데이터 로드 실패', error);
      });
  }, []);

  const initialState = {
    prev: {
      daysList: [],
      year: 0,
      month: 0,
    },
    curr: {
      daysList: [],
      year: 0,
      month: 0,
    },
    next: {
      daysList: [],
      year: 0,
      month: 0,
    },
  };

  const [totalDays, setTotalDays] = useState<dayType>(initialState);

  // 연도와 월에 따른 전달, 현재달, 다음달 일수와 정보 세팅
  const getTotalDays = (year: number, month: number) => {
    const previousMonthLastDate = new Date(year, month - 1, 0).getDate(); // 이전 달의 마지막 날짜 체크
    const previousMonthLastDay = new Date(year, month - 1, 0).getDay(); // 이전 달의 마지막 날짜의 요일
    const currentMonthLastDate = new Date(year, month, 0).getDate();
    const currentMonthLastDay = new Date(year, month, 0).getDay();

    const previousDays = [];
    for (let i = 0; i < previousMonthLastDay + 1; i++) {
      previousDays.push(previousMonthLastDate - previousMonthLastDay + i);
    }

    const currentDays = [];
    for (let i = 0; i < currentMonthLastDate; i++) {
      currentDays.push(i + 1);
    }

    const nextDays = [];
    for (let i = 0; i < 6 - currentMonthLastDay; i++) {
      nextDays.push(i + 1);
    }

    setTotalDays({
      prev: {
        daysList: previousMonthLastDay !== 6 ? previousDays : [],
        year: month === 1 ? year - 1 : year,
        month: month === 1 ? 12 : month - 1,
      },
      curr: {
        daysList: currentDays,
        year: year,
        month: month,
      },
      next: {
        daysList: nextDays,
        year: month === 12 ? year + 1 : year,
        month: month === 12 ? 1 : month + 1,
      },
    });
  };

  useEffect(() => {
    getTotalDays(year, month);
  }, [year, month, date]);

  function navigateToDay(date: string) {
    if (diaryData) {
      navigation.navigate('OneDayDiary', { selectedDate: date });
    }
  }

  return (
    <>
      <S.DayOfWeek>
        {dayOfWeek.map((day, index) => (
          <S.Box key={index}>
            <S.DayText day={day}>{day}</S.DayText>
          </S.Box>
        ))}
      </S.DayOfWeek>
      <S.TotalDays>
        {Object.keys(totalDays).map((state: string) =>
          totalDays[state].daysList.map((day: number, index: number) => {
            const dateString = `${totalDays[state].year}-${('0' + totalDays[state].month).slice(-2)}-${('0' + day).slice(-2)}`;
            const imageUrl = state === 'curr' ? imageUrlByDate[dateString] : undefined;
            const textColor = imageUrl ? '#FFFFFF' : state === 'curr' ? '#4A4A4A' : 'lightgray';
            return (
              <S.DayBoxContainer key={index}>
                {imageUrl ? (
                  <S.ImageContainer onPress={() => navigateToDay(dateString)}>
                    <S.ImageBackgroundStyled source={{ uri: imageUrl }} imageStyle={{ borderRadius: 3 }}>
                      <S.DateTextInImg textColor={textColor}>{day}</S.DateTextInImg>
                    </S.ImageBackgroundStyled>
                  </S.ImageContainer>
                ) : (
                  <S.DateText textColor={textColor}>{day}</S.DateText>
                )}
              </S.DayBoxContainer>
            );
          }),
        )}
      </S.TotalDays>
    </>
  );
};

export default CalendarBody;
