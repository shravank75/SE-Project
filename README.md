# Secure File Sharing System (SE_Project)

Next.js + Clerk (auth) + Appwrite (storage + database) + Resend (email) file-sharing app. Upload files (100MB max), optionally protect with a password, share via short link (`/f/[fileId]`) or email.

## Features

- Clerk sign-in / sign-up, dashboard (`/upload`, `/files`, `/file-preview/[fileId]`, `/upgrade`)
- Appwrite Storage upload with public `read(any)` link + metadata document (name, size, type, url, owner, password hash, short URL)
- Password protection (SHA-256 hashed before save; legacy plaintext rows still accepted during migration)
- Share via short URL copy + email (`POST /api/send` via Resend)
- Public download page `/f/[fileId]` with password gate
- Upload guards: 100MB cap + blocked executables (`.exe`, `.msi`, `.bat`, `.ps1`, … — see `app/_utils/security.js`)
- Docker + docker-compose production setup

## Quickstart

```bash
npm install
cp .env.example .env.local  # fill in Appwrite / Clerk / Resend values
npm run dev                 # http://localhost:3000
```

Build / prod:

```bash
npm run build
npm start
# or
docker build -t secure-share .
docker compose up --build  # http://localhost:3000
```

## Env (.env.local)

See `.env.example`. Required:

- `NEXT_PUBLIC_APPWRITE_ENDPOINT`, `NEXT_PUBLIC_APPWRITE_PROJECT_ID`, `NEXT_PUBLIC_APPWRITE_BUCKET_ID`, `NEXT_PUBLIC_DB_ID`, `NEXT_PUBLIC_COLLECTION_ID`
- `NEXT_PUBLIC_SHORT_URL` (e.g. `http://localhost:3000/f/`), `NEXT_PUBLIC_DOMAIN`
- `RESEND_API_KEY` (server-only)
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY`

## Project structure

```
app/                # Next.js App Router (auth, dashboard, f/[fileId], api/send)
app/_utils/         # GlobalApi, GenerateRandomString (crypto), security.js
appwrite.js         # Shared Appwrite client (env-driven)
context/            # Toast context
middleware.ts       # Clerk (public /f/* share links intentional)
Dockerfile          # Prod build (node:20-alpine, npm ci, next build, npm start)
docker-compose.yml  # 3000:3000 + .env.local
```

## Security model + limitations

- Passwords are SHA-256 hashed client-side before Appwrite save — obfuscation, **not** real access control. Anyone who can read the Appwrite document/bucket can fetch `fileUrl` directly. For true privacy, tighten Appwrite read permissions + add server-side password verification (see Roadmap).
- `/api/send` validates email/filename/URL, returns 400/500/502 (no raw error leak), but has no rate-limit/auth — put behind auth + rate limit before public deploy.
- Upload type blocking is client-side only — mirror the blocklist in Appwrite bucket rules + scan uploads.
- `fileUrl` uses Appwrite `view` endpoint with `read(any)` — public once link leaks.
- See `SECURITY.md` for reporting + hardening checklist.

## Scripts

- `npm run dev` / `build` / `start` / `lint` (`eslint .`)

## Roadmap

- [ ] Server-side password verification (remove plaintext/hash compare from browser)
- [ ] Appwrite restrictive read permissions + signed URLs
- [ ] Rate-limit + auth on `/api/send`
- [ ] Server-side MIME/size enforcement + AV scan
- [ ] E2E tests for upload → share → download
