import * as React from "react";
import Svg, { Path } from "react-native-svg";

function BackIcon(props) {
  return (
    <Svg
      width={14}
      height={26}
      viewBox="0 0 14 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M12.988.395a.583.583 0 00-.412.18l-12 12a.6.6 0 000 .85l12 12c.15.156.375.22.583.163a.594.594 0 00.43-.428.596.596 0 00-.165-.584L1.848 13 13.424 1.424a.598.598 0 00.134-.663.592.592 0 00-.57-.366z"
        fill="#fff"
      />
    </Svg>
  );
}

export default BackIcon;
