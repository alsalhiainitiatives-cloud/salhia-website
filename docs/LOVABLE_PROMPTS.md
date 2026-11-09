# حزمة برومبتات Lovable: منصة الجمعية الأهلية الصالحية بعنيزة

**طريقة الاستخدام:** نفّذ البرومبتات بالترتيب، واحدًا في كل مرة. بعد كل برومبت راجع النتيجة على الجوال والحاسوب قبل الانتقال للتالي. لا تدمج برومبتين. إن أخطأ Lovable فصحّح بجملة قصيرة قبل المتابعة.

**قبل البدء:**
1. أنشئ مشروعًا جديدًا في Lovable.
2. ارفع إلى المشروع من هذا المستودع: مجلد `media/img` (الصور) والخطوط من `src/fonts` (ثلاثة ملفات Thmanyah) وملف `public/logo-white.svg`.
3. صور الشعار الأخرى (الملونة) تأتي من ملف الهوية عندك.
4. البرومبتات مكتوبة بالإنجليزية لأن Lovable يولّد كودًا أدق بها. النصوص العربية التي يجب أن تظهر في الواجهة مكتوبة داخلها حرفيًا.

---

## المرحلة 0: الأساس

### البرومبت 0.1: السياق ونظام التصميم (ابدأ به دائمًا)

```
You are building "Al-Salhiyah Charity Association Platform" (الجمعية الأهلية الصالحية بعنيزة), a Saudi non-profit's website with an e-learning platform and a donation/initiatives store. Read this whole message before writing code. Do not build pages yet. In this step, only set up the project foundation.

STACK: React + TypeScript + Vite + Tailwind + shadcn/ui + React Router + TanStack Query + react-hook-form + zod. Backend: Supabase (I will connect my own project, do NOT use Lovable Cloud). Media: Cloudflare R2 CDN. Video: Cloudflare Stream.

LANGUAGE AND DIRECTION: Arabic only, RTL. Set <html lang="ar" dir="rtl">. Use CSS logical properties (ms-, me-, ps-, pe-, start-, end-) everywhere, never left/right. Mirror directional icons (arrows, chevrons). Do not mirror the logo, charts or media controls. Numbers use Western digits (0-9) with tabular-nums. Currency: "ر.س" after the number. Dates: show Hijri and Gregorian using Intl.DateTimeFormat('ar-SA-u-ca-islamic-umalqura-nu-latn').

FONT: "Thmanyah Sans" (weights 400, 500, 700) from the uploaded files, with @font-face and font-display: swap. Fallback: system-ui. Body line-height 1.8.

IDENTITY (design tokens as CSS variables, wired into Tailwind config, with light and dark themes):
--navy #03355A  --blue #0A5990  --sky #2B8FCB  --gold #BA8735  --gold-hi #E3B466  --ink #061E33
Light: --bg #F4F8FB, --card #FFFFFF, --tint #E7F0F7, --tint-2 #D3E5F3, --fg #0D2338, --muted #51677B, --line #CCDCEA, --brand #0A5990, --gold-text #8A5F1C
Dark: --bg #06192B, --card #0B2640, --tint #0E2C4A, --tint-2 #13395F, --fg #EAF1F7, --muted #9FB5C8, --line #1D4163, --brand #6DB3E8, --gold-text #DDAE5E
Rules: gold is only for emphasis and the main donate button. Never put small gold text on white (use --gold-text). Contrast must pass WCAG AA in both themes. Theme: follows system, with a manual toggle stored in localStorage (wrapped in try/catch).

STYLE: premium, modern, institutional. Large photography, soft shadows, rounded corners (14-26px), organic blob shapes behind images, generous whitespace. The logo geometry (two slanted columns, a curved swoosh, three dots) is the visual motif: use a very faint repeating pattern of it (opacity 5-7%) on dark navy sections. Dividers between sections are soft wave curves, not straight lines.

ICONS: use lucide-react or Phosphor Duotone (duotone style, blue main color with gold secondary layer). No emoji anywhere.

MOTION: Framer Motion. Subtle: fade-up on scroll (visible by default, never leave content at opacity 0), hover lift on cards (translateY -6px), smooth counters. Respect prefers-reduced-motion everywhere.

IMAGES: all images go through one helper media(path) that prefixes import.meta.env.VITE_CDN_URL (empty for now, so it falls back to /). Use <img loading="lazy" decoding="async"> with width/height to avoid layout shift, except the first hero image.

QUALITY RULES (apply to everything from now on):
- Mobile first. 16px side gutters. No horizontal scroll at 360px. Touch targets at least 44px.
- Accessible: semantic landmarks, visible focus ring (3px gold), aria labels in Arabic, skip-to-content link, alt text in Arabic.
- Forms: label above field, Arabic validation messages, inputmode="numeric" for phones, Saudi phone format 05XXXXXXXX.
- Never hardcode secrets. Environment variables only (VITE_ prefix for public ones).
- Every list page has loading skeletons, empty state and error state in Arabic.
- Placeholder content is clearly Arabic sample text, never lorem ipsum.

Create: the design tokens, Tailwind config, font setup, a theme provider with toggle, the media() helper, a LogoMark SVG component (I will paste the SVG later), and an empty App with routes for: / , /about, /store, /courses, /governance, /news, /contact (each a placeholder page titled in Arabic). Add a short README section describing the tokens.
```

