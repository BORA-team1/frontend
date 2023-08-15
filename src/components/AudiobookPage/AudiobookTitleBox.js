import React, { useState } from "react";
import styled from "styled-components";

//components
import PlaylistDetailBottomSheet from "../../components/AudiobookPage/PlaylistDetailBottomSheet";

//img
import more from "../../images/more.svg";
import audiobookdetail from "../../images/Audiobook/audiobookdetail.svg";

const AudiobookTitleBox = ({ audio }) => {
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
      return "Light";
    } else if (difficulty === 2) {
      return "Medium";
    } else if (difficulty === 3) {
      return "Heavy";
    } else {
      return "";
    }
  };
  return (
    <>
      <Box>
        <ChangeBtn>
          보는 아티클로 읽기 <img src={more} alt="morereview" />
        </ChangeBtn>
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
          }}
        >
          <Title>{audio?.audio_post?.title}</Title>
          <AudiobookDetail
            src={audiobookdetail}
            onClick={handleOpenBottomSheet}
          />
        </div>
        <TagBox>
          <Difficulty>{getDifficultyText(audio?.audio_post?.diff)}</Difficulty>
          {audio?.audio_post?.hashtag &&
            audio?.audio_post?.hashtag.map((tag, index) => (
              <Tag key={index}>{tag.hashtag}</Tag>
            ))}
        </TagBox>
      </Box>

      {/* <Title>ㅎㅎ</Title>
          <AudiobookDetail
            src={audiobookdetail}
            onClick={handleOpenBottomSheet}
          />
        </div>
        <TagBox>
          <Difficulty>ㅎㅎ</Difficulty>

          <Tag>ㅎㅎ</Tag>
        </TagBox>
      </Box> */}
      {/* 이게 무슨 청기 백기 에러??????? */}
      {showBottomSheet && (
        <PlaylistDetailBottomSheet
          handleCloseBottomSheet={handleCloseBottomSheet}
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
`;

const Font = styled.div`
  color: #fff;
  font-family: "Pretendard-Regular";
  font-style: normal;
  line-height: normal;
  letter-spacing: -0.22px;
`;

const ChangeBtn = styled(Font)`
  display: flex;
  justify-content: center;
  font-size: 15px;
  font-weight: 600;
  margin-top: 10px;

  opacity: 0.5;

  img {
    width: 13.5px;
    height: 13.5px;
    margin-left: 5px;
    margin-top: 2px;
  }
`;

const Title = styled(Font)`
  width: 271px;
  height: 20px;
  background: transparent;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 20px;
  font-weight: 700;
`;

const AudiobookDetail = styled.img`
  width: 30px;
  height: 30px;
  background: transparent;
  margin-left: 40px;
`;

const TagBox = styled.div`
  display: flex;
  flex-direction: row;
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
