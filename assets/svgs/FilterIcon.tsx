import * as React from "react"
import Svg, { Rect, Path } from "react-native-svg"

function SvgComponent(props: any) {
  return (
    <Svg
      width={32}
      height={32}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Rect x={0.5} y={0.5} width={31} height={31} rx={15.5} stroke="#47A0F6" />
      <Path
        d="M14.608 19.827h-5.25M16.95 11.75h5.251"
        stroke="#47A0F6"
        strokeWidth={1.25}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        clipRule="evenodd"
        d="M13.272 11.705c0-1.08-.882-1.955-1.97-1.955-1.087 0-1.969.876-1.969 1.955 0 1.08.882 1.955 1.97 1.955 1.087 0 1.969-.875 1.969-1.955zM22.667 19.795c0-1.08-.881-1.955-1.969-1.955s-1.97.875-1.97 1.955.882 1.955 1.97 1.955a1.962 1.962 0 001.969-1.955z"
        stroke="#47A0F6"
        strokeWidth={1.25}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default SvgComponent