### البرومبت 0.2: ربط Supabase (قاعدة البيانات موجودة مسبقًا)

```
Connect this project to my EXISTING Supabase project (project ref: ppbipxcpxuzqmpblxzvv, URL https://ppbipxcpxuzqmpblxzvv.supabase.co) using the Supabase integration. Do NOT create a new database and do NOT enable Lovable Cloud.

The schema already exists with Row Level Security enabled. Tables: profiles, initiatives, initiative_units, courses, course_modules, lessons, enrollments, lesson_progress, news, documents, people, orders, order_items, submissions. Roles enum app_role: admin, editor, finance, instructor, member.

Tasks:
1. Generate TypeScript types from the live schema and create src/integrations/supabase/client.ts using the publishable (anon) key from env vars VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.
2. Create typed data-access hooks with TanStack Query for: published initiatives (with units), published courses (with modules and lessons), published news, documents by section, people by group.
3. IMPORTANT SECURITY RULES: never use the service-role key in frontend code. Never change or drop existing RLS policies. If you need a schema change, write it as a new migration file in supabase/migrations and show it to me before applying. All writes to orders/order_items will later happen only from server-side Edge Functions.
4. Do not add seed data yet.
```

---

## المرحلة 1: صفحة الهبوط والأزرار الرئيسية

### البرومبت 1.1: الهيدر والتذييل

```
Build the global layout. 

TOP STRIP: a thin dark bar (#021F38, 36px) at the very top of the page that scrolls away with the page. Right side (RTL start): small text "نسخة تطويرية · المحتوى تجريبي" (make it removable via a constant). Left side: today's Hijri and Gregorian date.

HEADER: fixed, transparent over the hero with a soft dark gradient, becoming a solid navy glass bar (bg navy/95, backdrop blur, shadow, shorter height) after scrolling 40px, and sliding to the very top (the top strip scrolls away). Single row, height 84px (68px when scrolled). Layout (RTL, from right to left): 
- Logo: ONLY the logo mark icon (white), no text next to it. aria-label "الجمعية الأهلية الصالحية بعنيزة، الرئيسية".
- Main nav (desktop, 1181px and up), centered, with dropdown menus that open on hover and on click/keyboard, with a chevron that rotates. Items and sub-items:
  1. من نحن: نبذة عنا، أعضاء مجلس الإدارة، توجهنا الاستراتيجي، تاريخ الجمعية، الهيكل التنظيمي، المجلس الفخري، الجمعية العمومية، اللجان الفرعية، القيادات التنفيذية، فريق الخبراء والممارسين، جوائز التميز
  2. الحوكمة: أدلة الحوكمة، أدلة النمذجة والنقل المعرفي، محاضر اجتماعات الجمعية العمومية، محاضر اجتماعات مجلس الإدارة، السياسات واللوائح
  3. المبادرات والبرامج: البرامج التنموية، البرامج المجتمعية، برامج التعليم والمعرفة، مكتبة الصالح الرقمية، كل المبادرات والبرامج
  4. المتجر: متجر المبادرات، التبرع السريع، الأوقاف والصدقات الجارية
  5. الدورات: منصة الدورات التدريبية، الدورات المجانية، الدورات المباشرة، لوحة المتدرّب
  6. الخدمات الرقمية: الخدمات والمنصات الرقمية، طلب استشارة، عضوية الجمعية، تطوّع وأحدث أثرًا، الوظائف، الشراكات والرعاية
  7. الدراسات والأبحاث: الدراسات والبحوث العلمية، المقاييس والمؤشرات، المشاركات العلمية
  8. التقارير والإعلام: أخبار الجمعية، التقارير السنوية، تقارير المراجع القانوني، إصدارات الجمعية، الملف الصحفي، ألبوم الصور، المنتجات التوعوية، بودكاست بيت الأسرة، الفيديوهات التوعوية، مكتبة الفيديو
  9. اتصل بنا: اتصل بنا، فروعنا، تقديم شكوى أو اقتراح
- Tools (left side): search icon button, theme toggle, cart button with a gold count badge (cart state in a Zustand store persisted to localStorage), member login icon, and a gold primary pill button "تبرع الآن" with a heart icon (icon only below 1500px).
Mobile/tablet (below 1181px): show a burger button that opens a full-screen navy menu with accordion groups, plus the donate button. Dropdown panels: white card, rounded 16px, shadow, items highlight with a light tint and an inward slide on hover.

FOOTER: navy gradient, 4 link columns (الجمعية، البرامج والمتجر، المركز الإعلامي، اتصل بنا), the white full logo with the text "عطاء وتنمية وتعليم في عنيزة منذ عام 1402هـ. نُحيي ذكرى المربي صالح الصالح ونواصل رسالته.", social icons (Instagram, YouTube, X), and a darker bottom bar "كافة الحقوق محفوظة للجمعية الأهلية الصالحية بعنيزة 2026". Floating WhatsApp button (green, pulsing ring) on the start edge and a back-to-top button that appears after 700px.

CART DRAWER: slides from the start edge with items list, remove buttons, total in ر.س, a gold "إتمام الدفع" button linking to /checkout, and a note "نموذج تجريبي: لا يتم تحصيل أي مبلغ". Closes with Esc and overlay click, focus trapped, scroll locked.

Route every link to a real route (create placeholder pages that show the Arabic title inside a styled page header banner: navy gradient with the faint logo pattern, centered title and breadcrumb). Use the Routes: /about, /people, /strategy, /structure, /awards, /governance, /programs, /programs/:slug, /store, /courses, /courses/:slug, /learn, /services, /volunteer, /studies, /news, /news/:slug, /reports, /gallery, /awareness, /videos, /contact, /checkout, /login, /search.
```

