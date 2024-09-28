import * as React from "react";
import Svg, { Path } from "react-native-svg";

function SentIcon(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0,0,256,256"
      width={20}
      height={20}
      {...props}
    >
      <Path
        d="M27 55L6 33l3-4 17 12 29-29 4 4z"
        transform="scale(4)"
        fill="#fff"
        strokeMiterlimit={10}
        fontFamily="none"
        fontWeight="none"
        fontSize="none"
        textAnchor="none"
      />
    </Svg>
  );
}

export default SentIcon;
