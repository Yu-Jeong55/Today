package com.ssafy.today.domain.diary.dto.response;

import com.ssafy.today.domain.diary.entity.Diary;
import com.ssafy.today.domain.diary.entity.Feel;
import lombok.*;

import java.time.LocalDateTime;

@Data
@Builder
public class DiaryResponse {

    private Long id;
    private Long memberId;
    private Feel feel;
    private Boolean important;
    private String imgUrl;
    private String content;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public static DiaryResponse fromEntity(Diary diary){
        DiaryResponse diaryResponse = DiaryResponse.builder()
                .id(diary.getId())
                .memberId(diary.getMember().getId())
                .feel(diary.getFeel())
                .important(diary.getImportant())
                .imgUrl(diary.getImgUrl())
                .content(diary.getContent())
                .createdAt(diary.getCreatedAt())
                .updatedAt(diary.getUpdatedAt())
                .build();

        return diaryResponse;
    }
}