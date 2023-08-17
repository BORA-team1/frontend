import React, {useState, useEffect} from 'react';
import styled, {keyframes} from 'styled-components';
import axios from 'axios';

import SentenceBox from './SentenceBox';
import MySentenceBox from './MySentenceBox';
import SentenceBoxEmoji from './SentenceBoxEmoji';
import MyCommentBox from './MyCommentBox';
import QnABox from './QnABox';

//context
import {useAuth} from '../../contexts/AuthContext';

const SentencesBottomSheet = ({handleCloseBottomSheet, postPk}) => {
  const [category, setCategory] = useState('A');
  const showListA = () => setCategory('A');
  const showListB = () => setCategory('B');
  const showListC = () => setCategory('C');
  const showListD = () => setCategory('D');

  const {authToken, BASE_URL} = useAuth();
  const [render, setRender] = useState(1);

  useEffect(() => {
    getLines();
    getComments();
    getQnAs();
    getEmoji();
  }, [render]);

  // GET: 내 밑줄
  const [lines, setLines] = useState([]);
  const getLines = () => {
    axios
      .get(`${BASE_URL}line/${postPk}/`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((response) => {
        setLines(response.data.data.Lines);
        console.log(response.data);
      })
      .catch((error) => {
        console.error('내 밑줄을 불러오는 중 오류가 발생했습니다.', error);
      });
  };

  // GET: 내 댓글
  const [comments, setCommets] = useState([]);
  const getComments = () => {
    axios
      .get(`${BASE_URL}line/${postPk}/com/`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((response) => {
        setCommets(response.data.data.Lines);
        console.log(response.data);
      })
      .catch((error) => {
        console.error('내 댓글을 불러오는 중 오류가 발생했습니다.', error);
      });
  };

  // GET: 내 QnA
  const [qnas, setQnAs] = useState([]);
  const getQnAs = () => {
    axios
      .get(`${BASE_URL}line/${postPk}/qna/`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((response) => {
        setQnAs(response.data.data.Lines);
        console.log(response.data);
      })
      .catch((error) => {
        console.error('내 QnA를 불러오는 중 오류가 발생했습니다.', error);
      });
  };

  //Delete: 질문 삭제
  const handleDelete = (id) => {
    axios
      .delete(`${BASE_URL}line/qnadelete/${id}/`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((response) => {
        setRender(render + 1);
        console.log(response);
      })
      .catch((error) => {
        console.error('질문을 삭제하는 중 오류가 발생했습니다.', error);
      });
  };

  //POST: 질문의 답변
  const addReply = (commentId, replyText) => {
    if (replyText.trim() === '') return null;
    axios
      .post(
        `${BASE_URL}line/ans/${commentId}/`,
        {content: replyText},
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      )
      .then((response) => {
        setRender(render + 1);
        console.log(response);
      })
      .catch((error) => {
        console.error('질문의 답변을 등록하는 중 오류가 발생했습니다.', error);
      });
  };

  // GET: 내 감정표현
  const [emojiList, setEmojiList] = useState([]);
  const getEmoji = () => {
    axios
      .get(`${BASE_URL}line/${postPk}/emo/`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((response) => {
        setEmojiList(response.data.data.Lines);
        console.log(response.data);
      })
      .catch((error) => {
        console.error('내 QnA를 불러오는 중 오류가 발생했습니다.', error);
      });
  };

  const barPosition = {
    A: '0',
    B: '97.5px',
    C: '195px',
    D: '292.5px',
  };

  return (
    <BottomSheetOverlay>
      <BottomSheetContainer onClick={(e) => e.stopPropagation()}>
        <BottomSheetHeader>
          <HeaderText>
            <CloseBottomSheet onClick={handleCloseBottomSheet}>
              닫기
            </CloseBottomSheet>
            <span>밑줄모음</span>
          </HeaderText>
          <HR></HR>
          <Category>
            <div>
              <span
                className={category === 'A' ? 'active' : ''}
                onClick={showListA}
              >
                밑줄
              </span>
            </div>
            <div>
              <span
                className={category === 'B' ? 'active' : ''}
                onClick={showListB}
              >
                댓글
              </span>
            </div>
            <div>
              <span
                className={category === 'C' ? 'active' : ''}
                onClick={showListC}
              >
                Q&A
              </span>
            </div>
            <div>
              <span
                className={category === 'D' ? 'active' : ''}
                onClick={showListD}
              >
                감정표현
              </span>
            </div>
          </Category>
          <Bar style={{left: barPosition[category]}} />
        </BottomSheetHeader>

        {category === 'A' && (
          <SentencesList>
            <Num>문장 {lines.length}개</Num>
            {lines.map((line) => (
              <MySentenceBox
                key={line.line_id}
                lineId={line.line_id}
                lineContent={line.content}
                render={render}
                setRender={setRender}
              ></MySentenceBox>
            ))}
          </SentencesList>
        )}
        {category === 'B' && (
          <SentencesList>
            <Num>댓글 {comments.length}개</Num>
            {comments.map((line) => (
              <>
                <SentenceBox
                  key={line.line_id}
                  lineContent={line.content}
                ></SentenceBox>
                {line.LineCom.map((com) => (
                  <>
                    <MyCommentBox
                      key={com.linecom_id}
                      comId={com.linecom_id}
                      comContent={com.content}
                      comLike={com.likenum}
                      doLike={com.do_like}
                      user={com.linecom_user.nickname}
                      render={render}
                      setRender={setRender}
                    ></MyCommentBox>
                    {com.LineComCom.map((com) => (
                      <MyCommentBox
                        key={com.linecomcom_id}
                        comId={com.linecomcom_id}
                        comContent={com.content}
                        user={com.linecomcom_user.nickname}
                        mention={com.mention}
                        render={render}
                        setRender={setRender}
                      ></MyCommentBox>
                    ))}
                  </>
                ))}
              </>
            ))}
          </SentencesList>
        )}
        {category === 'C' && (
          <SentencesList>
            <Num>질문 {qnas.length}개</Num>
            {qnas.map((line) => (
              <>
                <SentenceBox
                  key={line.line_id}
                  lineContent={line.content}
                ></SentenceBox>
                {line.Question.map((question) => (
                  <>
                    <QContainer key={question.que_id}>
                      <QnABox
                        comment={question}
                        commentContent={question.content}
                        nickname={question.que_user.nickname}
                        addReply={addReply}
                        handleDelete={handleDelete}
                      ></QnABox>
                    </QContainer>
                    {question.Answer.map((answer) => (
                      <AContainer key={answer.ans_id}>
                        <QnABox
                          comment={answer}
                          commentContent={answer.content}
                          nickname={answer.ans_user.nickname}
                          handleDelete={handleDelete}
                        ></QnABox>
                      </AContainer>
                    ))}
                  </>
                ))}
              </>
            ))}
          </SentencesList>
        )}
        {category === 'D' && (
          <SentencesList>
            <Num>표현 {emojiList.length}개</Num>
            {emojiList.map((line) => (
              <SentenceBoxEmoji
                key={line.line_id}
                lineContent={line.content}
                emoji={line.Emotion}
              ></SentenceBoxEmoji>
            ))}
          </SentencesList>
        )}
      </BottomSheetContainer>
    </BottomSheetOverlay>
  );
};

export default SentencesBottomSheet;

const slideInAnimation = keyframes`
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
`;

const BottomSheetOverlay = styled.div`
  z-index: 1;
  position: fixed;
  bottom: 0;
  width: 390px;
  height: 844px;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: flex-end;
`;

const BottomSheetContainer = styled.div`
  width: 100%;
  height: 780px;
  background-color: #fff;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  box-shadow: 0 0 0 1px #353646 inset;
  background: var(--background, #161524);
  overflow-y: auto;
  font-family: 'Pretendard-Regular';
  font-style: normal;

  &::-webkit-scrollbar {
    display: none;
  }

  animation: ${slideInAnimation} 0.3s ease-out;
`;

const BottomSheetHeader = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;

  font-size: 15px;
  line-height: 100%; /* 15px */
  letter-spacing: -0.3px;

  background: var(--background, #161524);
`;

const HeaderText = styled.div`
  display: flex;
  flex-direction: row;
  padding: 30px 20px;

  span {
    color: #fff;
    font-weight: 600;
  }
`;

const CloseBottomSheet = styled.div`
  color: rgba(255, 255, 255, 0.7);
  font-weight: 400;
  margin-right: 125px;
  cursor: pointer;
`;

const Category = styled.div`
  width: 390px;
  height: 47px;
  display: flex;
  flex-direction: row;

  font-size: 14px;
  font-weight: 600;
  line-height: 18px;
  letter-spacing: -0.28px;
  color: rgba(255, 255, 255, 0.5);
  box-sizing: border-box;
  border-bottom: 1px solid rgba(53, 54, 70, 0.3);

  div {
    width: 130px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  div > span {
    cursor: pointer;
  }

  div > span.active {
    color: white;
  }
`;

const Bar = styled.div`
  position: absolute;
  bottom: 0;
  height: 2px;
  width: 97.5px;
  background-color: white;
  transition: left 0.3s ease;
`;

const SentencesList = styled.div`
  margin-top: 125px;
  margin-bottom: 77px;
  width: 390px;
  display: flex;
  flex-direction: column;
`;

const Num = styled.div`
  margin: 20px 21px;
  color: #fff;
  font-size: 12px;
  font-weight: 600;
  line-height: 16px;
  letter-spacing: -0.24px;
`;

const QContainer = styled.div`
  padding: 20px 62px;
  border-bottom: 1px solid #353646;
  background: #1e1c2e;
`;

const AContainer = styled.div`
  padding: 20px 62px;
  border-bottom: 1px solid #353646;
  background: #5a45f5;
`;

const HR = styled.div`
  width: 390px;
  height: 5px;
  background: #353646;
`;
