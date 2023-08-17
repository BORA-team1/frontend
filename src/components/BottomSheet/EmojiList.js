import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import axios from 'axios';

//images
import happy from '../../images/emoji/happy.svg';
import surprised from '../../images/emoji/surprised.svg';
import anger from '../../images/emoji/anger.svg';
import sad from '../../images/emoji/sad.svg';
import curious from '../../images/emoji/curious.svg';
import createemoji from '../../images/emoji/createemoji.svg';

//context
import {useAuth} from '../../contexts/AuthContext';
import {usePost} from '../../contexts/PostContext';

const EmojiList = ({openEmojiBar}) => {
  const {authToken, BASE_URL} = useAuth();
  const {postPk, selectedIndex, emojiRender, setEmojiRender} = usePost();

  //GET: 감정표현 목록
  useEffect(() => {
    getEmoji();
  }, [emojiRender]);

  const [emojiList, setEmojiList] = useState([]);
  const getEmoji = () => {
    axios
      .get(`${BASE_URL}post/${postPk}/contents/`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((response) => {
        const postData = response.data.data.PostSec;
        const targetSection = postData.find(
          (section) => section.num === selectedIndex.index
        );
        if (targetSection) {
          const targetLine = targetSection.Lines.find(
            (line) => line.sentence === selectedIndex.sentenceIndex
          );
          const targetComments = targetLine.Emotion;
          setEmojiList(targetComments);
        }
        console.log(emojiList);
      })
      .catch((error) => {
        console.error('감정표현을 불러오는 중 오류가 발생했습니다.', error);
      });
  };

  //Delete: 감정표현 삭제
  const deleteEmoji = (isMy, emoji) => {
    console.log(emoji);
    if (isMy) {
      axios
        .delete(
          `${BASE_URL}line/emo/w/${postPk}/`,
          {
            line_postsec: selectedIndex.index,
            sentence: selectedIndex.sentenceIndex,
            content: emoji,
          },
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        )
        .then((response) => {
          setEmojiRender(emojiRender + 1);
          console.log(response.data);
        })
        .catch((error) => {
          console.error('감정표현을 삭제하는 중 오류가 발생했습니다.', error);
        });
    }
  };

  //감정표현 이미지
  const emojiImages = {
    1: happy,
    2: surprised,
    3: anger,
    4: sad,
    5: curious,
  };

  return (
    <Container>
      <EmojiContainer>
        {emojiList.map(
          (item) =>
            item.num !== 0 && (
              <Emoji
                key={item.content}
                style={{
                  borderColor: item.is_my ? '#A397FF' : '#fff',
                  background: item.is_my ? '#1C154D' : 'none',
                }}
                onClick={() => deleteEmoji(item.is_my, item.content)}
              >
                <img src={emojiImages[item.content]} alt='Emoji' />
                <span
                  style={{
                    color: item.is_my ? '#A397FF' : '#fff',
                  }}
                >
                  {item.num}
                </span>
              </Emoji>
            )
        )}
      </EmojiContainer>
      <CreateEmoji onClick={openEmojiBar}>
        <img src={createemoji} alt='createemoji' />
      </CreateEmoji>
    </Container>
  );
};

export default EmojiList;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
`;

const EmojiContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
`;

const Emoji = styled.div`
  width: 49px;
  height: 28px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3.6px;
  border-radius: 14px;
  border: 1px solid;
  box-sizing: border-box;

  img {
    width: 20px;
    height: 20px;
  }

  span {
    font-family: 'Pretendard-Regular';
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 100%; /* 14px */
    letter-spacing: -0.28px;
  }
`;

const CreateEmoji = styled.div`
  padding: 4px 11px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  img {
    width: 20px;
    height: 20px;
  }
`;
