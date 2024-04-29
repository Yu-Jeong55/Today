package com.ssafy.today.domain.calender.service;

import com.ssafy.today.domain.calender.dto.response.CalenderResponse;
import com.ssafy.today.domain.diary.entity.Diary;
import com.ssafy.today.domain.diary.repository.DiaryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.*;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class CalenderService {

    private final DiaryRepository diaryRepository;
    public List<CalenderResponse> getDiaryMemberIdAndDay(Long memberId, LocalDate day){
        LocalDateTime startOfDay = day.atStartOfDay();
        LocalDateTime endOfDay = day.atTime(LocalTime.MAX);

        List<Diary> diaries = diaryRepository.findAllByMemberIdAndCreatedAtBetween(memberId, startOfDay, endOfDay);
        return diaries.stream()
                .map(CalenderResponse::fromEntity)
                .collect(Collectors.toList());
    }

    public List<CalenderResponse> getDiaryMemberIdAndMonth(Long memberId, LocalDate date) {
        // TODO : 해당유저의 해당 달에 해당하는 important 컬럼이 true 인 모든 다이어리 가져오기
        YearMonth yearMonth = YearMonth.from(date);
        LocalDateTime startOfMonth = date.atStartOfDay();
        LocalDateTime endOfMonth = date.plusMonths(1).atStartOfDay().minusNanos(1);

        List<Diary> diaries = diaryRepository.findByMemberIdAndImportantIsTrueAndCreatedAtBetween(memberId, startOfMonth, endOfMonth);
        return diaries.stream()
                .map(CalenderResponse::fromEntity)
                .collect(Collectors.toList());
    }
}
