import { useState, type FormEvent } from 'react';
import { login } from '../api/adminApi';

interface LoginFormProps {
  onSuccess: () => void;
}

export function LoginForm({ onSuccess }: LoginFormProps) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (pending) return;
    setError(null);
    setPending(true);
    try {
      await login(password);
      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : '로그인에 실패했어요.');
    } finally {
      setPending(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto flex w-full max-w-[400px] flex-col gap-4 rounded-2xl bg-white p-8 shadow-[0_0_24px_rgba(0,0,0,0.04)]"
    >
      <h1 className="text-xl leading-7 font-semibold text-[#171717]">
        관리자 로그인
      </h1>
      <label className="flex flex-col gap-2 text-sm font-medium text-[#525252]">
        비밀번호
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="rounded-lg border border-[#E5E5E5] px-4 py-3 text-base text-[#171717] outline-none focus:border-[#FF7474]"
          autoFocus
          required
        />
      </label>
      {error && (
        <p className="text-sm text-[#FF7474]" role="alert">
          {error}
        </p>
      )}
      <button
        type="submit"
        disabled={pending}
        className="rounded-lg bg-[#FF7474] py-3 text-base font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {pending ? '확인 중…' : '로그인'}
      </button>
    </form>
  );
}
