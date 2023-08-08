import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import VoteNow from "../components/ArticlePage/VoteNow";
import DebateNow from "../components/ArticlePage/DebateNow";
import QBox from "../components/AllContentPage/QBox";
import ABox from "../components/AllContentPage/ABox";
import qnaconnect from "../images/qnaconnect.svg";
import CommentBox from "../components/BottomSheet/CommentBox";
import EmojiList from "../components/BottomSheet/EmojiList";

const AllContentsPage = () => {
  const navigate = useNavigate();
  return (
    <Wrapper>
      <ArticleTitle>
        <ClosePage
          onClick={() => {
            navigate(-1);
          }}
        >
          닫기
        </ClosePage>
        사교육비 대책과 수능 킬러 문항
      </ArticleTitle>
      <SectionBar>
        <div>섹션 1</div>
      </SectionBar>
      <Section>
        <div>섹션 1</div>
        <AllContent>
          <Sentence>
            “ 얼마 전부터 대학수학능력시험(수능)에서 ‘킬러 문항’ 없앤다 만다 말
            많았잖아요. ”
          </Sentence>
          <Content>
            <Category>투표</Category>
            <VoteNow></VoteNow>
          </Content>
          <Content>
            <Category>토론</Category>
            <DebateNow></DebateNow>
          </Content>
          <Content>
            <Category>Q&A</Category>
            <QnAContainer>
              <QBox></QBox>
              <Connect src={qnaconnect}></Connect>
              <ABox></ABox>
            </QnAContainer>
          </Content>
          <Content>
            <Category>댓글</Category>
            <CommentBox></CommentBox>
          </Content>
          <Content>
            <Category>감정표현</Category>
            <EmojiList></EmojiList>
          </Content>
        </AllContent>
        <HR></HR>
      </Section>
    </Wrapper>
  );
};

export default AllContentsPage;

const Wrapper = styled.div`
  width: 390px;
  height: 100%;
  background: var(--background, #161524);
  display: flex;
  flex-direction: column;
  font-family: "Pretendard-Regular";
  font-style: normal;
  padding-bottom: 33.32px;
  margin: 0px auto;
`;

const ArticleTitle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  padding-top: 81px;
  padding-bottom: 28px;
  color: #fff;
  font-size: 15px;
  font-weight: 600;
  line-height: 100%; /* 15px */
  letter-spacing: -0.3px;
`;

const ClosePage = styled.div`
  position: absolute;
  left: 20px;
  width: 26px;
  color: rgba(255, 255, 255, 0.7);
  font-weight: 400;
  cursor: pointer;
`;

const SectionBar = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 15px 0 15px 20px;
  gap: 7px;

  div {
    color: rgba(255, 255, 255, 0.6);
    padding: 7px 14px;
    font-size: 12px;
    font-weight: 500;
    line-height: normal;
    border-radius: 20px;
    border: 1px solid rgba(255, 255, 255, 0.6);
    backdrop-filter: blur(5px);
  }
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
`;

const AllContent = styled.div`
  padding-left: 20px;
  padding-right: 20px;
  color: #fff;
`;

const Sentence = styled.div`
  margin-left: 20px;
  width: 330px;
  padding: 15px 20px;
  box-sizing: border-box;
  border-radius: 15px;
  background: var(--card-color, #2b2c3f);
  font-size: 13px;
  font-weight: 400;
  line-height: 133.5%; /* 17.355px */
  letter-spacing: -0.26px;
  margin-bottom: 20px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
`;

const Category = styled.div`
  padding: 6px 14px;
  width: fit-content;
  border-radius: 20px;
  background: var(--main-purple, #5a45f5);
  font-size: 12px;
  font-weight: 600;
  line-height: 133.5%; /* 16.02px */
  letter-spacing: -0.24px;
`;

const QnAContainer = styled.div`
  width: 269px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 9.55px;
`;

const Connect = styled.img`
  margin-top: -9.55px;
  margin-bottom: -14.55px;
  width: 25.706px;
  height: 15px;
`;

const HR = styled.div`
  width: 390px;
  height: 8px;
  background: #12111c;
`;
