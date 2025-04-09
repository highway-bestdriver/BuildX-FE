import * as React from "react";
import type { SVGProps } from "react";
const SvgIcCalendar = (props: SVGProps<SVGSVGElement>) => (
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
      d="M19 4H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2M3 10h18M16 2v4M8 2v4"
    />
  </svg>
);
export default SvgIcCalendar;
