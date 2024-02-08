import styled from "@emotion/styled";

export const WeatherCardWrapper = styled.div`
  padding: 15px;
  width: 350px;
  height: 257px;

  background: #fffaf1 0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 6px #00000029;
  border-radius: 5px;
  opacity: 1;
`;

export const StyledTitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const StyledImgSunDiv = styled.div`
  display: flex;
  align-items: center;
`;

export const Img = styled.img`
  width: 40px;
  height: 40px;
`;

export const ParagraphSun = styled.p`
  font-size: 13px;
  color: #c5c5c5;
`;

export const DateParagraph = styled.p`
  font-size: 18px;
`;

export const TitleH2 = styled.h2`
  font-size: 16px;
`;

export const StyledChartDiv = styled.div`
  margin-bottom: 17px;
`;

export const StyledWeatherInfoDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const StyledTemperature = styled.p`
  font-size: 44px;
  font-weight: 500;
`;

export const StyledDegreeBtn = styled.button`
  background-color: transparent;
  border: none;
  font-size: 22px;
  font-weight: 500;
  // color: #c5c5c5;

  color: ${(props) => (props.$active ? "black" : "grey")};

  &:not(:last-child) {
    border-right: 1px solid #c5c5c5;
  }
`;
