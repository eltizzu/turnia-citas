-- Turnia - esquema inicial de produccion
-- Pensado para Supabase/Postgres.
-- Antes de usar con clientes reales, revisar politicas RLS en un proyecto de prueba.

create extension if not exists "pgcrypto";

create table if not exists public.businesses (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  city text,
  phone text,
  timezone text not null default 'Europe/Madrid',
  settings jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.business_users (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references public.businesses(id) on delete cascade,
  auth_user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  email text not null,
  role text not null default 'admin' check (role in ('admin', 'staff')),
  active boolean not null default true,
  created_at timestamptz not null default now(),
  unique (business_id, auth_user_id)
);

create table if not exists public.professionals (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references public.businesses(id) on delete cascade,
  name text not null,
  role text,
  work_start time not null default '09:00',
  work_end time not null default '18:00',
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.services (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references public.businesses(id) on delete cascade,
  name text not null,
  category text,
  duration_minutes integer not null check (duration_minutes > 0),
  price_cents integer not null default 0 check (price_cents >= 0),
  online boolean not null default true,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.professional_services (
  business_id uuid not null references public.businesses(id) on delete cascade,
  professional_id uuid not null references public.professionals(id) on delete cascade,
  service_id uuid not null references public.services(id) on delete cascade,
  primary key (professional_id, service_id)
);

create table if not exists public.clients (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references public.businesses(id) on delete cascade,
  name text not null,
  phone text not null,
  email text,
  note text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.appointments (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references public.businesses(id) on delete cascade,
  client_id uuid not null references public.clients(id) on delete restrict,
  professional_id uuid not null references public.professionals(id) on delete restrict,
  service_id uuid not null references public.services(id) on delete restrict,
  date date not null,
  start_time time not null,
  end_time time not null,
  duration_minutes integer not null check (duration_minutes > 0),
  price_cents integer not null default 0 check (price_cents >= 0),
  status text not null default 'pending' check (status in ('pending', 'confirmed', 'completed', 'cancelled', 'no_show')),
  source text not null default 'business' check (source in ('business', 'public_link', 'import')),
  client_note text,
  internal_note text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (end_time > start_time)
);

create table if not exists public.blocks (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references public.businesses(id) on delete cascade,
  professional_id uuid not null references public.professionals(id) on delete cascade,
  date date not null,
  start_time time not null,
  end_time time not null,
  reason text not null,
  created_at timestamptz not null default now(),
  check (end_time > start_time)
);

create table if not exists public.message_templates (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references public.businesses(id) on delete cascade,
  type text not null check (type in ('confirmation', 'cancellation', 'reminder', 'reschedule')),
  body text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (business_id, type)
);

create table if not exists public.appointment_events (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references public.businesses(id) on delete cascade,
  appointment_id uuid not null references public.appointments(id) on delete cascade,
  actor_user_id uuid references auth.users(id) on delete set null,
  event_type text not null,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists idx_business_users_auth_user_id on public.business_users(auth_user_id);
create index if not exists idx_professionals_business_id on public.professionals(business_id);
create index if not exists idx_services_business_id on public.services(business_id);
create index if not exists idx_clients_business_phone on public.clients(business_id, phone);
create index if not exists idx_appointments_business_date on public.appointments(business_id, date);
create index if not exists idx_appointments_professional_date on public.appointments(professional_id, date);
create index if not exists idx_blocks_professional_date on public.blocks(professional_id, date);

create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists touch_businesses_updated_at on public.businesses;
create trigger touch_businesses_updated_at
before update on public.businesses
for each row execute function public.touch_updated_at();

drop trigger if exists touch_professionals_updated_at on public.professionals;
create trigger touch_professionals_updated_at
before update on public.professionals
for each row execute function public.touch_updated_at();

drop trigger if exists touch_services_updated_at on public.services;
create trigger touch_services_updated_at
before update on public.services
for each row execute function public.touch_updated_at();

drop trigger if exists touch_clients_updated_at on public.clients;
create trigger touch_clients_updated_at
before update on public.clients
for each row execute function public.touch_updated_at();

drop trigger if exists touch_appointments_updated_at on public.appointments;
create trigger touch_appointments_updated_at
before update on public.appointments
for each row execute function public.touch_updated_at();

drop trigger if exists touch_message_templates_updated_at on public.message_templates;
create trigger touch_message_templates_updated_at
before update on public.message_templates
for each row execute function public.touch_updated_at();

create or replace function public.user_belongs_to_business(target_business_id uuid)
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.business_users
    where business_users.business_id = target_business_id
      and business_users.auth_user_id = auth.uid()
      and business_users.active = true
  );
$$;

alter table public.businesses enable row level security;
alter table public.business_users enable row level security;
alter table public.professionals enable row level security;
alter table public.services enable row level security;
alter table public.professional_services enable row level security;
alter table public.clients enable row level security;
alter table public.appointments enable row level security;
alter table public.blocks enable row level security;
alter table public.message_templates enable row level security;
alter table public.appointment_events enable row level security;

create policy "business members can read business"
on public.businesses for select
to authenticated
using (public.user_belongs_to_business(id));

create policy "admins can update business"
on public.businesses for update
to authenticated
using (public.user_belongs_to_business(id))
with check (public.user_belongs_to_business(id));

create policy "business members can read memberships"
on public.business_users for select
to authenticated
using (public.user_belongs_to_business(business_id));

create policy "business members can manage professionals"
on public.professionals for all
to authenticated
using (public.user_belongs_to_business(business_id))
with check (public.user_belongs_to_business(business_id));

create policy "business members can manage services"
on public.services for all
to authenticated
using (public.user_belongs_to_business(business_id))
with check (public.user_belongs_to_business(business_id));

create policy "business members can manage professional services"
on public.professional_services for all
to authenticated
using (public.user_belongs_to_business(business_id))
with check (public.user_belongs_to_business(business_id));

create policy "business members can manage clients"
on public.clients for all
to authenticated
using (public.user_belongs_to_business(business_id))
with check (public.user_belongs_to_business(business_id));

create policy "business members can manage appointments"
on public.appointments for all
to authenticated
using (public.user_belongs_to_business(business_id))
with check (public.user_belongs_to_business(business_id));

create policy "business members can manage blocks"
on public.blocks for all
to authenticated
using (public.user_belongs_to_business(business_id))
with check (public.user_belongs_to_business(business_id));

create policy "business members can manage message templates"
on public.message_templates for all
to authenticated
using (public.user_belongs_to_business(business_id))
with check (public.user_belongs_to_business(business_id));

create policy "business members can read appointment events"
on public.appointment_events for select
to authenticated
using (public.user_belongs_to_business(business_id));

create policy "business members can create appointment events"
on public.appointment_events for insert
to authenticated
with check (public.user_belongs_to_business(business_id));

-- Link publico de reserva:
-- No abrimos politicas anonimas sobre tablas completas porque eso podria exponer
-- mas columnas o registros de los necesarios. Para produccion usaremos RPC/Edge
-- Functions con respuesta limitada por slug.
--
-- Pendientes:
-- 1. get_public_booking_page(slug)
-- 2. get_public_available_slots(slug, service_id, professional_id, date)
-- 3. create_public_appointment(payload)
--
-- La creacion publica de citas debe validar disponibilidad en servidor antes de insertar.
