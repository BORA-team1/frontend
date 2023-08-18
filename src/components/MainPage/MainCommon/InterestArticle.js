import styled from 'styled-components';
import {useNavigate} from 'react-router-dom';

const InterestArticle = ({playlist}) => {
  const navigate = useNavigate();
  return (
    <Box
      onClick={() => {
        navigate(`/article/${playlist.first_audio}/${playlist.playlist_id}/`);
      }}
    >
      <Title>{playlist.title}</Title>
      <TagBox>
        {playlist.hashtag.map((tag, tagIndex) => (
          <Tag key={tagIndex}>#{tag.hashtag}</Tag>
        ))}
      </TagBox>
    </Box>
  );
};

export default InterestArticle;

const Box = styled.div`
  display: flex;
  padding: 13px 12px;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;

  width: 94px;
  height: 32x;

  border-radius: 10px;
  border: 1px solid #353646;
  background: #242237;
`;

const Title = styled.div`
  width: 94px;
  height: 12px;

  overflow: hidden;
  color: #fff;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-family: 'Pretendard-Regular';
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: 100%; /* 12px */
`;

const TagBox = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2px;
`;

const Tag = styled.div`
  color: rgba(255, 255, 255, 0.5);
  font-family: 'Pretendard-Regular';
  font-size: 10px;
  font-style: normal;
  font-weight: 600;
  line-height: 100%; /* 10px */
`;
