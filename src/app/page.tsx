import Link from "next/link";
import { Hero } from "@/components/Hero";

const MODULES = [
  { href: "/courses", title: "منصة الدورات", d: "دورات مسجّلة ومباشرة بشهادات إلكترونية." },
  { href: "/store", title: "متجر المبادرات", d: "ساهم في المبادرات بمبلغ أو وحدة عطاء." },
  { href: "/governance", title: "الحوكمة والشفافية", d: "الأدلة والمحاضر والسياسات المعتمدة." },
  { href: "/news", title: "الأخبار والإعلام", d: "أخبار وتقارير ومنتجات توعوية." },
];

export default function Home() {
  return (
    <>
      <Hero />
      <section className="mx-auto max-w-[1280px] px-5 py-16 text-center">
        <h2 className="text-[clamp(26px,3vw,38px)] font-bold text-brand">خدماتنا وبرامجنا</h2>
        <p className="mt-2 text-muted">منظومة رقمية متكاملة تخدم المتعلّم والمتبرع والباحث والمجتمع</p>
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {MODULES.map((m) => (
            <Link key={m.href} href={m.href} className="group flex flex-col items-center gap-3">
              <span className="grid aspect-square w-48 place-items-center rounded-[52%_48%_56%_44%/47%_55%_45%_53%] bg-tint text-5xl text-brand transition-all duration-500 group-hover:rotate-6 group-hover:rounded-[46%_54%_44%_56%/56%_44%_56%_44%] group-hover:bg-brand group-hover:text-white">●</span>
              <h3 className="text-xl font-bold text-brand">{m.title}</h3>
              <p className="max-w-60 text-sm text-muted">{m.d}</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
