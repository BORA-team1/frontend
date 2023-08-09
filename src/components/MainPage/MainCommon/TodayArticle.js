import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

//components
import Difficulty from "../../Common/Difficulty";

//임시 Data
import { postCover } from "../../../data/_mock/articledata";

//img
import article_background from "../../../images/post/post1.svg";
import bookmark_on from "../../../images/bookmark_on.svg";
import bookmark_off from "../../../images/bookmark-off.svg";

const TodayArticle = ({ navigatorP }) => {
  const BASE_URL = "http://localhost:3002";
  // 페이지 로드 시 저장된 글 목록을 불러옵니다.
  useEffect(() => {
    getPosts();
  }, []);

  const [posts, setPosts] = useState([]);
  const getPosts = () => {
    axios
      .get(`${BASE_URL}/main`)
      .then((response) => {
        setPosts(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("글 목록을 불러오는 중 오류가 발생했습니다.", error);
      });
  };
  return (
    <>
      {posts &&
        posts.Random?.map((article) => {
          let difficulty;
          if (article.diff === 1) {
            difficulty = "light";
          } else if (article.diff === 2) {
            difficulty = "medium";
          } else if (article.diff === 3) {
            difficulty = "heavy";
          }

          const imageArray = postCover[0] || []; // post_id 기반 이미지 배열 받아오기

          return (
            <Box key={article.post_id} onClick={navigatorP}>
              <BookMark src={article.is_booked ? bookmark_on : bookmark_off} />

              <Picture src={imageArray[article.post_id - 1] || ""} />

              <TitleBox>
                <Title>{article.title}</Title>
                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    justifyContent: "space-between",
                    width: "113px",
                  }}
                >
                  <TagBox>
                    {article.hashtag.map((tag, tagIndex) => (
                      <Tag key={tagIndex}>#{tag.hashtag}</Tag>
                    ))}
                  </TagBox>
                  <Difficulty size="small" difficulty={difficulty}>
                    {difficulty}
                  </Difficulty>
                </div>
              </TitleBox>
            </Box>
          );
        })}
    </>
  );
};

export default TodayArticle;

const Box = styled.div`
  position: relative;
  width: 133px;
  height: 171px;
  overflow: hidden;

  margin-right: 15px;

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
  font-family: "Pretendard-Regular";
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
    content: " • ";
    margin: 0 1px;
  }
  color: rgba(255, 255, 255, 0.5);
  font-family: "Pretendard-Regular";
  font-size: 9px;
  overflow: hidden;
  text-overflow: ellipsis;
  font-style: normal;
  font-weight: 500;
`;
