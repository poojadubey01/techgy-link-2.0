import fs from "node:fs";
import path from "node:path";
import assert from "node:assert/strict";

const root = process.cwd();
const read = (file) =>
  JSON.parse(fs.readFileSync(path.join(root, file), "utf8"));
const manifest = read(".next/prerender-manifest.json");
const walk = (dir) =>
  fs
    .readdirSync(dir, { withFileTypes: true })
    .flatMap((e) =>
      e.isDirectory() ? walk(path.join(dir, e.name)) : [path.join(dir, e.name)],
    );
const pages = walk(path.join(root, ".next/server/app")).filter((f) =>
  f.endsWith(".html"),
);
const normalise = (p) => p.replace(/\/$/, "") || "/";
const routes = new Set(Object.keys(manifest.routes).map(normalise));
const knownRedirects = read(".next/routes-manifest.json").redirects;
const missing = [];
let links = 0,
  media = 0;
for (const file of pages) {
  const html = fs.readFileSync(file, "utf8");
  for (const match of html.matchAll(/<a\b[^>]*\bhref="([^"#]+)"/g)) {
    const url = match[1].replaceAll("&amp;", "&");
    if (!url.startsWith("/") || url.startsWith("//")) continue;
    links++;
    const p = normalise(decodeURIComponent(url.split(/[?#]/)[0]));
    if (
      !routes.has(p) &&
      !fs.existsSync(path.join(root, "public", p)) &&
      !knownRedirects.some((x) => new RegExp(x.regex).test(p))
    )
      missing.push({ file: path.relative(root, file), target: url });
  }
  for (const match of html.matchAll(
    /<(?:img|source|video)\b[^>]*\b(?:src|poster)="([^"]+)"/g,
  )) {
    const src = match[1].replaceAll("&amp;", "&");
    if (!src.startsWith("/") || src.startsWith("//")) continue;
    media++;
    if (
      !fs.existsSync(
        path.join(root, "public", decodeURIComponent(src.split("?")[0])),
      )
    )
      missing.push({ file: path.relative(root, file), media: src });
  }
}
assert.deepEqual(
  missing,
  [],
  "Some internal destinations or media files are missing",
);
const pkg = read("package.json");
assert.deepEqual(
  Object.keys(pkg.dependencies).sort(),
  ["gsap", "lucide-react", "next", "react", "react-dom"].sort(),
);
assert.equal(pkg.scripts.build, "next build --webpack");
console.log(
  JSON.stringify(
    {
      htmlPages: pages.length,
      prerenderedRoutes: routes.size,
      internalLinks: links,
      mediaReferences: media,
      missing: missing.length,
      source: "TypeScript / TSX",
      framework: "Native Next.js App Router",
    },
    null,
    2,
  ),
);
