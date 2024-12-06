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
        d="M12.21 22.635c5.321 0 9.635-4.314 9.635-9.635 0-5.322-4.314-9.635-9.635-9.635A9.635 9.635 0 002.574 13a9.635 9.635 0 009.636 9.635z"
        fill="#47A0F6"
        stroke="#47A0F6"
        strokeWidth={1.5625}
        strokeLinecap="round"
      />
      <Path
        d="M8.72 12.227c2.175 1.376 3.801 3.834 3.801 3.834h.033s3.454-6.112 9.872-9.871"
        stroke="#000"
        strokeWidth={1.5625}
        strokeLinecap="square"
      />
    </Svg>
  )
}

export default SvgComponent
