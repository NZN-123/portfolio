export function ExperienceTitle() {
  return (
    <div className="flex max-w-[916px] flex-col gap-3">
      <span className="text-base leading-6 font-medium tracking-[0.057px] text-[#525252]">
        Experience
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
        저는 자신의 성장을 위해 다양한 경험을 하기 위해 실패해도 다양한 도전을
        해서 다양한 성과를 냈어요
      </h2>
    </div>
  );
}
