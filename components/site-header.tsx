"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems } from "@/lib/content";
export function SiteHeader() {
  const pathname = usePathname();
  return (
    <header className="site-header">
      <Link className="wordmark" href="/" aria-label="Yashas Devulapally home">
        yd.
      </Link>
      <nav aria-label="Main navigation">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            aria-current={pathname === item.href ? "page" : undefined}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