### البرومبت 1.2: الهيرو (سلايدر بصور بعرض كامل)

```
Build the home page hero. It is a full-bleed carousel that fills the full width and about 96vh (min 660px, max 860px), starting behind the transparent header. Each slide has a FULL-WIDTH background photo (object-cover) with a dark navy gradient from the start side (RTL right) so the text is readable, a faint logo pattern overlay, and the content block (max width 640px, vertically centered) with: a small gold kicker with a two-dot ornament, a big H1 (clamp 34px to 62px, bold) with one highlighted gold word, a lead paragraph, and two buttons (primary gold, secondary outlined white). A soft wave divider curves into the page background at the bottom. Dots indicator at the bottom (active dot is a wide pill). Autoplay 7s, pauses on hover, swipe on touch, keyboard accessible, aria-roledescription="carousel". Background image slowly zooms (scale 1.1 to 1) during the active slide. Text animates in with a staggered fade-up. Respect reduced motion.

SLIDES (images from /img/):
1. kicker "منذ عام 1402هـ · عنيزة". Title "إنسانٌ يتعلّم، ومجتمعٌ يحتضن، وأثرٌ يدوم" (highlight "يحتضن"). Lead "الجمعية الأهلية الصالحية بعنيزة تُحيي ذكرى المربي صالح الصالح وتواصل رسالته في التعليم والعطاء وتنمية المجتمع." Buttons "ساهم في مبادرة" → /store, "استكشف الدورات" → /courses. Image: building.webp (a navy watercolor of the association building on a WHITE background): for this slide only use a LIGHT variant: pale blue background, the image with mix-blend-mode multiply aligned to the bottom-left, and DARK text instead of white.
2. "منصة الدورات التدريبية" / "تعلّم، وتأهّل، واحصل على شهادتك" / "دورات مسجّلة ومباشرة، مجانية ومدفوعة، بمتابعة تقدّمك وشهادات إلكترونية يمكن التحقق منها." / buttons "تصفّح الدورات" /courses, "ابدأ بدورة مجانية" /courses?price=free. Image h_courses.webp
3. "متجر المبادرات" / "مساهمتك اليوم، أثرٌ يبقى غدًا" / "اختر مبادرة وأسهم بمبلغ أو بوحدة عطاء محددة، وتابع أثر مساهمتك مع إيصال إلكتروني." / "ساهم الآن" /store, "تعرّف على المبادرات" /programs. Image h_donate.webp
4. "الحوكمة والشفافية" / "مؤسسة تعمل بوضوح ومسؤولية" / "الأدلة والمحاضر والتقارير المالية متاحة للاطلاع والتحميل في مكان واحد." / "أدلة الحوكمة" /governance, "التقارير السنوية" /reports. Image h_gov.webp
5. "الإعلام والمحتوى التوعوي" / "أخبارنا وأصواتنا، من مجتمعنا إليكم" / "تابع آخر الأخبار، واستمع إلى بودكاست بيت الأسرة، وشاهد مكتبة الفيديو والمنتجات التوعوية." / "آخر الأخبار" /news, "بودكاست بيت الأسرة" /awareness. Image h_media.webp
Preload only slide 1's image. Others lazy.
```

