import * as React from "react";
import Svg, { Path } from "react-native-svg";

function ReadIcon(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0,0,256,256"
      width={20}
      height={20}
      {...props}
    >
      <Path
        d="M44 12L25.467 32.758 20 29l-3 3.047 4.703 4.926L19 40 3 29l-3 3.047L19.047 52 48 15zm16 1L36 40l-2.285-1.57-4.37 6.55L36.048 52 64 16z"
        transform="scale(4)"
        fill="#278eff"
        strokeMiterlimit={10}
        fontFamily="none"
        fontWeight="none"
        fontSize="none"
        textAnchor="none"
      />
    </Svg>
  );
}

export default ReadIcon;
