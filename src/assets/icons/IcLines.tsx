import * as React from "react";
import type { SVGProps } from "react";
const SvgIcLines = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      stroke="#5156FF"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.667}
      d="M17 18H3M21 14H3M17 10H3M21 6H3"
    />
  </svg>
);
export default SvgIcLines;