### البرومبت 1.3: أقسام صفحة الهبوط (الجزء الأول)

```
Continue the home page, below the hero. Add these sections in order. Each section header has a rounded icon tile (light tint, blue duotone icon with a small gold dot on its corner), an H2 in --brand color, a muted subtitle, and an optional "عرض الكل" outlined button at the end. Alternate section backgrounds with a very soft blob shape (the --tint color, 70% opacity, organic border-radius, slowly morphing) behind some sections.

A) ABOUT ("من نحن"): two columns (stack on mobile, image first). Text side: small gold kicker "من نحن", H2 "الجمعية الأهلية الصالحية .. أثرٌ يبدأ من عنيزة", paragraph "تأسست الجمعية عام 1402هـ إحياءً لذكرى المربي صالح الصالح، أحد رواد التعليم في عنيزة. وعبر مركز صالح بن صالح الاجتماعي ومكتبته التي تضم نحو 60 ألف عنوان، تعمل الجمعية في التعليم والثقافة والعطاء وتنمية المجتمع، وتبني اليوم منصة رقمية متكاملة للتدريب والمبادرات.", three fact counters (1402هـ سنة التأسيس، 60 ألف+ عنوان في المكتبة، 1407هـ افتتاح المركز الاجتماعي), buttons "اقرأ المزيد" /about and "توجهنا الاستراتيجي" /strategy. Image side: people.webp (a watercolor of board members signing an agreement) in a large rounded frame (34px) with an offset tinted back-card, a gold circle ornament at the corner, and a white chip at the bottom "توقيع شراكات استراتيجية" with a handshake icon. DO NOT use the logo in this section.

B) SERVICES MODULES ("خدماتنا وبرامجنا"), centered: four large organic-blob circles (about 230px) each with a big duotone icon, a title, a short description and a hover state where the blob rotates and fills --brand with the icon turning white and a gold "ادخل القسم" link fading in. Modules: منصة الدورات (laptop icon, "دورات مسجّلة ومباشرة بشهادات إلكترونية.") → /courses; متجر المبادرات (hand-heart, "ساهم في المبادرات بمبلغ أو وحدة عطاء.") → /store; الحوكمة والشفافية (shield-check, "الأدلة والمحاضر والسياسات المعتمدة.") → /governance; الأخبار والإعلام (megaphone, "أخبار وتقارير ومنتجات توعوية.") → /news. This section design was explicitly approved by the client: keep it elegant and exactly this concept.

C) AUDIENCES panel: a rounded bordered card containing an intro tile (navy gradient, sprout icon, "مبادرات لكل فئة", "نبني برامجنا حول الإنسان ومراحل حياته، لنصل بالأثر إلى كل بيت في عنيزة.", gold button "كل البرامج" → /programs) and five tall photo cards (aspect 3/4) with a bottom navy gradient and a bold white label: الطالب (edu.webp), الشاب (youth.webp), المرأة (online.webp), الأسرة (family.webp), المتطوع (volunteers.webp). Hover: lift and image zoom.

Use Framer Motion fade-up with stagger. No content may stay invisible if JS fails or before scroll.
```

### البرومبت 1.4: أقسام صفحة الهبوط (الجزء الثاني)

