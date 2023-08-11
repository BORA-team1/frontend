import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

const AudioContent = ({ isAudioPlaying, audioRef }) => {
  // 데이터 받아오기
  const BASE_URL = "http://localhost:3001";

  // 페이지 로드 시 저장된 글 목록을 불러옵니다.
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    getPosts();
  }, []);
  const getPosts = () => {
    axios
      .get(`${BASE_URL}/data`)
      .then((response) => {
        setPosts(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("글 목록을 불러오는 중 오류가 발생했습니다.", error);
      });
  };

  const [highlightedSentenceIndex, setHighlightedSentenceIndex] = useState(0);
  // const [isHighlightingStarted, setIsHighlightingStarted] = useState(false);
  const timeIntervals = [
    { start: 0, end: 1, sectionId: 1, sentenceIndex: 0 },
    { start: 1, end: 3, sectionId: 1, sentenceIndex: 1 },
    { start: 3, end: 7, sectionId: 2, sentenceIndex: 0 },
    { start: 7, end: 9, sectionId: 2, sentenceIndex: 1 },
    // ... 필요한 만큼 더 간격 정의
  ];

  // 오디오 재생 시간에 따라 문장 하이라이팅 업데이트
  useEffect(() => {
    const handleTimeUpdate = () => {
      if (isAudioPlaying) {
        const currentTime = getCurrentAudioTime();
        const newIndex = calculateIndexFromTime(currentTime, timeIntervals);

        if (newIndex !== highlightedSentenceIndex) {
          setHighlightedSentenceIndex(newIndex);
          console.log(newIndex);
        }
      }
    };

    if (audioRef.current) {
      audioRef.current.addEventListener("timeupdate", handleTimeUpdate);
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener("timeupdate", handleTimeUpdate);
      }
    };
  }, [isAudioPlaying, audioRef, timeIntervals]);

  const getCurrentAudioTime = () => {
    return audioRef.current ? audioRef.current.currentTime : 0;
  };

  const calculateIndexFromTime = (currentTime, timeIntervals) => {
    const matchingInterval = timeIntervals.find(
      (interval) => currentTime >= interval.start && currentTime < interval.end
    );

    return matchingInterval ? matchingInterval.sentenceIndex : 0;
  };

  return (
    <Wrapper>
      {posts.length > 0 &&
        posts.map((item) => (
          <Gap key={item.post_id}>
            {item.post_id === 1 &&
              item.PostSec.map((sec) => {
                const sentences = sec.content.split(/(?<=[?.](?=\s|'))/);
                return (
                  <Section key={sec.sec_id} className="ebook-container">
                    <SectionContent>
                      <TextContainer>
                        {sentences.map((sentence, sentenceIndex) => (
                          <HighlightedSpan
                            key={sentenceIndex}
                            isHighlighted={
                              sec.sec_id ===
                                timeIntervals[highlightedSentenceIndex]
                                  .sectionId &&
                              sentenceIndex ===
                                timeIntervals[highlightedSentenceIndex]
                                  .sentenceIndex
                            }
                          >
                            {sentence}
                          </HighlightedSpan>
                        ))}
                      </TextContainer>
                    </SectionContent>
                  </Section>
                );
              })}
          </Gap>
        ))}
    </Wrapper>
  );
};

export default AudioContent;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 37.4px;
  gap: 50px;

  color: white;
  font-family: "Pretendard-Regular";
  font-size: 15px;
  font-style: normal;
  font-weight: 300;
  line-height: 169.336%;
`;

const Gap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
`;

const SectionContent = styled.div`
  display: flex;
  flex-direction: row;
`;

const TextContainer = styled.div`
  width: 360px;
`;

const HighlightedSpan = styled.span`
  cursor: pointer;
  color: ${(props) => (props.isHighlighted ? "#A397FF" : "white")};
`;

const Button = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #a397ff;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
`;
