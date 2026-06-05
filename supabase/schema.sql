-- Turnia - esquema inicial de produccion
-- Pensado para Supabase/Postgres.
-- Antes de usar con clientes reales, revisar politicas RLS en un proyecto de prueba.

create extension if not exists "pgcrypto";
create extension if not exists "btree_gist";

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

create or replace function public.appointment_time_range(
  target_date date,
  target_start time,
  target_end time
)
returns tsrange
language sql
immutable
as $$
  select tsrange(target_date + target_start, target_date + target_end, '[)');
$$;

alter table public.appointments
drop constraint if exists appointments_no_overlapping_active_slots;

alter table public.appointments
add constraint appointments_no_overlapping_active_slots
exclude using gist (
  business_id with =,
  professional_id with =,
  (public.appointment_time_range(date, start_time, end_time)) with &&
)
where (status in ('pending', 'confirmed'));

alter table public.blocks
drop constraint if exists blocks_no_overlapping_slots;

alter table public.blocks
add constraint blocks_no_overlapping_slots
exclude using gist (
  business_id with =,
  professional_id with =,
  (public.appointment_time_range(date, start_time, end_time)) with &&
);

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

create or replace function public.lock_schedule_day(
  target_business_id uuid,
  target_professional_id uuid,
  target_date date
)
returns void
language plpgsql
as $$
begin
  perform pg_advisory_xact_lock(
    hashtextextended(
      target_business_id::text || ':' || target_professional_id::text || ':' || target_date::text,
      0
    )
  );
end;
$$;

create or replace function public.validate_appointment_schedule()
returns trigger
language plpgsql
as $$
begin
  if new.status not in ('pending', 'confirmed') then
    return new;
  end if;

  perform public.lock_schedule_day(new.business_id, new.professional_id, new.date);

  if exists (
    select 1
    from public.blocks
    where blocks.business_id = new.business_id
      and blocks.professional_id = new.professional_id
      and blocks.date = new.date
      and public.appointment_time_range(blocks.date, blocks.start_time, blocks.end_time)
        && public.appointment_time_range(new.date, new.start_time, new.end_time)
  ) then
    raise exception 'appointment_conflicts_with_block'
      using errcode = 'P0001';
  end if;

  return new;
end;
$$;

drop trigger if exists validate_appointment_schedule_before_write on public.appointments;
create trigger validate_appointment_schedule_before_write
before insert or update of business_id, professional_id, date, start_time, end_time, status
on public.appointments
for each row execute function public.validate_appointment_schedule();

create or replace function public.validate_block_schedule()
returns trigger
language plpgsql
as $$
begin
  perform public.lock_schedule_day(new.business_id, new.professional_id, new.date);

  if exists (
    select 1
    from public.appointments
    where appointments.business_id = new.business_id
      and appointments.professional_id = new.professional_id
      and appointments.date = new.date
      and appointments.status in ('pending', 'confirmed')
      and public.appointment_time_range(appointments.date, appointments.start_time, appointments.end_time)
        && public.appointment_time_range(new.date, new.start_time, new.end_time)
  ) then
    raise exception 'block_conflicts_with_appointment'
      using errcode = 'P0001';
  end if;

  return new;
end;
$$;

drop trigger if exists validate_block_schedule_before_write on public.blocks;
create trigger validate_block_schedule_before_write
before insert or update of business_id, professional_id, date, start_time, end_time
on public.blocks
for each row execute function public.validate_block_schedule();

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

create or replace function public.get_public_booking_page(p_business_slug text)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  selected_business public.businesses%rowtype;
  public_services jsonb;
