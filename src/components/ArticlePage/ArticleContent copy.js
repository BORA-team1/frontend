import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import axios from 'axios';

const ArticleContent = () => {
  const BASE_URL = 'http://localhost:3001';

  // 페이지 로드 시 저장된 글 목록을 불러옵니다.
  useEffect(() => {
    getPosts();
  }, []);

  const [posts, setPosts] = useState([]);
  const getPosts = () => {
    axios
      .get(`${BASE_URL}/data`)
      .then((response) => {
        setPosts(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error('글 목록을 불러오는 중 오류가 발생했습니다.', error);
      });
  };

  return (
    <Wrapper>
      {posts.length > 0 &&
        posts.map((item) => (
          <div key={item.post_id}>
            {item.post_id === 1 &&
              item.PostSec.map((sec) => (
                <div key={sec.sec_id}>
                  <h3>{sec.title}</h3>
                  <p>{sec.content}</p>
                </div>
              ))}
          </div>
        ))}
      <EditerFollow>이 포스트의 에디터 팔로우하기</EditerFollow>
    </Wrapper>
  );
};

export default ArticleContent;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 37.4px;
  gap: 50px;

  color: black;
  font-family: 'Pretendard-Regular';
  font-size: 15px;
  font-style: normal;
  font-weight: 300;
  line-height: 169.336%;
`;

const EditerFollow = styled.div`
  display: flex;
  width: fit-content;
  padding: 10px 35px;
  margin: 20px 76px 40px 76px;

  border-radius: 20px;
  background: #5a45f5;

  font-size: 14px;
  font-weight: 700;
  line-height: normal;
  cursor: pointer;
`;
