import React, {useState} from 'react';
import styled from 'styled-components';
// import axios from 'axios';

import HighlightingBottomSheet from '../BottomSheet/HighlightingBottomSheet';
import FloatingBar from './FloatingBar';
import ContentPopup from './ContentPopup';

import comment from '../../images/sectionbar/commenticon.svg';
import qna from '../../images/sectionbar/qnaicon.svg';

const ArticleContent = ({isContentson}) => {
  const [isBottomSheetOpen, setBottomSheetOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [isEmojiBarOpen, setIsEmojiBarOpen] = useState(false);
  const [category, setCategory] = useState('A');

  const [selectedSentence, setSelectedSentence] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [highlights, setHighlights] = useState([]);

  // const [subtitle, setSubTitle] = useState('');

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

  const openQnACreateModal = (selectedSentence) => {
    if (
      highlights.some((highlight) => highlight.sentence === selectedSentence)
    ) {
      setIsQnAOpen(true);
    }
  };
  const closeQnACreateModal = () => {
    setIsQnAOpen(false);
  };

  //댓글 입력 박스 오픈/클로즈
  const [isInputOpen, setIsInputOpen] = useState(false);

  const openInputBox = (selectedSentence) => {
    if (
      highlights.some((highlight) => highlight.sentence === selectedSentence)
    ) {
      setIsInputOpen(true);
      console.log(isInputOpen);
    }
  };
  const closeInputBox = () => {
    setIsInputOpen(false);
  };

  //이모지 바 오픈/클로즈
  const openEmojiBar = (selectedSentence) => {
    if (
      highlights.some((highlight) => highlight.sentence === selectedSentence)
    ) {
      setIsEmojiBarOpen(true);
    }
  };
  const closeEmojiBar = () => {
    setIsEmojiBarOpen(false);
  };

  //카테고리에 따른 리스트 띄우기
  const showListA = () => setCategory('A');
  const showListB = () => setCategory('B');
  const showListC = () => setCategory('C');

  //클릭하면 글자 색 바뀌기
  const highlightText = (sentence) => {
    setSelectedSentence((prevSelected) =>
      prevSelected === sentence ? null : sentence
    );
  };

  //클릭한 문장 정보 저장
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

  //콘텐츠 존재할 때만 아이콘 띄우기
  // const [data, setData] = useState([]);

  // const mockData = [
  //   {
  //     id: 1,
  //     content:
  //       '요새 설탕 뺀 제로슈거 음료, 저칼로리 과자 같은 거 진짜 많잖아요',
  //     LineCom: '댓글',
  //   },
  //   {
  //     id: 2,
  //     content:
  //       '요새 설탕 뺀 제로슈거 음료, 저칼로리 과자 같은 거 진짜 많잖아요',
  //     LineCom: '댓글',
  //   },
  // ];

  //섹션의 높이값 추출하기
  // const sectionRef = useRef(null);
  // if (sectionRef.current) {
  //   const sectionHeight = sectionRef.current.clientHeight;
  //   console.log(sectionHeight)
  // }

  //섹션 타이틀 가져오기
  // const getSectionTitle = () => {
  //   axios
  //     .get('URL')
  //     .then((response) => {
  //       setSubTitle(response.data);
  //     })
  //     .catch((error) => {
  //       console.error('Error', error);
  //     });
  // };

  //임시 데이터
  const longTexts = [
    {
      id: 1,
      content: `혹시 요즘 아스파탐 논란 보고 ‘제로슈거 음료 안 마시는 게 낫나?’ 고민한 사람 있나요? 아스파탐 진짜 위험한 건지, 시원하게 하나씩 팩트체크 해볼게요.`,
    },
    {
      id: 2,
      content: `요새 설탕 뺀 제로슈거 음료, 저칼로리 과자 같은 거 진짜 많잖아요. 이때 설탕 대신 넣는 인공 감미료 중 하나예요. 설탕보다 200배 단맛을 내는데 값도 싸고 칼로리도 거의 없어 인기가 많았어요. 우리나라를 포함해 전 세계 200여 개 나라에서 승인받아 사용돼 왔고요. 그런데 얼마 전, ‘세계보건기구 아래 있는 국제암연구소가 아스파탐을 발암 가능 물질로 분류할 것’이라는 언론 보도가 나왔어요.`,
    },
  ];

  //문장 index 확인용 콘솔 띄우는 함수
  const handleClick = (index, sentenceIndex) => {
    console.log(
      `클릭된 문장의 인덱스: 섹션 ${index + 1}, 문장 ${sentenceIndex + 1}`
    );
  };

  return (
    <Wrapper>
      {longTexts.map((longTexts, index) => {
        const sentences = longTexts.content.split('. '); // 문장 분리
        return (
          <>
            <Section key={index} className='ebook-container'>
              {/* {subtitle && <SectionTitle></SectionTitle>} */}
              <SectionContent>
                <TextContainer isContentson={isContentson}>
                  {sentences.map((sentence, sentenceIndex) => {
                    return (
                      <>
                        <span
                          onClick={() => {
                            handleClick(index, sentenceIndex);
                            saveTextInfo(index, sentenceIndex, sentence);
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
                                    highlight.index === index &&
                                    highlight.sentenceIndex === sentenceIndex
                                )
                              ? 'rgba(170, 158, 255, 0.35)'
                              : 'transparent',
                          }}
                        >
                          {sentence.trim()}
                          {sentenceIndex < sentences.length - 1 ? '. ' : ''}
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
                            <img src={comment} alt='comment'></img>
                          </Icon>
                        );
                      })}
                      {/* <Icon>
                        <div></div>
                        <img src={qna} alt='qna'></img>
                      </Icon> */}
                    </SectionBar>
                  </BarContainer>
                )}
              </SectionContent>
            </Section>
            {isContentson && <ContentPopup></ContentPopup>}
          </>
        );
      })}

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
          selectedIndex={selectedIndex}
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
  gap: 50px;

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
`;

// const SectionTitle = styled.div`
//   width: 345px;
//   font-size: 19px;
//   font-weight: 600;
//   margin-bottom: 20px;
// `;

const SectionContent = styled.div`
  display: flex;
  flex-direction: row;
`;

const TextContainer = styled.div`
  width: ${(props) => (props.isContentson ? '330px' : '345px')};
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
  margin: 20px 76px 40px 76px;

  border-radius: 20px;
  background: #5a45f5;

  font-size: 14px;
  font-weight: 700;
  line-height: normal;
  cursor: pointer;
`;
