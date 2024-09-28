import * as React from "react";
import Svg, { Path } from "react-native-svg";

function SearchIcon(props) {
  return (
    <Svg
      width={20}
      height={20}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M8.4 1.2A6.805 6.805 0 001.6 8c0 3.752 3.049 6.8 6.8 6.8a6.757 6.757 0 003.975-1.287l5.263 5.25 1.125-1.125-5.2-5.213A6.77 6.77 0 0015.2 8c0-3.751-3.048-6.8-6.8-6.8zm0 .8c3.319 0 6 2.681 6 6s-2.681 6-6 6-6-2.681-6-6 2.681-6 6-6z"
        fill="#8E8D94"
      />
    </Svg>
  );
}

export default SearchIcon;
