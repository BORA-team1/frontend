import styled, {css} from 'styled-components';

const difficulties = {
  light: {
    borderColor: '#ffea2b',
    backGround: '#fffbd9',
    color: '#C7B300',
  },
  medium: {
    borderColor: '#2BD9FF',
    backGround: '#D9FFFF',
    color: '#0097C7',
  },
  heavy: {
    borderColor: '#FF5E2B',
    backGround: '#FFE4D9',
    color: '#C73000',
  },
};

const difficultyStyles = css`
  ${({difficulty}) => css`
    border-color: ${difficulties[difficulty].borderColor};
    background: ${difficulties[difficulty].backGround};
    color: ${difficulties[difficulty].color};
  `}
`;

const sizes = {
  medium: {
    padding: '3.889px 8px',
    fontSize: '9px',
    borderRadius: '15px',
    border: '1.5px solid',
  },
  small: {
    padding: '3px 6.171px',
    fontSize: '6.943px',
    borderRadius: '11.571px',
    border: '1.157px solid',
  },
};

const sizeStyles = css`
  ${({size}) => css`
    padding: ${sizes[size].padding};
    font-size: ${sizes[size].fontSize};
    border-radius: ${sizes[size].borderRadius};
    border: ${sizes[size].border};
  `}
`;

const StyledButton = styled.button`
  font-family: 'Pretendard-Regular';
  font-style: normal;
  font-weight: 600;
  line-height: normal;

  ${sizeStyles}
  ${difficultyStyles}
`;

Difficulty.defaultProps = {
  difficulty: 'light',
  size: 'medium',
};

export default function Difficulty({children, difficulty, size}) {
  return (
    <StyledButton size={size} difficulty={difficulty}>
      {children}
    </StyledButton>
  );
}
