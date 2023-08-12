import React, {useState} from 'react';
import styled, {css} from 'styled-components';
import QnABox from './QnABox';
import submiticon from '../../images/submiticon.svg';
// import axios from 'axios';

const QnAList = ({expanded, openExpandSpace}) => {
  //질문 등록
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([
    {
      que_id: 1,
      content: '첫 번째 질문입니다.',
      is_my: true,
      answers: [
        {ans_id: 1, content: '답변 1'},
        {ans_id: 2, content: '답변 2'},
        {ans_id: 3, content: '답변 3'},
      ],
    },
    {
      que_id: 2,
      content: '두 번째 질문입니다.',
      is_my: false,
      answers: [
        {ans_id: 1, content: '답변 1'},
        {ans_id: 2, content: '답변 2'},
      ],
    },
  ]);

  const handleCommentSubmit = () => {
    if (comment.trim() === '') return null;
    const newQuestion = {
      que_id: comments + 1,
      content: comment, //API 연결해서 Post할 때는 content만 전달하면 됨.
      is_my: true,
      answers: [],
    };

    setComments([...comments, newQuestion]);
    console.log(comments);
    setComment('');
  };

  //첫번째 답변 클릭하면 다른 답변 펼쳐지기
  const [expandedQuestions, setExpandedQuestions] = useState({});
  const toggleAnswers = (que_id) => {
    setExpandedQuestions((prevExpanded) => ({
      ...prevExpanded,
      [que_id]: !prevExpanded[que_id],
    }));
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
                <QnABox comment={comment}></QnABox>
              </QContainer>
              <>
                {comment.answers.length > 0 && (
                  <>
                    <AContainer
                      onClick={() => {
                        toggleAnswers(comment.que_id);
                      }}
                    >
                      <QnABox comment={comment.answers[0]}></QnABox>
                    </AContainer>
                    {!expandedQuestions[comment.que_id] && (
                      <BoxContainer>
                        {comment.answers.length > 1 && (
                          <>
                            <Box1
                              style={{
                                background: '#4332BD',
                              }}
                            ></Box1>
                            {comment.answers.length > 2 && (
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
                    comment.answers.slice(1).map((comment, id) => (
                      <AContainer key={id}>
                        <QnABox comment={comment}></QnABox>
                      </AContainer>
                    ))}
                </AnswerWrapper>
              </>
            </QnAContainer>
          ))}
        </List>
      ) : (
        <List expanded={expanded}>
          {comments.length > 0 && (
            <QContainer onClick={openExpandSpace}>
              <QnABox comment={comments[comments.length - 1]}></QnABox>
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
  padding-left: 10px;

  color: rgba(255, 255, 255, 0.6);
  font-family: 'Pretendard-Regular';
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;