begin
  select *
  into selected_business
  from public.businesses
  where slug = p_business_slug;

  if not found then
    raise exception 'business_not_found' using errcode = 'P0001';
  end if;

  select coalesce(jsonb_agg(service_payload order by service_name), '[]'::jsonb)
  into public_services
  from (
    select
      services.name as service_name,
      jsonb_build_object(
        'id', services.id,
        'name', services.name,
        'category', services.category,
        'duration_minutes', services.duration_minutes,
        'price_cents', services.price_cents,
        'professionals', coalesce((
          select jsonb_agg(
            jsonb_build_object(
              'id', professionals.id,
              'name', professionals.name,
              'role', professionals.role
            )
            order by professionals.name
          )
          from public.professional_services
          join public.professionals
            on professionals.id = professional_services.professional_id
          where professional_services.business_id = selected_business.id
            and professional_services.service_id = services.id
            and professionals.business_id = selected_business.id
            and professionals.active = true
        ), '[]'::jsonb)
      ) as service_payload
    from public.services
    where services.business_id = selected_business.id
      and services.active = true
      and services.online = true
  ) as public_service_rows;

  return jsonb_build_object(
    'business', jsonb_build_object(
      'name', selected_business.name,
      'slug', selected_business.slug,
      'city', selected_business.city,
      'timezone', selected_business.timezone,
      'business_type', selected_business.settings->>'businessType',
      'business_hours', selected_business.settings->'businessHours',
      'min_notice', coalesce((selected_business.settings->>'minNotice')::integer, 0),
      'auto_confirm', coalesce((selected_business.settings->>'autoConfirm')::boolean, false)
    ),
    'services', public_services
  );
end;
$$;

revoke all on function public.get_public_booking_page(text) from public;
grant execute on function public.get_public_booking_page(text) to anon, authenticated;

