import React, {useState, useRef} from 'react';
import styled from 'styled-components';

const QnACreateModal = () => {
  const [text, setText] = useState('');
  const saveQnA = (event) => {
    setText(event.target.value);
  };

  const textRef = useRef();
  const handleResizeHeight = () => {
    textRef.current.style.height = 'auto';
    textRef.current.style.height = textRef.current.scrollHeight + 'px';
  };

  return (
    <Wrapper>
      <CreateButton>등록</CreateButton>
      <Container>
        <Title>Q&A</Title>
        <TextInput>
          <textarea
            ref={textRef}
            onInput={handleResizeHeight}
            onChange={saveQnA}
            placeholder='질문을 입력해 주세요.'
            rows={1}
            maxlength='72'
          ></textarea>
        </TextInput>
      </Container>
    </Wrapper>
  );
};

export default QnACreateModal;

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  width: 390px;
  height: 100%;
  display: flex;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

const Container = styled.div`
  position: absolute;
  top: 180px;
  width: 300px;
  height: 211px;
  display: flex;
  flex-direction: column;
  align-items: center;

  border-radius: 10px;
  border: 1px solid var(--unnamed, #353646);
  background: var(--card-color, #2b2c3f);
  box-sizing: border-box;
`;

const TextInput = styled.div`
  width: 280px;
  height: 190px;
  display: flex;
  justify-content: center;
  align-items: center;

  textarea {
    max-height: 190px;
    background: none;
    border: none;
    outline: none;
    resize: none;
    text-align: center;
    color: #fff;
    font-family: 'Pretendard-Regular';
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: 136.5%; /* 27.3px */
    letter-spacing: -0.4px;
  }
`;

const CreateButton = styled.div`
  position: absolute;
  top: 76px;
  right: 20px;
  color: rgba(255, 255, 255, 0.7);

  font-family: 'Pretendard-Regular';
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 136.5%; /* 24.57px */
  letter-spacing: -0.36px;
  text-decoration-line: underline;
  cursor: pointer;
`;

const Title = styled.div`
  margin-top: -20px;
  padding: 10px 20px;
  border-radius: 20px;
  background: var(--main-purple, #5a45f5);

  color: #fff;
  font-family: 'Pretendard-Regular';
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;
