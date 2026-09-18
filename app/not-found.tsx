import Link from "@/app/components/ui/internal-link";
export default function NotFound() {
  return (
    <main id="main" className="empty-page wrap">
      <p className="eyebrow">404 / A small detour</p>
      <h1>Let’s reconnect.</h1>
      <p>
        This page could not be found. Explore our services or return to the
        homepage.
      </p>
      <div className="hero-actions">
        <Link href="/" className="button blue">
          Back to TechGy Link
        </Link>
        <Link href="/services" className="button outline">
          Explore services
        </Link>
      </div>
    </main>
  );
}