```
Continue the home page with these sections. All data comes from Supabase through the hooks from step 0.2, with graceful fallback to local sample data (a constants file) when the tables are empty, and skeleton loaders.

D) STORE CAROUSEL ("متجر المبادرات", subtitle "ساهم في مبادرات الجمعية بمبلغ أو بوحدة عطاء"): category chips (الكل، التعليم، الأسرة، التراث، الرعاية) filtering a horizontal scroll-snap carousel (3 cards desktop, 2 tablet, 1.15 mobile) with prev/next arrow buttons and a "طالع المزيد" button → /store. Initiative card: 16/10 photo with a dark rounded category chip, title, 2-line description, a gold progress bar with raised amount, percent and goal ("98,500 ر.س · 66% من 150,000"), unit chips (selectable: e.g. "رقمنة 100 كتاب · 500", "فهرسة 500 عنوان · 250"), and two buttons: "التفاصيل" and gold "أضف للسلة" (adds the selected unit to the cart and shows a toast). Progress bars animate on first appearance.

E) COURSES CAROUSEL ("الدورات التدريبية"): same carousel pattern. Course card: photo with chip showing the delivery type (مسجّل / مباشر / مسجّل + مباشر) and a gold chip "مجانية" if free; title; meta row (hours, lessons, rating star, enrolled count); level; price in --brand bold or "مجانية" in green; button "التفاصيل".

F) EVENTS ("روزنامة الفعاليات"): carousel of poster-style cards (tall photo, gold "فعالية" chip, title, date with calendar icon, place with pin icon, outlined button "سجّل حضورك").

G) NEWS ("أخبار الجمعية"): carousel of cards with a 16/9 photo, a tinted category chip, a solid navy date badge (day big, month small) and a 2-line headline; "طالع المزيد" → /news.

H) KPIs ("مؤشرات الأداء", subtitle "أرقام تجريبية لعرض التصميم"): 9 tiles in a 3x3 grid (2 columns on mobile) with duotone icons and animated count-up numbers (start when visible, Western digits): 48,250 مستفيد من برامج الجمعية، 186,400 إجمالي الخدمات المقدّمة، 12,900 متدرّب في منصة الدورات، 8,640 أسرة مستفيدة، 60,000 عنوان في مكتبة المركز، 840 متطوع ومتطوعة، 36 مبادرة وبرنامجًا، 14 جائزة وشهادة تميز، 5 مراكز وفروع. Next to the grid, an SVG "radar" with concentric rings and pulsing gold circles, a center dot labelled عنيزة and four surrounding dots (بريدة، الرس، الرياض، البكيرية) connected by dashed lines.

I) GOVERNANCE TILES ("الحوكمة والشفافية", subtitle "وثائق الجمعية المعتمدة متاحة للاطلاع"): four centered cards with a large duotone icon: أدلة الحوكمة /governance?tab=guides، السياسات واللوائح /governance?tab=policies، محاضر مجلس الإدارة /governance?tab=board، التقارير السنوية /reports?tab=annual.

J) AWARENESS ("المحتوى التوعوي"): two columns. Left: a navy podcast card "بودكاست بيت الأسرة · الحلقة 12", title "كيف نصنع حوارًا هادئًا في البيت؟", an animated equalizer waveform (44 bars, animates only when playing) and a round gold play/pause button with a duration. Right: a rounded video card with a photo background (awards.webp), a dark gradient, a large glass play button, and the caption "مكتبة الفيديو: قصص أثر من عنيزة". The play buttons only toggle UI state for now.

K) PARTNERS BAND: full-width navy gradient section with the logo pattern at 6% opacity and a big curved top edge. H2 "شراكاتنا الاستراتيجية", a grid of 8 white rounded logo placeholders ("شعار شريك") that lift and get a gold border on hover, a call-to-action row ("انضم إلى الجمعية الأهلية الصالحية كشريك استراتيجي لتحقيق أهدافنا المشتركة" + gold button "طالع المزيد" → /volunteer?tab=partners), and an infinite horizontal marquee of award medals (gold radial-gradient circles with an award icon and a caption) that pauses on hover and is static under reduced motion.
```

### البرومبت 1.5: صقل الصفحة الرئيسية

```
Polish and verify the home page without adding features:
1. Check 360px, 390px, 768px, 1024px, 1440px. No horizontal scrolling. Fix overlaps (especially the header at 1181-1500px: it must never overflow; reduce nav padding or show the donate button icon-only).
2. The hero text must have contrast of at least 4.5:1 on every slide in light and dark themes.
3. Lighthouse targets: LCP under 2.5s (preload hero image 1, serve WebP, explicit image sizes), CLS under 0.05, and no layout shift from fonts (use size-adjust fallback).
4. Keyboard: tab order is logical, dropdowns work with Enter/Escape/arrow keys, the carousel has accessible controls.
5. Add document titles and meta descriptions (Arabic), Open Graph tags, and a JSON-LD "Organization" block.
6. Add a 404 page in the same visual identity with a button back to home.
Report what you changed.
```

---

## المرحلة 2: القسم المؤسسي والمحتوى

### البرومبت 2.1: صفحات "من نحن" والقيادة

```
Build the institutional pages with a shared PageHeader (navy gradient banner with faint logo pattern, H1, subtitle, breadcrumb).

/about: a sticky table-of-contents sidebar (scroll-spy) and sections: نبذة عن الجمعية (founded 1402هـ to honor the educator Saleh Al-Saleh; Saleh bin Saleh Social Center opened 1407هـ with a library of about 60,000 titles), تاريخنا (vertical timeline: 1402هـ التأسيس، 1407هـ افتتاح مركز صالح بن صالح الاجتماعي، مرحلة التوسع، اليوم المنصة الرقمية), الرؤية والرسالة (two cards, sample text), القيم (six cards: التنمية، المجتمع، العطاء، التعليم، الشفافية، الابتكار), الأهداف. Mark any text that is not factual as sample text in a constants file so it is easy to replace.

/strategy: four pillar cards (التعليم والمعرفة، الأسرة والمجتمع، التحول الرقمي، الحوكمة والاستدامة) and a roadmap timeline 2025-2027.

/structure: an org chart built with CSS (الجمعية العمومية ← مجلس الإدارة ← لجان ← المدير التنفيذي ← الإدارات), responsive (stacked on mobile).

/people: tabs (hash/URL synced ?tab=): مجلس الإدارة، المجلس الفخري، الجمعية العمومية، اللجان الفرعية، القيادات التنفيذية، فريق الخبراء والممارسين. Data from the Supabase table people filtered by group_key, ordered by sort. Person card: square photo, name, role, expandable short bio. Show a term banner above the board tab ("مدة المجلس"). Placeholder portrait component when photo_path is empty.

/awards: grid of award cards with gold medal icons.

Use skeletons, empty states and error states. All photos via media().
```

