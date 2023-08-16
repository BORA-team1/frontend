import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import axios from 'axios';

//components
import HighlightingBottomSheet from '../BottomSheet/HighlightingBottomSheet';
import FloatingBar from './FloatingBar';
import ContentPopup from './ContentPopup';

//images
import comment from '../../images/sectionbar/commenticon.svg';
import qna from '../../images/sectionbar/qnaicon.svg';
import happy from '../../images/emoji/happy.svg';

//context
import {useAuth} from '../../contexts/AuthContext';
import {PostProvider} from '../../contexts/PostContext';

const ArticleContent = ({isContentsOn, postPk}) => {
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
  const highlightText = (index, sentenceIndex, sentence) => {
    const textInfo = {index, sentenceIndex, sentence};
    setSelectedIndex(textInfo);
    console.log(textInfo);
    setSelectedSentence((prevSelected) =>
      prevSelected === sentence ? null : sentence
    );
  };

  //아이콘 호버 시 문장 색 바뀌기
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const onHover = (sentence) => {
    setHoveredIndex(sentence);
  };
  const offHover = () => {
    setHoveredIndex(null);
  };

  // GET: 세부포스트
  const {authToken, BASE_URL} = useAuth();
  useEffect(() => {
    getPosts();
  }, []);

  const [posts, setPosts] = useState([]);
  const getPosts = () => {
    axios
      .get(`${BASE_URL}post/${postPk}/`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((response) => {
        setPosts(response.data.data);
        console.log(response.data.data);
      })
      .catch((error) => {
        console.error(
          '세부포스트 내용을 불러오는 중 오류가 발생했습니다.',
          error
        );
      });
  };

  //POST: 밑줄 긋기
  const [render, setRender] = useState(1);
  const addToHighlights = () => {
    axios
      .post(
        `${BASE_URL}line/${postPk}/`,
        {
          line_postsec: selectedIndex.index,
          sentence: selectedIndex.sentenceIndex,
          content: selectedIndex.sentence,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      )
      .then((response) => {
        setRender(render + 1);
        setHighlights([...highlights, selectedIndex]);
        console.log(highlights);
        setSelectedIndex(null);
        setSelectedSentence(null);
        console.log(response);
      })
      .catch((error) => {
        console.error('밑줄을 등록하는 중 오류가 발생했습니다.', error);
      });
  };

  let cumulativeSentenceIndex = 0;
  let cumulativeIconIndex = 0;

  return (
    <Wrapper>
      {posts.PostSec &&
        posts.PostSec.map((section) => {
          const paragraphs = section.content
            .split('·')
            .filter((paragraph) => paragraph.trim() !== '');

          const sentencesIcon = paragraphs
            .map((paragraph) => paragraph.split(/(?<=[?.:])(?=\s|')/))
            .reduce((acc, val) => {
              const flattened = val.filter(
                (sentence) => sentence.trim() !== ''
              );
              return acc.concat(flattened);
            }, []);

          return (
            <>
              <Section key={section.num} className='ebook-container'>
                {section.title && <SectionTitle>{section.title}</SectionTitle>}
                <SectionContent>
                  <div style={{width: isContentsOn ? '330px' : '345px'}}>
                    {paragraphs.map((paragraph, paragraphIndex) => {
                      const cleanedParagraph = paragraph
                        .replace(/\r\n/g, '')
                        .replace(/·/g, '');
                      const sentences =
                        cleanedParagraph.split(/(?<=[?.:])(?=\s|')/);

                      return (
                        <Paragraph key={`${section.num}-${paragraphIndex}`}>
                          {sentences.map((sentence, sentenceIndex) => {
                            const currentSentenceIndex =
                              cumulativeSentenceIndex++;

                            return (
                              <span
                                key={`${section.num}-${paragraphIndex}-${sentenceIndex}`}
                                onClick={() =>
                                  highlightText(
                                    section.num,
                                    currentSentenceIndex,
                                    sentence
                                  )
                                }
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
                        </Paragraph>
                      );
                    })}
                  </div>
                  {isContentsOn && (
                    <BarContainer>
                      <SectionBar>
                        {sentencesIcon.map((sentence, sentenceIndex) => {
                          const currentIconIndex = cumulativeIconIndex++;

                          const targetLine = section.Lines.find(
                            (line) => line.sentence === currentIconIndex
                          );
                          const hasLineCom =
                            targetLine &&
                            targetLine.LineCom &&
                            targetLine.LineCom.length > 0;

                          const hasQuestion =
                            targetLine &&
                            targetLine.Question &&
                            targetLine.Question.length > 0;
                          return (
                            <Icon
                              key={sentenceIndex}
                              onMouseEnter={() => onHover(sentence)}
                              onMouseLeave={offHover}
                              onClick={() => {
                                highlightText(
                                  section.num,
                                  currentIconIndex,
                                  sentence
                                );
                                handleOpenBottomSheet();
                              }}
                              style={{
                                height: `${500 / sentencesIcon.length}%`,
                              }}
                            >
                              {hasLineCom && (
                                <img src={comment} alt='comment'></img>
                              )}
                              {hasQuestion && <img src={qna} alt='qna'></img>}
                              {/* <div></div> */}
                              {/* <img src={comment} alt='comment'></img> */}
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

      <EditerFollow>이 포스트의 에디터 팔로우하기</EditerFollow>
      <PostProvider selectedIndex={selectedIndex} postPk={postPk}>
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
          ></HighlightingBottomSheet>
        )}
      </PostProvider>
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

const Section = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
  margin-bottom: 30px;
`;

const SectionTitle = styled.div`
  width: 345px;
  font-size: 19px;
  font-weight: 600;
  margin-bottom: 20px;
`;

const SectionContent = styled.div`
  display: flex;
  flex-direction: row;
`;

const Paragraph = styled.div`
  margin-bottom: 20px;
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
  height: calc(100% - 20px);
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

  /* div {
    position: relative;
    width: 3px;
    height: 3px;
    background: #ff5e2b;
    border-radius: 50%;
    top: -1px;
    right: -1px;
  } */

  img {
    width: 14x;
    height: 14px;
  }
`;

const EditerFollow = styled.div`
  display: flex;
  width: fit-content;
  padding: 10px 35px;
  margin: 20px 76px 40px 76px;

  border-radius: 20px;
  background: #5a45f5;

  font-size: 14px;
  font-weight: 700;
  line-height: normal;
  cursor: pointer;
`;
