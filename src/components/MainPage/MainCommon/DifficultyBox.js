import {useNavigate} from 'react-router-dom';
import styled from 'styled-components';

//img
import voteicon_on from '../../../images/DifficultyArticle/voteicon-on.svg';
import voteicon_off from '../../../images/DifficultyArticle/voteicon-off.svg';
import dabateicon_on from '../../../images/DifficultyArticle/dabateicon-on.svg';
import dabateicon_off from '../../../images/DifficultyArticle/dabateicon-off.svg';
import QnAicon_on from '../../../images/DifficultyArticle/QnAicon-on.svg';
import QnAicon_off from '../../../images/DifficultyArticle/QnAicon-off.svg';

//context
import {useAuth} from '..//../../contexts/AuthContext';

const DifficultyArticle = ({article}) => {
  const {BASE_URL} = useAuth();
  const navigate = useNavigate();
  return (
    <>
      <Box
        key={article.post_id}
        onClick={() => navigate(`/article/${article.post_id}`)}
      >
        <ArticleImage src={`${BASE_URL}${article.post_image}`} />
        <TextContainer>
          <TagBox>
            {article.hashtag.map((tag, tagIndex) => (
              <Tag key={tagIndex}>#{tag.hashtag}</Tag>
            ))}
          </TagBox>
          <Title>{article.title}</Title>
          <ArticleAuthor>by. {article.author}</ArticleAuthor>
        </TextContainer>
        <IconBox>
          <VoteIcon src={article.is_vote ? voteicon_on : voteicon_off} />
          <DebateIcon
            src={article.is_debate ? dabateicon_on : dabateicon_off}
          />
          <QnAIcon src={article.is_que ? QnAicon_on : QnAicon_off} />
        </IconBox>
      </Box>
    </>
  );
};

export default DifficultyArticle;

const Box = styled.div`
  display: flex;
  flex-direction: flex-start;
  padding: 10px 0px;

  height: 80px;
`;

const ArticleImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 10px;
`;

const TextContainer = styled.div`
  margin: 7px 10px;
`;

const TagBox = styled.div`
  display: flex;
  flex-direction: row;
`;

const Tag = styled.div`
  color: var(--main-purple, #5a45f5);
  font-family: 'Pretendard-Regular';
  font-size: 11px;
  font-style: normal;
  font-weight: 600;
`;

const Title = styled.div`
  width: 170px;
  height: 33px;

  margin: 5px 0px;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-family: 'Pretendard-Regular';
  font-size: 13px;
  font-style: normal;
  font-weight: 600;
`;

const ArticleAuthor = styled.div`
  color: rgba(255, 255, 255, 0.5);
  font-family: 'Pretendard-Regular';
  font-size: 9px;
  font-style: normal;
  font-weight: 600;
`;

const IconBox = styled.div`
  position: relative;
`;

const VoteIcon = styled.img`
  position: absolute;
  z-index: 30;

  margin: 20px 45px 20px 0px;
`;

const DebateIcon = styled.img`
  position: absolute;
  z-index: 20;

  margin: 20px 22px 20px 23px;
`;

const QnAIcon = styled.img`
  position: absolute;
  z-index: 10;

  margin: 20px 0px 20px 45px;
`;
