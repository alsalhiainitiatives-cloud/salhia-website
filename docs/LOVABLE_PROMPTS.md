# حزمة برومبتات Lovable: منصة الجمعية الأهلية الصالحية بعنيزة

**طريقة الاستخدام:** نفّذ البرومبتات بالترتيب، واحدًا في كل مرة. بعد كل برومبت راجع النتيجة على الجوال والحاسوب قبل الانتقال للتالي. لا تدمج برومبتين. إن أخطأ Lovable فصحّح بجملة قصيرة قبل المتابعة.

**قبل البدء:**
1. أنشئ مشروعًا جديدًا في Lovable.
2. ارفع إلى المشروع الملفات التالية فقط: الخطوط من `src/fonts` (ثلاثة ملفات Thmanyah) وملف `public/logo-white.svg`، وصورتين اعتمدتهما بنفسك من `media/img`: `building.webp` (مبنى الجمعية، للهيرو) و`people.webp` (توقيع الشراكة، لقسم من نحن). **باقي الصور لا ترفعها:** Lovable يختار لها صورًا مناسبة من مكتباته.
3. صور الشعار الأخرى (الملونة) تأتي من ملف الهوية عندك.
4. **قاعدة البيانات فارغة عمدًا.** لا تنفّذ أي Migration قبل أن ترى SQL وتوافق عليه. كل موديول يضيف جداوله بنفسه.
5. البرومبتات مكتوبة بالإنجليزية لأن Lovable يولّد كودًا أدق بها. النصوص العربية التي يجب أن تظهر في الواجهة مكتوبة داخلها حرفيًا.

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

IMAGES (important): do NOT ask me for image files. Choose suitable photographs yourself from your stock/image libraries (Unsplash-style, free to use) for every placeholder image: realistic, high-quality, natural lighting, people in the Gulf/Saudi context where possible (thobe, ghutra, abaya, hijab, majlis, Najdi architecture), never cartoons or illustrations, no visible text or watermarks, no stock-photo clichés. Prefer landscape photos at least 1600px wide for heroes and 900px for cards. Store the chosen image URLs/paths in ONE file src/data/images.ts as named constants (e.g. images.heroCourses, images.cardFamily) with an Arabic alt text for each, so I can later swap them for my own photos in a single place. The ONLY images I will upload are: the logo, /img/building.webp (association building) and /img/people.webp (board signing an agreement); use those two exactly where specified. Every image goes through one helper media(path) that prefixes import.meta.env.VITE_CDN_URL (empty for now, so it falls back to /). Use <img loading="lazy" decoding="async"> with width/height to avoid layout shift, except the first hero image.

QUALITY RULES (apply to everything from now on):
- Mobile first. 16px side gutters. No horizontal scroll at 360px. Touch targets at least 44px.
- Accessible: semantic landmarks, visible focus ring (3px gold), aria labels in Arabic, skip-to-content link, alt text in Arabic.
- Forms: label above field, Arabic validation messages, inputmode="numeric" for phones, Saudi phone format 05XXXXXXXX.
- Never hardcode secrets. Environment variables only (VITE_ prefix for public ones).
- Every list page has loading skeletons, empty state and error state in Arabic.
- Placeholder content is clearly Arabic sample text, never lorem ipsum.

Create: the design tokens, Tailwind config, font setup, a theme provider with toggle, the media() helper, a LogoMark SVG component (I will paste the SVG later), and an empty App with routes for: / , /about, /store, /courses, /governance, /news, /contact (each a placeholder page titled in Arabic). Add a short README section describing the tokens.

