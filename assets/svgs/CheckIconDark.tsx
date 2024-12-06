import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props: any) {
  return (
    <Svg
      width={25}
      height={26}
      viewBox="0 0 25 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.21 22.636a9.636 9.636 0 100-19.272 9.636 9.636 0 000 19.271z"
        fill="#072AC8"
        stroke="#072AC8"
        strokeWidth={1.5625}
        strokeLinecap="round"
      />
      <Path
        d="M8.72 12.227c2.175 1.376 3.801 3.834 3.801 3.834h.033s3.454-6.112 9.872-9.871"
        stroke="#E4E3E3"
        strokeWidth={1.5625}
        strokeLinecap="square"
      />
    </Svg>
  )
}

export default SvgComponent
