export function SkillTitle() {
  return (
    <div className="flex max-w-[828.7px] flex-col gap-3">
      <span className="text-base leading-6 font-medium tracking-[0.057px] text-[#525252]">
        Skill
      </span>
      <h2
        className="text-[clamp(24px,2.5vw,40px)] leading-[1.3] font-bold tracking-[0.28px]"
        style={{
          background: 'linear-gradient(89.1deg, #FF7474 0%, #FFA161 100.04%)',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          color: 'transparent',
          WebkitTextFillColor: 'transparent',
        }}
      >
        디자인으로 시작해 개발자와의 커뮤니케이션을 위해 여러가지 툴 사용법
        부터 언어들을 배웠습니다.
      </h2>
    </div>
  );
}
