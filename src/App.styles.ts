import styled from 'styled-components';
import colors from './styles/colors';

export const AppContainer = styled.div`
  position: relative;
  background-color: #2A98CF;
  font-family: "Poppins", system-ui, 'Carlito', 'Roboto Mono', monospace;
  width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
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

export const LogoRow = styled.div`
  background-color: #ffffff; 
  width: 100%; 
  height: 20rem;
  margin-bottom: 6rem;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  /* margin-left: 10rem; */
`;

// export const RowThree = styled.div`
//   background-color:  #51BE9C; //#2B8268; //  //
//   width: 100%;
//   flex-grow: 1;
//   margin: 0;
//   padding: 0;
//   flex-wrap: wrap;
// `;

export const RowFour = styled.div`
  background-color: #2A98CF; // #2B8268;
  width: 100%;
  /* flex-grow: 1; */
  height: 50rem;
  margin-top: -5rem;
  padding: 0;
  flex-wrap: wrap;
`;

export const YellowStripe = styled.div`
  background-color: #FFD000;
  height: 20rem;
  width: 16rem;
  margin: 0;
  padding: 0;
  flex-wrap: wrap;
`;

export const GreenStripe = styled.div`
  background-color: #51BE9C;
  height: 20rem;
  width: 10.7rem;
  margin: 0;
  padding: 0;
  flex-wrap: wrap;
`;

export const RightSide = styled.div`
  background-color: #51BE9C; // #90DAEE; //  #2B8268;
  height: 20rem;
  width: 100%;
  margin: 0;
  padding: 0;
  flex-wrap: wrap;
`;

export const MeshContainer = styled.div`
  position: relative;
  /* z-index: 10; */
  width: 85rem;
  height: 30rem;
  cursor: pointer;
`;

export const LogoContainer = styled.div`
  position: absolute;
  z-index: 10;
  /* top: 0; */
  left: 0;
  width: 50rem;
  height: 30rem;
  cursor: pointer;
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

export const HeaderContainer = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  flex-wrap: wrap;
  text-align: start;
`;

export const Footer = styled.div`
  width: 100%;
  height: auto;
  padding: 2rem 4rem 2rem 6rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  flex-wrap: wrap;
  margin-top: auto;
`;