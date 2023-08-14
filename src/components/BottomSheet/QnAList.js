import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import axios from 'axios';

//components
import QnABox from './QnABox';
//images
import submiticon from '../../images/submiticon.svg';
//context
import {useAuth} from '../../contexts/AuthContext';
import {usePost} from '../../contexts/PostContext';

const QnAList = ({expanded, openExpandSpace}) => {
  const [render, setRender] = useState(1);

  // GET: QnA
  const {authToken, BASE_URL} = useAuth();
  const {postPk, selectedIndex} = usePost();
  useEffect(() => {
    getComments();
  }, [render]);

  const [comments, setComments] = useState([]);
  const getComments = () => {
    axios
      .get(`${BASE_URL}post/${postPk}/contents/`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((response) => {
        const postData = response.data.data.PostSec;
        const targetSection = postData.find(
          (section) => section.sec_id === selectedIndex.index
        );
        if (targetSection) {
          const targetLine = targetSection.Lines.find(
            (line) => line.sentence === selectedIndex.sentenceIndex
          );
          const targetComments = targetLine.Question;
          setComments(targetComments);
        }
        console.log(comments);
      })
      .catch((error) => {
        console.error('QnA 목록을 불러오는 중 오류가 발생했습니다.', error);
      });
  };

  //POST: QnA
  const [comment, setComment] = useState('');
  const handleCommentSubmit = () => {
    if (comment.trim() === '') return null;
    axios
      .post(
        `${BASE_URL}line/qna/w/${postPk}/`,
        {
          line_postsec: selectedIndex.index,
          sentence: selectedIndex.sentenceIndex,
          line_content: selectedIndex.sentence,
          content: comment,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      )
      .then((response) => {
        setRender(render + 1);
        setComment('');
        console.log(response);
      })
      .catch((error) => {
        console.error('질문을 등록하는 중 오류가 발생했습니다.', error);
      });
  };

  //첫번째 답변 클릭하면 다른 답변 펼쳐지기
  const [expandedQuestions, setExpandedQuestions] = useState({});
  const toggleAnswers = (que_id) => {
    setExpandedQuestions((prevExpanded) => ({
      ...prevExpanded,
      [que_id]: !prevExpanded[que_id],
    }));
  };

  //POST: 댓글 답글
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

  return (
    <Container>
      <Num>질문 {comments.length}개</Num>
      {expanded === 'open' ? (
        <List
          style={{
            gap: expanded === 'open' ? '25px' : '0px',
          }}
        >
          {comments.map((comment, id) => (
            <QnAContainer>
              <QContainer key={id}>
                <QnABox
                  comment={comment}
                  commentContent={comment.content}
                  nickname={comment.que_user.nickname}
                  addReply={addReply}
                  handleDelete={handleDelete}
                ></QnABox>
              </QContainer>
              <>
                {comment.Answer.length > 0 && (
                  <>
                    <AContainer
                      onClick={() => {
                        toggleAnswers(comment.que_id);
                      }}
                    >
                      <QnABox
                        comment={comment.Answer[0]}
                        commentContent={comment.Answer[0].content}
                        nickname={comment.Answer[0].ans_user.nickname}
                      ></QnABox>
                    </AContainer>
                    {!expandedQuestions[comment.que_id] && (
                      <BoxContainer>
                        {comment.Answer.length > 1 && (
                          <>
                            <Box1
                              style={{
                                background: '#4332BD',
                              }}
                            ></Box1>
                            {comment.Answer.length > 2 && (
                              <Box2
                                style={{
                                  background: '#362994',
                                }}
                              ></Box2>
                            )}
                          </>
                        )}
                      </BoxContainer>
                    )}
                  </>
                )}
                <AnswerWrapper
                  style={{
                    maxHeight: expandedQuestions[comment.que_id]
                      ? '2000px'
                      : '0',
                  }}
                >
                  {expandedQuestions[comment.que_id] &&
                    comment.Answer.slice(1).map((comment, id) => (
                      <AContainer key={id}>
                        <QnABox
                          comment={comment}
                          commentContent={comment.content}
                          nickname={comment.ans_user.nickname}
                        ></QnABox>
                      </AContainer>
                    ))}
                </AnswerWrapper>
              </>
            </QnAContainer>
          ))}
        </List>
      ) : (
        <List
          style={{
            gap: expanded === 'open' ? '25px' : '0px',
          }}
        >
          {comments.length > 0 && (
            <QContainer onClick={openExpandSpace}>
              <QnABox
                comment={comments[comments.length - 1]}
                commentContent={comments[comments.length - 1].content}
                nickname={comments[comments.length - 1].que_user.nickname}
              ></QnABox>
            </QContainer>
          )}
          <BoxContainer>
            {comments.length > 1 && (
              <>
                <Box1 />
                {comments.length > 2 && <Box2 />}
              </>
            )}
          </BoxContainer>
        </List>
      )}
      <InputBoxPosition>
        <Inputbox
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder='밑줄 친 문장을 읽고 궁금한 점을 질문해 보세요.'
        ></Inputbox>
        <img
          onClick={handleCommentSubmit}
          src={submiticon}
          alt='submiticon'
        ></img>
      </InputBoxPosition>
    </Container>
  );
};

export default QnAList;

const Container = styled.div`
  width: 390px;
  display: flex;
  flex-direction: column;
  margin-top: 192px;
  margin-bottom: 90px;
`;

const Num = styled.div`
  margin: 20px 21px;
  color: #fff;
  font-family: 'Pretendard-Regular';
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: 133.5%; /* 16.02px */
  letter-spacing: -0.24px;
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const QnAContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const QContainer = styled.div`
  width: 302px;
  padding: 25px 20px;
  box-sizing: border-box;

  border-radius: 10px;
  border: 1px solid #353646;
  background: #2b2c3f;
`;

const AnswerWrapper = styled.div`
  overflow: hidden;
  transition: max-height 0.3s ease-in-out;
`;

const AContainer = styled.div`
  width: 302px;
  padding: 25px 20px;
  box-sizing: border-box;
  margin-top: 0px;

  border-radius: 10px;
  border: 1px solid #604cf9;
  background: #5a45f5;
`;

const BoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Box1 = styled.div`
  width: 272px;
  height: 8px;
  box-sizing: border-box;

  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  border: 1px solid var(--unnamed, #353646);
  border-top: 0px;
  background: var(--card-color, #2b2c3f);
`;

const Box2 = styled.div`
  width: 250px;
  height: 8px;
  box-sizing: border-box;

  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  border: 1px solid var(--unnamed, #353646);
  border-top: 0px;
  background: var(--card-color, #2b2c3f);
`;

const InputBoxPosition = styled.div`
  width: 390px;
  padding: 21px 20px;
  box-sizing: border-box;
  border-top: 1px solid #353646;
  position: absolute;
  bottom: 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: #161524;
  gap: 6px;

  img {
    width: 35px;
    height: 35px;
    cursor: pointer;
  }
`;

const Inputbox = styled.input`
  width: 309px;
  height: 35px;
  border-radius: 20px;
  box-shadow: 0 0 0 1px #fff inset;
  background-color: #161524;
  padding-left: 16px;

  color: white;
  font-family: 'Pretendard-Regular';
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;

  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }
`;
