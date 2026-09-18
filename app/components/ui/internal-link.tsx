import Link from "next/link";
export default function SiteLink({ href = "", ...props }) {
  return href.startsWith("/") ? (
    <Link href={href} {...props} />
  ) : (
    <a href={href} {...props} />
  );
}
