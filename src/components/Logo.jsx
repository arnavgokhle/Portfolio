export default function Logo({ size = 22 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      <g transform="rotate(-35 12 12)">
        <rect x="4" y="8" width="16" height="3.4" rx="1.7" fill="#000" />
        <rect x="4" y="13" width="16" height="3.4" rx="1.7" fill="#000" />
      </g>
    </svg>
  )
}
