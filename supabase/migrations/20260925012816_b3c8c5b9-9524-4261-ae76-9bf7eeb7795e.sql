-- Google Merchant Center requires shipping_weight to calculate accurate
-- delivery costs. Nullable/no default: there's no honest fallback weight for
-- a Chest Press Machine vs. a set of dumbbells, so this starts empty and
-- gets backfilled with real per-product weights rather than a guess.
alter table public.products add column weight_lbs numeric(8, 1);
