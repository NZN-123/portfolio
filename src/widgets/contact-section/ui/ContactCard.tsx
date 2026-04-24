interface ContactRow {
  label: string;
  value: string;
  href: string;
}

const CONTACT_ROWS: ContactRow[] = [
  {
    label: '이메일',
    value: 'uijinnnn609@naver.com',
    href: 'mailto:uijinnnn609@naver.com',
  },
  {
    label: 'GitHub',
    value: '@NZN-123',
    href: 'https://github.com/NZN-123',
  },
];

export function ContactCard() {
  return (
    <div className="flex w-fit items-center gap-6 rounded-2xl bg-[#FFFEFE] p-8">
      <div className="flex flex-col items-start gap-2">
        {CONTACT_ROWS.map((row) => (
          <span
            key={row.label}
            className="text-base leading-6 font-normal tracking-[0.057px] text-[#FF7474]"
          >
            {row.label}
          </span>
        ))}
      </div>
      <div className="flex flex-col items-start gap-2">
        {CONTACT_ROWS.map((row) => (
          <a
            key={row.label}
            href={row.href}
            target={row.href.startsWith('http') ? '_blank' : undefined}
            rel={row.href.startsWith('http') ? 'noreferrer' : undefined}
            className="text-base leading-6 font-semibold tracking-[0.057px] text-black/88 transition-opacity hover:opacity-70"
          >
            {row.value}
          </a>
        ))}
      </div>
    </div>
  );
}