### البرومبت 2.2: الحوكمة والتقارير والدراسات

```
Build /governance, /reports and /studies as tabbed document libraries synced to the URL (?tab=...). Data from the Supabase table documents filtered by section and tab.

/governance tabs: guides (أدلة الحوكمة), models (أدلة النمذجة والنقل المعرفي), assembly (محاضر اجتماعات الجمعية العمومية), board (محاضر اجتماعات مجلس الإدارة), policies (السياسات واللوائح).
/reports tabs: annual (التقارير السنوية), audit (تقارير المراجع القانوني), publications (إصدارات الجمعية), press (الملف الصحفي).
/studies: filter bar (search + type select: دراسات وبحوث، مقاييس ومؤشرات، مشاركات علمية).

Document card: a navy cover tile with the faint logo pattern and the title, hijri year, views count, and a full-width "عرض وتحميل" button. Clicking opens a secure download: call a Supabase Edge Function that returns a short-lived signed URL for the R2 object (file_path) and increments views. For now, make the function call a stub and show a toast.

Add search with debounce, pagination (12 per page), and empty states. Sample data: 6 documents per tab in a seed SQL file (supabase/seed/documents.sql), titles in Arabic (e.g. "لائحة تعارض المصالح"، "التقرير السنوي 1446هـ"). Show me the seed SQL before running it.
```

### البرومبت 2.3: الأخبار والإعلام والمحتوى التوعوي

```
Build the media modules.
/news: category chips (الكل، شراكات، تدريب، حوكمة، تطوع، إعلام، برامج، مبادرات، تقارير), grid of news cards, "تحميل المزيد" pagination from the Supabase table news (published=true, ordered by published_at desc).
/news/:slug: article layout with a wide cover, meta row (hijri date, views, category), rich text body, image gallery with lightbox, and a sidebar "أخبار ذات صلة". Sanitize any HTML body with DOMPurify before rendering.
/gallery: masonry photo album with a keyboard-accessible lightbox (Esc closes, arrows navigate).
/videos: tabs (الفيديوهات التوعوية، مكتبة الفيديو), video cards with a play overlay. Video playback uses the Cloudflare Stream embed (iframe from customer-<code>.cloudflarestream.com, code from env VITE_STREAM_SUBDOMAIN) inside a modal; until configured show a friendly message.
/awareness: tabs (المنتجات التوعوية، بودكاست بيت الأسرة). Products: downloadable infographics/booklets cards. Podcast: a persistent audio player component (play/pause, scrubber, speed 1x/1.25x/1.5x, episode list), audio files from the media CDN.
```

---

## المرحلة 3: المبادرات والمتجر

### البرومبت 3.1: المبادرات والمتجر

```
Build the initiatives and store.
/programs: tabs (الكل، البرامج التنموية، البرامج المجتمعية، برامج التعليم) filtering initiatives by kind. Cards link to /programs/:slug.
/programs/:slug (initiative detail): a hero banner with the photo on the side, a big progress bar (raised vs goal, percent, supporters count, days left), the story section, a "أين يذهب تبرعك" stacked bar with a legend, an updates timeline, a photo gallery, and a sticky donation box: frequency segmented control (مرة واحدة / شهريًا), amount chips (50, 100, 250, 500, 1000, 2500), a custom amount input (minimum 10, numeric), the initiative's giving units as selectable cards, and a gold "أضف المساهمة إلى السلة" button. Note under it: "المساهمة في هذا النموذج تجريبية ولا يُحصَّل أي مبلغ."
/store: a quick-donation panel to the general fund, a filter sidebar (search, category) with a result count, a 2-column grid of initiative cards, and a "الأوقاف والصدقات الجارية" section with three waqf share cards (سهم في وقف المكتبة 500، سهم في وقف طالب علم 1000، سهم في وقف المركز 2000).
Validate all amounts with zod (number, min 10, max 1,000,000, 2 decimals max). The cart store keeps item key, title, unit label, unit price, quantity and recurring flag. NEVER trust client prices: the server recomputes totals in step 3.2.
```

