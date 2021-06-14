import styled from "styled-components";

export const Grade = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  max-width: 584px;
  border: 1px solid #c2c2c2;
  border-radius: 10px;
  margin: 15px 0;
  padding: 0 10px;
  > div {
    display: flex;
    padding: 10px 0;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    > p {
      text-align: center;
    }
    > input {
      width: 100px;
    }
  }
`;
