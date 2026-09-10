create type public.product_condition as enum ('New', 'Excellent', 'Very Good', 'Good', 'Refurbished');
create type public.product_usage as enum ('Commercial', 'Home');

create table public.products (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  brand text not null default '',
  brand_slug text not null default '',
  model text not null default '',
  category text not null,
  subcategory text not null default '',
  condition public.product_condition not null default 'New',
  price numeric(12,2) not null default 0,
  city text not null default '',
  state text not null default '',
  state_slug text not null default '',
  usage public.product_usage not null default 'Commercial',
  muscle_group text not null default '',
  resistance text not null default '',
  available boolean not null default true,
  images text[] not null default '{}',
  description text not null default '',
  specs jsonb not null default '[]'::jsonb,
  warranty text not null default '',
  shipping text not null default '',
  seller jsonb not null default '{}'::jsonb,
  featured boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index products_category_idx on public.products (category);
create index products_brand_slug_idx on public.products (brand_slug);
create index products_state_slug_idx on public.products (state_slug);

grant select on public.products to anon;
grant select, insert, update, delete on public.products to authenticated;
grant all on public.products to service_role;

alter table public.products enable row level security;

create policy "Products are publicly readable"
  on public.products for select to anon, authenticated using (true);
create policy "Signed-in admins can insert products"
  on public.products for insert to authenticated with check (true);
create policy "Signed-in admins can update products"
  on public.products for update to authenticated using (true) with check (true);
create policy "Signed-in admins can delete products"
  on public.products for delete to authenticated using (true);

create table public.reviews (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  location text not null default '',
  avatar_url text not null default '',
  rating smallint not null default 5,
  quote text not null,
  product_title text,
  published boolean not null default true,
  created_at timestamptz not null default now()
);

grant select on public.reviews to anon;
grant select, insert, update, delete on public.reviews to authenticated;
grant all on public.reviews to service_role;

alter table public.reviews enable row level security;

create policy "Reviews are publicly readable"
  on public.reviews for select to anon, authenticated using (true);
create policy "Signed-in admins can insert reviews"
  on public.reviews for insert to authenticated with check (true);
create policy "Signed-in admins can update reviews"
  on public.reviews for update to authenticated using (true) with check (true);
create policy "Signed-in admins can delete reviews"
  on public.reviews for delete to authenticated using (true);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger products_set_updated_at
  before update on public.products
  for each row execute function public.set_updated_at();