import * as React from "react";
import Svg, { Circle, Rect } from "react-native-svg";

function PlusIcon(props) {
  return (
    <Svg
      width={36}
      height={36}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Circle cx={50} cy={50} r={50} fill="#404040" />
      <Rect x={48} y={25} width={4} height={50} rx={2} fill="#D9D9D9" />
      <Rect
        x={25}
        y={52}
        width={4}
        height={50}
        rx={2}
        transform="rotate(-90 25 52)"
        fill="#D9D9D9"
      />
    </Svg>
  );
}

export default PlusIcon;
