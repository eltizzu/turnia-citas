-- Turnia - prueba rapida despues de ejecutar schema.sql y seed-demo.sql.
-- Ejecutar en Supabase SQL Editor.
--
-- Esta prueba usa los IDs fijos de seed-demo.sql y corre dentro de una
-- transaccion con ROLLBACK para no dejar citas de prueba guardadas.

begin;

-- 1. El link publico puede leer solo la ficha publica del negocio.
select public.get_public_booking_page('centro-demo') as booking_page;

-- 2. El link publico puede consultar horarios disponibles.
select public.get_public_available_slots(
  'centro-demo',
  '33333333-3333-4333-8333-333333333331'::uuid,
  current_date + 21,
  null
) as available_slots;

-- 3. La primera reserva entra.
select public.create_public_appointment(
  'centro-demo',
  '33333333-3333-4333-8333-333333333331'::uuid,
  '22222222-2222-4222-8222-222222222221'::uuid,
  current_date + 21,
  '10:00'::time,
  'Cliente Smoke Test',
  '+34 700 000 001',
  'Prueba temporal desde smoke-test.sql'
) as first_booking;

-- 4. La segunda reserva en el mismo horario debe fallar.
do $$
begin
  perform public.create_public_appointment(
    'centro-demo',
    '33333333-3333-4333-8333-333333333331'::uuid,
    '22222222-2222-4222-8222-222222222221'::uuid,
    current_date + 21,
    '10:00'::time,
    'Cliente Smoke Test 2',
    '+34 700 000 002',
    'Esta reserva deberia ser rechazada'
  );

  raise exception 'expected_slot_conflict_but_booking_was_created';
exception
  when others then
    if sqlerrm <> 'slot_not_available' then
      raise;
    end if;
    raise notice 'OK: la segunda reserva fue rechazada porque el horario ya estaba ocupado.';
end;
$$;

rollback;
