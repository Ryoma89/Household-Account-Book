-- profilesテーブル作成
create table profiles (
  id uuid primary key references auth.users on delete cascade,
  email text not null,
  name text,
  introduce text,
  avatar_url text
);

-- profilesテーブルRLS設定
alter table profiles enable row level security;
create policy "プロフィールは誰でも参照可能" on profiles for select using (true);
create policy "プロフィールを更新" on profiles for update using (true);

-- サインアップ時にプロフィールテーブル作成する関数
create function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email);
  return new;
end;
$$ language plpgsql security definer set search_path = public;

-- サインアップ時にプロフィールテーブル作成する関数を呼び出すトリガー
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- プロフィール画像のstorage作成
insert into storage.buckets (id, name, public) values ('profile', 'profile', true);
create policy "プロフィール画像は誰でも参照可能" on storage.objects for select using ( bucket_id = 'profile' );
create policy "プロフィール画像はログインユーザーが追加" on storage.objects for insert with check ( bucket_id = 'profile' AND auth.role() = 'authenticated' );
create policy "自身のプロフィール画像を更新" on storage.objects for update with check ( bucket_id = 'profile' AND auth.uid() = owner );
create policy "自身のプロフィール画像を削除" on storage.objects for delete using ( bucket_id = 'profile' AND auth.uid() = owner );

-- transactionsテーブルの作成
CREATE TABLE transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    category VARCHAR(50) NOT NULL,
    amount NUMERIC NOT NULL,
    converted_amount NUMERIC NOT NULL,
    type VARCHAR(10) CHECK (type IN ('Income', 'Expense')) NOT NULL,
    content VARCHAR(255),
    currency VARCHAR(3) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);