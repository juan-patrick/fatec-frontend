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

export const SelectContainer = styled.div`
  display: flex;
  justify-content: left;
  padding: 40px;
  > select {
    > option {
      color: rgba(0, 0, 0, 0.54);
      padding: 0;
      font-size: 1rem;
      font-weight: 400;
      line-height: 1;
      letter-spacing: 0.00938em;
    }
  }
  > p {
    color: rgba(0, 0, 0, 0.54);
    padding: 0;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1;
    letter-spacing: 0.00938em;
  }
`;
