import * as React from "react";
import Svg, { Rect, Path } from "react-native-svg";

function DirectMessagesIcon(props) {
  return (
    <Svg
      width={25}
      height={25}
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Rect width={25} height={25} rx={5} fill="#FFB800" />
      <Path
        d="M12.5 4C7.261 4 3 7.706 3 12.26c0 2.557 1.378 4.985 3.696 6.543-.054.434-.274 1.488-1.142 2.72l-.457.648.817.003c2.243 0 3.76-1.375 4.258-1.902.756.166 1.539.25 2.328.25 5.239 0 9.5-3.706 9.5-8.261S17.739 4 12.5 4z"
        fill="#fff"
      />
    </Svg>
  );
}

export default DirectMessagesIcon;
