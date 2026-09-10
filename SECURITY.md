# Security Policy

## Supported versions

`main` only.

## Reporting a vulnerability

Do not open public issues for vulnerabilities. Use GitHub Security
Advisories (preferred). Expect a first response within 7 days.

## Known limitations (must fix before public prod deploy)

- Password gate is client-side (`FileItemC` compares hashes in the
  browser). Passwords are now SHA-256 hashed at rest, but anyone with
  Appwrite document/bucket read access can still fetch `fileUrl`
  directly. Add server-side verification + restrictive Appwrite
  permissions.
- `POST /api/send` has input validation but no auth/rate-limit — add
  both to prevent spam relay abuse.
- Upload extension blocking (`security.js`) is client-side only —
  enforce in Appwrite bucket rules and scan uploads server-side.
- Storage uses `Permission.read('any')` — links are public once leaked.
  Prefer signed/expiring URLs.
- No CSP/rate-limit headers configured in `next.config.js`.

## Hardening checklist

- [ ] Appwrite: least-privilege API keys, restrictive bucket/collection
  read rules, rotate `687fae4d…` project keys if ever committed
- [ ] Clerk: restrict allowed origins, enable MFA
- [ ] Resend: verify sender domain, restrict `from`
- [ ] Enable Dependabot + Secret scanning + CodeQL
- [ ] `npm audit` in CI, pin deps, review `package-lock.json` diffs
