import { NAV_ITEMS, SECTION_IDS, type SectionId } from '@shared/config';

interface HeaderProps {
  activeSection?: SectionId;
  onOpenMenu?: () => void;
}

export function Header({
  activeSection = SECTION_IDS.main,
  onOpenMenu,
}: HeaderProps) {
  return (
    <>
      {/* Mobile: in-flow row (< lg) */}
      <div className="flex h-20 w-full shrink-0 items-center justify-between px-6 py-4 lg:hidden">
        <a
          href={`#${SECTION_IDS.main}`}
          aria-label="Home"
          className="block h-12 w-12"
        >
          <img src="/favicon.svg" alt="" className="h-full w-full" />
        </a>
        <button
          type="button"
          aria-label="Open menu"
          onClick={onOpenMenu}
          className="flex h-12 w-12 items-center justify-center"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M3 5h18M3 13h18M3 21h18"
              stroke="#171717"
              strokeWidth="2"
            />
          </svg>
        </button>
      </div>

      {/* Desktop: absolute with fluid margins (>= lg) */}
      <a
        href={`#${SECTION_IDS.main}`}
        aria-label="Home"
        className="absolute z-50 hidden h-12 w-12 lg:block"
        style={{
          top: 'clamp(32px, 6vh, 100px)',
          left: 'clamp(40px, 8vw, 240px)',
        }}
      >
        <img src="/favicon.svg" alt="" className="h-full w-full" />
      </a>

      <nav
        aria-label="Primary"
        className="absolute z-50 hidden h-14 items-center gap-10 rounded-full bg-white/10 px-8 backdrop-blur-md lg:flex xl:gap-12"
        style={{
          top: 'clamp(32px, 6vh, 96px)',
          right: 'clamp(40px, 8vw, 240px)',
        }}
      >
        {NAV_ITEMS.map((item) => {
          const isActive = item.id === activeSection;
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={
                'text-base leading-6 tracking-[0.057px] transition-colors ' +
                (isActive
                  ? 'font-bold text-[#FF7474]'
                  : 'font-medium text-[#171717] hover:text-[#FF7474]')
              }
            >
              {item.label}
            </a>
          );
        })}
        <a
          href="https://github.com/NZN-123"
          target="_blank"
          rel="noreferrer"
          className="text-base leading-6 font-medium tracking-[0.057px] text-[#171717] transition-colors hover:text-[#FF7474]"
        >
          Github
        </a>
      </nav>
    </>
  );
}