create or replace function public.get_public_available_slots(
  p_business_slug text,
  p_service_id uuid,
  p_date date,
  p_professional_id uuid default null
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  selected_business public.businesses%rowtype;
  selected_service public.services%rowtype;
  business_start time;
  business_end time;
  step_minutes integer;
  min_notice_hours integer;
  available_slots jsonb;
begin
  select *
  into selected_business
  from public.businesses
  where slug = p_business_slug;

  if not found then
    raise exception 'business_not_found' using errcode = 'P0001';
  end if;

  select *
  into selected_service
  from public.services
  where id = p_service_id
    and business_id = selected_business.id
    and active = true
    and online = true;

  if not found then
    raise exception 'service_not_available' using errcode = 'P0001';
  end if;

  if p_professional_id is not null and not exists (
    select 1
    from public.professionals
    join public.professional_services
      on professional_services.professional_id = professionals.id
    where professionals.id = p_professional_id
      and professionals.business_id = selected_business.id
      and professionals.active = true
      and professional_services.business_id = selected_business.id
      and professional_services.service_id = selected_service.id
  ) then
    raise exception 'professional_not_available' using errcode = 'P0001';
  end if;

  business_start := coalesce(
    nullif(selected_business.settings->'businessHours'->>'start', '')::time,
    '09:00'::time
  );
  business_end := coalesce(
    nullif(selected_business.settings->'businessHours'->>'end', '')::time,
    '18:00'::time
  );
  step_minutes := greatest(
    coalesce(nullif(selected_business.settings->'businessHours'->>'step', '')::integer, 30),
    5
  );
  min_notice_hours := coalesce((selected_business.settings->>'minNotice')::integer, 0);

  with target_professionals as (
    select
      professionals.id,
      professionals.name,
      professionals.role,
      greatest(professionals.work_start, business_start) as day_start,
      least(professionals.work_end, business_end) as day_end
    from public.professionals
    join public.professional_services
      on professional_services.professional_id = professionals.id
    where professionals.business_id = selected_business.id
      and professionals.active = true
      and professional_services.business_id = selected_business.id
      and professional_services.service_id = selected_service.id
      and (p_professional_id is null or professionals.id = p_professional_id)
  ),
  candidate_slots as (
    select
      target_professionals.id as professional_id,
      target_professionals.name as professional_name,
      target_professionals.role as professional_role,
      generated_slot::time as start_time,
      (generated_slot + make_interval(mins => selected_service.duration_minutes))::time as end_time
    from target_professionals
    cross join lateral generate_series(
      p_date + target_professionals.day_start,
      p_date + target_professionals.day_end - make_interval(mins => selected_service.duration_minutes),
      make_interval(mins => step_minutes)
    ) as generated_slot
    where target_professionals.day_end > target_professionals.day_start
  ),
  free_slots as (
    select *
    from candidate_slots
    where (p_date + start_time) >=
      ((now() at time zone selected_business.timezone) + make_interval(hours => min_notice_hours))
      and end_time > start_time
      and not exists (
        select 1
        from public.appointments
        where appointments.business_id = selected_business.id
          and appointments.professional_id = candidate_slots.professional_id
          and appointments.date = p_date
          and appointments.status in ('pending', 'confirmed')
          and public.appointment_time_range(appointments.date, appointments.start_time, appointments.end_time)
            && public.appointment_time_range(p_date, candidate_slots.start_time, candidate_slots.end_time)
      )
      and not exists (
        select 1
        from public.blocks
        where blocks.business_id = selected_business.id
          and blocks.professional_id = candidate_slots.professional_id
          and blocks.date = p_date
          and public.appointment_time_range(blocks.date, blocks.start_time, blocks.end_time)
            && public.appointment_time_range(p_date, candidate_slots.start_time, candidate_slots.end_time)
      )
  ),
  grouped_slots as (
    select
      start_time,
      end_time,
      jsonb_agg(
        jsonb_build_object(
          'id', professional_id,
          'name', professional_name,
          'role', professional_role
        )
        order by professional_name
      ) as professionals
    from free_slots
    group by start_time, end_time
  )
  select coalesce(
    jsonb_agg(
      jsonb_build_object(
        'time', to_char(start_time, 'HH24:MI'),
        'end_time', to_char(end_time, 'HH24:MI'),
        'professionals', professionals
      )
      order by start_time
    ),
    '[]'::jsonb
  )
  into available_slots
  from grouped_slots;

  return jsonb_build_object(
    'business_slug', selected_business.slug,
    'service_id', selected_service.id,
    'service_name', selected_service.name,
    'date', p_date,
    'slots', available_slots
  );
end;
$$;

revoke all on function public.get_public_available_slots(text, uuid, date, uuid) from public;
grant execute on function public.get_public_available_slots(text, uuid, date, uuid) to anon, authenticated;

create or replace function public.create_public_appointment(
  p_business_slug text,
  p_service_id uuid,
  p_professional_id uuid,
  p_date date,
  p_start_time time,
  p_client_name text,
  p_client_phone text,
  p_client_note text default null
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  selected_business public.businesses%rowtype;
  selected_service public.services%rowtype;
  selected_professional public.professionals%rowtype;
  selected_client public.clients%rowtype;
  new_appointment public.appointments%rowtype;
  calculated_end_time time;
  reservation_status text;
  min_notice_hours integer;
begin
  if nullif(trim(p_client_name), '') is null then
    raise exception 'client_name_required' using errcode = 'P0001';
  end if;

  if nullif(trim(p_client_phone), '') is null then
    raise exception 'client_phone_required' using errcode = 'P0001';
  end if;

  select *
  into selected_business
  from public.businesses
  where slug = p_business_slug;

  if not found then
    raise exception 'business_not_found' using errcode = 'P0001';
  end if;

  select *
  into selected_service
  from public.services
  where id = p_service_id
    and business_id = selected_business.id
    and active = true
    and online = true;

  if not found then
    raise exception 'service_not_available' using errcode = 'P0001';
  end if;

  select *
  into selected_professional
  from public.professionals
  where id = p_professional_id
    and business_id = selected_business.id
    and active = true;

  if not found then
    raise exception 'professional_not_available' using errcode = 'P0001';
  end if;

  if not exists (
    select 1
    from public.professional_services
    where business_id = selected_business.id
      and professional_id = selected_professional.id
      and service_id = selected_service.id
  ) then
    raise exception 'professional_cannot_do_service' using errcode = 'P0001';
  end if;

  calculated_end_time := (p_start_time + make_interval(mins => selected_service.duration_minutes))::time;

  if calculated_end_time <= p_start_time then
    raise exception 'service_must_finish_same_day' using errcode = 'P0001';
  end if;

  min_notice_hours := coalesce((selected_business.settings->>'minNotice')::integer, 0);

  if (p_date + p_start_time) <
    ((now() at time zone selected_business.timezone) + make_interval(hours => min_notice_hours)) then
    raise exception 'appointment_too_soon' using errcode = 'P0001';
  end if;

  reservation_status := case
    when coalesce((selected_business.settings->>'autoConfirm')::boolean, false)
      then 'confirmed'
    else 'pending'
  end;

  perform public.lock_schedule_day(selected_business.id, selected_professional.id, p_date);

  select *
  into selected_client
  from public.clients
  where business_id = selected_business.id
    and phone = trim(p_client_phone)
  order by updated_at desc
  limit 1;

  if found then
    update public.clients
    set name = trim(p_client_name),
        note = nullif(trim(coalesce(p_client_note, selected_client.note, '')), '')
    where id = selected_client.id
    returning * into selected_client;
  else
    insert into public.clients (business_id, name, phone, note)
    values (
      selected_business.id,
      trim(p_client_name),
      trim(p_client_phone),
      nullif(trim(coalesce(p_client_note, '')), '')
    )
    returning * into selected_client;
  end if;

  insert into public.appointments (
    business_id,
    client_id,
    professional_id,
    service_id,
    date,
    start_time,
    end_time,
    duration_minutes,
    price_cents,
    status,
    source,
    client_note
  )
  values (
    selected_business.id,
    selected_client.id,
    selected_professional.id,
    selected_service.id,
    p_date,
    p_start_time,
    calculated_end_time,
    selected_service.duration_minutes,
    selected_service.price_cents,
    reservation_status,
    'public_link',
    nullif(trim(coalesce(p_client_note, '')), '')
  )
  returning * into new_appointment;

  insert into public.appointment_events (business_id, appointment_id, actor_user_id, event_type, payload)
  values (
    selected_business.id,
    new_appointment.id,
    null,
    'public_created',
    jsonb_build_object(
      'source', 'public_link',
      'status', new_appointment.status,
      'service_id', selected_service.id,
      'professional_id', selected_professional.id
    )
  );

  return jsonb_build_object(
    'appointment_id', new_appointment.id,
    'status', new_appointment.status,
    'date', new_appointment.date,
    'start_time', new_appointment.start_time,
    'end_time', new_appointment.end_time,
    'service_name', selected_service.name,
    'professional_name', selected_professional.name
  );
exception
  when exclusion_violation then
    raise exception 'slot_not_available' using errcode = 'P0001';
end;
$$;

revoke all on function public.create_public_appointment(
  text,
  uuid,
  uuid,
  date,
  time,
  text,
  text,
  text
) from public;

grant execute on function public.create_public_appointment(
  text,
  uuid,
  uuid,
  date,
  time,
  text,
  text,
  text
) to anon, authenticated;

-- Link publico de reserva:
-- No abrimos politicas anonimas sobre tablas completas porque eso podria exponer
-- mas columnas o registros de los necesarios. Para produccion usaremos RPC/Edge
-- Functions con respuesta limitada por slug.
--
-- Pendientes:
-- 1. get_public_booking_page(slug)
-- 2. get_public_available_slots(slug, service_id, professional_id, date)
-- 3. conectar el frontend a create_public_appointment(...)
--
-- La creacion publica de citas ya tiene una primera RPC para insertar con validacion
-- del servidor. Antes del piloto real faltan funciones publicas de lectura limitada
-- para negocio, servicios, profesionales y horarios disponibles.
