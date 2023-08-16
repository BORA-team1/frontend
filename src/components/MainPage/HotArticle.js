import React from 'react';
import {useNavigate} from 'react-router-dom';
import styled from 'styled-components';

//components
import Difficulty from './../Common/Difficulty';

//img
import bookmark_on from '../../images/bookmark_on.svg';
import bookmark_off from '../../images/bookmark-off.svg';

const HotArticle = ({article, BASE_URL}) => {
  const navigate = useNavigate();

  let difficulty;
  if (article.diff === 1) {
    difficulty = 'light';
  } else if (article.diff === 2) {
    difficulty = 'medium';
  } else if (article.diff === 3) {
    difficulty = 'heavy';
  }

  return (
    <Box onClick={() => navigate(`/article/${article.post_id}`)}>
      <BookMark src={article.is_booked ? bookmark_on : bookmark_off} />

      <Picture src={`${BASE_URL}${article.post_image}`} />

      <TitleBox>
        <Title>{article.title}</Title>
        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            justifyContent: 'space-between',
            width: '113px',
          }}
        >
          <TagBox>
            {article.hashtag.map((tag, tagIndex) => (
              <Tag key={tagIndex}>#{tag.hashtag}</Tag>
            ))}
          </TagBox>
          <Difficulty size='small' difficulty={difficulty}>
            {difficulty}
          </Difficulty>
        </div>
      </TitleBox>
    </Box>
  );
};

export default HotArticle;

const Box = styled.div`
  position: relative;
  width: 133px;
  height: 171px;
  overflow: hidden;

  border-radius: 10px;
  border: 1px solid #353646;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.25);
`;

const BookMark = styled.img`
  width: 24px;
  height: 24px;

  position: absolute;
  top: 12px;
  right: 12px;
  z-index: 10;
`;

const Picture = styled.img`
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
  object-fit: cover;
`;

const TitleBox = styled.div`
  position: absolute;
  z-index: 1;
  bottom: 0;
  left: 0;
  z-index: 10;

  display: flex;
  width: 113.2px;
  height: 48.4px;
  padding: 10px;
  flex-direction: column;
  align-items: flex-start;
  background: #2b2c3f;
`;

const Title = styled.div`
  width: 113.2px;
  height: 30px;
  align-self: stretch;

  overflow: hidden;
  color: #fff;
  text-overflow: ellipsis;
  white-space: normal;
  font-family: 'Pretendard-Regular';
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
`;

const TagBox = styled.ul`
  display: flex;
  flex-direction: row;
  list-style: none;
  padding: 0;
`;

const Tag = styled.li`
  display: inline-block;
  &:not(:last-child)::after {
    content: ' • ';
    margin: 0 1px;
  }
  color: rgba(255, 255, 255, 0.5);
  font-family: 'Pretendard-Regular';
  font-size: 9px;
  overflow: hidden;
  text-overflow: ellipsis;
  font-style: normal;
  font-weight: 500;
`;
