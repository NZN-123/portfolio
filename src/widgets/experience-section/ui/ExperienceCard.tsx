import type { ExperienceGroup } from '@entities/experience';

export function ExperienceCard({ title, iconSrc, items, width }: ExperienceGroup) {
  return (
    <div
      className="flex h-[398px] shrink-0 flex-col gap-6 rounded-[32px] bg-white p-8 shadow-[0_1px_2px_rgba(0,0,0,0.04)] lg:p-16"
      style={{ width }}
    >
      <img
        src={iconSrc}
        alt=""
        aria-hidden="true"
        className="h-32 w-32 object-contain"
      />
      <div className="flex flex-col gap-4">
        <h3 className="text-xl leading-7 font-semibold tracking-[-0.12px] text-[#171717]">
          {title}
        </h3>
        <ul className="flex flex-col gap-1">
          {items.map((item) => (
            <li
              key={item}
              className="text-[15px] leading-[22px] font-normal tracking-[0.1px] text-[#525252]"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
