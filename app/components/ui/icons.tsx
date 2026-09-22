import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

const Icon = ({ size = 22, children, ...props }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...props}
  >
    {children}
  </svg>
);
export const ArrowUpRight = (p: IconProps) => (
  <Icon {...p}>
    <path d="M5 19 19 5M5 5h14v14" />
  </Icon>
);
export const ArrowRight = (p: IconProps) => (
  <Icon {...p}>
    <path d="M4 12h16m-7-7 7 7-7 7" />
  </Icon>
);
export const ArrowLeft = (p: IconProps) => (
  <Icon {...p}>
    <path d="M20 12H4m7-7-7 7 7 7" />
  </Icon>
);
export const ArrowDown = (p: IconProps) => (
  <Icon {...p}>
    <path d="M12 4v16m-7-7 7 7 7-7" />
  </Icon>
);
export const ArrowUp = (p: IconProps) => (
  <Icon {...p}>
    <path d="M12 20V4m-7 7 7-7 7 7" />
  </Icon>
);
export const ChevronDown = (p: IconProps) => (
  <Icon {...p}>
    <path d="m5 9 7 7 7-7" />
  </Icon>
);
export const Menu = (p: IconProps) => (
  <Icon {...p}>
    <path d="M3 8h18M3 16h18" />
  </Icon>
);
export const X = (p: IconProps) => (
  <Icon {...p}>
    <path d="m5 5 14 14M5 19 19 5" />
  </Icon>
);

export const Phone = (p: IconProps) => (
  <Icon {...p}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.96.36 1.9.7 2.79a2 2 0 0 1-.45 2.11L8.09 9.89a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.89.34 1.83.58 2.79.7A2 2 0 0 1 22 16.92Z" />
  </Icon>
);