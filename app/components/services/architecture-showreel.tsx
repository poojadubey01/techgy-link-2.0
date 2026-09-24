export function ArchitectureShowreel() {
  return (
    <figure className="service-demo relative w-full overflow-hidden rounded-md bg-charcoal">
      <video
        autoPlay
        muted
        loop
        controls
        playsInline
        preload="metadata"
        poster="/source/3d/hero-poster.jpg"
        aria-label="TechGy Link architectural visualisation showreel"
        className="block aspect-video w-full object-contain"
      >
        <source src="/source/3d/hero.mp4" type="video/mp4" />
        Your browser does not support this video.
      </video>
    </figure>
  );
}
