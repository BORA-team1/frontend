import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import styled from 'styled-components';

//components
import PlaylistDetailBottomSheet from '../../components/AudiobookPage/PlaylistDetailBottomSheet';

//img
import more from '../../images/more.svg';
import audiobookdetail from '../../images/Audiobook/audiobookdetail.svg';
import CLOVA_dubbing from '../../images/Audiobook/CLOVA_dubbing.svg';

const AudiobookTitleBox = ({audio}) => {
  //보는 아티클로 이동 버튼
  const navigate = useNavigate();
  const post_id = audio?.audio_post?.post_id;
  //바텀시트
  const [showBottomSheet, setShowBottomSheet] = useState(false);

  const handleOpenBottomSheet = () => {
    setShowBottomSheet(true);
  };

  const handleCloseBottomSheet = () => {
    setShowBottomSheet(false);
  };
  //난이도 판단
  const getDifficultyText = (difficulty) => {
    if (difficulty === 1) {
      return 'Light';
    } else if (difficulty === 2) {
      return 'Medium';
    } else if (difficulty === 3) {
      return 'Heavy';
    } else {
      return '';
    }
  };
  const user_id = audio?.author_id;
  return (
    <>
      <Box>
        <ChangeBtn onClick={() => navigate(`/article/${post_id}`)}>
          보는 아티클로 읽기 <img src={more} alt='morereview' />
        </ChangeBtn>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-start',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
            }}
          >
            <Clova src={CLOVA_dubbing} />
            <Title>{audio?.audio_post?.title}</Title>
          </div>
          <AudiobookDetail
            src={audiobookdetail}
            onClick={handleOpenBottomSheet}
          />
        </div>
        <TagBox>
          <Difficulty>{getDifficultyText(audio?.audio_post?.diff)}</Difficulty>
          {audio?.audio_post?.hashtag &&
            audio?.audio_post?.hashtag.map((tag, index) => (
              <Tag key={index}>#{tag.hashtag}</Tag>
            ))}
        </TagBox>
      </Box>

      {showBottomSheet && (
        <PlaylistDetailBottomSheet
          handleCloseBottomSheet={handleCloseBottomSheet}
          user_id={user_id}
        />
      )}
    </>
  );
};

export default AudiobookTitleBox;

const Box = styled.div`
  display: flex;
  padding: 0px 18px 0px 30px;

  flex-direction: column;
  align-items: flex-start;
  gap: 10px;

  background: transparent;
  margin-bottom: 10px;
`;

const Font = styled.div`
  color: #fff;
  font-family: 'Pretendard-Regular';
  font-style: normal;
  line-height: normal;
  letter-spacing: -0.22px;
`;

const ChangeBtn = styled(Font)`
  display: flex;
  justify-content: center;
  font-size: 15px;
  font-weight: 600;
  margin-top: 15px;

  opacity: 0.5;

  img {
    width: 13.5px;
    height: 13.5px;
    margin-left: 5px;
    margin-top: 2px;
  }
  cursor: pointer;
`;

const Clova = styled.img`
  width: 88px;
  height: 11.297px;
  margin-top: 24.69px;
  margin-bottom: 10px;
`;

const Title = styled(Font)`
  width: 271px;
  height: 22px;
  background: transparent;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 20px;
  font-weight: 700;
  padding-bottom: 2px;
`;

const AudiobookDetail = styled.img`
  width: 30px;
  height: 30px;
  background: transparent;
  margin-left: 40px;
  margin-top: 15px;
`;

const TagBox = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 5px;
`;

const Difficulty = styled(Font)`
  display: inline-flex;
  padding: 7px 14px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-right: 9px;

  color: var(--sub-purple, #a397ff);

  border-radius: 20px;
  border: 1px solid var(--sub-purple, #a397ff);
  background: #1c154d;
  backdrop-filter: blur(5px);

  font-size: 12px;
  font-weight: 500;
  text-align: center;
`;

const Tag = styled(Font)`
  display: inline-flex;
  padding: 7px 14px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-right: 9px;

  color: rgba(255, 255, 255, 0.6);

  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(5px);

  font-size: 12px;
  font-weight: 500;
  text-align: center;
`;
