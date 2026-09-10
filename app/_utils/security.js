// Shared client-side security helpers.
// NOTE: password hashing here is SHA-256 for obfuscation, NOT a substitute
// for server-side access control. Appwrite document read permissions must
// still restrict who can fetch fileUrl. See SECURITY.md.

export const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100MB

// Block executables / scripts that are commonly abused for malware delivery.
// Appwrite Storage has no server-side MIME enforcement in this app, so block
// the riskiest extensions on the client and enforce the same list in Appwrite
// Storage settings / bucket rules.
export const BLOCKED_EXTENSIONS = [
  '.exe', '.msi', '.bat', '.cmd', '.com', '.scr', '.ps1', '.vbs', '.js',
  '.jse', '.jar', '.apk', '.dmg', '.pkg', '.deb', '.rpm', '.sh',
];

export function getFileExtension(name = '') {
  const idx = name.lastIndexOf('.');
  return idx >= 0 ? name.slice(idx).toLowerCase() : '';
}

export function isBlockedFile(name = '') {
  return BLOCKED_EXTENSIONS.includes(getFileExtension(name));
}

export function isValidEmail(email = '') {
  if (typeof email !== 'string') return false;
  if (email.length > 254) return false;
  // Simple RFC-5322-compatible check (no Unicode, no display names)
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());
}

export async function sha256Hex(text = '') {
  const data = new TextEncoder().encode(text);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return [...new Uint8Array(digest)]
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

// back-compat: existing DB rows store plaintext passwords.
// A 64-char hex string is treated as already-hashed.
export function isSha256Hex(s = '') {
  return /^[0-9a-f]{64}$/i.test(s);
}

export async function hashPasswordIfNeeded(password = '') {
  if (!password) return '';
  if (isSha256Hex(password)) return password.toLowerCase();
  return sha256Hex(password);
}
