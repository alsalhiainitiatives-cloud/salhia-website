"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { NAV } from "@/lib/nav";
import { LogoMark } from "./LogoMark";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState<string | null>(null);
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 40);
    f();
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);

  return (
    <>
      <div className="absolute inset-x-0 top-0 z-[95] flex h-9 items-center justify-between bg-[#021f38] px-5 text-[13px] text-[#f1d49a]">
        <span>نسخة تطويرية · المحتوى تجريبي</span>
      </div>
      <header
        className={`fixed inset-x-0 z-90 text-white transition-all duration-300 ${scrolled ? "top-0 bg-navy/95 shadow-lg backdrop-blur" : "top-9 bg-linear-to-b from-[#021f38]/80 to-transparent"}`}
      >
        <div className={`mx-auto flex max-w-[1400px] items-center justify-between gap-3 px-5 transition-all ${scrolled ? "min-h-[68px]" : "min-h-[84px]"}`}>
          <Link href="/" aria-label="الجمعية الأهلية الصالحية بعنيزة، الرئيسية">
            <LogoMark className={`text-white transition-all ${scrolled ? "h-[47px] w-[50px]" : "h-14 w-[60px]"}`} />
          </Link>

          <nav className="hidden flex-1 items-center justify-center min-[1181px]:flex" aria-label="القائمة الرئيسية" onMouseLeave={() => setOpen(null)}>
            {NAV.map((g) => (
              <div key={g.label} className="relative" onMouseEnter={() => setOpen(g.label)}>
                <button
                  type="button"
                  aria-haspopup="true"
                  aria-expanded={open === g.label}
                  onClick={() => setOpen(open === g.label ? null : g.label)}
                  className="flex items-center gap-1 rounded-xl px-1.5 py-2.5 text-[14px] font-medium text-[#e4eef6] transition hover:bg-white/10 hover:text-white min-[1500px]:px-2.5 min-[1500px]:text-[14.5px]"
                >
                  {g.label}
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="m6 9 6 6 6-6" /></svg>
                </button>
                <div className={`absolute start-0 top-full min-w-[250px] rounded-2xl border border-line bg-card p-2 text-fg shadow-2xl transition ${open === g.label ? "visible translate-y-0 opacity-100" : "invisible translate-y-2 opacity-0"}`}>
                  {g.links.map((l) => (
                    <Link key={l.label} href={l.href} onClick={() => setOpen(null)} className="block rounded-xl px-3.5 py-2 text-[14.5px] font-medium transition hover:bg-tint hover:ps-5 hover:text-brand">
                      {l.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link href="/store" className="flex h-10 items-center gap-2 rounded-xl bg-gold px-5 text-[14.5px] font-bold text-ink shadow-lg shadow-gold/40 transition hover:-translate-y-0.5 hover:bg-gold-hi max-[1500px]:w-10 max-[1500px]:justify-center max-[1500px]:px-0" aria-label="تبرع الآن">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21s-7-4.5-9.3-9A5.3 5.3 0 0 1 12 6.4 5.3 5.3 0 0 1 21.3 12C19 16.5 12 21 12 21z" /></svg>
              <span className="max-[1500px]:hidden">تبرع الآن</span>
            </Link>
            <button type="button" className="grid h-10 w-10 place-items-center rounded-xl bg-white/10 transition hover:bg-gold hover:text-ink min-[1181px]:hidden" aria-label="القائمة" onClick={() => setMobile(true)}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 7h16M4 12h16M4 17h10" /></svg>
            </button>
          </div>
        </div>
      </header>

      {mobile && (
        <div className="fixed inset-0 z-[120] overflow-y-auto bg-[#021f38] px-5 pb-10 pt-6 text-white" role="dialog" aria-label="القائمة">
          <div className="flex items-center justify-between pb-4">
            <span className="font-bold">الجمعية الأهلية الصالحية بعنيزة</span>
            <button className="grid h-10 w-10 place-items-center rounded-xl bg-white/10" onClick={() => setMobile(false)} aria-label="إغلاق">✕</button>
          </div>
          {NAV.map((g) => (
            <details key={g.label} className="border-b border-white/10">
              <summary className="cursor-pointer list-none py-4 text-[17px] font-bold">{g.label}</summary>
              <div className="grid pb-3">
                {g.links.map((l) => (
                  <Link key={l.label} href={l.href} onClick={() => setMobile(false)} className="py-2 text-[15px] text-[#c9d8e6]">{l.label}</Link>
                ))}
              </div>
            </details>
          ))}
        </div>
      )}
    </>
  );
}
