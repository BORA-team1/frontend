import post1 from "../../images/post/post1.svg";
import post2 from "../../images/post/post2.svg";
import post3 from "../../images/post/post3.svg";
import post11 from "../../images/post/post11.svg";
import post12 from "../../images/post/post12.svg";
import post13 from "../../images/post/post13.svg";
import post14 from "../../images/post/post14.svg";
import post21 from "../../images/post/post22.svg";
import post22 from "../../images/post/post22.svg";
import post23 from "../../images/post/post23.svg";
import post24 from "../../images/post/post24.svg";
import post31 from "../../images/post/post32.svg";
import post32 from "../../images/post/post32.svg";
import post33 from "../../images/post/post32.svg";
import post34 from "../../images/post/post32.svg";

export const postCover = [
  [post1, post2, post3],
  [post11, post12, post13, post14],
  [post21, post22, post23, post24],
  [post31, post32, post33, post34],
];
export const articleData = [
  {
    Random: [
      {
        post_id: 1,
        title: "제로슈거와 아스파탐의 죄수?!",
        post_image: "[이미지url]",
        diff: 3,
        is_booked: true,
        hashtag: [{ hashtag: "라이프" }, { hashtag: "건강" }],
      },
      {
        post_id: 2,
        title: "교권 침해, 어떻게 해결해야 할까?",
        post_image: "[이미지url]",
        diff: 1,
        is_booked: false,
        hashtag: [{ hashtag: "인권" }, { hashtag: "교육" }],
      },
      {
        post_id: 3,
        title: '"MZ세대는 말이야" MZ세대론, 어떻게 생각하나요?',
        post_image: "[이미지url]",
        diff: 1,
        is_booked: true,
        hashtag: [{ hashtag: "문화" }, { hashtag: "라이프" }],
      },
    ],
    // 랜덤 5개 항목 return
    PostLight: [
      {
        post_id: 11,
        title: "오늘부터 한 살 모두 어려지는 거, 알고 계시나요?!",
        post_image: "[이미지url]",
        hashtag: [{ hashtag: "사회" }, { hashtag: "문화" }],
        author: "일상의기쁨",
        is_vote: false,
        is_debate: false,
        is_que: true,
      },
      {
        post_id: 12,
        title: "캐나다 산불과 기후위기 (지구 온난화 증식?!)",
        post_image: "[이미지url]",
        hashtag: [{ hashtag: "환경" }, { hashtag: "세계" }],
        author: "NewRules",
        is_vote: false,
        is_debate: true,
        is_que: true,
      },
      {
        post_id: 13,
        title: "하이브 VS 카카오의 경영권 분쟁 간단 정리",
        post_image: "[이미지url]",
        hashtag: [{ hashtag: "문화" }, { hashtag: "경제" }],
        author: "K팝고인물",
        is_vote: true,
        is_debate: false,
        is_que: true,
      },
      {
        post_id: 14,
        title: "라면 가격이 물가 관리와 엄청난 관련이 있다?",
        post_image: "[이미지url]",
        hashtag: [{ hashtag: "경제" }, { hashtag: "사회" }],
        author: "쉬운경제",
        is_vote: false,
        is_debate: false,
        is_que: true,
      },
    ],
    PostMed: [
      {
        post_id: 21,
        title: "MedMed",
        post_image: "[이미지url]",
        hashtag: [{ hashtag: "문화" }, { hashtag: "경제" }],
        author: "K팝고인물",
        is_vote: true,
        is_debate: false,
        is_que: true,
      },
      {
        post_id: 22,
        title: "잠이 안 올 때, 불면증을 위한 수면 영상의 특징이 있다?",
        post_image: "[이미지url]",
        hashtag: [{ hashtag: "경제" }, { hashtag: "사회" }],
        author: "힐러",
        is_vote: true,
        is_debate: false,
        is_que: true,
      },
      {
        post_id: 23,
        title: "오늘도 출근! 고달픈 직장인을 위한 마음건강 안내서",
        post_image: "[이미지url]",
        hashtag: [{ hashtag: "문화" }, { hashtag: "경제" }],
        author: "oneul",
        is_vote: true,
        is_debate: true,
        is_que: true,
      },
      {
        post_id: 24,
        title:
          "초등학교에도 아이들을 위한 마음병원이 필요해_상담실 위(어쩌구저쩌구)",
        post_image: "[이미지url]",
        hashtag: [{ hashtag: "경제" }, { hashtag: "사회" }],
        author: "싸이콜로지",
        is_vote: true,
        is_debate: false,
        is_que: true,
      },
    ],
    PostHeavy: [
      {
        post_id: 31,
        title: "HeavyHeavy",
        post_image: "[이미지url]",
        hashtag: [{ hashtag: "라이프" }, { hashtag: "운동" }],
        author: "척척학사",
        is_vote: true,
        is_debate: false,
        is_que: true,
      },
      {
        post_id: 32,
        title: "월요병도 산재처리가 되나요?",
        post_image: "[이미지url]",
        hashtag: [{ hashtag: "심리" }, { hashtag: "라이프" }],
        author: "살아야지",
        is_vote: false,
        is_debate: false,
        is_que: true,
      },
      {
        post_id: 33,
        title: "HeavyHeavy",
        post_image: "[이미지url]",
        hashtag: [{ hashtag: "라이프" }, { hashtag: "운동" }],
        author: "척척학사",
        is_vote: true,
        is_debate: false,
        is_que: true,
      },
      {
        post_id: 34,
        title: "두번쨰 검색",
        post_image: "[이미지url]",
        hashtag: [{ hashtag: "라이프" }, { hashtag: "운동" }],
        author: "척척칙",
        is_vote: false,
        is_debate: false,
        is_que: true,
      },
    ],

    // HotLine: {
    //   line_id: 3,
    //   content: "[가장 많이 밑줄그은 문장 내용]",
    //   line_post: 1,
    //   post_image: "[이미지url]",
    //   diff: 3,
    //   is_booked: true,
    //   hashtag: [{ hashtag: "라이프" }, { hashtag: "운동" }],
    // },

    PlayList: [
      {
        playlist_id: 2,
        title: "세상에 불만 많을때 듣는 리스트",
        hashtag: [{ hashtag: "라이프" }, { hashtag: "운동" }],
        first_audio: 231,
      },
    ],
  },
];
