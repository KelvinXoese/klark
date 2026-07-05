import { cn } from "@/lib/utils";
import Link from "next/link";
import { AnchorHTMLAttributes } from "react";

type LinkButtonVariant = "primary" | "secondary" | "ghost";

type LinkButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  variant?: LinkButtonVariant;
  fullWidth?: boolean;
};

const variantClasses: Record<LinkButtonVariant, string> = {
  primary: "btn-primary",
  secondary: "btn-secondary",
  ghost: "btn-ghost",
};

export function LinkButton({
  href,
  variant = "primary",
  fullWidth,
  className,
  children,
  ...props
}: LinkButtonProps) {
  return (
    <Link
      href={href}
      className={cn(
        variantClasses[variant],
        fullWidth && "w-full",
        className
      )}
      {...props}
    >
      {children}
    </Link>
  );
}
