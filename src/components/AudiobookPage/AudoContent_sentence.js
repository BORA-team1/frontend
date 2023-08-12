import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

const AudioContent = ({ isAudioPlaying, audioRef }) => {
  const BASE_URL = "http://localhost:3001";

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
  const timeIntervals = [
    { start: 0, end: 3, sectionId: 1, sentenceIndex: 0 },
    { start: 3, end: 6, sectionId: 1, sentenceIndex: 1 },
    // ... 다른 간격 정의
  ];

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
    let totalElapsedTime = 0;

    for (const interval of timeIntervals) {
      totalElapsedTime += interval.end - interval.start;
      if (totalElapsedTime > currentTime) {
        const sentenceOffset = getSentenceOffset(interval, timeIntervals);
        return sentenceOffset + interval.sentenceIndex;
      }
    }

    return 0;
  };

  const getSentenceOffset = (targetInterval, timeIntervals) => {
    let count = 0;
    let found = false;

    for (const interval of timeIntervals) {
      if (interval === targetInterval) {
        found = true;
        break;
      }
      count += interval.sentenceIndex === 0 ? 0 : interval.end - interval.start;
    }

    return found ? count : 0;
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
