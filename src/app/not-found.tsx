import { LinkButton } from "@/components/ui/LinkButton";

export default function NotFound() {
  return (
    <div className="pt-20 sm:pt-24 section-padding py-32 text-center">
      <h1 className="heading-section mb-4">Page Not Found</h1>
      <p className="body-large mb-8">
        The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <LinkButton href="/">Return Home</LinkButton>
    </div>
  );
}
