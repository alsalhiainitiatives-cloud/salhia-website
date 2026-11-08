# منصة الجمعية الأهلية الصالحية بعنيزة

Next.js 16 + TypeScript + Tailwind 4 · Supabase (Postgres, Auth, RLS) · Cloudflare (Pages, R2 + CDN, Stream).

## تشغيل محلي
```bash
cp .env.example .env.local   # املأ القيم
npm install
npm run dev
```

## قاعدة البيانات
طبّق `supabase/migrations/0001_core_schema.sql` على مشروع Supabase (الجداول مع سياسات RLS).

## الوسائط
كل روابط الصور تمر عبر `src/lib/cdn.ts`. ضع نطاق Cloudflare في `NEXT_PUBLIC_CDN_URL` وارفع محتوى `public/img` إلى R2 بنفس المسار `img/...`.

## الهوية
الألوان والخط في `src/app/globals.css`، والشعار في `src/components/LogoMark.tsx`.

## خارطة البناء
1. الأساس: التصميم والهيدر والتذييل والهيرو وهيكل البيانات (هذه الخطوة)
2. الصفحة الرئيسية الكاملة
3. القسم المؤسسي: من نحن، الحوكمة، التقارير
4. المبادرات والمتجر والسلة
5. الدورات والمشغّل والشهادات
6. الحسابات والصلاحيات (Supabase Auth)
7. الدفع
8. لوحات التحكم
9. النشر على Cloudflare
