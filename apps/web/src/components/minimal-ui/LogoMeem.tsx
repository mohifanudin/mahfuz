/**
 * Imtiyaz Digital Studio's official brand mark.
 */

interface LogoMeemProps {
  size?: number;
}

export function LogoMeem({ size = 38 }: LogoMeemProps) {
  return (
    <span
      className="mu-brand-mark"
      style={{ width: size, height: size, display: "inline-flex", alignItems: "center", justifyContent: "center" }}
    >
      <img
        src="/icons/imtiyaz-logo.svg"
        alt=""
        aria-hidden="true"
        width={size}
        height={size}
        style={{ width: size, height: size, objectFit: "contain" }}
      />
    </span>
  );
}
