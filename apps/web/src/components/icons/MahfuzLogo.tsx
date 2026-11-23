/**
 * Imtiyaz Digital Studio brand mark.
 */

interface MahfuzLogoProps {
  className?: string;
  size?: number;
}

export function MahfuzLogo({ className, size }: MahfuzLogoProps) {
  const s = size ?? 40;

  return (
    <img
      src="/icons/imtiyaz-logo.svg"
      alt="Imtiyaz Digital Studio"
      className={className}
      width={s}
      height={s}
      style={{ width: s, height: s, objectFit: "contain" }}
    />
  );
}
