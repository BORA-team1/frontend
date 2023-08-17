import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

import VoteNow from "../components/ArticlePage/VoteNow";
import VoteResult from "../components/ArticlePage/VoteResult";
import DebateNow from "../components/ArticlePage/DebateNow";
import QBox from "../components/AllContentPage/QBox";
import ABox from "../components/AllContentPage/ABox";
import qnaconnect from "../images/qnaconnect.svg";
import ComBox from "../components/AllContentPage/ComBox";
import EmojiBox from "../components/AllContentPage/EmojiBox";

//context
import { useAuth } from "../contexts/AuthContext";
import VoteBottomSheet from "../components/BottomSheet/VoteBottomSheet";

const AllContentsPage = () => {
  const { post_id } = useParams();
  const navigate = useNavigate();
  const [render, setRender] = useState(1);

  const [selectedSection, setSelectedSection] = useState(1);
  const handleSectionClick = (sec_id) => {
    setSelectedSection(sec_id);

    // 선택한 섹션의 위치로 스크롤 조작
    const selectedSectionIndex = sections.findIndex(
      (section) => section.sec_id === sec_id
    );
    const sectionElement = document.getElementById(
      `section-${selectedSectionIndex}`
    );
    if (sectionElement) {
      const yOffset =
        sectionElement.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({ top: yOffset, behavior: "smooth" });
    }
  };

  const { authToken, BASE_URL, nickname } = useAuth();

  useEffect(() => {
    getSection();
  }, [render]);

  const [sections, setSections] = useState([]);
  const getSection = () => {
    axios
      .get(`${BASE_URL}post/${post_id}/contents/`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((response) => {
        setSections(response.data.data.PostSec);
        console.log(response.data.data.PostSec);
      })
      .catch((error) => {
        console.error(
          "콘텐츠 모아보기를 불러오는 중 오류가 발생했습니다.",
          error
        );
      });
  };

  const [bottomSheetOpen, setBottomSheetOpen] = useState(false);

  const handleBottomSheet = () => {
    setBottomSheetOpen(true);
  };
  const handleCloseBottomSheet = () => {
    setBottomSheetOpen(false);
  };

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
        {sections.map((section, index) => (
          <div
            key={index}
            onClick={() => handleSectionClick(section.sec_id)}
            style={{
              color:
                selectedSection === section.sec_id
                  ? "#A397FF"
                  : " rgba(255, 255, 255, 0.6)",
              borderColor:
                selectedSection === section.sec_id
                  ? "#A397FF"
                  : " rgba(255, 255, 255, 0.6)",
            }}
          >
            섹션 {index + 1}
          </div>
        ))}
      </SectionBar>

      {sections.map((section, index) => (
        <Section key={index} id={`section-${index}`}>
          <SectionNum>섹션 {index + 1}</SectionNum>

          {section.Lines.map((line) => (
            <div key={line.sentence}>
              {/* 밑줄 내용 출력 */}
              {(line.IngVote.length !== 0 ||
                line.DoneVote.length !== 0 ||
                line.Debate.length !== 0 ||
                line.Question.length !== 0 ||
                line.LineCom.length !== 0 ||
                line.Emotion.some((emotion) => emotion.num !== 0)) && (
                <>
                  <Sentence>“ {line.content} ”</Sentence>
                  {/* 밑줄 투표 출력 */}
                  {(line.IngVote.length !== 0 ||
                    line.DoneVote.length !== 0) && (
                    <Content>
                      <Category>투표</Category>
                      {line.IngVote.map((vote) => (
                        <VoteNow
                          key={vote.vote_id}
                          vote={vote}
                          BASE_URL={BASE_URL}
                          handleBottomSheet={handleBottomSheet}
                        />
                      ))}
                      {line.DoneVote.map((vote) => (
                        <div style={{ marginLeft: "22px" }}>
                          <VoteResult key={vote.vote_id} donevote={vote} />
                        </div>
                      ))}
                    </Content>
                  )}
                  {/* 밑줄 토론 출력 */}
                  {line.Debate.length !== 0 && (
                    <Content>
                      <Category>토론</Category>
                      {line.Debate.map((debate) => (
                        <DebateNow
                          key={debate.debate_id}
                          debate={debate}
                          BASE_URL={BASE_URL}
                        ></DebateNow>
                      ))}
                    </Content>
                  )}
                  {/* 밑줄 질문 출력 */}
                  {line.Question.length !== 0 && (
                    <Content>
                      <Category>Q&A</Category>
                      {line.Question.map((question) => (
                        <QnAContainer key={question.que_id}>
                          <QBox question={question}></QBox>
                          {question.Answer.map((answer) => (
                            <>
                              <Connect src={qnaconnect}></Connect>
                              <ABox key={answer.ans_id} answer={answer}></ABox>
                            </>
                          ))}
                        </QnAContainer>
                      ))}
                    </Content>
                  )}
                  {/* 밑줄에 대한 댓글 출력 */}
                  {line.LineCom.length !== 0 && (
                    <Content>
                      <Category>댓글</Category>
                      {line.LineCom.map((comment) => (
                        <>
                          <ComBox
                            key={comment.linecom_id}
                            comment={comment}
                            BASE_URL={BASE_URL}
                            authToken={authToken}
                            nickname={nickname}
                            render={render}
                            setRender={setRender}
                          />
                        </>
                      ))}
                    </Content>
                  )}
                  {/* 밑줄에 대한 감정표현 출력 */}
                  {line.Emotion.some((emotion) => emotion.num !== 0) && (
                    <Content>
                      <Category>감정표현</Category>
                      <EmojiBox emoji={line.Emotion} />
                    </Content>
                  )}
                </>
              )}
              <HR></HR>
            </div>
          ))}
        </Section>
      ))}
      {bottomSheetOpen && (
        <VoteBottomSheet
          handleCloseBottomSheet={handleCloseBottomSheet}
          postPk={post_id}
        ></VoteBottomSheet>
      )}
    </Wrapper>
  );
};

export default AllContentsPage;

const Wrapper = styled.div`
  width: 390px;
  min-height: 844px;
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
  padding-top: 34px;
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
  border: 1px solid #353646;
  width: 368px;
  height: 30px;
  background: var(--background, #161524);

  div {
    color: rgba(255, 255, 255, 0.6);
    padding: 7px 14px;
    font-size: 12px;
    font-weight: 500;
    line-height: normal;
    border-radius: 20px;
    border: 1px solid;
    backdrop-filter: blur(5px);
    cursor: pointer;
  }
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 20px;
  padding-right: 20px;
  box-sizing: border-box;
  color: #fff;
`;

const SectionNum = styled.div`
  margin-top: 30px;
  margin-bottom: 10px;
  font-size: 12px;
  font-weight: 500;
  line-height: 169.336%;
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
  margin-left: -20px;
  height: 8px;
  background: #12111c;
`;
