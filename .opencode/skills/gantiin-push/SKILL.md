---
name: gantiin-push
description: >
  Gunakan HANYA ketika user menyuruh "push", "push git", "push ke main",
  "push ke remote", "push sekarang", atau variasi push.
  Flow push: stage → commit → git push.
  Flow release (hanya jika user minta): npm run release → update-version → push tag.
  HANYA untuk project Gantiin.
---

# Gantiin Push — Push & Release Flow

## Trigger
Keyword push: **push**, **push git**, **push ke main**, **push ke remote**.
Keyword release: **release**, **rls**, **bump**, **buat tag**, **bikin versi**, **tag**, **version**.

Jangan aktif untuk "push" di luar konteks git.

---

## Flow A: Push (tanpa tag)

### 1. Cek status
```
git status
```
- Gak ada perubahan → bilang dan selesai.
- Ada → lanjut.

### 2. Stage
```
git add -A
```

### 3. Tanya commit message
- Kalau user udah kasih pesan → pakai itu.
- Kalau cuma "push" doang → tanya:
  > "Pesan commit-nya apa? Pakai conventional commit ya (feat/fix/chore/docs/...)"
- Wajib **conventional commit**: `feat:`, `fix:`, `chore:`, `docs:`, `refactor:`, `test:`.

### 4. Commit
```
git commit -m "<message>"
```

### 5. Push
```
git push origin main
```

### 6. Done
Bilang commit udah terpush.

---

## Flow B: Release (hanya jika user minta)

Hanya jalan ketika user bilang **"release"**, **"bump"**, **"buat tag"**, dll.

### 1. Cek ada tag terakhir
```
git describe --tags --abbrev=0
```
Kalau gak ada tag, bilang ke user.

### 2. Jalankan release
```
npm run release
```
`commit-and-tag-version` akan:
- Baca commits sejak tag terakhir
- Bump `package.json`
- Generate `CHANGELOG.md`
- Commit + tag `vX.X.X`

### 3. Sync version.ts
```
node scripts/update-version.mjs
```

### 4. Push tag
```
git push origin main --follow-tags
```

### 5. Done
Kasih tahu user tag-nya.

---

## Catatan
- **Jangan pernah** bikin tag kalau user cuma bilang "push".
- Kalau user minta "push" + "release" dalam satu kalimat → tanya apakah mau bikin tag juga.
