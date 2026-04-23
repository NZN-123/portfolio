import type { SkillGroup } from '@entities/skill';

function SkillIcon({
  iconSrc,
  label,
  bgColor,
}: {
  iconSrc: string;
  label: string;
  bgColor: string;
}) {
  return (
    <div className="flex w-20 shrink-0 flex-col items-center gap-1">
      <div
        className="flex h-20 w-20 items-center justify-center rounded-[20px]"
        style={{ backgroundColor: bgColor }}
      >
        <img
          src={iconSrc}
          alt={label}
          className="h-[62.5px] w-[62.5px] object-contain"
        />
      </div>
      <span className="text-[15px] leading-[22px] font-medium tracking-[0.1px] text-black">
        {label}
      </span>
    </div>
  );
}

export function SkillCard({ title, skills }: SkillGroup) {
  return (
    <div className="flex shrink-0 flex-col gap-8 rounded-[32px] bg-white p-8 shadow-[0_1px_2px_rgba(0,0,0,0.04)] lg:p-16">
      <h3 className="text-xl leading-7 font-semibold tracking-[-0.12px] text-[#171717]">
        {title}
      </h3>
      <div className="flex items-center gap-6">
        {skills.map((skill) => (
          <SkillIcon
            key={skill.name}
            iconSrc={skill.iconSrc}
            label={skill.label}
            bgColor={skill.bgColor}
          />
        ))}
      </div>
    </div>
  );
}
