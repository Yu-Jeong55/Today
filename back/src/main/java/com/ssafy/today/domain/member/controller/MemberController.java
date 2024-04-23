package com.ssafy.today.domain.member.controller;

import com.ssafy.today.domain.member.dto.response.MemberResponse;
import com.ssafy.today.domain.member.entity.Member;
import com.ssafy.today.domain.member.service.MemberService;
import com.ssafy.today.util.response.SuccessCode;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

import static com.ssafy.today.util.response.SuccessResponseEntity.getResponseEntity;

@RestController
@RequiredArgsConstructor
@RequestMapping("/member")
public class MemberController {

    private final MemberService memberService;

    @GetMapping
    public ResponseEntity<?> getMemberInfo(HttpServletRequest request){
        Long memberid = (Long) request.getAttribute("memberId");
        Member member = memberService.getMember(memberid);
        MemberResponse memberResponse = MemberResponse.builder()
                .id(member.getId())
                .email(member.getEmail())
                .nickName(member.getNickname())
                .createAt(member.getCreatedAt())
                .updatedAt(member.getUpdatedAt())
                .build();
        return getResponseEntity(SuccessCode.OK,memberResponse);
    }

}
