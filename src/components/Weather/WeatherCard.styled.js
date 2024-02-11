import styled from "@emotion/styled";

export const WeatherCardWrapper = styled.div`
  padding: 5px 15px 15px 15px;
  margin-bottom: 20px;
  width: 350px;
  height: 257px;

  background: ${(props) => props.backgroundColor || "#fffaf1"};
  box-shadow: 0px 3px 6px #00000029;
  border-radius: 5px;
  opacity: 1;

  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

export const StyledTitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  height: 23px;
`;

export const StyledImgSunDiv = styled.div`
  display: flex;
  align-items: center;
  align-items: flex-start;
  padding-right: 26px;
`;

export const Img = styled.img`
  width: 40px;
  height: 40px;
`;

export const ParagraphSun = styled.p`
  font-size: 13px;
  color: #c5c5c5;
`;

export const TitleH2 = styled.h2`
  font-size: 16px;
  font-weight: 400;
`;

export const StyledChartDiv = styled.div`
  margin-bottom: 38px;
`;

export const StyledWeatherInfoDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  align-items: flex-end;
`;

export const StyledTemperature = styled.p`
  font-family: "DM Sans";
  font-size: 44px;
  font-weight: 500;
`;

export const StyledDegreeBtn = styled.button`
  background-color: transparent;
  border: none;
  font-size: 22px;
  font-weight: 500;

  color: ${(props) => (props.$active ? "black" : "grey")};

  &:not(:last-child) {
    border-right: 1px solid #707070;
  }
`;

export const DegSwitcherDiv = styled.div`
  position: absolute;
  top: 0;
  right: 0;
`;

export const TemperatureDiv = styled.div`
  position: relative;
  width: 142px;
`;

export const WeatherInfoDiv = styled.div`
  display: flex;
  gap: 5px;
  flex-direction: column;
  align-items: flex-end;
`;

export const StyledFeelsPar = styled.p`
  width: 200px;
  font-size: 13px;
  color: #c5c5c5;
`;

export const DegSpan = styled.span`
  font-size: 13px;
  color: #c5c5c5;
  font-weight: 600;
  font-family: "DM Sans";
`;

export const MainWeatherInfoP = styled.p`
  font-size: 12px;
`;

export const OrangeSpan = styled.span`
  color: ${(props) => props.color || "#FFA25B"};
  font-weight: 600;
  font-family: "DM Sans";
`;

export const FavoriteWrapper = styled.div`
  display: flex;

  flex-wrap: wrap;
  gap: 12px 26px;

  @media screen and (min-width: 1920px) {
    gap: 12px 26px;
    & > * {
      flex-basis: calc((100% - 4 * 30px) / 5);
    }
  }
`;

export const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 200px;
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
