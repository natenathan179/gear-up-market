create policy "Anyone can read product images"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'product-images');

create policy "Signed-in admins can upload product images"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'product-images');

create policy "Signed-in admins can update product images"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'product-images')
  with check (bucket_id = 'product-images');

create policy "Signed-in admins can delete product images"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'product-images');