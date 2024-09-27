import styled from 'styled-components';
import colors from './styles/colors';
import anglesImage from '/images/angles.jpg';
import circlesImage from '/images/circles.jpg';
import lakeImage from '/images/lake-black-white.jpg';
// import fenceImage from '/images/fence.jpg';


export const AppContainer = styled.div`
  position: relative;
  background-image: url(${anglesImage});
  /* background-image: url(${circlesImage}); */
  /* background-image: url(${lakeImage}); */
  z-index: 1;
  font-family: 'Roboto Mono', monospace;
  padding: 0;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: space-between;
  overflow: hidden;
`;

export const RowOne = styled.div`
  /* background-color: #2A98CF;// #5578A0; */
  width: 100%;
  height: auto;
  padding: 2rem 4rem 3.6rem 6rem;
  /* margin-bottom: -6rem; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  flex-wrap: wrap;
`;

export const MeshContainer = styled.div`
  position: relative;
  width: 100vw;
  height: 90rem;
  margin-left: 10rem;
  margin-top: 10rem;

  @media (max-width: 1300px) {
    height: 70rem;
    margin-top: 10rem;
    margin-left: 6rem;
  }

  @media (max-width: 900px) {
    height: 50rem;
    margin-top: 5rem;
    margin-left: 3rem;
  }

  @media (max-width: 600px) {
    height: 40rem;
    margin-top: 5rem;
    margin-left: 3rem;
  }

  @media (max-width: 450px) {
    height: 30rem;
    margin-top: 5rem;
    margin-left: 3rem;
  }

  @media (max-width: 350px) {
    height: 25rem;
    margin-top: 1rem;
    margin-left: 3rem;
  }
`;

export const LogoContainer = styled.div`
  position: absolute;
  z-index: 10;
  left: 0;
  width: 100vw;
  height: 90rem;
  cursor: pointer;

  @media (max-width: 1300px) {
    /* width: 45rem; */
    /* height: 25rem; */
    /* width: 100vw; */
    height: 70rem;
    margin-bottom: 5rem;
    margin-left: 6rem;
  }

  @media (max-width: 900px) {
    /* width: 45rem; */
    /* height: 25rem; */
    /* width: 100%; */
    height: 50rem;
    margin-top: 5rem;
    margin-left: 3rem;
  }

  @media (max-width: 600px) {
    /* width: 45rem; */
    /* height: 25rem; */
    /* width: 100%; */
    height: 40rem;
    margin-top: 5rem;
    margin-left: 3rem;
  }

  @media (max-width: 450px) {
    /* width: 45rem; */
    /* height: 25rem; */
    /* width: 100%; */
    height: 30rem;
    margin-top: 5rem;
    margin-left: 1rem;
  }

  @media (max-width: 350px) {
    /* width: 45rem; */
    /* height: 25rem; */
    /* width: 100%; */
    height: 25rem;
    margin-top: 1rem;
    margin-left: 1rem;
  }
`;

export const Header = styled.h1`
  color: ${colors.seasalt};
  font-family: "Poppins", system-ui, 'Carlito', 'Roboto Mono', monospace;
  font-size: 2rem;
  margin: 0;
  padding: 1.6rem 0 0 0;
  font-weight: 400;
  /* text-align: center; */
`;

export const Text = styled.h1`
  color: ${colors.outerSpace};
  font-family: "Poppins", system-ui, 'Carlito', 'Roboto Mono', monospace;
  font-size: 2rem;
  margin: 0;
  padding: 1.6rem 0 0 0;
  font-weight: 400;
  /* text-align: center; */
`;

export const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  flex-wrap: wrap;
  text-align: start;
`;

export const Footer = styled.div`
  width: 100%;
  height: auto;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
  flex-wrap: wrap;
  margin-top: auto;
`;