### البرومبت 3.2: السلة والدفع الآمن

```
Build /checkout and the secure order flow. 
UI: a 3-step indicator (السلة، البيانات، الدفع), order summary with totals, a form for full name, mobile (05XXXXXXXX) and email (for the receipt), payment method choice (مدى، بطاقة ائتمانية، Apple Pay), and an order-confirmed screen.
SECURITY ARCHITECTURE (strict):
1. The browser sends only item identifiers and quantities (initiative_id + unit_id or course_id), never prices.
2. Create a Supabase Edge Function create-order that: validates input with zod, loads the real prices from the database using the service role INSIDE the function, computes the total, inserts orders and order_items with status 'pending', and returns an order id. Rate limit per IP. CORS locked to the site origin.
3. Create a payment-webhook Edge Function that verifies the gateway signature (HMAC) before changing any state, is idempotent (same event twice does nothing), sets status to 'paid', updates initiatives.raised_amount transactionally, and creates enrollments for course items. Gateway: build behind an interface so Moyasar or HyperPay can be plugged in; use a mock provider for now.
4. RLS: browsers can never insert into orders or order_items directly. Confirm and show the policies.
5. No card data ever touches our servers: use the gateway's hosted/tokenized fields only.
6. Log every state change in an audit table (new migration, show it to me first).
7. Add the legal notes in the UI: a link to the privacy policy and refund policy, and a note that donations are processed through approved channels.
```

---

## المرحلة 4: منصة الدورات

### البرومبت 4.1: دليل الدورات وصفحة الدورة

```
Build the learning platform public side.
/courses: summary strip (courses count, learners, average rating, learning paths), a filter sidebar (search, price: الكل/مجانية/مدفوعة, delivery: مسجّلة/مباشرة, level: مبتدئ/متوسط/متقدم, category) with URL-synced query params, a 2-column card grid, then a "مسارات التعلّم" section (3 path cards) and "مدرّبو المنصة".
/courses/:slug: a hero with title, tags, rating, hours, lessons and learners; a "ماذا ستتعلّم" checklist; an accordion of modules and lessons (lesson rows show play/doc/lock icons and minutes; free-preview lessons are playable); instructor card; a certificate preview card (a white certificate with the logo mark, "تشهد الجمعية الأهلية الصالحية بعنيزة أن [الاسم] أتمّ دورة ..." and a verification number like SAL-2026-00412); a sticky purchase card (price, strike price, "سجّل في الدورة" gold button, "شاهد الدرس التجريبي", included features list, and a note that tax and invoicing will be set when payment is connected). Free courses show "سجّل مجانًا".
Data from courses, course_modules, lessons. Prices and access are enforced by the server, never by the UI.
```

### البرومبت 4.2: مشغّل الدروس ولوحة المتدرّب

```
Build the learner experience (auth required, role member).
/learn: dashboard with stats (courses in progress, certificates earned, learning hours, average quiz score) and course cards with progress bars.
/learn/:courseSlug/:lessonId: a player layout: a big video area (Cloudflare Stream signed-URL playback: request a short-lived token from an Edge Function that first checks the user's enrollment; never expose video UIDs to non-enrolled users), a lesson list on the side with done/locked states, "تم إكمال الدرس" button writing to lesson_progress, progress bar, next/previous lesson, resume where you left off, and a notes box saved per lesson.
Quizzes: multiple-choice with instant scoring and attempts; pass mark 80% from settings.
Certificates: when progress is 100% and the final quiz is passed, an Edge Function issues certificate_no (format SAL-YYYY-NNNNN, unique) and generates a PDF; add a public verification page /verify/:certificateNo that shows only the learner's name, course and date.
Security: enforce enrollment through RLS and Edge Functions; a learner can only read their own enrollments and progress.
```

---

## المرحلة 5: الحسابات والخدمات

### البرومبت 5.1: الحسابات والصلاحيات

```
Build authentication and authorization on Supabase Auth.
Pages: /login (tabs: تسجيل الدخول / حساب جديد), password reset, email verification, and /account (profile, my courses, my orders and receipts, my donations, logout). Add Saudi phone validation. Prepare a hook point for Nafath (النفاذ الوطني) login later.
Roles from profiles.role: admin, editor, finance, instructor, member. Create a ProtectedRoute component and a useRole hook for UI only; REAL enforcement is RLS and Edge Functions. Users must never be able to change their own role (the existing policy blocks it; add a test that proves it).
Hardening: strong password rules, rate limiting on auth, secure cookie/session handling, session timeout, no user enumeration in error messages (generic Arabic messages), and a privacy consent checkbox with a link to the policy. Write a short SECURITY.md describing the model.
```

