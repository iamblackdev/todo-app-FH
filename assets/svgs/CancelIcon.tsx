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
        d="M11.632 20.37L16 16l4.369 4.37m0-8.74L16 16l-4.368-4.37"
        stroke="#47A0F6"
        strokeWidth={1.25}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default SvgComponent
