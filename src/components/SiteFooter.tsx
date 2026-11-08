import Link from "next/link";
import Image from "next/image";
import { NAV } from "@/lib/nav";

export function SiteFooter() {
  return (
    <footer className="bg-linear-to-b from-blue to-navy text-[#dce8f2]">
      <div className="mx-auto grid max-w-[1280px] gap-8 px-5 py-14 md:grid-cols-[1.3fr_repeat(4,1fr)]">
        <div>
          <Image src="/logo-white.svg" alt="شعار الجمعية الأهلية الصالحية بعنيزة" width={170} height={148} unoptimized />
          <p className="mt-3 max-w-[310px] text-sm leading-8">عطاء وتنمية وتعليم في عنيزة منذ عام 1402هـ. نُحيي ذكرى المربي صالح الصالح ونواصل رسالته.</p>
        </div>
        {NAV.slice(0, 4).map((g) => (
          <div key={g.label}>
            <h4 className="mb-3 border-b-[3px] border-gold/0 pb-2 text-base font-bold text-white">{g.label}</h4>
            <ul>
              {g.links.slice(0, 5).map((l) => (
                <li key={l.label}><Link href={l.href} className="block py-1 text-[14.5px] transition hover:-translate-x-1 hover:text-gold-hi">{l.label}</Link></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="bg-[#02294a] py-4 text-center text-[13.5px] text-[#b6ccdf]">كافة الحقوق محفوظة للجمعية الأهلية الصالحية بعنيزة 2026</div>
    </footer>
  );
}
