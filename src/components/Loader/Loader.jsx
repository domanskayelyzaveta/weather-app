import { RevolvingDot } from "react-loader-spinner";

import React from "react";
import { LoaderWrapper } from "./Loader.styled";

const Loader = () => {
  return (
    <LoaderWrapper>
      <RevolvingDot
        visible={true}
        height="80"
        width="80"
        color="#5B8CFF"
        ariaLabel="revolving-dot-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </LoaderWrapper>
  );
};

export default Loader;
