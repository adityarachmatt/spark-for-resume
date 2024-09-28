import * as React from "react";
import Svg, { Path } from "react-native-svg";

function CreateChatIcon(props) {
  return (
    <Svg
      width={25}
      height={25}
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M19 10v13H2V6h13l1-1H1.5a.5.5 0 00-.5.5v18a.5.5 0 00.5.5h18a.5.5 0 00.5-.5V9l-1 1z"
        fill="#278EFF"
      />
      <Path
        d="M21.672 5.277l-11.25 11.25L8 17l.473-2.422 11.25-11.25"
        stroke="#278EFF"
        strokeWidth={2}
        strokeMiterlimit={10}
      />
      <Path
        d="M22.781 4.814l.681-.68a1.836 1.836 0 10-2.595-2.596l-.681.68 2.595 2.596zM8.602 14.45l1.949 1.948-2.383.434.434-2.383z"
        fill="#278EFF"
      />
    </Svg>
  );
}

export default CreateChatIcon;
