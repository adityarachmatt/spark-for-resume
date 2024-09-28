import * as React from "react"
import Svg, { Path } from "react-native-svg"
const LocationIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={18}
    height={18}
    viewBox="0 0 256 256"
    {...props}
  >
    <Path
      fill="#ffffff"
      strokeMiterlimit={10}
      d="M25 1C16.18 1 9 8.18 9 17c0 14.113 14.629 30.945 15.25 31.656.191.219.46.344.75.344.309-.02.559-.125.75-.344C26.371 47.934 41 30.813 41 17c0-8.82-7.18-16-16-16zm0 11c3.313 0 6 2.688 6 6 0 3.313-2.688 6-6 6-3.313 0-6-2.688-6-6 0-3.313 2.688-6 6-6z"
      fontFamily="none"
      fontSize="none"
      fontWeight="none"
      style={{
        mixBlendMode: "normal",
      }}
      textAnchor="none"
      transform="scale(5.12)"
    />
  </Svg>
)
export default LocationIcon