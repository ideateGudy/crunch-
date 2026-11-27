import { useId } from "react";

export interface LogoProps {
  /**
   * "auto": follows current light/dark theme via semantic CSS tokens.
   * "light": light ink (--band-ink / --band-accent) for dark architectural bands.
   * "dark": dark espresso ink for light surfaces.
   */
  tone?: "auto" | "light" | "dark";
  variant?: "wordmark" | "mark";
  className?: string;
  size?: number;
  label?: string;
}

const TONE_COLORS = {
  auto: {
    ink: "var(--ink)",
    accent: "var(--caramel)",
    surface: "var(--surface)",
  },
  light: {
    ink: "var(--band-ink)",
    accent: "var(--band-accent)",
    surface: "var(--band)",
  },
  dark: {
    ink: "#2B1810",
    accent: "#C98A2B",
    surface: "#FBF4E6",
  },
} as const;

/**
 * Hand-built inline SVG brand mark & wordmark for CRUNCHÉ.
 */
export function Logo({
  tone = "auto",
  variant = "wordmark",
  className = "",
  size,
  label = "CRUNCHÉ",
}: LogoProps) {
  const titleId = useId();
  const colors = TONE_COLORS[tone];

  if (variant === "mark") {
    const dim = size ?? 36;
    return (
      <svg
        width={dim}
        height={dim}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-labelledby={titleId}
        className={className}
      >
        <title id={titleId}>{label}</title>
        {/* Warm round chin chin cube */}
        <rect
          x="6"
          y="6"
          width="52"
          height="52"
          rx="16"
          fill={colors.accent}
        />
        {/* Inner toasted bevel */}
        <rect
          x="13"
          y="13"
          width="38"
          height="38"
          rx="11"
          stroke={colors.ink}
          strokeWidth="2.5"
          strokeOpacity="0.28"
        />
        {/* Crisp bite/crunch burst facet */}
        <path
          d="M42 15L45.2 21.8L52 25L45.2 28.2L42 35L38.8 28.2L32 25L38.8 21.8L42 15Z"
          fill={colors.surface}
        />
        {/* Subtle toasted crumb dots */}
        <circle cx="24" cy="40" r="2.6" fill={colors.ink} fillOpacity="0.45" />
        <circle cx="33" cy="44" r="1.8" fill={colors.ink} fillOpacity="0.35" />
        <circle cx="21" cy="27" r="1.8" fill={colors.ink} fillOpacity="0.35" />
      </svg>
    );
  }

  const height = size ?? 36;
  const width = Math.round((height * 220) / 48);

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 220 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-labelledby={titleId}
      className={className}
    >
      <title id={titleId}>{label}</title>
      <text
        x="4"
        y="37"
        fill={colors.ink}
        fontFamily="var(--font-fraunces), Georgia, serif"
        fontWeight="800"
        fontSize="34"
        letterSpacing="-0.025em"
      >
        CRUNCHE
      </text>
      {/* Golden crunch-burst acute accent over the É */}
      <path
        d="M180 4L185 11.5L193 9.5L188 16L193.5 21L185.5 20.5L181.5 27.5L179 20L171.5 19.5L177.5 14.5L174 8L180 11L180 4Z"
        fill={colors.accent}
      />
      {/* Crisp acute stroke anchored above the E */}
      <path
        d="M174 12.5L183.5 5.5"
        stroke={colors.accent}
        strokeWidth="3.2"
        strokeLinecap="round"
      />
    </svg>
  );
}
