import React, {createContext, useContext, useState} from 'react';

const PostContext = createContext();

export function PostProvider({children, postPk, selectedIndex}) {
  const [emojiRender, setEmojiRender] = useState(1);
  return (
    <PostContext.Provider
      value={{postPk, selectedIndex, emojiRender, setEmojiRender}}
    >
      {children}
    </PostContext.Provider>
  );
}

export function usePost() {
  return useContext(PostContext);
}
