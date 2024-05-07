package com.ssafy.today.domain.diary.dto.request;

import com.ssafy.today.domain.diary.dto.response.DiaryResponse;
import com.ssafy.today.domain.diary.entity.Diary;
import com.ssafy.today.domain.diary.entity.Feel;
import com.ssafy.today.domain.member.entity.Member;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Data;
import org.hibernate.annotations.ColumnDefault;

import java.time.LocalDateTime;

@Data
@Builder
public class DiaryContentRequest {

    private Long diaryId;

    private Long memberId;

    private Feel feel;

    private String content;

    private LocalDateTime createAt;

    public static Diary toEntity(DiaryContentRequest diaryContentRequest, Member member, boolean importent){
        return Diary.builder()
                .member(member)
                .feel(diaryContentRequest.getFeel())
                .content(diaryContentRequest.getContent())
                .important(importent)
                .imgUrl(null)
                .build();
    }
}