DATABASE RULES (apply to every future database change):
- The Supabase database is EMPTY on purpose. We build it module by module. NEVER create tables that the current step does not need.
- Every schema change is a migration file in supabase/migrations named NNNN_module_name.sql. Show me the SQL and wait for my approval BEFORE applying it. Never edit an applied migration; add a new one.
- Every table: Row Level Security enabled in the same migration, explicit policies (no table without policies), primary key uuid default gen_random_uuid(), created_at timestamptz default now(), indexes on every foreign key, check constraints for enums and ranges.
- Roles live in a SEPARATE table (user_roles), never on the profile row, and are checked through a SECURITY DEFINER function has_role(user_id, role) with set search_path = ''. Revoke execute on trigger functions from anon and authenticated.
- After every migration: run the Supabase security advisor, list any warnings, and fix them before moving on. Then regenerate the TypeScript types.
- Never use the service-role key in frontend code. Writes that must be trusted (orders, payments, certificates, uploads) go through Edge Functions only.
- Sample data goes in supabase/seed/*.sql, also shown to me first, and is clearly marked as sample.
```

### البرومبت 0.2: ربط Supabase (قاعدة البيانات موجودة مسبقًا)

```
Connect this project to the NEW, EMPTY Supabase project I just created, using the Supabase integration with my own account. Do NOT enable Lovable Cloud and do NOT create another project.

This step creates ONLY the identity and security foundation. Nothing else yet. Write it as migration 0001_foundation.sql, show it to me, wait for approval, then apply it:

1. enum app_role: admin, editor, finance, instructor, member.
2. profiles: id uuid primary key references auth.users(id) on delete cascade, full_name text, phone text with check (phone is null or phone ~ '^05[0-9]{8}$'), avatar_path text, created_at timestamptz default now().
3. user_roles: id uuid pk, user_id uuid references auth.users(id) on delete cascade, role app_role not null, unique (user_id, role). Roles are NOT stored on profiles.
4. function has_role(_user_id uuid, _role app_role) returns boolean, language sql, stable, SECURITY DEFINER, set search_path = '' ; and a helper is_staff() returning true for admin or editor.
5. trigger function handle_new_user (SECURITY DEFINER, set search_path = '') that inserts a profiles row and a default 'member' role when an auth user is created. Revoke execute on it from public, anon and authenticated.
6. audit_log: id, actor_id, action text, table_name text, record_id uuid, changes jsonb, created_at. Insert-only (no update/delete policy). Only admin can select.
7. RLS: enabled on all four tables. profiles: a user reads and updates only their own row (cannot change id); admin reads all. user_roles: a user can read only their own roles; ONLY admin can insert/update/delete roles (use has_role in policies). Nobody can grant themselves a role.
8. Make the very first registered user an admin only through a one-time manual SQL statement that I will run myself. Do not automate it.

Then:
- Generate TypeScript types and create src/integrations/supabase/client.ts using VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY (publishable key only).
- Write tests (SQL or Vitest) proving: a normal user cannot insert into user_roles, cannot read another profile, and anon cannot read profiles.
- Run the security advisor and report. Do not build any pages or other tables in this step.
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
1. kicker "منذ عام 1402هـ · عنيزة". Title "إنسانٌ يتعلّم، ومجتمعٌ يحتضن، وأثرٌ يدوم" (highlight "يحتضن"). Lead "الجمعية الأهلية الصالحية بعنيزة تُحيي ذكرى المربي صالح الصالح وتواصل رسالته في التعليم والعطاء وتنمية المجتمع." Buttons "ساهم في مبادرة" → /store, "استكشف الدورات" → /courses. Image: the uploaded /img/building.webp (a navy watercolor of the association building on a WHITE background): for this slide only use a LIGHT variant: pale blue background, the image with mix-blend-mode multiply aligned to the bottom-left, and DARK text instead of white.
2. "منصة الدورات التدريبية" / "تعلّم، وتأهّل، واحصل على شهادتك" / "دورات مسجّلة ومباشرة، مجانية ومدفوعة، بمتابعة تقدّمك وشهادات إلكترونية يمكن التحقق منها." / buttons "تصفّح الدورات" /courses, "ابدأ بدورة مجانية" /courses?price=free. Image: a stock photo of young women learning together at a laptop (images.heroCourses)
3. "متجر المبادرات" / "مساهمتك اليوم، أثرٌ يبقى غدًا" / "اختر مبادرة وأسهم بمبلغ أو بوحدة عطاء محددة، وتابع أثر مساهمتك مع إيصال إلكتروني." / "ساهم الآن" /store, "تعرّف على المبادرات" /programs. Image: a stock photo of volunteers packing food boxes (images.heroDonate)
4. "الحوكمة والشفافية" / "مؤسسة تعمل بوضوح ومسؤولية" / "الأدلة والمحاضر والتقارير المالية متاحة للاطلاع والتحميل في مكان واحد." / "أدلة الحوكمة" /governance, "التقارير السنوية" /reports. Image: a stock photo of a respectful business handshake or board meeting (images.heroGov)
5. "الإعلام والمحتوى التوعوي" / "أخبارنا وأصواتنا، من مجتمعنا إليكم" / "تابع آخر الأخبار، واستمع إلى بودكاست بيت الأسرة، وشاهد مكتبة الفيديو والمنتجات التوعوية." / "آخر الأخبار" /news, "بودكاست بيت الأسرة" /awareness. Image: a stock photo of a podcast recording studio with microphones (images.heroMedia)
Preload only slide 1's image. Others lazy. For every image except building.webp and people.webp, pick photos yourself as described in the IMAGES rule of step 0.1.
```

### البرومبت 1.3: أقسام صفحة الهبوط (الجزء الأول)

```
Continue the home page, below the hero. Add these sections in order. Each section header has a rounded icon tile (light tint, blue duotone icon with a small gold dot on its corner), an H2 in --brand color, a muted subtitle, and an optional "عرض الكل" outlined button at the end. Alternate section backgrounds with a very soft blob shape (the --tint color, 70% opacity, organic border-radius, slowly morphing) behind some sections.

A) ABOUT ("من نحن"): two columns (stack on mobile, image first). Text side: small gold kicker "من نحن", H2 "الجمعية الأهلية الصالحية .. أثرٌ يبدأ من عنيزة", paragraph "تأسست الجمعية عام 1402هـ إحياءً لذكرى المربي صالح الصالح، أحد رواد التعليم في عنيزة. وعبر مركز صالح بن صالح الاجتماعي ومكتبته التي تضم نحو 60 ألف عنوان، تعمل الجمعية في التعليم والثقافة والعطاء وتنمية المجتمع، وتبني اليوم منصة رقمية متكاملة للتدريب والمبادرات.", three fact counters (1402هـ سنة التأسيس، 60 ألف+ عنوان في المكتبة، 1407هـ افتتاح المركز الاجتماعي), buttons "اقرأ المزيد" /about and "توجهنا الاستراتيجي" /strategy. Image side: the uploaded /img/people.webp (a watercolor of board members signing an agreement) in a large rounded frame (34px) with an offset tinted back-card, a gold circle ornament at the corner, and a white chip at the bottom "توقيع شراكات استراتيجية" with a handshake icon. DO NOT use the logo in this section.

B) SERVICES MODULES ("خدماتنا وبرامجنا"), centered: four large organic-blob circles (about 230px) each with a big duotone icon, a title, a short description and a hover state where the blob rotates and fills --brand with the icon turning white and a gold "ادخل القسم" link fading in. Modules: منصة الدورات (laptop icon, "دورات مسجّلة ومباشرة بشهادات إلكترونية.") → /courses; متجر المبادرات (hand-heart, "ساهم في المبادرات بمبلغ أو وحدة عطاء.") → /store; الحوكمة والشفافية (shield-check, "الأدلة والمحاضر والسياسات المعتمدة.") → /governance; الأخبار والإعلام (megaphone, "أخبار وتقارير ومنتجات توعوية.") → /news. This section design was explicitly approved by the client: keep it elegant and exactly this concept.

C) AUDIENCES panel: a rounded bordered card containing an intro tile (navy gradient, sprout icon, "مبادرات لكل فئة", "نبني برامجنا حول الإنسان ومراحل حياته، لنصل بالأثر إلى كل بيت في عنيزة.", gold button "كل البرامج" → /programs) and five tall photo cards (aspect 3/4) with a bottom navy gradient and a bold white label: الطالب (a stock photo of a student in class), الشاب (young people in a workshop), المرأة (a professional Arab woman), الأسرة (a family reading together), المتطوع (a volunteer helping), all chosen by you. Hover: lift and image zoom.

Use Framer Motion fade-up with stagger. No content may stay invisible if JS fails or before scroll.
```

### البرومبت 1.4: أقسام صفحة الهبوط (الجزء الثاني)

```
Continue the home page with these sections. IMPORTANT: the database has no content tables yet. Read ALL data from typed local constants in src/data/ (initiatives.ts, courses.ts, events.ts, news.ts, kpis.ts) whose shapes mirror the future tables (id, slug, title, summary, category, cover_path, goal_amount, raised_amount, units[], price, level, delivery, published_at ...). Access them ONLY through small hook functions (useInitiatives, useCourses, useNews ...) so that later module prompts can swap the constants for real Supabase queries without touching the components. Include skeleton loaders.

D) STORE CAROUSEL ("متجر المبادرات", subtitle "ساهم في مبادرات الجمعية بمبلغ أو بوحدة عطاء"): category chips (الكل، التعليم، الأسرة، التراث، الرعاية) filtering a horizontal scroll-snap carousel (3 cards desktop, 2 tablet, 1.15 mobile) with prev/next arrow buttons and a "طالع المزيد" button → /store. Initiative card: 16/10 photo with a dark rounded category chip, title, 2-line description, a gold progress bar with raised amount, percent and goal ("98,500 ر.س · 66% من 150,000"), unit chips (selectable: e.g. "رقمنة 100 كتاب · 500", "فهرسة 500 عنوان · 250"), and two buttons: "التفاصيل" and gold "أضف للسلة" (adds the selected unit to the cart and shows a toast). Progress bars animate on first appearance.

E) COURSES CAROUSEL ("الدورات التدريبية"): same carousel pattern. Course card: photo with chip showing the delivery type (مسجّل / مباشر / مسجّل + مباشر) and a gold chip "مجانية" if free; title; meta row (hours, lessons, rating star, enrolled count); level; price in --brand bold or "مجانية" in green; button "التفاصيل".

F) EVENTS ("روزنامة الفعاليات"): carousel of poster-style cards (tall photo, gold "فعالية" chip, title, date with calendar icon, place with pin icon, outlined button "سجّل حضورك").

G) NEWS ("أخبار الجمعية"): carousel of cards with a 16/9 photo, a tinted category chip, a solid navy date badge (day big, month small) and a 2-line headline; "طالع المزيد" → /news.

H) KPIs ("مؤشرات الأداء", subtitle "أرقام تجريبية لعرض التصميم"): 9 tiles in a 3x3 grid (2 columns on mobile) with duotone icons and animated count-up numbers (start when visible, Western digits): 48,250 مستفيد من برامج الجمعية، 186,400 إجمالي الخدمات المقدّمة، 12,900 متدرّب في منصة الدورات، 8,640 أسرة مستفيدة، 60,000 عنوان في مكتبة المركز، 840 متطوع ومتطوعة، 36 مبادرة وبرنامجًا، 14 جائزة وشهادة تميز، 5 مراكز وفروع. Next to the grid, an SVG "radar" with concentric rings and pulsing gold circles, a center dot labelled عنيزة and four surrounding dots (بريدة، الرس، الرياض، البكيرية) connected by dashed lines.

I) GOVERNANCE TILES ("الحوكمة والشفافية", subtitle "وثائق الجمعية المعتمدة متاحة للاطلاع"): four centered cards with a large duotone icon: أدلة الحوكمة /governance?tab=guides، السياسات واللوائح /governance?tab=policies، محاضر مجلس الإدارة /governance?tab=board، التقارير السنوية /reports?tab=annual.

J) AWARENESS ("المحتوى التوعوي"): two columns. Left: a navy podcast card "بودكاست بيت الأسرة · الحلقة 12", title "كيف نصنع حوارًا هادئًا في البيت؟", an animated equalizer waveform (44 bars, animates only when playing) and a round gold play/pause button with a duration. Right: a rounded video card with a photo background (a stock photo of an awards ceremony or a stage, chosen by you), a dark gradient, a large glass play button, and the caption "مكتبة الفيديو: قصص أثر من عنيزة". The play buttons only toggle UI state for now.

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

DATABASE (this module only). Migration 0002_people_and_pages.sql, show it to me first:
- people: id, group_key text check in ('board','honorary','assembly','committees','executives','experts'), full_name, role_title, bio, photo_path, term_label, sort int default 0, published boolean default false.
- site_pages: id, slug unique, title, body jsonb (sections for about/strategy/history/vision), updated_at, updated_by, published boolean.
- RLS: public can select rows where published = true; admin and editor (is_staff()) can do everything; every write inserts a row into audit_log through a trigger.
- Index on (group_key, sort). Seed a few clearly marked sample people (8 board, 4 honorary, 6 executives) and the about/strategy sections. Show the seed first.
Then replace the constants behind the people and about pages with real queries. Run the security advisor.
```

### البرومبت 2.2: الحوكمة والتقارير والدراسات

```
Build /governance, /reports and /studies as tabbed document libraries synced to the URL (?tab=...). Data from the Supabase table documents filtered by section and tab.

/governance tabs: guides (أدلة الحوكمة), models (أدلة النمذجة والنقل المعرفي), assembly (محاضر اجتماعات الجمعية العمومية), board (محاضر اجتماعات مجلس الإدارة), policies (السياسات واللوائح).
/reports tabs: annual (التقارير السنوية), audit (تقارير المراجع القانوني), publications (إصدارات الجمعية), press (الملف الصحفي).
/studies: filter bar (search + type select: دراسات وبحوث، مقاييس ومؤشرات، مشاركات علمية).

Document card: a navy cover tile with the faint logo pattern and the title, hijri year, views count, and a full-width "عرض وتحميل" button. Clicking opens a secure download: call a Supabase Edge Function that returns a short-lived signed URL for the R2 object (file_path) and increments views. For now, make the function call a stub and show a toast.

Add search with debounce, pagination (12 per page), and empty states. Sample data: 6 documents per tab in a seed SQL file (supabase/seed/documents.sql), titles in Arabic (e.g. "لائحة تعارض المصالح"، "التقرير السنوي 1446هـ"). Show me the seed SQL before running it.

DATABASE (this module only). Migration 0003_documents.sql, show it first:
- documents: id, section text check in ('governance','reports','studies','publications','press','awareness'), tab text, title, summary, file_path (R2 object key, never a public URL), year_hijri int, size_bytes bigint, mime_type, views int default 0, published boolean default false, search tsvector generated from title and summary, created_at.
- RLS: public select where published; is_staff() full access. Direct updates to views are NOT allowed from the browser: provide a SECURITY DEFINER function increment_document_views(doc_id) callable by anon.
- Indexes: (section, tab), GIN on search.
- A private R2 bucket path convention: documents/{section}/{id}.pdf. Downloads are served only through the signed-URL Edge Function.
Seed 6 sample rows per tab, clearly marked. Wire the pages to this table. Run the security advisor.
```

### البرومبت 2.3: الأخبار والإعلام والمحتوى التوعوي

```
Build the media modules.
/news: category chips (الكل، شراكات، تدريب، حوكمة، تطوع، إعلام، برامج، مبادرات، تقارير), grid of news cards, "تحميل المزيد" pagination from the Supabase table news (published=true, ordered by published_at desc).
/news/:slug: article layout with a wide cover, meta row (hijri date, views, category), rich text body, image gallery with lightbox, and a sidebar "أخبار ذات صلة". Sanitize any HTML body with DOMPurify before rendering.
/gallery: masonry photo album with a keyboard-accessible lightbox (Esc closes, arrows navigate).
/videos: tabs (الفيديوهات التوعوية، مكتبة الفيديو), video cards with a play overlay. Video playback uses the Cloudflare Stream embed (iframe from customer-<code>.cloudflarestream.com, code from env VITE_STREAM_SUBDOMAIN) inside a modal; until configured show a friendly message.
/awareness: tabs (المنتجات التوعوية، بودكاست بيت الأسرة). Products: downloadable infographics/booklets cards. Podcast: a persistent audio player component (play/pause, scrubber, speed 1x/1.25x/1.5x, episode list), audio files from the media CDN.

DATABASE (this module only). Migration 0004_media.sql, show it first:
- news: id, slug unique, title, summary, body (sanitized HTML), category, cover_path, published_at, views int default 0, published boolean default false, search tsvector.
- media_items: id, kind text check in ('photo','video','podcast','product'), title, category, file_path, stream_uid (Cloudflare Stream id, nullable), duration_seconds, album text, published boolean, sort int, created_at.
- RLS: public select where published; is_staff() full access; triggers write to audit_log.
- Indexes: news(published_at desc), media_items(kind, album).
Seed 9 sample news items and 15 sample media items (titles in Arabic, marked sample). Replace the home-page news constants with a real query. Run the security advisor.
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

DATABASE (this module only). Migration 0005_initiatives.sql, show it first:
- initiatives: id, slug unique, title, summary, body, category, kind text check in ('development','community','education'), cover_path, goal_amount numeric(12,2) check (>= 0), raised_amount numeric(12,2) default 0 check (>= 0), supporters_count int default 0, ends_at date, published boolean default false, created_at.
- initiative_units: id, initiative_id fk on delete cascade, label, price numeric(10,2) check (> 0), sort int. Indexed on initiative_id.
- initiative_updates: id, initiative_id fk, title, body, published_at.
- funds: id, slug unique, title, kind text check in ('general','waqf'), unit_label, unit_price, published boolean.
- RLS: public select where published (units and updates follow their parent's published flag via exists()); is_staff() full access. raised_amount and supporters_count are NEVER writable from the browser, not even by staff: they change only through the payment Edge Function in the next prompt.
Seed 9 sample initiatives with 2 units each and 3 waqf funds, marked sample. Wire the home page store carousel, /store and /programs to the tables. Run the security advisor.
```

### البرومبت 3.2: السلة والدفع الآمن

```
Build /checkout and the secure order flow.

UI: a 3-step indicator (السلة، البيانات، الدفع), order summary with totals, a form for full name, mobile (05XXXXXXXX) and email (for the receipt), payment method choice (مدى، بطاقة ائتمانية، Apple Pay), and an order-confirmed screen. Add links to the privacy and refund policies.

DATABASE (this module only). Migration 0006_orders.sql, show it first:
- orders: id, user_id (nullable for guests), email, full_name, phone, subtotal numeric(12,2), total numeric(12,2) check (>= 0), currency text default 'SAR', status text check in ('pending','paid','failed','refunded') default 'pending', gateway text, gateway_ref text unique, receipt_no text unique, created_at, paid_at.
- order_items: id, order_id fk on delete cascade, kind text check in ('donation','course','waqf'), initiative_id, unit_id, course_id (nullable foreign keys), label, qty int check (> 0), unit_price numeric(10,2) check (> 0), recurring boolean default false.
- payment_events: id, gateway, event_id text unique (idempotency), payload jsonb, processed_at.
- RLS: a user can SELECT only their own orders/items (user_id = auth.uid()); finance and admin can select all; NOBODY can insert, update or delete from the browser (no insert/update/delete policies at all). All writes happen in Edge Functions with the service role.
- receipt numbers generated by a database sequence function (format SAL-R-YYYY-NNNNNN).

SECURITY ARCHITECTURE (strict):
1. The browser sends only identifiers and quantities (initiative_id + unit_id, fund_id, or course_id), NEVER prices or totals.
2. Edge Function create-order: validates with zod, loads the real prices from the database, computes the total, inserts the order and items as 'pending', returns the order id and a gateway session. Rate limit per IP. CORS locked to the site origin.
3. Edge Function payment-webhook: verifies the gateway HMAC signature BEFORE any change, is idempotent (payment_events.event_id unique), sets status 'paid', increments initiatives.raised_amount and supporters_count in a single transaction, and creates enrollments for course items. Gateway behind an interface; use a mock provider for now (Moyasar or HyperPay will be plugged in later).
4. No card data ever touches our servers: hosted/tokenized gateway fields only.
5. Every state change writes to audit_log.
6. Add tests: a tampered price in the request is ignored; the same webhook delivered twice changes nothing; a user cannot read another user's order.
Run the security advisor and report.
```

---

## المرحلة 4: منصة الدورات

### البرومبت 4.1: دليل الدورات وصفحة الدورة

```
Build the learning platform public side.
/courses: summary strip (courses count, learners, average rating, learning paths), a filter sidebar (search, price: الكل/مجانية/مدفوعة, delivery: مسجّلة/مباشرة, level: مبتدئ/متوسط/متقدم, category) with URL-synced query params, a 2-column card grid, then a "مسارات التعلّم" section (3 path cards) and "مدرّبو المنصة".
/courses/:slug: a hero with title, tags, rating, hours, lessons and learners; a "ماذا ستتعلّم" checklist; an accordion of modules and lessons (lesson rows show play/doc/lock icons and minutes; free-preview lessons are playable); instructor card; a certificate preview card (a white certificate with the logo mark, "تشهد الجمعية الأهلية الصالحية بعنيزة أن [الاسم] أتمّ دورة ..." and a verification number like SAL-2026-00412); a sticky purchase card (price, strike price, "سجّل في الدورة" gold button, "شاهد الدرس التجريبي", included features list, and a note that tax and invoicing will be set when payment is connected). Free courses show "سجّل مجانًا".
Data from courses, course_modules, lessons. Prices and access are enforced by the server, never by the UI.

DATABASE (this module only). Migration 0007_courses.sql, show it first:
- courses: id, slug unique, title, summary, body, category, level text check in ('beginner','intermediate','advanced'), delivery text check in ('recorded','live','both'), price numeric(10,2) default 0 check (>= 0), compare_price numeric(10,2), instructor_id uuid references profiles(id), cover_path, hours numeric, rating_avg numeric(2,1), learners_count int default 0, published boolean default false, search tsvector, created_at.
- course_modules: id, course_id fk on delete cascade, title, sort.
- lessons: id, module_id fk on delete cascade, title, kind text check in ('video','document','quiz','live'), stream_uid text, document_path text, duration_min int, free_preview boolean default false, sort. IMPORTANT: stream_uid and document_path must NOT be readable by the public.
- learning_paths and learning_path_courses (id, title, summary; path_id, course_id, sort).
- RLS: public select on published courses and their modules; for lessons expose only a VIEW lessons_public (id, module_id, title, kind, duration_min, free_preview, sort) with no media identifiers; direct select on the lessons table only for enrolled users (through is_enrolled(course_id)), the course instructor and staff. Instructors manage only their own courses.
Seed 9 sample courses with modules and lessons, marked sample. Wire the home carousel, /courses and /courses/:slug. Run the security advisor.
```

### البرومبت 4.2: مشغّل الدروس ولوحة المتدرّب

```
Build the learner experience (auth required, role member).
/learn: dashboard with stats (courses in progress, certificates earned, learning hours, average quiz score) and course cards with progress bars.
/learn/:courseSlug/:lessonId: a player layout: a big video area (Cloudflare Stream signed-URL playback: request a short-lived token from an Edge Function that first checks the user's enrollment; never expose video UIDs to non-enrolled users), a lesson list on the side with done/locked states, "تم إكمال الدرس" button writing to lesson_progress, progress bar, next/previous lesson, resume where you left off, and a notes box saved per lesson.
Quizzes: multiple-choice with instant scoring and attempts; pass mark 80% from settings.
Certificates: when progress is 100% and the final quiz is passed, an Edge Function issues certificate_no (format SAL-YYYY-NNNNN, unique) and generates a PDF; add a public verification page /verify/:certificateNo that shows only the learner's name, course and date.
Security: enforce enrollment through RLS and Edge Functions; a learner can only read their own enrollments and progress.

DATABASE (this module only). Migration 0008_learning.sql, show it first:
- enrollments: id, user_id, course_id, status text check in ('active','completed'), progress int check (between 0 and 100), source_order_id, completed_at, certificate_no text unique, created_at, unique (user_id, course_id). Created ONLY by the payment Edge Function (or by a free-course enrollment function), never by direct browser insert.
- lesson_progress: user_id, lesson_id, completed_at, last_position_seconds; primary key (user_id, lesson_id).
- lesson_notes: id, user_id, lesson_id, body, updated_at.
- quizzes, quiz_questions (options jsonb, correct answers NOT readable by the browser: keep them in a table with no select policy and grade only inside an Edge Function), quiz_attempts (user_id, quiz_id, score, passed, created_at).
- certificates: id, certificate_no unique, user_id, course_id, issued_at, revoked boolean default false. Public verification only through a SECURITY DEFINER function verify_certificate(no) returning learner name, course title and date.
- function is_enrolled(course_id) SECURITY DEFINER, set search_path = ''.
- RLS: learners read and write only their own progress, notes and attempts; instructors read aggregates for their courses; staff read all.
Add tests proving a learner cannot read another learner's progress or see quiz answers. Run the security advisor.
```

---

## المرحلة 5: الحسابات والخدمات

### البرومبت 5.1: الحسابات والصلاحيات

```
Build authentication and authorization on Supabase Auth.
Pages: /login (tabs: تسجيل الدخول / حساب جديد), password reset, email verification, and /account (profile, my courses, my orders and receipts, my donations, logout). Add Saudi phone validation. Prepare a hook point for Nafath (النفاذ الوطني) login later.
Roles come from the user_roles table (admin, editor, finance, instructor, member), checked with has_role(). Create a ProtectedRoute component and a useRole hook for UI only; REAL enforcement is RLS and Edge Functions. Users must never be able to change their own role (only admin can write user_roles; add a test that proves it).
Hardening: strong password rules, rate limiting on auth, secure cookie/session handling, session timeout, no user enumeration in error messages (generic Arabic messages), and a privacy consent checkbox with a link to the policy. Write a short SECURITY.md describing the model.

DATABASE (this module only). Migration 0009_account_security.sql, show it first. The foundation (profiles, user_roles, has_role) already exists. Add only what is missing: consent_records (user_id, policy_key, version, accepted_at, ip_hash), data_requests (user_id, kind check in ('export','delete'), status, created_at) with RLS so a user can insert and read only their own rows and only admin can update status. Also add a function admin_set_role(target uuid, new_role app_role) callable only by admins, which writes to audit_log. Verify with tests that role escalation is impossible. Run the security advisor.
```

### البرومبت 5.2: الخدمات والنماذج

```
Build the forms and services.
/services: six service cards (طلب استشارة، عضوية الجمعية، تقديم طلب مساعدة، التطوع، خدمات المكتبة، التدريب) and a request form.
/volunteer: tabs (التطوع، الوظائف، الشراكات والرعاية) with forms and a jobs list.
/contact: tabs (تواصل معنا، فروعنا، تقديم شكوى، الأسئلة الشائعة) with a contact form, branch cards, a complaint form that returns a tracking number, and an FAQ accordion.
All forms insert into the Supabase table submissions through an Edge Function that: validates with zod, strips HTML, rate-limits per IP, verifies a Cloudflare Turnstile token (env var for the site key), and never exposes other users' data. Show a success state, never reveal internal errors. Add a honeypot field. Only admin/editor can read submissions (existing RLS).

DATABASE (this module only). Migration 0010_submissions.sql, show it first:
- submissions: id, kind text check in ('contact','complaint','volunteer','partner','service','membership'), full_name, phone, email, subject, message, details jsonb, status text check in ('new','in_progress','closed') default 'new', tracking_no text unique (generated, format SAL-1042 style, shown to the sender), assigned_to, created_at.
- jobs: id, title, location, type, description, published, closes_at.
- branches: id, name, description, address, phone, lat, lng, sort, published.
- faqs: id, question, answer, sort, published.
- RLS: NO public insert policy on submissions (inserts go only through the Edge Function using the service role after Turnstile and rate-limit checks); only is_staff() can select and update; public select on published jobs, branches and faqs.
Seed sample branches (3), faqs (6) and jobs (3), marked sample. Run the security advisor.
```

### البرومبت 5.3: البحث والتحسينات

```
Build /search: a single search box that queries news, courses, initiatives, documents and pages through a Postgres full-text search (create a migration with tsvector columns using the 'simple' configuration and Arabic-friendly normalization: strip tashkeel, normalize alef and ya/ta marbuta; show me the migration first). Results grouped by type with highlighted matches.
Also add: a sitemap.xml and robots.txt, canonical tags, per-page meta, structured data (Organization, Course, Article, Event), and image lazy-loading audit.

DATABASE: do not add new content tables. Add migration 0011_search.sql showing a SECURITY INVOKER function search_site(q text) that unions published rows from news, courses, initiatives and documents using their tsvector columns (so RLS still applies). Show it first, then run the security advisor.
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

DATABASE for the admin area: add only what each admin module needs, as separate migrations shown to me first, for example content_revisions (table_name, record_id, snapshot jsonb, edited_by, created_at) for undo history, and upload_registry (id, owner_id, bucket_key, mime_type, size_bytes, status) used by the presigned-upload Edge Function. Do not weaken any existing RLS policy. Every admin write must be authorized twice: by RLS and by a role check inside the Edge Function.
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
- **قاعدة البيانات تُبنى تدريجيًا:** 0.2 يبني الأساس فقط (المستخدمون والأدوار والتدقيق)، وكل موديول يضيف جداوله مع سياساته. الصفحة الرئيسية تعمل أولًا ببيانات محلية، ثم تُربط بالجداول حين يُبنى موديولها.
- **راجع كل Migration** قبل تطبيقها. البرومبتات تطلب منه عرضها عليك أولًا.
- **الدفع والتبرعات:** لا تفعّل التحصيل الحقيقي قبل التحقق من الجهات المنظمة ومن ضريبة القيمة المضافة والفوترة.
- **كل نص تجريبي** مُعلَّم في الواجهة ومحفوظ في ملف ثوابت ليسهل استبداله ببيانات الجمعية.
