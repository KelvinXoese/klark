import { cn } from "@/lib/utils";

type ImagePlaceholderProps = {
  label: string;
  aspectRatio?: "square" | "portrait" | "landscape" | "hero" | "wide";
  className?: string;
  size?: "sm" | "md" | "lg";
};

const aspectClasses = {
  square: "aspect-square",
  portrait: "aspect-[3/4]",
  landscape: "aspect-[4/3]",
  hero: "aspect-[16/9] sm:aspect-[21/9]",
  wide: "aspect-[2/1]",
};

export function ImagePlaceholder({
  label,
  aspectRatio = "square",
  className,
  size = "md",
}: ImagePlaceholderProps) {
  const textSize = {
    sm: "text-[10px] sm:text-xs",
    md: "text-xs sm:text-sm",
    lg: "text-sm sm:text-base",
  };

  return (
    <div
      className={cn(
        "relative flex items-center justify-center bg-klark-beige border border-klark-grey-light overflow-hidden group",
        aspectClasses[aspectRatio],
        className
      )}
      role="img"
      aria-label={label}
    >
      <div className="absolute inset-0 bg-[linear-gradient(135deg,transparent_40%,rgba(0,0,0,0.03)_40%,rgba(0,0,0,0.03)_60%,transparent_60%)]" />
      <div className="absolute top-3 left-3 px-2 py-1 bg-klark-black/80 text-klark-white text-[10px] tracking-widest uppercase font-sans">
        Image Placeholder
      </div>
      <p
        className={cn(
          "relative z-10 text-center px-6 max-w-md text-klark-grey font-sans leading-relaxed",
          textSize[size]
        )}
      >
        {label}
      </p>
    </div>
  );
}
