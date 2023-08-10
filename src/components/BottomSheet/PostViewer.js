import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';

const PostViewer = () => {
  const {post_id} = useParams();
  const [posts, setPosts] = useState([]);
  const [selectedHanContent, setSelectedHanContent] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:3001/data')
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  useEffect(() => {
    const selectedPost = posts.find(
      (post) => post.post_id === parseInt(post_id)
    );
    if (selectedPost) {
      setSelectedHanContent(selectedPost.Han[0]?.content || ''); // 첫 번째 Han 객체의 content 가져오기
    }
  }, [post_id, posts]);

  if (posts.length === 0) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Post Viewer</h1>
      <div>
        <h2>Selected Post Content</h2>
        <p>{selectedHanContent}</p>
      </div>
      <div>
        <h2>All Han Content</h2>
        {posts
          .find((post) => post.post_id === parseInt(post_id))
          ?.Han.map((han, index) => (
            <p key={index}>{han.content}</p>
          ))}
      </div>
    </div>
  );
};

export default PostViewer;
