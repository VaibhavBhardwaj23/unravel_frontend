import styled from "styled-components";
// const {motion}  = framer
import { motion } from "framer-motion";
export const CartWrapper = styled(motion.div)`
  position: fixed;
  right: 0;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 100;
  display: flex;
  justify-content: flex-end;
  /* display: none; */
`;

export const CartStyle = styled(motion.div)`
  width: 40%;
  background-color: #f1f1f1;
  height: 100%;
  padding: 2rem 5rem;
  position: relative;
  overflow-y: scroll;
`;

export const Card = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 1rem;
  overflow: hidden;
  background-color: white;
  padding: 2rem;
  margin: 2rem 0rem;
  img {
    width: 8rem;
  }
`;

export const CardInfo = styled(motion.div)`
  width: 50%;
`;

export const EmptyStyle = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0%;
  transform: translate(-50%, 0%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  font-size: 0.8rem;

  svg {
    font-size: 10rem;
    color: var(--secondary);
  }
`;

export const Quantity = styled(motion.div)`
  display: flex;
  flex-direction: column;
  div {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  button {
    background-color: transparent;
    border: none;
    display: flex;
    font-size: 1.5rem;
  }

  p {
    width: 1rem;
    text-align: center;
  }

  span {
    color: var(--secondary);
  }
  svg {
    color: #494949;
  }
`;

export const Checkout = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  button {
    background-color: var(--primary);
    padding: 1rem 2rem;
    width: 100%;
    color: white;
    margin: 2rem;
    cursor: pointer;
  }
`;

export const Cards = styled.div``;
