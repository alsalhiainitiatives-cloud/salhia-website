-- Al-Salhiyah platform: core schema (step 1). Row Level Security is ON for every table.
create extension if not exists "pgcrypto";

-- ---------- roles & profiles ----------
create type public.app_role as enum ('admin','editor','finance','instructor','member');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  phone text check (phone is null or phone ~ '^05[0-9]{8}$'),
  role public.app_role not null default 'member',
  created_at timestamptz not null default now()
);

create or replace function public.handle_new_user() returns trigger
language plpgsql security definer set search_path = '' as $$
begin
  insert into public.profiles (id, full_name) values (new.id, new.raw_user_meta_data->>'full_name');
  return new;
end $$;
create trigger on_auth_user_created after insert on auth.users for each row execute function public.handle_new_user();

create or replace function public.has_role(r public.app_role[]) returns boolean
language sql stable security definer set search_path = '' as $$
  select exists (select 1 from public.profiles p where p.id = (select auth.uid()) and p.role = any(r));
$$;

-- ---------- content: initiatives (store) ----------
create table public.initiatives (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  summary text,
  body text,
  category text not null,
  kind text not null check (kind in ('development','community','education')),
  cover_path text,
  goal_amount numeric(12,2) not null default 0,
  raised_amount numeric(12,2) not null default 0,
  ends_at date,
  published boolean not null default false,
  created_at timestamptz not null default now()
);
create table public.initiative_units (
  id uuid primary key default gen_random_uuid(),
  initiative_id uuid not null references public.initiatives(id) on delete cascade,
  label text not null,
  price numeric(10,2) not null check (price > 0),
  sort int not null default 0
);

-- ---------- content: courses ----------
create table public.courses (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  summary text,
  category text not null,
  level text not null check (level in ('beginner','intermediate','advanced')),
  delivery text not null check (delivery in ('recorded','live','both')),
  price numeric(10,2) not null default 0 check (price >= 0),
  instructor_id uuid references public.profiles(id),
  cover_path text,
  published boolean not null default false,
  created_at timestamptz not null default now()
);
create table public.course_modules (
  id uuid primary key default gen_random_uuid(),
  course_id uuid not null references public.courses(id) on delete cascade,
  title text not null,
  sort int not null default 0
);
create table public.lessons (
  id uuid primary key default gen_random_uuid(),
  module_id uuid not null references public.course_modules(id) on delete cascade,
  title text not null,
  kind text not null check (kind in ('video','document','quiz','live')),
  video_uid text,            -- Cloudflare Stream video id
  duration_min int,
  free_preview boolean not null default false,
  sort int not null default 0
);
create table public.enrollments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  course_id uuid not null references public.courses(id) on delete cascade,
  progress int not null default 0 check (progress between 0 and 100),
  completed_at timestamptz,
  certificate_no text unique,
  created_at timestamptz not null default now(),
  unique (user_id, course_id)
);
create table public.lesson_progress (
  user_id uuid not null references public.profiles(id) on delete cascade,
  lesson_id uuid not null references public.lessons(id) on delete cascade,
  done_at timestamptz not null default now(),
  primary key (user_id, lesson_id)
);

-- ---------- content: news & documents ----------
create table public.news (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  body text,
  category text,
  cover_path text,
  published_at timestamptz,
  published boolean not null default false
);
create table public.documents (
  id uuid primary key default gen_random_uuid(),
  section text not null check (section in ('governance','reports','studies','publications','press','awareness')),
  tab text not null,
  title text not null,
  file_path text not null,   -- R2 object key
  year_hijri int,
  views int not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now()
);
create table public.people (
  id uuid primary key default gen_random_uuid(),
  group_key text not null check (group_key in ('board','honorary','assembly','committees','executives','experts')),
  full_name text not null,
  role_title text,
  bio text,
  photo_path text,
  sort int not null default 0,
  published boolean not null default true
);

-- ---------- money ----------
create table public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id),
  email text,
  total numeric(12,2) not null check (total >= 0),
  status text not null default 'pending' check (status in ('pending','paid','failed','refunded')),
  gateway text,
  gateway_ref text,
  created_at timestamptz not null default now()
);
create table public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  kind text not null check (kind in ('donation','course')),
  initiative_id uuid references public.initiatives(id),
  course_id uuid references public.courses(id),
  label text not null,
  qty int not null default 1 check (qty > 0),
  unit_price numeric(10,2) not null check (unit_price > 0),
  recurring boolean not null default false
);

