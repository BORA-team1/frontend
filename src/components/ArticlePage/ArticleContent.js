import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import axios from 'axios';

import HighlightingBottomSheet from '../BottomSheet/HighlightingBottomSheet';
import FloatingBar from './FloatingBar';
import ContentPopup from './ContentPopup';

import comment from '../../images/sectionbar/commenticon.svg';
import qna from '../../images/sectionbar/qnaicon.svg';
import happy from '../../images/emoji/happy.svg';

const ArticleContent = ({isContentsOn}) => {
  const BASE_URL = 'http://localhost:3001/';
  const [isBottomSheetOpen, setBottomSheetOpen] = useState(false);
  const [expanded, setExpanded] = useState('close');
  const [isEmojiBarOpen, setIsEmojiBarOpen] = useState(false);
  const [category, setCategory] = useState('A');

  const [selectedSentence, setSelectedSentence] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [highlights, setHighlights] = useState([]);

  //하이라이팅 바텀시트 오픈/클로즈
  const handleOpenBottomSheet = () => {
    setBottomSheetOpen(true);
  };
  const handleCloseBottomSheet = () => {
    if (selectedSentence) {
      setSelectedSentence(null);
    }
    setBottomSheetOpen(false);
    setExpanded('close');
  };

  //이모지 바 오픈/클로즈
  const openEmojiBar = () => {
    setIsEmojiBarOpen(true);
  };
  const closeEmojiBar = () => {
    setIsEmojiBarOpen(false);
  };

  //카테고리에 따른 리스트 띄우기
  const showListA = () => setCategory('A');
  const showListB = () => setCategory('B');
  const showListC = () => setCategory('C');

  //클릭한 문장의 글자 색 바뀌기
  const highlightText = (sentence) => {
    setSelectedSentence((prevSelected) =>
      prevSelected === sentence ? null : sentence
    );
  };

  //클릭한 문장 정보 저장 (섹션 id, 문장 index)
  const saveTextInfo = (index, sentenceIndex, sentence) => {
    const textInfo = {index, sentenceIndex, sentence};
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

  // 페이지 로드 시 저장된 글 목록을 불러오기
  useEffect(() => {
    getPosts();
  }, []);
  const postPk = 1; // 원하는 포스트의 ID 설정
  const [posts, setPosts] = useState([]);
  const getPosts = () => {
    axios
      .get(`${BASE_URL}data`)
      .then((response) => {
        setPosts(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error(
          '세부포스트 내용을 불러오는 중 오류가 발생했습니다.',
          error
        );
      });
  };

  //문장 index 확인용 콘솔 띄우는 함수
  const handleClick = (index, sentenceIndex) => {
    console.log(`클릭된 문장의 인덱스: 섹션 ${index}, 문장 ${sentenceIndex}`);
  };

  let cumulativeSentenceIndex = 0;
  let cumulativeIconIndex = 0;

  return (
    <Wrapper>
      {posts.length > 0 &&
        posts.map((item) => (
          <Gap key={item.post_id}>
            {item.post_id === 1 &&
              item.PostSec.map((section) => {
                const paragraphs = section.content
                  .split('·')
                  .filter((paragraph) => paragraph.trim() !== '');

                const sentencesIcon = paragraphs
                  .map((paragraph) => paragraph.split(/(?<=[?.·](?=\s|'))/))
                  .reduce((acc, val) => {
                    const flattened = val.filter(
                      (sentence) => sentence.trim() !== ''
                    );
                    return acc.concat(flattened);
                  }, []);

                return (
                  <>
                    <Section key={section.num} className='ebook-container'>
                      {section.title && (
                        <SectionTitle>{section.title}</SectionTitle>
                      )}
                      <SectionContent>
                        <div style={{width: isContentsOn ? '330px' : '345px'}}>
                          {paragraphs.map((paragraph, paragraphIndex) => {
                            const sentences =
                              paragraph.split(/(?<=[?.](?=\s|'))/);

                            return (
                              <div key={`${section.num}-${paragraphIndex}`}>
                                {sentences.map((sentence, sentenceIndex) => {
                                  const currentSentenceIndex =
                                    cumulativeSentenceIndex++;
                                  return (
                                    <span
                                      key={`${section.num}-${paragraphIndex}-${sentenceIndex}`}
                                      onClick={() => {
                                        handleClick(
                                          section.num,
                                          currentSentenceIndex
                                        );
                                        saveTextInfo(
                                          section.num,
                                          currentSentenceIndex,
                                          sentence
                                        );
                                        highlightText(sentence);
                                      }}
                                      style={{
                                        cursor: 'pointer',
                                        color:
                                          selectedSentence === sentence ||
                                          hoveredIndex === sentence
                                            ? '#A397FF'
                                            : 'white',

                                        backgroundColor: selectedSentence
                                          ? 'transparent'
                                          : highlights.some(
                                              (highlight) =>
                                                highlight.sentenceIndex ===
                                                currentSentenceIndex
                                            )
                                          ? 'rgba(170, 158, 255, 0.35)'
                                          : 'transparent',
                                      }}
                                    >
                                      {sentence}
                                    </span>
                                  );
                                })}
                              </div>
                            );
                          })}
                        </div>
                        {isContentsOn && (
                          <BarContainer>
                            <SectionBar>
                              {sentencesIcon.map((sentence, sentenceIndex) => {
                                const currentIconIndex = cumulativeIconIndex++;
                                return (
                                  <Icon
                                    key={sentenceIndex}
                                    onMouseEnter={() => onHover(sentence)}
                                    onMouseLeave={offHover}
                                    onClick={() => {
                                      handleClick(
                                        section.sec_id,
                                        currentIconIndex
                                      );
                                      setSelectedSentence(sentence);
                                      handleOpenBottomSheet();
                                    }}
                                    style={{
                                      height: `${500 / sentencesIcon.length}%`,
                                    }}
                                  >
                                    {/* <div></div> */}
                                    <img src={comment} alt='comment'></img>
                                    {/* <img src={qna} alt='qna'></img>
                                    <img src={happy} alt='happy'></img> */}
                                  </Icon>
                                );
                              })}
                            </SectionBar>
                          </BarContainer>
                        )}
                      </SectionContent>
                    </Section>
                    {/* {isContentsOn && <ContentPopup></ContentPopup>} */}
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
  font-family: 'Pretendard-Regular';
  font-size: 15px;
  font-style: normal;
  font-weight: 300;
  line-height: 169.336%;
`;

const Gap = styled.div`
  display: flex;
  flex-direction: column;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
`;

const SectionTitle = styled.div`
  width: 345px;
  font-size: 19px;
  font-weight: 600;
  margin-top: 50px;
  margin-bottom: 20px;
`;

const SectionContent = styled.div`
  display: flex;
  flex-direction: row;
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

  img {
    width: 14x;
    height: 14px;
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
