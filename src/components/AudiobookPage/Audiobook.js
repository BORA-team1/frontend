import styled from "styled-components";

const Audiobook = ({ audio_post, long, onDelete, onClick }) => {
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
    <Box>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Title onClick={onClick}>{audio_post?.title}</Title>
        <Del onClick={onDelete}>삭제</Del>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "10px",
        }}
      >
        <div style={{ display: "flex" }}>
          <Difficulty>{getDifficultyText(audio_post?.diff)}</Difficulty>
          <TagBox>
            {audio_post?.hashtag &&
              audio_post?.hashtag.map((tag, index) => (
                <Tag key={index}>{tag.hashtag}</Tag>
              ))}
          </TagBox>
        </div>
        <Time>{long}분</Time>
      </div>
    </Box>
  );
};

export default Audiobook;

const Box = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 20px 1.5px;

  width: 346px;
  height: 37px;

  border-bottom: 0.7px solid rgba(252, 252, 252, 0.3);
  cursor: pointer;
`;

const Font = styled.div`
  color: #fff;
  font-family: "Pretendard-Regular";
  font-style: normal;
  line-height: normal;
  letter-spacing: -0.22px;
`;

const Title = styled(Font)`
  height: 15px;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 15px;
  font-weight: 500;
`;

const Del = styled(Font)`
  color: rgba(255, 255, 255, 0.5);
  text-align: right;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
`;

const TagBox = styled.div`
  display: flex;
  flex-direction: row;
`;

const Tag = styled(Font)`
  color: rgba(255, 255, 255, 0.6);
  font-size: 13px;
  font-weight: 300;
  margin-left: 10px;
`;

const Difficulty = styled(Font)`
  color: rgba(255, 255, 255, 0.6);
  font-size: 13px;
  font-weight: 300;
`;

const Time = styled(Font)`
  color: rgba(255, 255, 255, 0.6);
  text-align: right;
  font-size: 15px;
  font-weight: 400;
`;