### البرومبت 5.2: الخدمات والنماذج

```
Build the forms and services.
/services: six service cards (طلب استشارة، عضوية الجمعية، تقديم طلب مساعدة، التطوع، خدمات المكتبة، التدريب) and a request form.
/volunteer: tabs (التطوع، الوظائف، الشراكات والرعاية) with forms and a jobs list.
/contact: tabs (تواصل معنا، فروعنا، تقديم شكوى، الأسئلة الشائعة) with a contact form, branch cards, a complaint form that returns a tracking number, and an FAQ accordion.
All forms insert into the Supabase table submissions through an Edge Function that: validates with zod, strips HTML, rate-limits per IP, verifies a Cloudflare Turnstile token (env var for the site key), and never exposes other users' data. Show a success state, never reveal internal errors. Add a honeypot field. Only admin/editor can read submissions (existing RLS).
```

### البرومبت 5.3: البحث والتحسينات

```
Build /search: a single search box that queries news, courses, initiatives, documents and pages through a Postgres full-text search (create a migration with tsvector columns using the 'simple' configuration and Arabic-friendly normalization: strip tashkeel, normalize alef and ya/ta marbuta; show me the migration first). Results grouped by type with highlighted matches.
Also add: a sitemap.xml and robots.txt, canonical tags, per-page meta, structured data (Organization, Course, Article, Event), and image lazy-loading audit.
```

---

## المرحلة 6: لوحات التحكم

### البرومبت 6.1: لوحة تحكم واحدة لكل قسم

```
Build the admin area at /admin (roles admin and editor; finance sees only finance; instructor sees only their courses). Layout: a collapsible sidebar (RTL), top bar with search and user menu, breadcrumbs, and a responsive content area using the same design tokens.
Create ONE module at a time, each with: a data table (search, filters, sorting, pagination, bulk actions), create/edit forms with zod validation, image/file upload to the R2 CDN through an Edge Function that issues presigned upload URLs (validate file type and size, never trust the client), publish/unpublish toggle, and an audit log of who changed what.
Start with: الأخبار، المبادرات (with units and goals)، الدورات (with modules, lessons, Cloudflare Stream upload)، الوثائق، الأشخاص. Then: الطلبات والتبرعات (finance, with export to CSV and a receipts view), المتعلمون، النماذج الواردة، المستخدمون والأدوار (admin only).
Add a dashboard home with KPIs and charts (donations by month, enrollments, top courses) using Recharts, with accessible colors in both themes.
Do the first two modules now (الأخبار والمبادرات) and stop so I can review.
```

---

## المرحلة 7: الإطلاق

### البرومبت 7.1: الأمن والأداء والمراجعة النهائية

```
Run a full pre-launch review and fix what you find:
SECURITY: confirm no secrets in the repo, no service-role key in the frontend, all tables have RLS with tested policies, Edge Functions validate input and verify auth, CORS is restricted, file uploads are validated, security headers are set (CSP, X-Content-Type-Options, Referrer-Policy, frame-ancestors), dependencies audited (npm audit), and PDPL (Saudi data protection law) basics are covered: privacy policy page, consent records, data export and deletion request for users.
ACCESSIBILITY: WCAG AA audit, keyboard-only walkthrough of every flow, screen reader labels in Arabic.
PERFORMANCE: Lighthouse 90+ on mobile for home, store, courses; code-split routes; cache static assets with immutable headers on the CDN.
TESTING: write tests for cart totals, order creation, webhook idempotency, role checks and RLS (a member cannot read another member's data).
Give me a checklist of what is done and what remains.
```

---

## ملاحظات مهمة لك

- **الصور والخطوط:** ارفعها قبل البرومبت 0.1. الصور في `media/img`، والخطوط في `src/fonts`.
- **لا تعطِ Lovable أي مفتاح سري.** المفتاح العام (anon) وحده يوضع في إعدادات البيئة. مفاتيح الدفع و`service_role` تُضاف كأسرار في Supabase Edge Functions فقط.
- **قاعدة البيانات جاهزة** في مشروع Supabase المسمى `website`. البرومبت 0.2 يوجّه Lovable لاستخدامها بدل إنشاء قاعدة جديدة.
- **راجع كل Migration** قبل تطبيقها. البرومبتات تطلب منه عرضها عليك أولًا.
- **الدفع والتبرعات:** لا تفعّل التحصيل الحقيقي قبل التحقق من الجهات المنظمة ومن ضريبة القيمة المضافة والفوترة.
- **كل نص تجريبي** مُعلَّم في الواجهة ومحفوظ في ملف ثوابت ليسهل استبداله ببيانات الجمعية.
