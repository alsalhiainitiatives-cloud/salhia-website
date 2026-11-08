export type NavLink = { label: string; href: string };
export type NavGroup = { label: string; links: NavLink[] };

export const NAV: NavGroup[] = [
  {
    label: "من نحن",
    links: [
      { label: "نبذة عنا", href: "/about" },
      { label: "أعضاء مجلس الإدارة", href: "/people#board" },
      { label: "توجهنا الاستراتيجي", href: "/strategy" },
      { label: "تاريخ الجمعية", href: "/about#history" },
      { label: "الهيكل التنظيمي", href: "/structure" },
      { label: "المجلس الفخري", href: "/people#honorary" },
      { label: "الجمعية العمومية", href: "/people#assembly" },
      { label: "اللجان الفرعية", href: "/people#committees" },
      { label: "القيادات التنفيذية", href: "/people#executives" },
      { label: "فريق الخبراء والممارسين", href: "/people#experts" },
      { label: "جوائز التميز", href: "/awards" },
    ],
  },
  {
    label: "الحوكمة",
    links: [
      { label: "أدلة الحوكمة", href: "/governance#guides" },
      { label: "أدلة النمذجة والنقل المعرفي", href: "/governance#models" },
      { label: "محاضر اجتماعات الجمعية العمومية", href: "/governance#assembly" },
      { label: "محاضر اجتماعات مجلس الإدارة", href: "/governance#board" },
      { label: "السياسات واللوائح", href: "/governance#policies" },
    ],
  },
  {
    label: "المبادرات والبرامج",
    links: [
      { label: "البرامج التنموية", href: "/programs#development" },
      { label: "البرامج المجتمعية", href: "/programs#community" },
      { label: "برامج التعليم والمعرفة", href: "/programs#education" },
      { label: "مكتبة الصالح الرقمية", href: "/programs/library" },
      { label: "كل المبادرات والبرامج", href: "/programs" },
    ],
  },
  {
    label: "المتجر",
    links: [
      { label: "متجر المبادرات", href: "/store" },
      { label: "التبرع السريع", href: "/store#quick" },
      { label: "الأوقاف والصدقات الجارية", href: "/store#waqf" },
      { label: "سلة المساهمات", href: "/checkout" },
    ],
  },
  {
    label: "الدورات",
    links: [
      { label: "منصة الدورات التدريبية", href: "/courses" },
      { label: "الدورات المجانية", href: "/courses#free" },
      { label: "الدورات المباشرة", href: "/courses#live" },
      { label: "دورة الحوكمة للجمعيات", href: "/courses/governance" },
      { label: "لوحة المتدرّب", href: "/learn" },
    ],
  },
  {
    label: "الخدمات الرقمية",
    links: [
      { label: "الخدمات والمنصات الرقمية", href: "/services" },
      { label: "طلب استشارة", href: "/services#consult" },
      { label: "عضوية الجمعية", href: "/services#member" },
      { label: "تطوّع وأحدث أثرًا", href: "/volunteer" },
      { label: "الوظائف", href: "/volunteer#jobs" },
      { label: "الشراكات والرعاية", href: "/volunteer#partners" },
    ],
  },
  {
    label: "الدراسات والأبحاث",
    links: [
      { label: "الدراسات والبحوث العلمية", href: "/studies" },
      { label: "المقاييس والمؤشرات", href: "/studies#indices" },
      { label: "المشاركات العلمية", href: "/studies#papers" },
    ],
  },
  {
    label: "التقارير والإعلام",
    links: [
      { label: "أخبار الجمعية", href: "/news" },
      { label: "التقارير السنوية", href: "/reports#annual" },
      { label: "تقارير المراجع القانوني", href: "/reports#audit" },
      { label: "إصدارات الجمعية", href: "/reports#publications" },
      { label: "الملف الصحفي", href: "/reports#press" },
      { label: "ألبوم الصور", href: "/gallery" },
      { label: "المنتجات التوعوية", href: "/awareness" },
      { label: "بودكاست بيت الأسرة", href: "/awareness#podcast" },
      { label: "الفيديوهات التوعوية", href: "/videos#awareness" },
      { label: "مكتبة الفيديو", href: "/videos#library" },
    ],
  },
  {
    label: "اتصل بنا",
    links: [
      { label: "اتصل بنا", href: "/contact" },
      { label: "فروعنا", href: "/contact#branches" },
      { label: "تقديم شكوى أو اقتراح", href: "/contact#complaint" },
    ],
  },
];
