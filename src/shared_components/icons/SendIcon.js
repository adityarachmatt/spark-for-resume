import * as React from "react";
import Svg, { Circle, Path } from "react-native-svg";

function SendIcon(props) {
  return (
    <Svg
      width={25}
      height={25}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Circle cx={50} cy={50} r={50} fill="#278EFF" />
      <Path
        d="M52.828 31.172a4 4 0 00-5.656 0L21.716 56.627a4 4 0 005.657 5.657L50 39.657l22.627 22.627a4 4 0 005.657-5.657L52.828 31.172zM54 39v-5h-8v5h8z"
        fill="#fff"
      />
    </Svg>
  );
}

export default SendIcon;