-- ---------- forms ----------
create table public.submissions (
  id uuid primary key default gen_random_uuid(),
  kind text not null check (kind in ('contact','complaint','volunteer','partner','service')),
  name text not null,
  phone text,
  email text,
  message text,
  status text not null default 'new',
  created_at timestamptz not null default now()
);

-- ---------- Row Level Security ----------
alter table public.profiles enable row level security;
alter table public.initiatives enable row level security;
alter table public.initiative_units enable row level security;
alter table public.courses enable row level security;
alter table public.course_modules enable row level security;
alter table public.lessons enable row level security;
alter table public.enrollments enable row level security;
alter table public.lesson_progress enable row level security;
alter table public.news enable row level security;
alter table public.documents enable row level security;
alter table public.people enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.submissions enable row level security;

-- profiles: own row; admins see all. Role cannot be self-escalated.
create policy profiles_select on public.profiles for select using (id = (select auth.uid()) or public.has_role(array['admin']::public.app_role[]));
create policy profiles_update_own on public.profiles for update using (id = (select auth.uid()))
  with check (id = (select auth.uid()) and role = (select p.role from public.profiles p where p.id = (select auth.uid())));
create policy profiles_admin_all on public.profiles for all using (public.has_role(array['admin']::public.app_role[])) with check (public.has_role(array['admin']::public.app_role[]));

-- public read of published content; staff manage
do $$
declare t text;
begin
  foreach t in array array['initiatives','courses','news','documents','people'] loop
    execute format('create policy %I_public_read on public.%I for select using (published)', t, t);
    execute format('create policy %I_staff_all on public.%I for all using (public.has_role(array[''admin'',''editor'']::public.app_role[])) with check (public.has_role(array[''admin'',''editor'']::public.app_role[]))', t, t);
  end loop;
end $$;

create policy units_public_read on public.initiative_units for select using (exists (select 1 from public.initiatives i where i.id = initiative_id and i.published));
create policy units_staff_all on public.initiative_units for all using (public.has_role(array['admin','editor']::public.app_role[])) with check (public.has_role(array['admin','editor']::public.app_role[]));
create policy modules_public_read on public.course_modules for select using (exists (select 1 from public.courses c where c.id = course_id and c.published));
create policy modules_staff_all on public.course_modules for all using (public.has_role(array['admin','editor','instructor']::public.app_role[])) with check (public.has_role(array['admin','editor','instructor']::public.app_role[]));
create policy lessons_public_read on public.lessons for select using (exists (select 1 from public.course_modules m join public.courses c on c.id = m.course_id where m.id = module_id and c.published));
create policy lessons_staff_all on public.lessons for all using (public.has_role(array['admin','editor','instructor']::public.app_role[])) with check (public.has_role(array['admin','editor','instructor']::public.app_role[]));

-- learner data: own rows only
create policy enroll_own on public.enrollments for select using (user_id = (select auth.uid()) or public.has_role(array['admin','instructor']::public.app_role[]));
create policy progress_own on public.lesson_progress for all using (user_id = (select auth.uid())) with check (user_id = (select auth.uid()));

-- money: own orders; finance/admin read all. Writes happen server-side with the service role only.
create policy orders_own on public.orders for select using (user_id = (select auth.uid()) or public.has_role(array['admin','finance']::public.app_role[]));
create policy items_own on public.order_items for select using (exists (select 1 from public.orders o where o.id = order_id and (o.user_id = (select auth.uid()) or public.has_role(array['admin','finance']::public.app_role[]))));

-- forms: anyone may submit; only staff read
create policy submissions_insert on public.submissions for insert with check (true);
create policy submissions_staff_read on public.submissions for select using (public.has_role(array['admin','editor']::public.app_role[]));

create index on public.initiative_units (initiative_id);
create index on public.course_modules (course_id);
create index on public.lessons (module_id);
create index on public.enrollments (user_id);
create index on public.order_items (order_id);
create index on public.documents (section, tab);
create index on public.news (published_at desc);
