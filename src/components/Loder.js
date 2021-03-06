import styled, { keyframes } from 'styled-components';

const Loader = () => {
  return (
    <Wrapper>
      <Ring>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </Ring>
    </Wrapper>
  );
};

export default Loader;

const ringAnimation = keyframes`
0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Wrapper = styled.div`
  padding: 1rem 0;
  display: grid;
  place-items: center;
`;

const Ring = styled.div`
  display: inline-block;
  position: relative;
  width: 50px;
  height: 50px;
  opacity: 0.5;
  & div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 44px;
    height: 44px;
    margin: 8px;
    border: 4px solid #000000;
    border-radius: 50%;
    animation: ${ringAnimation} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: #000000 transparent transparent
      transparent;
    &:nth-child(1) {
      animation-delay: -0.45s;
    }
    &:nth-child(1) {
      animation-delay: -0.45s;
    }
    &:nth-child(2) {
      animation-delay: -0.3s;
    }
    &:nth-child(3) {
      animation-delay: -0.15s;
    }
  }
`;
