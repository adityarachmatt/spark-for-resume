import * as React from "react";
import Svg, { Rect, Path } from "react-native-svg";

function LeaveIcon(props) {
  return (
    <Svg
      width={25}
      height={25}
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Rect width={25} height={25} rx={5} fill="red" />
      <Path
        d="M12.5 4C7.814 4 4 7.814 4 12.5S7.814 21 12.5 21s8.5-3.814 8.5-8.5S17.186 4 12.5 4zm3.219 11.194a.373.373 0 010 .525.379.379 0 01-.262.107.379.379 0 01-.263-.107L12.5 13.025l-2.694 2.694a.379.379 0 01-.263.107.379.379 0 01-.262-.107.373.373 0 010-.525l2.694-2.694-2.694-2.694a.373.373 0 010-.525.373.373 0 01.525 0l2.694 2.694 2.694-2.694a.373.373 0 01.525 0 .373.373 0 010 .525L13.025 12.5l2.694 2.694z"
        fill="#fff"
      />
    </Svg>
  );
}

export default LeaveIcon;
