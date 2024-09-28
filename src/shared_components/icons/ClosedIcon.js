import * as React from "react";
import Svg, { Path } from "react-native-svg";

function ClosedIcon(props) {
  return (
    <Svg
      width={20}
      height={23}
      viewBox="0 0 20 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M10 .44A5.754 5.754 0 004.24 6.2v2.4H2.32c-.816 0-1.44.624-1.44 1.44v11.52c0 .816.624 1.44 1.44 1.44h15.36c.816 0 1.44-.624 1.44-1.44V10.04c0-.816-.624-1.44-1.44-1.44h-1.92V6.2A5.754 5.754 0 0010 .44zm0 .96c2.672 0 4.8 2.128 4.8 4.8v2.4H5.2V6.2c0-2.672 2.128-4.8 4.8-4.8zm0 12c.816 0 1.44.624 1.44 1.44 0 .431-.191.81-.48 1.05v1.35c0 .529-.431.96-.96.96a.962.962 0 01-.96-.96v-1.35a1.361 1.361 0 01-.48-1.05c0-.816.624-1.44 1.44-1.44z"
        fill="#fff"
      />
    </Svg>
  );
}

export default ClosedIcon;
