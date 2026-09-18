const Icon = ({ size = 22, children, ...props }) => (
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
export const ArrowUpRight = (p) => (
  <Icon {...p}>
    <path d="M5 19 19 5M5 5h14v14" />
  </Icon>
);
export const ArrowRight = (p) => (
  <Icon {...p}>
    <path d="M4 12h16m-7-7 7 7-7 7" />
  </Icon>
);
export const ArrowLeft = (p) => (
  <Icon {...p}>
    <path d="M20 12H4m7-7-7 7 7 7" />
  </Icon>
);
export const ArrowDown = (p) => (
  <Icon {...p}>
    <path d="M12 4v16m-7-7 7 7 7-7" />
  </Icon>
);
export const ArrowUp = (p) => (
  <Icon {...p}>
    <path d="M12 20V4m-7 7 7-7 7 7" />
  </Icon>
);
export const ChevronDown = (p) => (
  <Icon {...p}>
    <path d="m5 9 7 7 7-7" />
  </Icon>
);
export const Menu = (p) => (
  <Icon {...p}>
    <path d="M3 8h18M3 16h18" />
  </Icon>
);
export const X = (p) => (
  <Icon {...p}>
    <path d="m5 5 14 14M5 19 19 5" />
  </Icon>
);
