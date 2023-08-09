import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

import HighlightingBottomSheet from "../BottomSheet/HighlightingBottomSheet";
import FloatingBar from "./FloatingBar";
import ContentPopup from "./ContentPopup";

import comment from "../../images/sectionbar/commenticon.svg";
import qna from "../../images/sectionbar/qnaicon.svg";

const ArticleContent = ({ isContentson }) => {
  const BASE_URL = "http://localhost:3002";
  const [isBottomSheetOpen, setBottomSheetOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [isEmojiBarOpen, setIsEmojiBarOpen] = useState(false);
  const [category, setCategory] = useState("A");

  const [selectedSentence, setSelectedSentence] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [highlights, setHighlights] = useState([]);

  //하이라이팅 바텀시트 오픈/클로즈
  const handleOpenBottomSheet = () => {
    if (hoveredIndex) {
      setSelectedSentence(hoveredIndex);
    }
    setBottomSheetOpen(true);
  };
  const handleCloseBottomSheet = () => {
    if (selectedSentence) {
      setSelectedSentence(null);
    }
    setBottomSheetOpen(false);
    setExpanded(false);
  };

  //QnA 모달 오픈/클로즈
  const [isQnAOpen, setIsQnAOpen] = useState(false);

  const openQnACreateModal = () => {
    setIsQnAOpen(true);
  };
  const closeQnACreateModal = () => {
    setIsQnAOpen(false);
  };

  //댓글 입력 박스 오픈/클로즈
  const [isInputOpen, setIsInputOpen] = useState(false);

  const openInputBox = () => {
    setIsInputOpen(true);
  };
  const closeInputBox = () => {
    setIsInputOpen(false);
  };

  //이모지 바 오픈/클로즈
  const openEmojiBar = () => {
    setIsEmojiBarOpen(true);
  };
  const closeEmojiBar = () => {
    setIsEmojiBarOpen(false);
  };

  //카테고리에 따른 리스트 띄우기
  const showListA = () => setCategory("A");
  const showListB = () => setCategory("B");
  const showListC = () => setCategory("C");

  //클릭한 문장의 글자 색 바뀌기
  const highlightText = (sentence) => {
    setSelectedSentence((prevSelected) =>
      prevSelected === sentence ? null : sentence
    );
  };

  //클릭한 문장 정보 저장 (섹션 id, 문장 index)
  const saveTextInfo = (index, sentenceIndex) => {
    const textInfo = { index, sentenceIndex };
    setSelectedIndex(textInfo);
  };

  //밑줄 추가
  const addToHighlights = () => {
    if (selectedSentence) {
      // axios post 추가하기
      setHighlights([...highlights, selectedIndex]);
      console.log(highlights);
      setSelectedIndex(null);
      setSelectedSentence(null);
    }
  };

  //아이콘 호버 시 문장 색 바뀌기
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const onHover = (sentence) => {
    setHoveredIndex(sentence);
  };
  const offHover = () => {
    setHoveredIndex(null);
  };

  // 페이지 로드 시 저장된 글 목록을 불러옵니다.
  useEffect(() => {
    getPosts();
  }, []);

  const [posts, setPosts] = useState([]);
  const getPosts = () => {
    axios
      .get(`${BASE_URL}/data`)
      .then((response) => {
        setPosts(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("글 목록을 불러오는 중 오류가 발생했습니다.", error);
      });
  };

  //문장 index 확인용 콘솔 띄우는 함수
  const handleClick = (index, sentenceIndex) => {
    console.log(
      `클릭된 문장의 인덱스: 섹션 ${index + 1}, 문장 ${sentenceIndex + 1}`
    );
  };

  return (
    <Wrapper>
      {posts.length > 0 &&
        posts.map((item) => (
          <Gap key={item.post_id}>
            {item.post_id === 1 &&
              item.PostSec.map((longTexts) => {
                const sentences = longTexts.content.split(/(?<=[?.](?=\s|'))/);
                return (
                  <>
                    <Section key={longTexts.sec_id} className="ebook-container">
                      <SectionContent>
                        <TextContainer isContentson={isContentson}>
                          {sentences.map((sentence, sentenceIndex) => {
                            return (
                              <>
                                <span
                                  onClick={() => {
                                    handleClick(
                                      longTexts.sec_id,
                                      sentenceIndex
                                    );
                                    saveTextInfo(
                                      longTexts.sec_id,
                                      sentenceIndex
                                    );
                                    highlightText(sentence);
                                  }}
                                  style={{
                                    cursor: "pointer",
                                    color:
                                      selectedSentence === sentence ||
                                      hoveredIndex === sentence
                                        ? "#A397FF"
                                        : "white",

                                    backgroundColor: selectedSentence
                                      ? "transparent"
                                      : highlights.some(
                                          (highlight) =>
                                            highlight.index === longTexts.num &&
                                            highlight.sentenceIndex ===
                                              sentenceIndex
                                        )
                                      ? "rgba(170, 158, 255, 0.35)"
                                      : "transparent",
                                  }}
                                >
                                  {sentence}
                                </span>
                              </>
                            );
                          })}
                        </TextContainer>
                        {isContentson && (
                          <BarContainer>
                            <SectionBar>
                              {sentences.map((sentence, sentenceIndex) => {
                                return (
                                  <Icon
                                    key={sentenceIndex}
                                    onMouseEnter={() => onHover(sentence)}
                                    onMouseLeave={offHover}
                                    onClick={handleOpenBottomSheet}
                                    style={{
                                      height: `${500 / sentences.length}%`,
                                    }}
                                  >
                                    <div></div>
                                    <img src={comment} alt="comment"></img>
                                  </Icon>
                                );
                              })}
                            </SectionBar>
                          </BarContainer>
                        )}
                      </SectionContent>
                    </Section>
                    {isContentson && <ContentPopup></ContentPopup>}
                  </>
                );
              })}
          </Gap>
        ))}

      <EditerFollow>이 포스트의 에디터 팔로우하기</EditerFollow>
      {selectedSentence && (
        <FloatingBar
          addToHighlights={addToHighlights}
          isBottomSheetOpen={isBottomSheetOpen}
          selectedSentence={selectedSentence}
          handleOpenBottomSheet={handleOpenBottomSheet}
          showListA={showListA}
          showListB={showListB}
          showListC={showListC}
          isQnAOpen={isQnAOpen}
          openQnACreateModal={openQnACreateModal}
          closeQnACreateModal={closeQnACreateModal}
          isInputOpen={isInputOpen}
          openInputBox={openInputBox}
          closeInputBox={closeInputBox}
          isEmojiBarOpen={isEmojiBarOpen}
          openEmojiBar={openEmojiBar}
          closeEmojiBar={closeEmojiBar}
        ></FloatingBar>
      )}
      {isBottomSheetOpen && (
        <HighlightingBottomSheet
          onClose={handleCloseBottomSheet}
          expanded={expanded}
          setExpanded={setExpanded}
          category={category}
          showListA={showListA}
          showListB={showListB}
          showListC={showListC}
          openEmojiBar={openEmojiBar}
          closeEmojiBar={closeEmojiBar}
          selectedSentence={selectedSentence}
        ></HighlightingBottomSheet>
      )}
    </Wrapper>
  );
};

export default ArticleContent;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 37.4px;

  color: white;
  font-family: "Pretendard-Regular";
  font-size: 15px;
  font-style: normal;
  font-weight: 300;
  line-height: 169.336%;
`;

const Gap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
`;

const SectionContent = styled.div`
  display: flex;
  flex-direction: row;
`;

const TextContainer = styled.div`
  width: ${(props) => (props.isContentson ? "330px" : "345px")};
`;

const BarContainer = styled.div`
  width: 25px;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SectionBar = styled.div`
  width: 5px;
  height: 100%;
  background-color: #2b2c3f;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Icon = styled.div`
  width: 14x;
  /* height: auto; */
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  div {
    position: relative;
    width: 3px;
    height: 3px;
    background: #ff5e2b;
    border-radius: 50%;
    top: -1px;
    right: -1px;
  }
`;

const EditerFollow = styled.div`
  display: flex;
  width: fit-content;
  padding: 10px 35px;
  margin: 70px 76px 40px 76px;

  border-radius: 20px;
  background: #5a45f5;

  font-size: 14px;
  font-weight: 700;
  line-height: normal;
  cursor: pointer;
`;
