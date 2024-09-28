import * as React from "react";
import Svg, { Path } from "react-native-svg";

function WarningIcon(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0,0,256,256"
      width={20}
      height={20}
      {...props}
    >
      <Path
        d="M58 32c0 14.359-11.641 26-26 26S6 46.359 6 32 17.641 6 32 6s26 11.641 26 26zM32.024 48.358c1.316 0 2.726-1.53 2.726-3.339 0-1.902-1.41-3.388-2.726-3.388-1.646 0-2.774 1.485-2.774 3.388 0 1.809 1.128 3.339 2.774 3.339zM33.5 37.99s1.375-7.367 1.5-9.504c.182-3.114 0-12.476 0-12.476h-6s-.182 9.362 0 12.476c.125 2.137 1.5 9.504 1.5 9.504z"
        transform="scale(4)"
        fill="#ff1616"
        strokeMiterlimit={10}
        fontFamily="none"
        fontWeight="none"
        fontSize="none"
        textAnchor="none"
      />
    </Svg>
  );
}

export default WarningIcon;
