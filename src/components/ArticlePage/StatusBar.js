import React, {useState, useEffect} from 'react';
import styled from 'styled-components';

const StatusBar = () => {
  const [scrolling, setScrolling] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setScrolling(true);
    } else {
      setScrolling(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Statusbar
      style={{
        background: scrolling ? '#161524' : 'transparent',
        transition: 'background 0.3s ease',
      }}
    ></Statusbar>
  );
};

export default StatusBar;

const Statusbar = styled.div`
  position: fixed;
  top: 0;
  width: 390px;
  height: 47px;
  z-index: 1;
`;
