-- Turnia - seed demo para un primer negocio real en Supabase.
-- Reemplazar REEMPLAZAR_AUTH_USER_ID por el id del usuario creado en Authentication.

with created_business as (
  insert into public.businesses (id, name, slug, city, phone, timezone, settings)
  values (
    '11111111-1111-4111-8111-111111111111',
    'Salon Demo',
    'salon-demo',
    'Madrid',
    '+34 600 000 000',
    'Europe/Madrid',
    '{
      "businessHours": { "start": "09:00", "end": "19:00", "step": 30 },
      "minNotice": 12,
      "autoConfirm": false,
      "allowClientCancel": true
    }'::jsonb
  )
  on conflict (slug) do update
    set name = excluded.name,
        city = excluded.city,
        phone = excluded.phone,
        settings = excluded.settings
  returning id
),
owner_user as (
  insert into public.business_users (business_id, auth_user_id, name, email, role, active)
  select
    id,
    'REEMPLAZAR_AUTH_USER_ID'::uuid,
    'Dueno Demo',
    'salon@demo.com',
    'admin',
    true
  from created_business
  on conflict (business_id, auth_user_id) do update
    set role = excluded.role,
        active = true
  returning business_id
),
professionals_seed as (
  insert into public.professionals (id, business_id, name, role, work_start, work_end, active)
  values
    ('22222222-2222-4222-8222-222222222221', '11111111-1111-4111-8111-111111111111', 'Mara', 'Colorista', '09:00', '18:00', true),
    ('22222222-2222-4222-8222-222222222222', '11111111-1111-4111-8111-111111111111', 'Noe', 'Manicura y barberia', '10:00', '19:00', true),
    ('22222222-2222-4222-8222-222222222223', '11111111-1111-4111-8111-111111111111', 'Eva', 'Estetica', '09:00', '17:00', true)
  on conflict (id) do update
    set name = excluded.name,
        role = excluded.role,
        work_start = excluded.work_start,
        work_end = excluded.work_end,
        active = excluded.active
  returning id
),
services_seed as (
  insert into public.services (id, business_id, name, category, duration_minutes, price_cents, online, active)
  values
    ('33333333-3333-4333-8333-333333333331', '11111111-1111-4111-8111-111111111111', 'Corte express', 'Peluqueria', 35, 1800, true, true),
    ('33333333-3333-4333-8333-333333333332', '11111111-1111-4111-8111-111111111111', 'Color + corte', 'Peluqueria', 90, 5800, true, true),
    ('33333333-3333-4333-8333-333333333333', '11111111-1111-4111-8111-111111111111', 'Semipermanente', 'Unas', 50, 2400, true, true),
    ('33333333-3333-4333-8333-333333333334', '11111111-1111-4111-8111-111111111111', 'Lifting de pestanas', 'Estetica', 60, 3800, true, true),
    ('33333333-3333-4333-8333-333333333335', '11111111-1111-4111-8111-111111111111', 'Barba + perfilado', 'Barberia', 30, 1600, true, true)
  on conflict (id) do update
    set name = excluded.name,
        category = excluded.category,
        duration_minutes = excluded.duration_minutes,
        price_cents = excluded.price_cents,
        online = excluded.online,
        active = excluded.active
  returning id
)
insert into public.professional_services (business_id, professional_id, service_id)
values
  ('11111111-1111-4111-8111-111111111111', '22222222-2222-4222-8222-222222222221', '33333333-3333-4333-8333-333333333331'),
  ('11111111-1111-4111-8111-111111111111', '22222222-2222-4222-8222-222222222221', '33333333-3333-4333-8333-333333333332'),
  ('11111111-1111-4111-8111-111111111111', '22222222-2222-4222-8222-222222222222', '33333333-3333-4333-8333-333333333333'),
  ('11111111-1111-4111-8111-111111111111', '22222222-2222-4222-8222-222222222222', '33333333-3333-4333-8333-333333333335'),
  ('11111111-1111-4111-8111-111111111111', '22222222-2222-4222-8222-222222222223', '33333333-3333-4333-8333-333333333334')
on conflict (professional_id, service_id) do nothing;

insert into public.clients (id, business_id, name, phone, note)
values
  ('44444444-4444-4444-8444-444444444441', '11111111-1111-4111-8111-111111111111', 'Lucia Gomez', '+34 611 234 120', 'Prefiere tonos miel.'),
  ('44444444-4444-4444-8444-444444444442', '11111111-1111-4111-8111-111111111111', 'Paula Sosa', '+34 622 903 881', 'Le gusta recibir confirmacion por WhatsApp.')
on conflict (id) do update
  set name = excluded.name,
      phone = excluded.phone,
      note = excluded.note;

insert into public.appointments (
  id, business_id, client_id, professional_id, service_id, date, start_time, end_time,
  duration_minutes, price_cents, status, source, client_note
)
values
  (
    '55555555-5555-4555-8555-555555555551',
    '11111111-1111-4111-8111-111111111111',
    '44444444-4444-4444-8444-444444444441',
    '22222222-2222-4222-8222-222222222221',
    '33333333-3333-4333-8333-333333333332',
    '2026-05-13',
    '09:30',
    '11:00',
    90,
    5800,
    'confirmed',
    'business',
    'Prefiere tonos miel.'
  ),
  (
    '55555555-5555-4555-8555-555555555552',
    '11111111-1111-4111-8111-111111111111',
    '44444444-4444-4444-8444-444444444442',
    '22222222-2222-4222-8222-222222222222',
    '33333333-3333-4333-8333-333333333333',
    '2026-05-13',
    '11:30',
    '12:20',
    50,
    2400,
    'pending',
    'public_link',
    'Quiere confirmar por WhatsApp.'
  )
on conflict (id) do update
  set status = excluded.status,
      client_note = excluded.client_note;

insert into public.blocks (id, business_id, professional_id, date, start_time, end_time, reason)
values
  (
    '66666666-6666-4666-8666-666666666661',
    '11111111-1111-4111-8111-111111111111',
    '22222222-2222-4222-8222-222222222221',
    '2026-05-13',
    '14:00',
    '14:45',
    'Comida'
  )
on conflict (id) do update
  set start_time = excluded.start_time,
      end_time = excluded.end_time,
      reason = excluded.reason;

insert into public.message_templates (business_id, type, body)
values
  (
    '11111111-1111-4111-8111-111111111111',
    'confirmation',
    'Hola {cliente}, tu cita en {negocio} fue confirmada.\n\nServicio: {servicio}\nHora: {hora}\nProfesional: {profesional}\nPrecio: {precio}\n\nTe esperamos.'
  ),
  (
    '11111111-1111-4111-8111-111111111111',
    'cancellation',
    'Hola {cliente}, desde {negocio} te avisamos que no podemos confirmar tu cita de {servicio} a las {hora}.\n\nEscribinos y buscamos otro horario disponible.'
  )
on conflict (business_id, type) do update
  set body = excluded.body;
