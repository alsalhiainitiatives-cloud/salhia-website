"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { media } from "@/lib/cdn";

type Slide = { kicker: string; title: [string, string, string]; lead: string; img: string; light?: boolean; ctas: { label: string; href: string; primary?: boolean }[] };

const SLIDES: Slide[] = [
  { kicker: "منذ عام 1402هـ · عنيزة", title: ["إنسانٌ يتعلّم، ومجتمعٌ", "يحتضن", "، وأثرٌ يدوم"], lead: "الجمعية الأهلية الصالحية بعنيزة تُحيي ذكرى المربي صالح الصالح وتواصل رسالته في التعليم والعطاء وتنمية المجتمع.", img: "img/building.webp", light: true, ctas: [{ label: "ساهم في مبادرة", href: "/store", primary: true }, { label: "استكشف الدورات", href: "/courses" }] },
  { kicker: "منصة الدورات التدريبية", title: ["تعلّم، وتأهّل،", "واحصل", " على شهادتك"], lead: "دورات مسجّلة ومباشرة، مجانية ومدفوعة، بمتابعة تقدّمك وشهادات إلكترونية يمكن التحقق منها.", img: "img/h_courses.webp", ctas: [{ label: "تصفّح الدورات", href: "/courses", primary: true }, { label: "ابدأ بدورة مجانية", href: "/courses#free" }] },
  { kicker: "متجر المبادرات", title: ["مساهمتك اليوم،", "أثرٌ يبقى", " غدًا"], lead: "اختر مبادرة وأسهم بمبلغ أو بوحدة عطاء محددة، وتابع أثر مساهمتك مع إيصال إلكتروني.", img: "img/h_donate.webp", ctas: [{ label: "ساهم الآن", href: "/store", primary: true }, { label: "تعرّف على المبادرات", href: "/programs" }] },
  { kicker: "الحوكمة والشفافية", title: ["مؤسسة تعمل", "بوضوح", " ومسؤولية"], lead: "الأدلة والمحاضر والتقارير المالية متاحة للاطلاع والتحميل في مكان واحد.", img: "img/h_gov.webp", ctas: [{ label: "أدلة الحوكمة", href: "/governance", primary: true }, { label: "التقارير السنوية", href: "/reports#annual" }] },
  { kicker: "الإعلام والمحتوى التوعوي", title: ["أخبارنا وأصواتنا،", "من مجتمعنا", " إليكم"], lead: "تابع آخر الأخبار، واستمع إلى بودكاست بيت الأسرة، وشاهد مكتبة الفيديو والمنتجات التوعوية.", img: "img/h_media.webp", ctas: [{ label: "آخر الأخبار", href: "/news", primary: true }, { label: "بودكاست بيت الأسرة", href: "/awareness#podcast" }] },
];

export function Hero() {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setI((x) => (x + 1) % SLIDES.length), 7000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative h-[clamp(660px,96vh,860px)] overflow-hidden bg-[#021f38] text-white" aria-roledescription="carousel">
      {SLIDES.map((s, k) => (
        <div key={s.kicker} aria-hidden={k !== i} className={`absolute inset-0 flex items-center transition-opacity duration-1000 ${k === i ? "visible opacity-100" : "invisible opacity-0"}`}>
          <div className={`absolute inset-0 ${s.light ? "bg-linear-to-b from-[#EAF2F9] to-white" : ""}`}>
            <Image src={media(s.img)} alt="" fill priority={k < 2} sizes="100vw" unoptimized
              className={`object-cover transition-transform duration-[9000ms] ease-out ${s.light ? "object-[20%_20%] mix-blend-multiply" : "object-[center_30%]"} ${k === i ? "scale-100" : "scale-110"}`} />
            <div className={`absolute inset-0 ${s.light ? "bg-linear-to-l from-[#EAF2F9]/95 via-[#EAF2F9]/80 to-transparent to-60%" : "bg-linear-to-l from-[#021f38]/95 via-navy/75 to-navy/10"}`} />
          </div>
          <div className="relative mx-auto w-full max-w-[1280px] px-5 pb-36 pt-44">
            <div className={`max-w-[640px] ${k === i ? "animate-[rise_.9s_ease-out_both]" : ""}`}>
              <span className={`font-bold ${s.light ? "text-gold-text" : "text-gold-hi"}`}>{s.kicker}</span>
              <h1 className={`my-4 text-[clamp(34px,4.6vw,62px)] font-bold leading-[1.28] ${s.light ? "text-navy" : ""}`}>
                {s.title[0]} <em className={`not-italic ${s.light ? "text-[#9A6B20]" : "text-gold-hi"}`}>{s.title[1]}</em>{s.title[2]}
              </h1>
              <p className={`max-w-[560px] text-lg leading-[1.95] ${s.light ? "text-[#33516B]" : "text-[#d3e1ee]"}`}>{s.lead}</p>
              <div className="mt-7 flex flex-wrap gap-3">
                {s.ctas.map((c) => (
                  <Link key={c.href} href={c.href} className={`rounded-2xl px-6 py-3 font-bold transition hover:-translate-y-0.5 ${c.primary ? "bg-gold text-ink shadow-lg shadow-gold/50 hover:bg-gold-hi" : s.light ? "border-[1.5px] border-navy text-navy hover:bg-navy/10" : "border-[1.5px] border-white/50 hover:bg-white/15"}`}>{c.label}</Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
      <div className="absolute inset-x-0 bottom-28 z-10 mx-auto flex max-w-[1280px] gap-2 px-5">
        {SLIDES.map((s, k) => (
          <button key={s.kicker} aria-label={`الشريحة ${k + 1}`} onClick={() => setI(k)} className={`h-3.5 rounded-full transition-all ${k === i ? "w-9 bg-white" : "w-3.5 bg-white/40"}`} />
        ))}
      </div>
      <svg className="absolute inset-x-0 -bottom-px z-10 h-24 w-full text-bg" viewBox="0 0 1440 96" preserveAspectRatio="none" aria-hidden="true"><path fill="currentColor" d="M0 62C170 14 380 10 600 48S1060 104 1250 54C1340 32 1400 36 1440 50V96H0Z" /></svg>
    </section>
  );
}
