import styled from "@emotion/styled";

export const StyledInput = styled.input`
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
  padding: 10px 12px;
  font-family: Arial, sans-serif;
  font-size: 16px;
  color: #333;
  border: 1px solid #ccc;

  &::placeholder {
    color: #999;
  }

  &:focus {
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.18);
    border-color: #999;
  }
`;

export const SearchBarWrapper = styled.div`
  display: flex;
  alight-item: center;
  justify-content: center;
  margin-bottom: 100px;
  gap: 10px;
`;

export const StyledAddBtn = styled.button`
  width: 112px;
  padding: 10px 40px;
  border: none;

  box-shadow: 0px 3px 6px #00000029;
  border-radius: 5px;
  background-color: #459de9;
  color: #ffffff;

  &:hover,
  &:focus {
    background-color: #3189d5;
  }
`;
