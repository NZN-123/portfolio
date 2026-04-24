export async function fetchSession(): Promise<{ authenticated: boolean }> {
  const res = await fetch('/api/admin/session', { credentials: 'same-origin' });
  if (!res.ok) return { authenticated: false };
  return res.json();
}

export async function login(password: string): Promise<void> {
  const res = await fetch('/api/admin/login', {
    method: 'POST',
    credentials: 'same-origin',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password }),
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error ?? '로그인에 실패했어요.');
  }
}

export async function logout(): Promise<void> {
  await fetch('/api/admin/logout', {
    method: 'POST',
    credentials: 'same-origin',
  });
}

export async function uploadPdf(slug: string, file: File): Promise<{ url: string }> {
  const form = new FormData();
  form.append('slug', slug);
  form.append('file', file);

  const res = await fetch('/api/admin/upload', {
    method: 'POST',
    credentials: 'same-origin',
    body: form,
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error ?? '업로드에 실패했어요.');
  }
  return res.json();
}

export async function fetchProjectPdfUrl(slug: string): Promise<string | null> {
  const res = await fetch(`/api/pdf/${slug}`);
  if (!res.ok) return null;
  const data = await res.json();
  return data.url ?? null;
}
