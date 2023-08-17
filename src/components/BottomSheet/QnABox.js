import React, {useState} from 'react';
import styled from 'styled-components';

//images
import submiticon from '../../images/submiticon.svg';

const QnABox = ({
  comment,
  commentContent,
  nickname,
  profile,
  addReply,
  handleDelete,
}) => {
  //답글 등록 함수들
  const [replyText, setReplyText] = useState('');
  const [showReplyForm, setShowReplyForm] = useState(false);

  const handleReply = (event) => {
    if (event.key === 'Enter' && event.shiftKey === false) {
      event.preventDefault();

      addReply(comment.que_id, replyText);
      setReplyText('');
      setShowReplyForm(false);
    }
  };

  const handleReplyClick = () => {
    addReply(comment.que_id, replyText);
    setReplyText('');
    setShowReplyForm(false);
  };

  return (
    <>
      <Container>
        <ProfileContainer>
          <img src={`${profile}`} alt='profileimg'></img>
        </ProfileContainer>
        <ContentContainer>
          <Id>{nickname}</Id>
          <Content>{commentContent}</Content>
          {comment.que_id && (
            <Plus>
              {comment.Answer && (
                <>
                  <div onClick={() => setShowReplyForm(!showReplyForm)}>
                    답변 {comment.Answer.length}개
                  </div>
                  {/* 이 질문이 내 질문이고 답변이 달리지 않았을 때만 삭제 허용 */}
                  {comment.is_my && comment.Answer.length === 0 && (
                    <>
                      <span>·</span>
                      <div onClick={() => handleDelete(comment.que_id)}>
                        삭제
                      </div>
                    </>
                  )}
                </>
              )}
            </Plus>
          )}
        </ContentContainer>
      </Container>
      {showReplyForm && (
        <>
          <Mention>질문에 답변달기</Mention>
          <InputBoxPosition>
            <Inputbox
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              onKeyDown={(e) => handleReply(e)}
              placeholder='질문에 답변해 보세요.'
            ></Inputbox>
            <img
              onClick={() => handleReplyClick()}
              src={submiticon}
              alt='submiticon'
            ></img>
          </InputBoxPosition>
        </>
      )}
    </>
  );
};
export default QnABox;

const Container = styled.div`
  display: flex;
  flex-direction: row;
`;

const ProfileContainer = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 50%;

  img {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    object-fit: cover;
  }
`;

const ContentContainer = styled.div`
  width: 296px;
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  font-family: 'Pretendard-Regular';
  font-style: normal;
  line-height: normal;
`;

const Id = styled.div`
  color: white;
  font-size: 12px;
  font-weight: 600;
`;

const Content = styled.div`
  margin-top: 5px;
  margin-bottom: 10px;
  color: white;
  font-size: 14px;
  font-weight: 400;
  line-height: 139.336%;
`;

const Plus = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  gap: 2px;

  color: rgba(255, 255, 255, 0.7);
  font-size: 10px;
  font-weight: 500;

  img {
    width: 9px;
    height: 9.212px;
    cursor: pointer;
  }

  div {
    cursor: pointer;
  }
`;

const InputBoxPosition = styled.div`
  z-index: 2;
  width: 390px;
  height: 83px;
  padding: 21px 20px;
  box-sizing: border-box;
  position: absolute;
  bottom: 0;
  left: 0;
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

const Mention = styled.div`
  position: absolute;
  bottom: 83px;
  left: 0;
  display: flex;
  align-items: center;
  width: 350px;
  padding: 0px 20px;
  height: 32px;
  background: #242237;

  color: rgba(255, 255, 255, 0.6);
  font-size: 12px;
  font-weight: 500;
  line-height: normal;
`;

const Inputbox = styled.input`
  width: 309px;
  height: 35px;
  border-radius: 20px;
  box-shadow: 0 0 0 1px #fff inset;
  background-color: #161524;
  padding-left: 10px;
  display: flex;
  align-items: center;

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
