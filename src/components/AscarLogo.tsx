export function AscarLogo({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 640 260"
      role="img"
      aria-label="Ascar logo"
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M82 238h80l22-170-22-20h-38l-4-28H98l-4 28H60l-20 20 22 170Zm40-190h42l2 16h-46l2-16Zm-18 50h78l-8 60H112l-8-60Z"
      />
      <path
        fill="currentColor"
        d="M204 238 244 98h60l40 140h-44l-8-28h-44l-8 28h-36Zm66-92-10 36h28l-10-36h-8Z"
      />
      <path
        fill="currentColor"
        d="M340 112h120l-12 40h-72l-4 14h70l-22 72H300l12-40h72l4-14h-70l22-72Z"
      />
      <path
        fill="currentColor"
        d="M480 112h122l-12 40h-74l-16 56h74l-12 40H452l28-136Z"
      />
      <path
        fill="currentColor"
        d="M622 112h-60l-30 126h40l8-30h18l18 30h46l-28-46c14-6 22-18 26-34 6-30-10-46-38-46Zm-10 62h-24l6-22h24c8 0 12 4 10 12-2 6-6 10-16 10Z"
      />
    </svg>
  );
}
