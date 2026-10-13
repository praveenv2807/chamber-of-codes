create table if not exists public.teams (
  id text primary key,
  name text not null,
  passkey text not null,
  score integer default 0,
  unlocked_tiles integer[] default array[]::integer[],
  bg_image text not null,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

create table if not exists public.event_state (
  id integer primary key default 1,
  winner_announced boolean default false,
  winning_team_id text references public.teams(id) on delete set null,
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

insert into public.event_state (id, winner_announced)
values (1, false)
on conflict (id) do nothing;

insert into public.teams (id, name, passkey, score, unlocked_tiles, bg_image) values
('team-gryf', 'Gryffindor Coders', 'gryf123', 0, '{}', 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1200'),
('team-slyth', 'Slytherin Hackers', 'slyth123', 0, '{}', 'https://images.unsplash.com/photo-1547700055-b61cacebece9?q=80&w=1200'),
('team-raven', 'Ravenclaw Logic', 'raven123', 0, '{}', 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?q=80&w=1200'),
('team-huff',  'Hufflepuff Loops', 'huff123', 0, '{}', 'https://images.unsplash.com/photo-1514533450685-4493e01d1fdc?q=80&w=1200')
on conflict (id) do nothing;

alter publication supabase_realtime add table public.teams;
alter publication supabase_realtime add table public.event_state;