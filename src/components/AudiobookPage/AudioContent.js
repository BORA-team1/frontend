import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import {useParams} from 'react-router-dom';
import axios from 'axios';

//context
import {useAuth} from '../../contexts/AuthContext';

//data
import {timeIntervalsData} from '../../data/timeIntervalsData';

const AudioContent = ({isAudioPlaying, audioRef, audio}) => {
  const [highlightedSectionIndex, setHighlightedSectionIndex] = useState(0);

  const {PostSec: sections} = audio;

  const timeIntervals = timeIntervalsData[audio.audio_id - 1];
  console.log(timeIntervalsData[audio.audio_id - 1]);

  useEffect(() => {
    const handleTimeUpdate = () => {
      if (isAudioPlaying) {
        const currentTime = getCurrentAudioTime();
        const newSectionIndex = calculateSectionIndexFromTime(
          currentTime,
          timeIntervals
        );

        if (newSectionIndex !== highlightedSectionIndex) {
          setHighlightedSectionIndex(newSectionIndex);
          console.log(newSectionIndex);
        }
      }
    };

    if (audioRef.current) {
      audioRef.current.addEventListener('timeupdate', handleTimeUpdate);
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('timeupdate', handleTimeUpdate);
      }
    };
  }, [isAudioPlaying, audioRef, timeIntervals]);

  const getCurrentAudioTime = () => {
    return audioRef.current ? audioRef.current.currentTime : 0;
  };

  const calculateSectionIndexFromTime = (currentTime, timeIntervals) => {
    const matchingInterval = timeIntervals.find(
      (interval) => currentTime >= interval.start && currentTime <= interval.end
    );

    return matchingInterval ? matchingInterval.sectionId - 1 : 0;
  };

  //스크롤 관련 함수

  return (
    <Wrapper>
      {sections &&
        sections.length > 0 &&
        sections.map((sec, sectionIndex) => {
          const sentences = sec.content
            .split('·')
            .filter((paragraph) => paragraph.trim() !== '');
          return (
            <Gap key={sec.sec_id}>
              <Section
                id={`section-${sectionIndex}`}
                className='ebook-container'
              >
                {sec.title && (
                  <SectionTitle
                    className={
                      sectionIndex === highlightedSectionIndex
                        ? 'highlighted'
                        : ''
                    }
                  >
                    {sec.title}
                  </SectionTitle>
                )}
                <SectionContent>
                  <TextContainer>
                    {sentences.map((sentence, sentenceIndex) => (
                      <HighlightedSpan
                        key={sentenceIndex}
                        isHighlighted={sectionIndex === highlightedSectionIndex}
                      >
                        {sentence}
                      </HighlightedSpan>
                    ))}
                  </TextContainer>
                </SectionContent>
              </Section>
            </Gap>
          );
        })}
    </Wrapper>
  );
};

export default AudioContent;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 37.4px;
  width: 370px;
  gap: 50px;

  color: white;
  font-family: 'Pretendard-Regular';
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

const HighlightedSpan = styled.div`
  cursor: pointer;
  margin-bottom: 20px;
  color: ${(props) => (props.isHighlighted ? '#A397FF' : 'white')};
`;

const SectionTitle = styled.div`
  font-size: 19px;
  font-weight: 600;
  margin-bottom: 20px;

  &.highlighted {
    color: #a397ff;
  }
`;
