import axios from 'axios';

//POST: 북마크 여부
export const postBookMark = ({postId, authToken, BASE_URL}) => {
  axios
    .post(`${BASE_URL}post/${postId}/bookmark/`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.error('북마크 여부 변경 중 오류가 발생했습니다.', error);
    });
};
