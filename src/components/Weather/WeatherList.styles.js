import styled from "@emotion/styled";

export const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 200px;
`;

export const FavoriteWrapper = styled.div`
  display: flex;
  justify-content: space-between;

  flex-wrap: wrap;
  gap: 12px 26px;

  @media screen and (min-width: 1920px) {
    gap: 12px 26px;
    & > * {
      flex-basis: calc((100% - 4 * 30px) / 5);
    }
  }
`;

export const WrapperSvg = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const SvgCross = styled.svg`
  width: 8px;
  height: 8px;
`;

export const StyledSvgDiv = styled.div`
  display: flex;
  justify-content: flex-end;
`;
